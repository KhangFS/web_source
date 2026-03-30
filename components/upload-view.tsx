'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UploadViewProps {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
}

export function UploadView({
  showSuccessModal,
  setShowSuccessModal,
}: UploadViewProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-gray-200">
          <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-30">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-gray-200">
          <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-30">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-20 w-10 h-10 text-gray-200">
          <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-20">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-40 w-8 h-8 text-gray-200">
          <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-25">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        </div>
      </div>

      {/* Main Upload Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden relative">
        {/* Vibrant Gradient Banner with Illustration */}
        <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-12 flex items-center justify-center min-h-64">
          {/* Cloud Upload Illustration */}
          <svg
            width="240"
            height="160"
            viewBox="0 0 200 140"
            className="drop-shadow-lg"
          >
            {/* Main cloud */}
            <ellipse cx="100" cy="80" rx="70" ry="45" fill="#E8F4FC" />
            <ellipse cx="60" cy="85" rx="40" ry="30" fill="#D6EAF8" />
            <ellipse cx="140" cy="85" rx="40" ry="30" fill="#D6EAF8" />
            <ellipse cx="100" cy="70" rx="50" ry="35" fill="#EBF5FB" />

            {/* Upload arrows */}
            <path
              d="M80 95 L80 55 L65 70 M80 55 L95 70"
              stroke="#F39C12"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M100 100 L100 50 L85 68 M100 50 L115 68"
              stroke="#3498DB"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M120 95 L120 55 L105 70 M120 55 L135 70"
              stroke="#E74C3C"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data stream lines */}
            <rect x="70" y="105" width="8" height="15" rx="2" fill="#5DADE2" />
            <rect x="82" y="108" width="8" height="12" rx="2" fill="#48C9B0" />
            <rect x="94" y="105" width="8" height="15" rx="2" fill="#5DADE2" />
            <rect x="106" y="108" width="8" height="12" rx="2" fill="#48C9B0" />
            <rect x="118" y="105" width="8" height="15" rx="2" fill="#5DADE2" />

            {/* Flying documents */}
            <g transform="translate(150, 55) rotate(12)">
              <rect x="0" y="0" width="20" height="28" rx="2" fill="#48BB78" />
              <line
                x1="4"
                y1="8"
                x2="16"
                y2="8"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="4"
                y1="14"
                x2="16"
                y2="14"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
            </g>

            <g transform="translate(160, 75) rotate(6)">
              <rect x="0" y="0" width="18" height="26" rx="2" fill="#F6E05E" />
              <line
                x1="3"
                y1="7"
                x2="15"
                y2="7"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="3"
                y1="13"
                x2="15"
                y2="13"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
            </g>

            <g transform="translate(155, 40) rotate(-6)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="#F687B3" />
              <line
                x1="2"
                y1="6"
                x2="14"
                y2="6"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="2"
                y1="12"
                x2="14"
                y2="12"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
            </g>

            <g transform="translate(35, 65) rotate(-12)">
              <rect x="0" y="0" width="18" height="26" rx="2" fill="#B083D9" />
              <line
                x1="3"
                y1="7"
                x2="15"
                y2="7"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="3"
                y1="13"
                x2="15"
                y2="13"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
            </g>

            <g transform="translate(20, 85) rotate(6)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="#4299E1" />
              <line
                x1="2"
                y1="6"
                x2="14"
                y2="6"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="2"
                y1="12"
                x2="14"
                y2="12"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
            </g>
          </svg>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 pt-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Document Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title
              </label>
              <Input
                type="text"
                placeholder="Document Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="rounded-xl border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 h-11"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Input
                type="text"
                placeholder="Description here..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="rounded-xl border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none text-sm appearance-none cursor-pointer h-11"
                >
                  <option value="">Category</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="business">Business</option>
                  <option value="design">Design</option>
                  <option value="engineering">Engineering</option>
                  <option value="law">Law</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <Input
                type="text"
                placeholder="Category tags..."
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="rounded-xl border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 h-11"
              />
            </div>
          </div>

          {/* Upload Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full py-6 text-base font-medium shadow-lg shadow-blue-200/50 transition-all hover:shadow-blue-300/60"
          >
            Upload Document
          </Button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50/10 to-orange-100/20 flex items-center justify-center z-50 overflow-hidden">
          {/* Floating background icons - subtle outline style */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-12 h-12 text-gray-300 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <line x1="4" y1="10" x2="20" y2="10" />
              </svg>
            </div>
            <div className="absolute top-40 right-24 w-10 h-10 text-gray-300 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div className="absolute bottom-32 left-20 w-11 h-11 text-gray-300 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <div className="absolute bottom-20 right-16 w-10 h-10 text-gray-300 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </div>
            <div className="absolute top-1/3 right-10 w-12 h-12 text-gray-300 opacity-20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 8h10" />
                <path d="M7 12h10" />
                <path d="M7 16h6" />
              </svg>
            </div>
          </div>

          {/* Modal Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full mx-4 text-center transform animate-in zoom-in-95 duration-300 relative">
            {/* Success Heading */}
            <h2 className="text-5xl font-bold text-gray-900 mb-1 tracking-tight">
              SUCCESS!
            </h2>
            <p className="text-3xl font-bold text-gray-800 mb-10">
              THANK YOU FOR YOUR UPLOAD!
            </p>

            {/* Five Cute Characters Row */}
            <div className="flex justify-center items-end gap-4 mb-10 h-40">
              {/* Character 1 - Brown/Rust */}
              <div className="flex flex-col items-center gap-2">
                {/* Head */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center shadow-md relative">
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute left-4 top-4" />
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute right-4 top-4" />
                  <div className="w-1 h-1 rounded-full bg-gray-700 absolute left-1/2 -translate-x-1/2 bottom-3" />
                </div>
                {/* Body */}
                <div className="w-10 h-16 bg-gradient-to-b from-amber-600 to-amber-700 rounded-lg shadow-md transform -rotate-20 origin-top" />
              </div>

              {/* Character 2 - Light Blue */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-300 flex items-center justify-center shadow-md relative">
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute left-4 top-4" />
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute right-4 top-4" />
                  <div className="w-1 h-1 rounded-full bg-gray-700 absolute left-1/2 -translate-x-1/2 bottom-3" />
                </div>
                <div className="w-10 h-16 bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg shadow-md transform -rotate-10 origin-top" />
              </div>

              {/* Character 3 - Brown (center, tallest) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center shadow-md relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-800 absolute left-5 top-5" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-800 absolute right-5 top-5" />
                  <div className="w-1 h-1 rounded-full bg-gray-800 absolute left-1/2 -translate-x-1/2 bottom-3" />
                </div>
                <div className="w-12 h-20 bg-gradient-to-b from-amber-700 to-amber-800 rounded-lg shadow-md origin-top" />
              </div>

              {/* Character 4 - Dark Purple */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center shadow-md relative">
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute left-4 top-4" />
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute right-4 top-4" />
                  <div className="w-1 h-1 rounded-full bg-gray-700 absolute left-1/2 -translate-x-1/2 bottom-3" />
                </div>
                <div className="w-10 h-16 bg-gradient-to-b from-purple-600 to-purple-700 rounded-lg shadow-md transform rotate-10 origin-top" />
              </div>

              {/* Character 5 - Pink/Light */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center shadow-md relative">
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute left-4 top-4" />
                  <div className="w-2 h-2 rounded-full bg-gray-700 absolute right-4 top-4" />
                  <div className="w-1 h-1 rounded-full bg-gray-700 absolute left-1/2 -translate-x-1/2 bottom-3" />
                </div>
                <div className="w-10 h-16 bg-gradient-to-b from-pink-400 to-pink-500 rounded-lg shadow-md transform rotate-20 origin-top" />
              </div>
            </div>

            {/* OK Button */}
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-16 py-3 text-base font-semibold shadow-lg shadow-blue-200/50 transition-all"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
