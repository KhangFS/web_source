"use client"

import { ArrowLeft, ArrowUp, Download, Bookmark, Printer, MoreHorizontal, FileText, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentReaderProps {
  onBack: () => void
  documentTitle?: string
}

export function DocumentReader({ onBack, documentTitle = "Introduction to UI Design" }: DocumentReaderProps) {
  return (
    <div className="flex-1 p-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Explore</span>
      </button>

      {/* Main content area */}
      <div className="flex gap-6">
        {/* Left Column - PDF Viewer */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 pr-3 border-r border-gray-300">
              <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-orange-400 rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-700 font-medium truncate max-w-[100px]">Introduc...</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <ArrowUp className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Bookmark className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Printer className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* PDF Content Area */}
          <div className="p-8 min-h-[600px] bg-white">
            <div className="max-w-xl">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Introduction<br />to UI Design
              </h1>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-72 flex flex-col gap-5">
          {/* Author Card with gradient background */}
          <div className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl shadow-lg p-1">
            <div className="bg-white/90 backdrop-blur rounded-xl p-5 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-purple-300/50" />
              <div className="absolute top-4 right-6 w-1 h-1 rounded-full bg-blue-300/50" />
              <div className="absolute bottom-8 right-4 w-1.5 h-1.5 rounded-full bg-pink-300/50" />
              
              {/* Avatar with gradient border */}
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-orange-300 via-pink-300 to-blue-300 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 via-pink-100 to-blue-200 flex items-center justify-center overflow-hidden">
                  {/* Stylized bird/feather logo */}
                  <svg viewBox="0 0 40 40" className="w-12 h-12">
                    <defs>
                      <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a5f" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M20 5 C15 10, 10 15, 8 25 C12 22, 16 20, 20 18 C24 20, 28 22, 32 25 C30 15, 25 10, 20 5 Z" 
                      fill="url(#featherGradient)"
                    />
                    <path 
                      d="M20 18 C20 22, 20 28, 20 35" 
                      stroke="#f97316" 
                      strokeWidth="2" 
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 text-lg mb-3">AlexReader</h3>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-2 text-sm font-medium">
                Follow
              </Button>
            </div>
          </div>

          {/* Document Details */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Document Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Title</p>
                  <p className="text-sm font-medium text-gray-800">UI Design</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">Sec</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Section</p>
                  <p className="text-sm font-medium text-gray-800">15</p>
                </div>
              </div>
              <div className="flex items-start gap-3 col-span-2">
                <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Folder className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-800">UX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Donut - Multi-colored */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex justify-center">
              <div className="relative w-36 h-36">
                {/* SVG Multi-colored Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="14"
                  />
                  {/* Multi-colored segments */}
                  {/* Purple segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="14"
                    strokeDasharray="40 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Blue segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="14"
                    strokeDasharray="35 251.2"
                    strokeDashoffset="-40"
                  />
                  {/* Teal segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="14"
                    strokeDasharray="30 251.2"
                    strokeDashoffset="-75"
                  />
                  {/* Yellow segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="14"
                    strokeDasharray="35 251.2"
                    strokeDashoffset="-105"
                  />
                  {/* Orange segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="14"
                    strokeDasharray="40 251.2"
                    strokeDashoffset="-140"
                  />
                  {/* Pink segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="14"
                    strokeDasharray="35 251.2"
                    strokeDashoffset="-180"
                  />
                  {/* Light pink/remaining */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#fce7f3"
                    strokeWidth="14"
                    strokeDasharray="36.2 251.2"
                    strokeDashoffset="-215"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-800">Page</span>
                  <span className="text-sm text-gray-600">15 of 50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Related Documents</h3>
            <div className="space-y-3">
              {[
                { title: "Introduction to UI Des...", color: "bg-orange-400" },
                { title: "Introduction to UI Des...", color: "bg-pink-500" },
                { title: "Introduction to UI Des...", color: "bg-teal-500" },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className={`w-6 h-7 ${doc.color} rounded-sm flex items-center justify-center`}>
                    <Folder className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{doc.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
