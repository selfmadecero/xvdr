'use client';

import React, { useState } from 'react';
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

// 더미 데이터
const notifications = [
  {
    id: '1',
    title: '문서 검토 완료',
    message: '계약서_ABC 회사의 검토가 완료되었습니다.',
    timestamp: '2024-01-15T09:00:00Z',
    type: 'review',
    isRead: false,
    company: '테크스타트업 A',
    documentType: '계약서',
  },
  {
    id: '2',
    title: '문서 업로드 완료',
    message: 'Due Diligence 자료가 업로드되었습니다.',
    timestamp: '2024-01-14T15:30:00Z',
    type: 'upload',
    isRead: true,
    company: '바이오스타트업 B',
    documentType: 'Due Diligence',
  },
  {
    id: '3',
    title: '문서 요청 발송',
    message: '운영 보고서 요청 이메일이 발송되었습니다.',
    timestamp: '2024-01-13T11:20:00Z',
    type: 'request',
    isRead: true,
    company: '이커머스 C',
    documentType: '운영 보고서',
  },
];

type NotificationType = 'all' | 'review' | 'upload' | 'request';
type ReadStatus = 'all' | 'read' | 'unread';

export default function Notifications() {
  const [typeFilter, setTypeFilter] = useState<NotificationType>('all');
  const [readFilter, setReadFilter] = useState<ReadStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === 'all' || notification.type === typeFilter;
    const matchesRead =
      readFilter === 'all' ||
      (readFilter === 'read' ? notification.isRead : !notification.isRead);
    return matchesSearch && matchesType && matchesRead;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'upload':
        return <ClockIcon className="w-5 h-5" />;
      case 'request':
        return <EnvelopeIcon className="w-5 h-5" />;
      default:
        return <BellIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">알림 및 히스토리</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
        >
          <Cog6ToothIcon className="w-5 h-5 mr-2" />
          알림 설정
        </button>
      </div>

      {/* 필터 및 검색 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="알림 또는 기업 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as NotificationType)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 유형</option>
          <option value="review">검토</option>
          <option value="upload">업로드</option>
          <option value="request">요청</option>
        </select>
        <select
          value={readFilter}
          onChange={(e) => setReadFilter(e.target.value as ReadStatus)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 상태</option>
          <option value="read">읽음</option>
          <option value="unread">읽지 않음</option>
        </select>
      </div>

      {/* 알림 목록 */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] transition-all ${
              !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    notification.type === 'review'
                      ? 'bg-green-500/20 text-green-300'
                      : notification.type === 'upload'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {getTypeIcon(notification.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {notification.title}
                  </h3>
                  <p className="text-white/60 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-white/40">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{notification.company}</span>
                  </div>
                </div>
              </div>
              {!notification.isRead && (
                <div className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                  새로운 알림
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 알림 설정 모달 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">알림 설정</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">이메일 알림</label>
                <input
                  type="email"
                  placeholder="이메일 주소 입력"
                  className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-white mb-2">알림 유형</label>
                {['문서 검토', '문서 업로드', '문서 요청'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                    />
                    <span className="text-white/80">{type}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                설정 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
