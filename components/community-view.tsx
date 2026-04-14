'use client';

import { useState, useEffect, useMemo } from 'react';
import { Users, MessageCircle, Heart, TrendingUp, Send, Search, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import axiosClient from '../lib/axiosClient';

// --- HỆ THỐNG SKELETON LOADING (Lấp lánh khi đang tải) ---
const PostSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 w-full bg-gray-100 rounded" />
      <div className="h-4 w-3/4 bg-gray-100 rounded" />
    </div>
    <div className="h-10 w-full bg-gray-50 rounded-xl" />
  </div>
);

export function CommunityView() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [authorQuery, setAuthorQuery] = useState(''); // Tìm kiếm tác giả
  const [stats, setStats] = useState({ members: 0, docs: 0, postsToday: 0, totalComments: 0 });
  const [topContributors, setTopContributors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quản lý trạng thái bình luận
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [commentsData, setCommentsData] = useState<Record<number, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [isSubmittingComment, setIsSubmittingComment] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, statsRes, topRes] = await Promise.all([
          axiosClient.get('/social/posts'),
          axiosClient.get('/social/stats'),
          axiosClient.get('/social/top-contributors')
        ]);
        setPosts(postsRes.data);
        setStats(statsRes.data);
        setTopContributors(topRes.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu cộng đồng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- LOGIC LỌC TÁC GIẢ (LOCAL SEARCH) ---
  const filteredPosts = useMemo(() => {
    if (!authorQuery.trim()) return posts;
    return posts.filter(p =>
      (p.author || 'Ẩn danh').toLowerCase().includes(authorQuery.toLowerCase())
    );
  }, [authorQuery, posts]);

  const handlePostSubmit = async () => {
    if (!newPostContent.trim()) return;
    try {
      const res = await axiosClient.post('/social/posts', { content: newPostContent });
      setPosts(prev => [res.data, ...prev]);
      setNewPostContent('');
      setStats(prev => ({ ...prev, postsToday: prev.postsToday + 1 }));
    } catch (error) {
      alert("Lỗi khi đăng bài. Vui lòng kiểm tra đăng nhập!");
    }
  };

  // --- OPTIMISTIC LIKE (THẢ TIM 0MS) ---
  const handleToggleLike = async (postId: number) => {
    const originalPosts = [...posts];

    // Cập nhật RAM ngay lập tức
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.is_liked_by_me;
        return {
          ...p,
          is_liked_by_me: liked ? 1 : 0,
          likes_count: liked ? (p.likes_count || 0) + 1 : (p.likes_count || 1) - 1
        };
      }
      return p;
    }));

    try {
      await axiosClient.post('/social/likes', { post_id: postId });
    } catch (error) {
      setPosts(originalPosts); // Rollback nếu lỗi
      console.error("Lỗi thả tim:", error);
    }
  };

  const handleToggleComments = async (postId: number) => {
    if (showComments[postId]) {
      setShowComments(prev => ({ ...prev, [postId]: false }));
      return;
    }

    setShowComments(prev => ({ ...prev, [postId]: true }));
    if (!commentsData[postId]) { // Chỉ fetch nếu chưa có dữ liệu
      try {
        const res = await axiosClient.get(`/social/posts/${postId}/comments`);
        setCommentsData(prev => ({ ...prev, [postId]: res.data }));
      } catch (error) {
        console.error("Lỗi tải bình luận:", error);
      }
    }
  };

  const handleSendComment = async (postId: number) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;

    setIsSubmittingComment(prev => ({ ...prev, [postId]: true }));
    try {
      const res = await axiosClient.post('/social/comments', { post_id: postId, content });
      setCommentsData(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data]
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      setPosts(posts.map(p => p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p));
    } catch (error) {
      console.error("Lỗi gửi bình luận:", error);
    } finally {
      setIsSubmittingComment(prev => ({ ...prev, [postId]: false }));
    }
  };

  const getRoboHash = (username: string) => `https://robohash.org/${username || 'anonymous'}?set=set4&size=150x150`;

  return (
    <div className="flex-1 p-4 md:p-8 min-h-screen bg-[#fafafa] font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-2">Cộng đồng</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Nơi sinh viên UIT kết nối và chia sẻ tri thức.</p>
        </header>

        {/* --- MOBILE STATS CAROUSEL (Mới: Trượt ngang trên Mobile) --- */}
        <div className="flex lg:hidden overflow-x-auto pb-6 gap-4 no-scrollbar">
          <div className="min-w-[280px] bg-gradient-to-br from-teal-500 to-emerald-600 p-6 rounded-[2rem] text-white shadow-lg shrink-0">
            <div className="flex items-center gap-3 mb-4 opacity-80"><Users className="w-5 h-5" /> <span className="text-xs font-bold uppercase tracking-widest">Hệ thống</span></div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-2xl font-black">{stats.members}</p><p className="text-[10px] opacity-70 uppercase font-bold">Thành viên</p></div>
              <div><p className="text-2xl font-black">{stats.docs}</p><p className="text-[10px] opacity-70 uppercase font-bold">Tài liệu</p></div>
            </div>
          </div>
          <div className="min-w-[280px] bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shrink-0">
            <div className="flex items-center gap-3 mb-4 text-amber-500"><TrendingUp className="w-5 h-5" /> <span className="text-xs font-bold uppercase tracking-widest">Thành viên sôi nổi</span></div>
            <div className="flex gap-3">
              {topContributors.slice(0, 3).map((c) => (
                <Avatar key={c.name} className="w-10 h-10 border-2 border-amber-100"><AvatarImage src={getRoboHash(c.name)} /></Avatar>
              ))}
              <div className="flex flex-col justify-center"><p className="text-xs font-bold text-gray-900">+{topContributors.length} người</p><p className="text-[10px] text-gray-400 font-bold">đang tích cực</p></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* --- CREATE POST --- */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] p-6 border border-gray-50">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 shrink-0 shadow-inner">
                  <AvatarImage src={getRoboHash('currentUser')} />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Chia sẻ suy nghĩ của bạn..."
                    className="w-full p-4 rounded-3xl bg-gray-50 border-none resize-none text-sm focus:ring-2 focus:ring-teal-500/20 transition-all placeholder:text-gray-400 font-medium"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <Button
                      onClick={handlePostSubmit}
                      disabled={!newPostContent.trim()}
                      className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-200 transition-all active:scale-95"
                    >
                      Đăng bài
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* --- AUTHOR SEARCH BAR (Mới: Bộ lọc tác giả) --- */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <input
                type="text"
                value={authorQuery}
                onChange={(e) => setAuthorQuery(e.target.value)}
                placeholder="Tìm bài viết theo tên tác giả..."
                className="w-full pl-12 pr-6 py-4 bg-white border-2 border-gray-100 rounded-2xl text-sm focus:border-teal-500 outline-none transition-all font-bold shadow-sm placeholder:font-medium"
              />
            </div>

            {/* --- POSTS FEED & SKELETON --- */}
            <div className="space-y-6">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => <PostSkeleton key={i} />)
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold">Không tìm thấy bài viết nào của "{authorQuery}"</p>
                </div>
              ) : filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:border-teal-100 transition-all">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-10 h-10 border border-gray-100 bg-gray-50 shrink-0">
                        <AvatarImage src={getRoboHash(post.author)} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm">{post.author || 'Ẩn danh'}</h4>
                        {/* ĐÃ FIX: Thay thế "Vừa xong" bằng Tên ngành học */}
                        <p className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase">
                          • {post.major_name || post.author_major || ''} •
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-6 font-medium">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-2 transition-all active:scale-125 ${post.is_liked_by_me ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
                      >
                        <Heart className="w-5 h-5" fill={post.is_liked_by_me ? "currentColor" : "none"} />
                        <span className="text-xs font-black">{post.likes_count || 0}</span>
                      </button>

                      <button
                        onClick={() => handleToggleComments(post.id)}
                        className={`flex items-center gap-2 transition-colors ${showComments[post.id] ? 'text-teal-600' : 'text-gray-400 hover:text-teal-600'}`}
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs font-black">{post.comments_count || 0}</span>
                      </button>
                    </div>

                    {/* --- COMMENTS SECTION (Sticky Input + Scroll Area) --- */}
                    {showComments[post.id] && (
                      <div className="mt-6 pt-6 border-t border-dashed border-gray-100 animate-in slide-in-from-top-4 duration-300">
                        {/* Scroll Area bình luận */}
                        <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {commentsData[post.id]?.length > 0 ? (
                            commentsData[post.id].map(cmt => (
                              <div key={cmt.id} className="flex gap-3 items-start animate-in fade-in">
                                <Avatar className="w-8 h-8 shrink-0 border border-gray-50"><AvatarImage src={getRoboHash(cmt.author)} /></Avatar>
                                <div className="bg-gray-50 px-4 py-3 rounded-[1.5rem] rounded-tl-none border border-gray-100 flex-1">
                                  <p className="text-[10px] font-black text-gray-900 mb-1">{cmt.author || 'Ẩn danh'}</p>
                                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{cmt.content}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-[10px] text-center text-gray-400 font-bold tracking-widest py-4">Hãy là người đầu tiên bình luận</p>
                          )}
                        </div>

                        {/* Sticky Input cho bình luận */}
                        <div className="flex gap-2 items-center sticky bottom-0 bg-white pt-2 pb-1">
                          <Avatar className="w-8 h-8 shrink-0"><AvatarImage src={getRoboHash('currentUser')} /></Avatar>
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                              placeholder="Viết phản hồi..."
                              className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-2 text-xs focus:border-teal-500 focus:bg-white outline-none transition-all font-bold"
                            />
                            <button
                              onClick={() => handleSendComment(post.id)}
                              disabled={!commentInputs[post.id]?.trim() || isSubmittingComment[post.id]}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-700 disabled:opacity-30 transition-colors"
                            >
                              {isSubmittingComment[post.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- DESKTOP SIDEBAR (Ẩn trên Mobile, hiện trên lg) --- */}
          <div className="hidden lg:block space-y-8 sticky top-8 h-fit">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-950 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/10 rounded-xl"><Users className="w-5 h-5 text-teal-300" /></div>
                <h3 className="font-bold uppercase tracking-wide">Thống kê cộng đồng</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div><p className="text-3xl font-black text-teal-400">{stats.members}</p><p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Thành viên</p></div>
                <div><p className="text-3xl font-black text-teal-400">{stats.docs}</p><p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Tài liệu</p></div>
                <div><p className="text-3xl font-black text-teal-400">{stats.postsToday}</p><p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Bài viết</p></div>
                <div><p className="text-3xl font-black text-teal-400">{stats.totalComments}</p><p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Tương tác</p></div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-gray-900 tracking-tight">Thành viên sôi nổi</h3>
              </div>
              <div className="space-y-5">
                {topContributors.map((c, idx) => (
                  <div key={c.name} className="flex items-center gap-4 group">
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-gray-50 group-hover:border-teal-500 transition-all"><AvatarImage src={getRoboHash(c.name)} /></Avatar>
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 border-white">{idx + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 group-hover:text-teal-600 transition-colors">{c.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold tracking-tighter">{c.docs} đóng góp</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}