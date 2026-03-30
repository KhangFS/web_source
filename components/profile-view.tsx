'use client';

import { FileText, Heart, Download, Settings, Edit2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const userDocuments = [
  {
    title: 'Python Basics',
    category: 'Computer Science',
    downloads: 234,
    gradient: 'from-pink-200 via-purple-200 to-blue-200',
  },
  {
    title: 'Design Systems',
    category: 'Design',
    downloads: 189,
    gradient: 'from-orange-200 via-yellow-200 to-green-200',
  },
  {
    title: 'Data Structures',
    category: 'Computer Science',
    downloads: 312,
    gradient: 'from-blue-200 via-cyan-200 to-teal-200',
  },
];

export function ProfileView() {
  return (
    <div className="flex-1 p-8 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />

        {/* Profile Info */}
        <div className="relative px-8 pb-8">
          <div className="flex items-end gap-6 -mt-12">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                  <p className="text-gray-500">@johndoe</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-xl gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                  <Button className="rounded-xl gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-gray-600 max-w-2xl">
            Passionate about sharing knowledge and helping others learn.
            Computer Science enthusiast with a love for clean design and good
            documentation.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-500">Documents</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">356</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">5.8K</p>
              <p className="text-sm text-gray-500">Total Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Documents */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">My Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDocuments.map((doc) => (
            <div
              key={doc.title}
              className={`bg-gradient-to-br ${doc.gradient} rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/50 text-xs font-medium text-gray-700">
                  {doc.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {doc.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{doc.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{Math.floor(doc.downloads * 0.4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
