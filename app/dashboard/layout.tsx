'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/[0.02] border-b border-white/[0.05]">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-white/70 hover:text-white lg:hidden"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="스타트업, 문서, 이메일 검색..."
                  className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
