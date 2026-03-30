'use client';

import { Users, MessageCircle, Heart, Share2, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const communityPosts = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    time: '2 hours ago',
    content:
      'Just uploaded my comprehensive guide on Python data structures! Check it out and let me know your thoughts.',
    likes: 42,
    comments: 12,
    tag: 'Python',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 2,
    author: 'Michael Torres',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    time: '5 hours ago',
    content:
      'Looking for feedback on my UI/UX case study for an e-commerce redesign project. Any designers here?',
    likes: 28,
    comments: 8,
    tag: 'Design',
    tagColor: 'bg-pink-100 text-pink-700',
  },
  {
    id: 3,
    author: 'Emily Watson',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    time: '1 day ago',
    content:
      'Sharing my notes from the Stanford Machine Learning course. Hope it helps fellow learners!',
    likes: 156,
    comments: 34,
    tag: 'ML',
    tagColor: 'bg-purple-100 text-purple-700',
  },
];

const topContributors = [
  {
    name: 'Alex Johnson',
    docs: 45,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  },
  {
    name: 'Lisa Park',
    docs: 38,
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
  },
  {
    name: 'David Kim',
    docs: 32,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
  },
];

export function CommunityView() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Community</h1>
      <p className="text-gray-500 mb-8">
        Connect with fellow learners and share knowledge.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  placeholder="Share something with the community..."
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 resize-none text-sm focus:outline-none focus:border-blue-400"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-6 shadow-lg shadow-blue-200/50">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {post.author}
                    </span>
                    <span className="text-xs text-gray-400">{post.time}</span>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${post.tagColor} mb-2`}
                  >
                    {post.tag}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {post.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
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
              <h3 className="font-semibold">Community Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-sm text-white/70">Members</p>
              </div>
              <div>
                <p className="text-2xl font-bold">8.2K</p>
                <p className="text-sm text-white/70">Documents</p>
              </div>
              <div>
                <p className="text-2xl font-bold">2.1K</p>
                <p className="text-sm text-white/70">Posts Today</p>
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-white/70">Online Now</p>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">Top Contributors</h3>
            </div>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={contributor.avatar} />
                    <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {contributor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {contributor.docs} documents
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
