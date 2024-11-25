'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  FlagIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

// 더미 데이터
const analysisData = {
  summary: {
    totalGoals: 25,
    achievedGoals: 15,
    inProgressGoals: 8,
    missedGoals: 2,
    avgAchievementRate: 78.5,
  },
  companies: [
    {
      id: '1',
      name: '테크스타트업 A',
      goals: {
        completed: 5,
        inProgress: 3,
        missed: 0,
        achievementRate: 85.2,
      },
      performance: [
        { month: '2023-10', actual: 80, target: 100 },
        { month: '2023-11', actual: 90, target: 100 },
        { month: '2023-12', actual: 95, target: 100 },
        { month: '2024-01', actual: 110, target: 100 },
      ],
    },
    {
      id: '2',
      name: '바이오스타트업 B',
      goals: {
        completed: 4,
        inProgress: 2,
        missed: 1,
        achievementRate: 72.5,
      },
      performance: [
        { month: '2023-10', actual: 70, target: 100 },
        { month: '2023-11', actual: 75, target: 100 },
        { month: '2023-12', actual: 85, target: 100 },
        { month: '2024-01', actual: 90, target: 100 },
      ],
    },
    {
      id: '3',
      name: '이커머스 C',
      goals: {
        completed: 6,
        inProgress: 3,
        missed: 1,
        achievementRate: 82.1,
      },
      performance: [
        { month: '2023-10', actual: 85, target: 100 },
        { month: '2023-11', actual: 88, target: 100 },
        { month: '2023-12', actual: 92, target: 100 },
        { month: '2024-01', actual: 95, target: 100 },
      ],
    },
  ],
  monthlyAchievement: [
    { month: '2023-10', rate: 75 },
    { month: '2023-11', rate: 80 },
    { month: '2023-12', rate: 85 },
    { month: '2024-01', rate: 90 },
  ],
};

type Period = 'all' | 'year' | 'quarter' | 'month';

export default function GoalsAnalysis() {
  const [period, setPeriod] = useState<Period>('quarter');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const { portfolios, loading } = usePortfolio();

  const handleDownload = (format: 'csv' | 'excel') => {
    // 실제 구현에서는 여기서 파일 다운로드 로직을 구현합니다
    alert(`${format.toUpperCase()} 파일 다운로드를 시작합니다.`);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">목표 성과 분석</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => handleDownload('csv')}
            className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            CSV 다운로드
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            엑셀 다운로드
          </button>
        </div>
      </div>

      {/* 필터 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">전체 기간</option>
          <option value="year">연간</option>
          <option value="quarter">분기별</option>
          <option value="month">월간</option>
        </select>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">전체 기업</option>
          {analysisData.companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* 전체 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">전체 목표</h3>
            <FlagIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {analysisData.summary.totalGoals}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">달성 완료</h3>
            <ChartBarIcon className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">
            {analysisData.summary.achievedGoals}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">진행 중</h3>
            <DocumentChartBarIcon className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {analysisData.summary.inProgressGoals}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">미달성</h3>
            <ArrowTrendingDownIcon className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400">
            {analysisData.summary.missedGoals}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">평균 달성률</h3>
            <ArrowTrendingUpIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400">
            {analysisData.summary.avgAchievementRate}%
          </div>
        </div>
      </div>

      {/* 월별 달성률 차트 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">월별 달성률 추이</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analysisData.monthlyAchievement}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10,15,30,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ fill: '#60A5FA', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#60A5FA' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 기업별 성과 비교 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">기업별 성과 비교</h2>
        <div className="space-y-6">
          {analysisData.companies.map((company) => (
            <div
              key={company.id}
              className="p-4 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {company.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-green-400">
                      완료: {company.goals.completed}
                    </span>
                    <span className="text-yellow-400">
                      진행 중: {company.goals.inProgress}
                    </span>
                    <span className="text-red-400">
                      미달성: {company.goals.missed}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white/60">달성률:</span>
                  <span className="text-2xl font-bold text-blue-400">
                    {company.goals.achievementRate}%
                  </span>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={company.performance}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(10,15,30,0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                      itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
                    />
                    <Bar dataKey="actual" fill="#60A5FA" name="실제" />
                    <Bar dataKey="target" fill="#F87171" name="목표" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
