'use client';

import React, { useState } from 'react';
import {
  BellIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  StarIcon,
  PlusIcon,
  XMarkIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// 더미 데이터
const notifications = [
  {
    id: '1',
    title: '매출 목표 미달 알림',
    message: '테크스타트업 A의 3분기 매출이 목표치의 80%에 미달했습니다.',
    type: 'alert',
    priority: 'high',
    isRead: false,
    timestamp: '2024-01-15T09:00:00Z',
    company: '테크스타트업 A',
  },
  {
    id: '2',
    title: '목표 달성',
    message: '바이오스타트업 B가 사용자 증가 목표를 달성했습니다.',
    type: 'success',
    priority: 'medium',
    isRead: true,
    timestamp: '2024-01-14T15:30:00Z',
    company: '바이오스타트업 B',
  },
  {
    id: '3',
    title: '성과 점검 리마인더',
    message: '이커머스 C의 월간 성과 점검이 예정되어 있습니다.',
    type: 'reminder',
    priority: 'low',
    isRead: false,
    timestamp: '2024-01-13T11:20:00Z',
    company: '이커머스 C',
  },
];

const reminders = [
  {
    id: '1',
    title: '매출 목표 점검',
    dueDate: '2024-02-01T09:00:00Z',
    company: '테크스타트업 A',
    isCompleted: false,
  },
  {
    id: '2',
    title: '성과 보고서 작성',
    dueDate: '2024-01-25T09:00:00Z',
    company: '바이오스타트업 B',
    isCompleted: true,
  },
];

type NotificationType = 'all' | 'alert' | 'success' | 'reminder';
type NotificationPriority = 'all' | 'high' | 'medium' | 'low';

interface ReminderModalProps {
  onClose: () => void;
  onSave: (reminder: {
    title: string;
    dueDate: string;
    company: string;
  }) => void;
}

function ReminderModal({ onClose, onSave }: ReminderModalProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, dueDate, company });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">새 리마인더 추가</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">회사</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">마감일</label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PerformanceNotifications() {
  const [typeFilter, setTypeFilter] = useState<NotificationType>('all');
  const [priorityFilter, setPriorityFilter] =
    useState<NotificationPriority>('all');
  const [showReminderModal, setShowReminderModal] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <ExclamationCircleIcon className="w-6 h-6 text-red-400" />;
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
      case 'reminder':
        return <ClockIcon className="w-6 h-6 text-blue-400" />;
      default:
        return <BellIcon className="w-6 h-6 text-blue-400" />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    // 실제 구현에서는 여기서 알림 상태를 업데이트합니다
    console.log('Marking notification as read:', id);
  };

  const handleAddReminder = (reminder: {
    title: string;
    dueDate: string;
    company: string;
  }) => {
    // 실제 구현에서는 여기서 리마인더를 저장합니다
    console.log('Adding reminder:', reminder);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      typeFilter === 'all' || notification.type === typeFilter;
    const matchesPriority =
      priorityFilter === 'all' || notification.priority === priorityFilter;
    return matchesType && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">알림 및 리마인더</h1>
        <button
          onClick={() => setShowReminderModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          리마인더 추가
        </button>
      </div>

      {/* 필터 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as NotificationType)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 유형</option>
          <option value="alert">경고</option>
          <option value="success">성공</option>
          <option value="reminder">리마인더</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value as NotificationPriority)
          }
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 우선순위</option>
          <option value="high">높음</option>
          <option value="medium">중간</option>
          <option value="low">낮음</option>
        </select>
      </div>

      {/* 알림 목록 */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 ${
              !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">
                      {notification.title}
                    </h3>
                    {notification.priority === 'high' && (
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-white/60 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-white/40">
                    <span>{notification.company}</span>
                    <span>•</span>
                    <span>
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {!notification.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  읽음 표시
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 리마인더 섹션 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">리마인더</h2>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={reminder.isCompleted}
                  onChange={() => {}}
                  className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                />
                <div>
                  <h3 className="text-white font-medium">{reminder.title}</h3>
                  <p className="text-white/60 text-sm">{reminder.company}</p>
                </div>
              </div>
              <div className="text-white/40 text-sm">
                {new Date(reminder.dueDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 리마인더 추가 모달 */}
      {showReminderModal && (
        <ReminderModal
          onClose={() => setShowReminderModal(false)}
          onSave={handleAddReminder}
        />
      )}
    </div>
  );
}
