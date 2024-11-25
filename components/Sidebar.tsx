'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: '대시보드', icon: HomeIcon, href: '/dashboard' },
  {
    name: '포트폴리오',
    icon: BuildingOfficeIcon,
    href: '/dashboard/portfolio',
  },
  {
    name: '문서 관리',
    icon: DocumentDuplicateIcon,
    href: '/dashboard/documents',
    subItems: [
      { name: '대시보드', href: '/dashboard/documents/dashboard' },
      { name: '문서 목록', href: '/dashboard/documents' },
      { name: '문서 요청', href: '/dashboard/documents/requests' },
      { name: '문서 업로드', href: '/dashboard/documents/upload' },
      { name: '알림/히스토리', href: '/dashboard/documents/notifications' },
    ],
  },
  {
    name: '성과 추적',
    icon: ChartBarIcon,
    href: '/dashboard/performance',
    subItems: [
      { name: '성과 현황', href: '/dashboard/performance' },
      { name: '목표 관리', href: '/dashboard/performance/goals' },
      { name: '성과 분석', href: '/dashboard/performance/analysis' },
      { name: '알림 센터', href: '/dashboard/performance/notifications' },
    ],
  },
];

const bottomMenuItems = [
  {
    name: '설정',
    icon: Cog6ToothIcon,
    href: '/dashboard/settings',
  },
  { name: '로그아웃', icon: ArrowLeftOnRectangleIcon, href: '/' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#0A0F1E] border-r border-white/[0.05] flex flex-col z-50 transition-all duration-300
        ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        lg:w-64`}
    >
      {/* Logo and Close Button */}
      <div className="h-16 flex items-center border-b border-white/[0.05] relative">
        {/* Close Button - Absolute Position */}
        <button
          onClick={onClose}
          className="absolute right-4 text-white/70 hover:text-white lg:hidden"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {/* Logo - Centered */}
        <div className="w-full flex justify-center">
          <Link href="/dashboard">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
              XVDR
            </span>
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            item.subItems?.some((subItem) => pathname === subItem.href);
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`group flex items-center px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 transition-colors" />
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && !hasSubItems && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
                )}
              </Link>

              {/* Sub Items */}
              {hasSubItems && (
                <div className="ml-9 mt-1 space-y-1">
                  {item.subItems.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={onClose}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                          isSubActive
                            ? 'text-white bg-white/10'
                            : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        {subItem.name}
                        {isSubActive && (
                          <div className="float-right w-1.5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="px-3 py-4 border-t border-white/[0.05] space-y-1">
        {bottomMenuItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== '/';

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3 transition-colors" />
              <span className="text-sm font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
              )}
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/[0.05]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-medium">
            VM
          </div>
          <div>
            <div className="text-sm font-medium text-white">VC Manager</div>
            <div className="text-xs text-white/60">manager@vc.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
