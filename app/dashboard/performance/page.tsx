'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BuildingOfficeIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// 더미 성과 데이터
const performanceData = {
  overview: {
    totalRevenue: '15.2M',
    revenueGrowth: '+23.5%',
    totalUsers: '25.3K',
    userGrowth: '+45.2%',
    activeStartups: 12,
    avgPerformance: '+28.7%',
  },
  startups: [
    {
      id: '1',
      name: '테크스타트업 A',
      industry: '핀테크',
      metrics: {
        revenue: { value: '5.2M', growth: '+32.5%', status: 'up' },
        users: { value: '12.5K', growth: '+28.3%', status: 'up' },
        contracts: { value: '45', growth: '+15.2%', status: 'up' },
      },
      kpiStatus: 85,
      lastUpdated: '2024-01-15T09:00:00Z',
    },
    {
      id: '2',
      name: '바이오스타트업 B',
      industry: '헬스케어',
      metrics: {
        revenue: { value: '3.8M', growth: '+18.7%', status: 'up' },
        users: { value: '8.2K', growth: '-5.2%', status: 'down' },
        contracts: { value: '28', growth: '+22.1%', status: 'up' },
      },
      kpiStatus: 72,
      lastUpdated: '2024-01-14T15:30:00Z',
    },
    {
      id: '3',
      name: '이커머스 C',
      industry: '커머스',
      metrics: {
        revenue: { value: '6.2M', growth: '-8.3%', status: 'down' },
        users: { value: '4.6K', growth: '+42.1%', status: 'up' },
        contracts: { value: '15', growth: '+5.8%', status: 'up' },
      },
      kpiStatus: 65,
      lastUpdated: '2024-01-13T11:20:00Z',
    },
  ],
};

type MetricFilter = 'all' | 'revenue' | 'users' | 'contracts';

export default function Performance() {
  const [metricFilter, setMetricFilter] = useState<MetricFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStartups = performanceData.startups.filter(
    (startup) =>
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">성과 추적</h1>
        <Link
          href="/dashboard/performance/reports"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          보고서 생성
        </Link>
      </div>

      {/* 전체 성과 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">매출 성과</h3>
            <CurrencyDollarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">총 매출</span>
              <span className="text-white font-semibold">
                {performanceData.overview.totalRevenue}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">성장률</span>
              <span className="text-green-400 font-semibold">
                {performanceData.overview.revenueGrowth}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">사용자 성과</h3>
            <UsersIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">총 사용자</span>
              <span className="text-white font-semibold">
                {performanceData.overview.totalUsers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">성장률</span>
              <span className="text-green-400 font-semibold">
                {performanceData.overview.userGrowth}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              포트폴리오 성과
            </h3>
            <BuildingOfficeIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">활성 스타트업</span>
              <span className="text-white font-semibold">
                {performanceData.overview.activeStartups}개
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">평균 성과</span>
              <span className="text-green-400 font-semibold">
                {performanceData.overview.avgPerformance}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 스타트업 성과 목록 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-white">스타트업 성과</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="스타트업 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <select
              value={metricFilter}
              onChange={(e) => setMetricFilter(e.target.value as MetricFilter)}
              className="px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="all">모든 지표</option>
              <option value="revenue">매출</option>
              <option value="users">사용자</option>
              <option value="contracts">계약</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredStartups.map((startup) => (
            <Link
              key={startup.id}
              href={`/dashboard/performance/${startup.id}`}
              className="block"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.04] transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {startup.name}
                    </h3>
                    <p className="text-white/60">{startup.industry}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DocumentChartBarIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-white">
                      KPI 달성률: {startup.kpiStatus}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(startup.metrics).map(([key, metric]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg"
                    >
                      <div>
                        <span className="text-white/60 capitalize">{key}</span>
                        <div className="text-white font-semibold">
                          {metric.value}
                        </div>
                      </div>
                      <div
                        className={`flex items-center ${
                          metric.status === 'up'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {metric.status === 'up' ? (
                          <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                        )}
                        <span>{metric.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center text-white/40 text-sm">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  <span>
                    마지막 업데이트:{' '}
                    {new Date(startup.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
