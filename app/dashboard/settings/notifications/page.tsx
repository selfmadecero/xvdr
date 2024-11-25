'use client';

import React, { useState } from 'react';
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface NotificationSettings {
  email: {
    enabled: boolean;
    types: {
      performance: boolean;
      documents: boolean;
      security: boolean;
      system: boolean;
    };
  };
  push: {
    enabled: boolean;
    types: {
      performance: boolean;
      documents: boolean;
      security: boolean;
      system: boolean;
    };
  };
  sms: {
    enabled: boolean;
    types: {
      security: boolean;
      urgent: boolean;
    };
  };
  frequency: 'realtime' | 'daily' | 'weekly';
  summary: {
    enabled: boolean;
    time: string;
  };
}

// 더미 데이터
const initialSettings: NotificationSettings = {
  email: {
    enabled: true,
    types: {
      performance: true,
      documents: true,
      security: true,
      system: false,
    },
  },
  push: {
    enabled: true,
    types: {
      performance: true,
      documents: true,
      security: true,
      system: true,
    },
  },
  sms: {
    enabled: false,
    types: {
      security: true,
      urgent: true,
    },
  },
  frequency: 'realtime',
  summary: {
    enabled: true,
    time: '09:00',
  },
};

export default function NotificationSettings() {
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // 실제 구현에서는 여기서 설정을 저장합니다
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">알림 설정</h1>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {saved ? (
            <>
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              저장됨
            </>
          ) : (
            '저장'
          )}
        </button>
      </div>

      {/* 이메일 알림 설정 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <EnvelopeIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">이메일 알림</h2>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.email.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: { ...settings.email, enabled: e.target.checked },
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
        {settings.email.enabled && (
          <div className="space-y-4 border-t border-white/[0.05] pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings.email.types).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl"
                >
                  <span className="text-white capitalize">{key} 알림</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: {
                          ...settings.email,
                          types: {
                            ...settings.email.types,
                            [key]: e.target.checked,
                          },
                        },
                      })
                    }
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 푸시 알림 설정 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BellIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">푸시 알림</h2>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.push.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  push: { ...settings.push, enabled: e.target.checked },
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
        {settings.push.enabled && (
          <div className="space-y-4 border-t border-white/[0.05] pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings.push.types).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl"
                >
                  <span className="text-white capitalize">{key} 알림</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        push: {
                          ...settings.push,
                          types: {
                            ...settings.push.types,
                            [key]: e.target.checked,
                          },
                        },
                      })
                    }
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SMS 알림 설정 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <DevicePhoneMobileIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">SMS 알림</h2>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.sms.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  sms: { ...settings.sms, enabled: e.target.checked },
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
        {settings.sms.enabled && (
          <div className="space-y-4 border-t border-white/[0.05] pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings.sms.types).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl"
                >
                  <span className="text-white capitalize">{key} 알림</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sms: {
                          ...settings.sms,
                          types: {
                            ...settings.sms.types,
                            [key]: e.target.checked,
                          },
                        },
                      })
                    }
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 알림 빈도 설정 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <ClockIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">알림 빈도</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2">알림 수신 빈도</label>
            <select
              value={settings.frequency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  frequency: e.target
                    .value as NotificationSettings['frequency'],
                })
              }
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="realtime">실시간</option>
              <option value="daily">매일</option>
              <option value="weekly">매주</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium mb-1">일간 요약</h3>
              <p className="text-white/60 text-sm">
                매일 지정된 시간에 알림 요약을 받습니다
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="time"
                value={settings.summary.time}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    summary: { ...settings.summary, time: e.target.value },
                  })
                }
                className="px-3 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.summary.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      summary: {
                        ...settings.summary,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
