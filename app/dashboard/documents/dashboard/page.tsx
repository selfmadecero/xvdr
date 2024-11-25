'use client';

import React from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  DocumentIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  BellIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DocumentDashboard() {
  const { portfolios, loading } = usePortfolio();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  // 문서 상태 통계 계산
  const documentStats = portfolios.reduce(
    (acc, company) => {
      Object.values(company.documentStatus).forEach((status) => {
        acc[status]++;
        acc.total++;
      });
      return acc;
    },
    { complete: 0, pending: 0, missing: 0, total: 0 }
  );

  // 미완료 문서 목록 생성
  const incompleteDocuments = portfolios.flatMap((company) =>
    Object.entries(company.documentStatus)
      .filter(([, status]) => status !== 'complete')
      .map(([type, status]) => ({
        company: company.name,
        type,
        status,
      }))
  );

  // 최근 알림 더미 데이터
  const recentNotifications = [
    {
      id: 1,
      message: '테크스타트업 A의 재무제표 검토가 완료되었습니다.',
      time: '10분 전',
      type: 'complete',
    },
    {
      id: 2,
      message: '바이오스타트업 B의 법률 문서가 업로드되었습니다.',
      time: '1시간 전',
      type: 'upload',
    },
    {
      id: 3,
      message: '이커머스 C의 운영 보고서가 누락되었습니다.',
      time: '2시간 전',
      type: 'missing',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">문서 관리 대시보드</h1>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/documents/requests/new"
            className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            <DocumentIcon className="w-5 h-5 mr-2" />
            문서 요청
          </Link>
          <Link
            href="/dashboard/documents/upload"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
            문서 업로드
          </Link>
        </div>
      </div>

      {/* 문서 상태 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: '전체 문서',
            value: documentStats.total,
            icon: DocumentIcon,
            color: 'blue',
          },
          {
            label: '완료',
            value: documentStats.complete,
            icon: CheckCircleIcon,
            color: 'green',
          },
          {
            label: '검토 중',
            value: documentStats.pending,
            icon: ClockIcon,
            color: 'yellow',
          },
          {
            label: '누락',
            value: documentStats.missing,
            icon: ExclamationCircleIcon,
            color: 'red',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
            </div>
            <h3 className="text-white/60">{stat.label}</h3>
            {stat.value > 0 && (
              <div className="mt-2 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${stat.color}-400 rounded-full`}
                  style={{
                    width: `${(stat.value / documentStats.total) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 미완료 문서 및 알림 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 미완료 문서 */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">미완료 문서</h2>
            <ChartBarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="space-y-4">
            {incompleteDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">{doc.company}</p>
                  <p className="text-white/60 text-sm">{doc.type}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    doc.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {doc.status === 'pending' ? '검토 중' : '누락'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 알림 */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">최근 알림</h2>
            <BellIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-4 p-4 bg-white/[0.02] rounded-lg"
              >
                <div
                  className={`p-2 rounded-lg ${
                    notification.type === 'complete'
                      ? 'bg-green-500/20 text-green-300'
                      : notification.type === 'upload'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {notification.type === 'complete' ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : notification.type === 'upload' ? (
                    <ArrowUpTrayIcon className="w-5 h-5" />
                  ) : (
                    <ExclamationCircleIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white">{notification.message}</p>
                  <p className="text-white/40 text-sm">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
