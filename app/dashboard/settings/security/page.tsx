'use client';

import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  MapPinIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// 더미 데이터
const securityData = {
  twoFactorAuth: {
    enabled: true,
    method: 'app', // 'app' | 'sms' | 'email'
    lastUpdated: '2024-01-15T09:00:00Z',
  },
  loginHistory: [
    {
      id: '1',
      device: 'MacBook Pro',
      location: '서울, 대한민국',
      ip: '123.456.789.012',
      timestamp: '2024-01-15T09:00:00Z',
      status: 'success',
    },
    {
      id: '2',
      device: 'iPhone 14',
      location: '부산, 대한민국',
      ip: '123.456.789.013',
      timestamp: '2024-01-14T15:30:00Z',
      status: 'success',
    },
    {
      id: '3',
      device: 'Unknown Device',
      location: '도쿄, 일본',
      ip: '123.456.789.014',
      timestamp: '2024-01-14T10:15:00Z',
      status: 'failed',
    },
  ],
  securitySettings: {
    requirePasswordChange: 90, // 일
    sessionTimeout: 30, // 분
    allowedIpRanges: ['123.456.789.*'],
    failedLoginAttempts: 5,
  },
};

interface ChangePasswordModalProps {
  onClose: () => void;
  onSave: (oldPassword: string, newPassword: string) => void;
}

function ChangePasswordModal({ onClose, onSave }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    onSave(oldPassword, newPassword);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">비밀번호 변경</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">현재 비밀번호</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end space-x-3">
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
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Security() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [settings, setSettings] = useState(securityData.securitySettings);
  const [twoFactorAuth, setTwoFactorAuth] = useState(
    securityData.twoFactorAuth
  );

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    // 실제 구현에서는 여기서 비밀번호를 변경합니다
    console.log('비밀번호 변경:', { oldPassword, newPassword });
  };

  const handleSettingsChange = (newSettings: typeof settings) => {
    // 실제 구현에서는 여기서 설정을 저장합니다
    setSettings(newSettings);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">보안 설정</h1>
      </div>

      {/* 2단계 인증 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">2단계 인증</h2>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorAuth.enabled}
              onChange={(e) =>
                setTwoFactorAuth({
                  ...twoFactorAuth,
                  enabled: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
        {twoFactorAuth.enabled && (
          <div className="space-y-4 border-t border-white/[0.05] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-white">인증 방식</span>
              <select
                value={twoFactorAuth.method}
                onChange={(e) =>
                  setTwoFactorAuth({
                    ...twoFactorAuth,
                    method: e.target.value as 'app' | 'sms' | 'email',
                  })
                }
                className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="app">인증 앱</option>
                <option value="sms">SMS</option>
                <option value="email">이메일</option>
              </select>
            </div>
            <p className="text-white/60 text-sm">
              마지막 업데이트:{' '}
              {new Date(twoFactorAuth.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* 비밀번호 설정 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <KeyIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">비밀번호</h2>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            비밀번호 변경
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white">비밀번호 변경 주기</span>
            <select
              value={settings.requirePasswordChange}
              onChange={(e) =>
                handleSettingsChange({
                  ...settings,
                  requirePasswordChange: Number(e.target.value),
                })
              }
              className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="30">30일</option>
              <option value="60">60일</option>
              <option value="90">90일</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">로그인 시도 제한</span>
            <select
              value={settings.failedLoginAttempts}
              onChange={(e) =>
                handleSettingsChange({
                  ...settings,
                  failedLoginAttempts: Number(e.target.value),
                })
              }
              className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="3">3회</option>
              <option value="5">5회</option>
              <option value="10">10회</option>
            </select>
          </div>
        </div>
      </div>

      {/* 세션 설정 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <ClockIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">세션 설정</h2>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">자동 로그아웃 시간</span>
          <select
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleSettingsChange({
                ...settings,
                sessionTimeout: Number(e.target.value),
              })
            }
            className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="15">15분</option>
            <option value="30">30분</option>
            <option value="60">60분</option>
          </select>
        </div>
      </div>

      {/* 로그인 기록 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <ComputerDesktopIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">로그인 기록</h2>
        </div>
        <div className="space-y-4">
          {securityData.loginHistory.map((login) => (
            <div
              key={login.id}
              className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{login.device}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      login.status === 'success'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {login.status === 'success' ? '성공' : '실패'}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-white/60 text-sm">
                  <span className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {login.location}
                  </span>
                  <span>{login.ip}</span>
                </div>
              </div>
              <span className="text-white/40 text-sm">
                {new Date(login.timestamp).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSave={handlePasswordChange}
        />
      )}
    </div>
  );
}
