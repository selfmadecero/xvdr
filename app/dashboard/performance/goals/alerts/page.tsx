'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';

// 더미 데이터
const alertsData = {
  alerts: [
    {
      id: '1',
      title: '목표 달성 임박',
      message: '테크스타트업 A의 매출 목표 달성률이 90%에 도달했습니다.',
      type: 'achievement',
      priority: 'high',
      isRead: false,
      timestamp: '2024-01-15T09:00:00Z',
      company: '테크스타트업 A',
      goal: '매출 500만 달러',
      progress: 90,
    },
    {
      id: '2',
      title: '목표 미달성 위험',
      message:
        '바이오스타트업 B의 사용자 증가율이 목표치에 미달할 위험이 있습니다.',
      type: 'warning',
      priority: 'medium',
      isRead: true,
      timestamp: '2024-01-14T15:30:00Z',
      company: '바이오스타트업 B',
      goal: '사용자 1,000명',
      progress: 45,
    },
    {
      id: '3',
      title: '목표 달성 완료',
      message: '이커머스 C가 특허 출원 목표를 달성했습니다.',
      type: 'success',
      priority: 'low',
      isRead: false,
      timestamp: '2024-01-13T11:20:00Z',
      company: '이커머스 C',
      goal: '특허 출원 5건',
      progress: 100,
    },
  ],
  settings: {
    email: true,
    push: true,
    achievementThreshold: 90,
    warningThreshold: 50,
    notifyFrequency: 'daily',
  },
};

type AlertType = 'all' | 'achievement' | 'warning' | 'success';
type AlertPriority = 'all' | 'high' | 'medium' | 'low';

interface AlertSettingsModalProps {
  settings: typeof alertsData.settings;
  onClose: () => void;
  onSave: (newSettings: typeof alertsData.settings) => void;
}

function AlertSettingsModal({
  settings,
  onClose,
  onSave,
}: AlertSettingsModalProps) {
  const [newSettings, setNewSettings] = useState(settings);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">알림 설정</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white">이메일 알림</label>
              <input
                type="checkbox"
                checked={newSettings.email}
                onChange={(e) =>
                  setNewSettings({ ...newSettings, email: e.target.checked })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white">푸시 알림</label>
              <input
                type="checkbox"
                checked={newSettings.push}
                onChange={(e) =>
                  setNewSettings({ ...newSettings, push: e.target.checked })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">
                목표 달성 임박 기준
              </label>
              <input
                type="number"
                value={newSettings.achievementThreshold}
                onChange={(e) =>
                  setNewSettings({
                    ...newSettings,
                    achievementThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <div>
              <label className="block text-white mb-2">
                목표 미달성 경고 기준
              </label>
              <input
                type="number"
                value={newSettings.warningThreshold}
                onChange={(e) =>
                  setNewSettings({
                    ...newSettings,
                    warningThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <div>
              <label className="block text-white mb-2">알림 빈도</label>
              <select
                value={newSettings.notifyFrequency}
                onChange={(e) =>
                  setNewSettings({
                    ...newSettings,
                    notifyFrequency: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="realtime">실시간</option>
                <option value="daily">일간</option>
                <option value="weekly">주간</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                onSave(newSettings);
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoalAlerts() {
  const [typeFilter, setTypeFilter] = useState<AlertType>('all');
  const [priorityFilter, setPriorityFilter] = useState<AlertPriority>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(alertsData.settings);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <ChartBarIcon className="w-6 h-6 text-blue-400" />;
      case 'warning':
        return <ExclamationCircleIcon className="w-6 h-6 text-red-400" />;
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
      default:
        return <BellIcon className="w-6 h-6 text-blue-400" />;
    }
  };

  const filteredAlerts = alertsData.alerts.filter((alert) => {
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesPriority =
      priorityFilter === 'all' || alert.priority === priorityFilter;
    return matchesType && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">목표 알림</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
        >
          <Cog6ToothIcon className="w-5 h-5 mr-2" />
          알림 설정
        </button>
      </div>

      {/* 필터 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as AlertType)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 유형</option>
          <option value="achievement">목표 달성 임박</option>
          <option value="warning">목표 달성 위험</option>
          <option value="success">목표 달성 완료</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as AlertPriority)}
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
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 ${
              !alert.isRead ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {alert.title}
                    </h3>
                    <p className="text-white/60 mt-1">{alert.message}</p>
                  </div>
                  <span className="text-white/40 text-sm">
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-white/60">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                    <span>{alert.company}</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <FlagIcon className="w-5 h-5 mr-2" />
                    <span>{alert.goal}</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <ChartBarIcon className="w-5 h-5 mr-2" />
                    <span>진행률: {alert.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 설정 모달 */}
      {showSettings && (
        <AlertSettingsModal
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={setSettings}
        />
      )}
    </div>
  );
}
