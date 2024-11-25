'use client';

import React from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentIcon,
  EnvelopeIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { portfolios, loading } = usePortfolio();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  // 포트폴리오 통계 계산
  const stats = {
    totalInvested: '₩15.2B',
    activeStartups: portfolios.length,
    avgPerformance: '+23.5%',
    docsPending: portfolios.filter((p) =>
      Object.values(p.documentStatus).some((status) => status === 'pending')
    ).length,
    docsNeeded: portfolios.filter((p) =>
      Object.values(p.documentStatus).some((status) => status === 'missing')
    ).length,
    emailsSent: 45,
  };

  // 최근 활동 더미 데이터
  const recentActivities = [
    {
      type: 'document',
      message: '테크스타트업 A가 재무제표를 업로드했습니다.',
      time: '10분 전',
    },
    {
      type: 'email',
      message: '바이오스타트업 B에 문서 요청 이메일이 발송되었습니다.',
      time: '1시간 전',
    },
    {
      type: 'performance',
      message: '이커머스 C의 월간 성과가 15% 증가했습니다.',
      time: '2시간 전',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* 포트폴리오 현황 요약 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-white">
              포트폴리오 현황
            </h3>
            <BuildingOfficeIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">총 투자액</span>
              <span className="text-white font-semibold">
                {stats.totalInvested}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">포트폴리오 기업 수</span>
              <span className="text-white font-semibold">
                {stats.activeStartups}개
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">평균 성과</span>
              <span className="text-green-400 font-semibold">
                {stats.avgPerformance}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-white">
              문서 상태
            </h3>
            <DocumentIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">대기 중</span>
              <span className="text-yellow-400 font-semibold">
                {stats.docsPending}개
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">필요한 문서</span>
              <span className="text-red-400 font-semibold">
                {stats.docsNeeded}개
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">발송된 이메일</span>
              <span className="text-white font-semibold">
                {stats.emailsSent}개
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-white">
              실시간 알림
            </h3>
            <ClockIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
          </div>
          <div className="space-y-3">
            {recentActivities.slice(0, 3).map((activity, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-white/90">{activity.message}</p>
                  <p className="text-xs text-white/60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 포트폴리오 목록 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
          포트폴리오 스타트업
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 xl:grid-cols-2">
          {portfolios.map((company) => (
            <div
              key={company.id}
              className="border border-white/[0.05] rounded-xl p-3 md:p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {company.name}
                  </h3>
                  <p className="text-sm md:text-base text-white/60">
                    {company.industry} · {company.stage}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {Object.entries(company.documentStatus).map(
                    ([key, status]) => (
                      <div
                        key={key}
                        className={`flex items-center px-2 py-1 rounded text-sm ${
                          status === 'complete'
                            ? 'bg-green-500/20 text-green-300'
                            : status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {status === 'complete' ? (
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-xs capitalize">{key}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                <span className="text-white/60 text-sm mb-2 sm:mb-0">
                  마지막 업데이트:{' '}
                  {new Date(company.lastUpdated).toLocaleDateString()}
                </span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
