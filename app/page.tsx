'use client';

import { useState } from 'react';
import { Search, User } from 'lucide-react';

import { TopNavigation } from '../components/top-navigation';
import { FilterSidebar } from '../components/filter-sidebar';
import { DocumentGrid } from '../components/document-grid';
import { DocumentReader } from '../components/document-reader';
import { CommunityView } from '../components/community-view';
import { UploadView } from '../components/upload-view';
import { ContactView } from '../components/contact-view';
import { ProfileView } from '../components/profile-view';

function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-stone-200 opacity-30 text-6xl">
          📦
        </div>
        <div className="absolute top-40 left-1/4 text-orange-200 opacity-20 text-5xl">
          ⚙️
        </div>
        <div className="absolute top-32 right-20 text-blue-200 opacity-25 text-4xl">
          🎯
        </div>
        <div className="absolute bottom-32 left-1/3 text-purple-200 opacity-20 text-5xl">
          ⚙️
        </div>
        <div className="absolute bottom-20 right-1/4 text-orange-200 opacity-25 text-4xl">
          🔧
        </div>
        <div className="absolute top-1/2 right-10 text-stone-200 opacity-30 text-6xl">
          📚
        </div>
      </div>

      <header className="relative z-10 border-b border-stone-200/30 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📚</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">
              Knowledge Hub
            </span>
          </div>

          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="text-teal-600 font-medium hover:text-teal-700"
            >
              Explore
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Community
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Upload
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white rounded-full px-4 py-2 flex items-center gap-2 w-40">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full text-sm"
                />
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full"
          style={{
            boxShadow:
              '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 60px rgba(251, 146, 60, 0.05)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-stone-50 to-orange-50 p-8 md:p-12 flex flex-col items-center justify-center min-h-80 md:min-h-auto">
              <div className="text-center space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-6xl">🚀</div>
                  <div className="text-5xl">👨‍💼</div>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <span className="text-4xl">📚</span>
                    <span className="text-4xl">⚙️</span>
                    <span className="text-4xl">🔧</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              {!isLogin ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Join Knowledge Hub
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-700 font-medium text-sm mb-2 block">
                        Choose your Nickname
                      </label>
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Enter your nickname"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
                      />
                    </div>
                  </div>
                  <button
                    onClick={onLoginSuccess}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </button>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Already have an account?{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-teal-600 font-semibold hover:text-teal-700"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Welcome Back
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-700 font-medium text-sm mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 font-medium text-sm mb-2 block">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
                      />
                    </div>
                  </div>
                  <button
                    onClick={onLoginSuccess}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </button>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Don&apos;t have an account?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-teal-600 font-semibold hover:text-teal-700"
                      >
                        Create one
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardScreen() {
  type ViewState =
    | 'explore'
    | 'reading'
    | 'community'
    | 'upload'
    | 'contact'
    | 'profile';

  const [currentView, setCurrentView] = useState<ViewState>('explore');
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDocumentClick = (title: string) => {
    setSelectedDocument(title);
    setCurrentView('reading');
  };

  const handleBackToExplore = () => {
    setCurrentView('explore');
    setSelectedDocument('');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'explore':
        return (
          <div className="flex">
            <FilterSidebar />
            <main className="flex-1 p-8">
              <h1 className="text-xl font-semibold text-foreground mb-6">
                6 Results for "Design Principles"
              </h1>
              <div
                onClick={() => handleDocumentClick('Mẫu Document')}
                className="p-4 bg-white rounded shadow cursor-pointer"
              >
                <DocumentGrid onDocumentClick={handleDocumentClick} />
              </div>
            </main>
          </div>
        );
      case 'reading':
        return (
          <DocumentReader
            onBack={handleBackToExplore}
            documentTitle={selectedDocument || 'Introduction to UI Design'}
          />
        );
      case 'community':
        return <CommunityView />;
      case 'upload':
        return (
          <UploadView
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
          />
        );
      case 'contact':
        return <ContactView />;
      case 'profile':
        return <ProfileView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopNavigation currentView={currentView} onNavigate={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <DashboardScreen />;
}
