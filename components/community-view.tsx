'use client';

import { useState, useEffect } from 'react';
import { Users, MessageCircle, Heart, TrendingUp, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import axiosClient from '../lib/axiosClient';

export function CommunityView() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  
  const [stats, setStats] = useState({ members: 0, docs: 0, postsToday: 0, totalComments: 0 });
  
  const [topContributors, setTopContributors] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [commentsData, setCommentsData] = useState<Record<number, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

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

  const handleToggleLike = async (postId: number) => {
    try {
      const res = await axiosClient.post('/social/likes', { post_id: postId });
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            is_liked_by_me: res.data.liked ? 1 : 0,
            likes_count: res.data.liked ? p.likes_count + 1 : p.likes_count - 1
          };
        }
        return p;
      }));
    } catch (error) {
      console.error("Lỗi thả tim:", error);
    }
  };

  const handleToggleComments = async (postId: number) => {
    if (showComments[postId]) {
      setShowComments(prev => ({ ...prev, [postId]: false }));
      return;
    }
    
    setShowComments(prev => ({ ...prev, [postId]: true }));
    try {
      const res = await axiosClient.get(`/social/posts/${postId}/comments`);
      setCommentsData(prev => ({ ...prev, [postId]: res.data }));
    } catch (error) {
      console.error("Lỗi tải bình luận:", error);
    }
  };

  const handleSendComment = async (postId: number) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;

    try {
      const res = await axiosClient.post('/social/comments', { post_id: postId, content });
      setCommentsData(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data]
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      setPosts(posts.map(p => p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p));
      setStats(prev => ({ ...prev, totalComments: prev.totalComments + 1 }));
    } catch (error) {
      console.error("Lỗi gửi bình luận:", error);
    }
  };

  const getRoboHash = (username: string) => `https://robohash.org/${username || 'anon'}?set=set4&size=150x150`;

  return (
    <div className="flex-1 p-8 animate-in fade-in duration-300">
      <h1 className="text-2xl font-bold text-foreground mb-2">Cộng đồng</h1>
      <p className="text-gray-500 mb-8">Kết nối với các bạn sinh viên và cùng nhau chia sẻ kiến thức.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Post */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border border-gray-100">
                <AvatarImage src={getRoboHash('currentUser')} />
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Chia sẻ điều gì đó với cộng đồng..."
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 resize-none text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <Button 
                    onClick={handlePostSubmit}
                    disabled={!newPostContent.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-6 shadow-lg shadow-blue-200/50"
                  >
                    Đăng bài
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          {isLoading ? (
             <div className="text-center py-10 text-gray-400 animate-pulse">Đang tải bảng tin...</div>
          ) : posts.length === 0 ? (
             <div className="text-center py-10 text-gray-400 bg-white rounded-2xl shadow-sm border border-gray-100">
                Chưa có bài viết nào. Hãy là người đầu tiên khơi mào cuộc thảo luận!
             </div>
          ) : posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border border-gray-100 bg-gray-50">
                  <AvatarImage src={getRoboHash(post.author)} />
                  <AvatarFallback>{post.author ? post.author[0].toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{post.author || 'Ẩn danh'}</span>
                    <span className="text-xs text-gray-400">Mới đây</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${post.is_liked_by_me ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                    >
                      <Heart className="w-4 h-4" fill={post.is_liked_by_me ? "currentColor" : "none"} />
                      <span className="text-sm font-medium">{post.likes_count || 0}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleToggleComments(post.id)}
                      className={`flex items-center gap-2 transition-colors ${showComments[post.id] ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments_count || 0}</span>
                    </button>
                  </div>

                  {/* Comments */}
                  {showComments[post.id] && (
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                        {commentsData[post.id]?.length > 0 ? (
                          commentsData[post.id].map(cmt => (
                            <div key={cmt.id} className="flex gap-3">
                              <Avatar className="w-8 h-8 flex-shrink-0 border border-gray-100 bg-gray-50">
                                <AvatarImage src={getRoboHash(cmt.author)} />
                                <AvatarFallback>{cmt.author ? cmt.author[0] : 'U'}</AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-50 px-4 py-2.5 rounded-2xl rounded-tl-sm border border-gray-100">
                                <p className="text-xs font-bold text-gray-900 mb-0.5">{cmt.author || 'Ẩn danh'}</p>
                                <p className="text-sm text-gray-700">{cmt.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-center text-gray-400 py-2">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                        )}
                      </div>

                      <div className="flex gap-2 items-center">
                        <Avatar className="w-8 h-8 flex-shrink-0 border border-gray-100">
                          <AvatarImage src={getRoboHash('currentUser')} />
                        </Avatar>
                        <input 
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                          placeholder="Viết bình luận..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                        />
                        <button 
                          onClick={() => handleSendComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-200/50 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6" />
              <h3 className="font-semibold">Thống kê Cộng đồng</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{stats.members}</p>
                <p className="text-sm text-white/70">Thành viên</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.docs}</p>
                <p className="text-sm text-white/70">Tài liệu</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.postsToday}</p>
                <p className="text-sm text-white/70">Bài viết</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalComments}</p>
                <p className="text-sm text-white/70">Bình luận</p>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">Thành viên Sôi nổi</h3>
            </div>
            <div className="space-y-4">
              {topContributors.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Chưa có ai đóng góp tài liệu.</p>
              ) : (
                topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <Avatar className="w-8 h-8 bg-gray-50 border border-gray-100">
                      <AvatarImage src={getRoboHash(contributor.name)} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{contributor.name}</p>
                      <p className="text-xs text-gray-500">{contributor.docs} tài liệu</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}