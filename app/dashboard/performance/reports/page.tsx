'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UsersIcon,
  DocumentChartBarIcon,
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
} from 'recharts';

// 더미 데이터
const reportData = {
  summary: {
    totalInvestment: '500억원',
    totalRevenue: '150억원',
    avgROI: '+28.5%',
    totalGrowth: '+32.1%',
  },
  startups: [
    {
      id: '1',
      name: '테크스타트업 A',
      metrics: {
        revenue: { value: '50억원', growth: '+32.5%' },
        users: { value: '12.5K', growth: '+28.3%' },
        roi: { value: '35.2%', growth: '+15.2%' },
      },
    },
    {
      id: '2',
      name: '바이오스타트업 B',
      metrics: {
        revenue: { value: '35억원', growth: '+18.7%' },
        users: { value: '8.2K', growth: '-5.2%' },
        roi: { value: '22.8%', growth: '+8.4%' },
      },
    },
    {
      id: '3',
      name: '이커머스 C',
      metrics: {
        revenue: { value: '65억원', growth: '+42.1%' },
        users: { value: '25.6K', growth: '+38.9%' },
        roi: { value: '41.5%', growth: '+22.3%' },
      },
    },
  ],
};

type Period = 'all' | 'year' | 'quarter' | 'month';
type Metric = 'all' | 'revenue' | 'users' | 'roi';

// 차트 데이터 추가
const chartData = {
  revenue: [
    { month: '2023-10', 테크스타트업A: 50, 바이오스타트업B: 35, 이커머스C: 65 },
    { month: '2023-11', 테크스타트업A: 65, 바이오스타트업B: 42, 이커머스C: 72 },
    { month: '2023-12', 테크스타트업A: 85, 바이오스타트업B: 48, 이커머스C: 78 },
    { month: '2024-01', 테크스타트업A: 95, 바이오스타트업B: 55, 이커머스C: 85 },
  ],
  users: [
    {
      month: '2023-10',
      테크스타트업A: 10000,
      바이오스타트업B: 8000,
      이커머스C: 20000,
    },
    {
      month: '2023-11',
      테크스타트업A: 12000,
      바이오스타트업B: 7500,
      이커머스C: 22000,
    },
    {
      month: '2023-12',
      테크스타트업A: 15000,
      바이오스타트업B: 8200,
      이커머스C: 24000,
    },
    {
      month: '2024-01',
      테크스타트업A: 18000,
      바이오스타트업B: 8000,
      이커머스C: 25600,
    },
  ],
  roi: [
    { month: '2023-10', 테크스타트업A: 25, 바이오스타트업B: 15, 이커머스C: 30 },
    { month: '2023-11', 테크스타트업A: 28, 바이오스타트업B: 18, 이커머스C: 35 },
    { month: '2023-12', 테크스타트업A: 32, 바이오스타트업B: 20, 이커머스C: 38 },
    { month: '2024-01', 테크스타트업A: 35, 바이오스타트업B: 22, 이커머스C: 41 },
  ],
};

const chartColors = {
  테크스타트업A: '#60A5FA',
  바이오스타트업B: '#34D399',
  이커머스C: '#F472B6',
};

export default function Reports() {
  const [selectedStartups, setSelectedStartups] = useState<string[]>([]);
  const [period, setPeriod] = useState<Period>('quarter');
  const [metric, setMetric] = useState<Metric>('all');
  const { portfolios, loading } = usePortfolio();

  const handleStartupToggle = (id: string) => {
    setSelectedStartups((prev) =>
      prev.includes(id)
        ? prev.filter((startupId) => startupId !== id)
        : [...prev, id]
    );
  };

  const handleDownload = (format: 'csv' | 'excel') => {
    // 실제 구현에서는 여기서 파일 다운로드 로직을 구현합니다
    alert(`${format.toUpperCase()} 파일 다운로드를 시작합니다.`);
  };

  // 차트 데이터 선택 함수
  const getChartData = () => {
    if (metric === 'all') return chartData.revenue;
    return chartData[metric];
  };

  // 차트 Y축 포맷 함수
  const formatYAxis = (value: number) => {
    if (metric === 'revenue') return `${value}억`;
    if (metric === 'users') return `${value / 1000}K`;
    return `${value}%`;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">성과 분석 보고서</h1>
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

      {/* 필터 섹션 */}
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
          value={metric}
          onChange={(e) => setMetric(e.target.value as Metric)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 지표</option>
          <option value="revenue">매출</option>
          <option value="users">사용자</option>
          <option value="roi">ROI</option>
        </select>
      </div>

      {/* 전체 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">총 투자금액</h3>
            <CurrencyDollarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {reportData.summary.totalInvestment}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">총 매출</h3>
            <ChartBarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {reportData.summary.totalRevenue}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">평균 ROI</h3>
            <ArrowTrendingUpIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {reportData.summary.avgROI}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">전체 성장률</h3>
            <DocumentChartBarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {reportData.summary.totalGrowth}
          </div>
        </div>
      </div>

      {/* 스타트업별 성과 비교 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          스타트업별 성과 비교
        </h2>
        <div className="space-y-6">
          {reportData.startups.map((startup) => (
            <div
              key={startup.id}
              className="p-4 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {startup.name}
                </h3>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedStartups.includes(startup.id)}
                    onChange={() => handleStartupToggle(startup.id)}
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                  />
                  <span className="text-white/60">비교에 포함</span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(startup.metrics).map(([key, data]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg"
                  >
                    <div>
                      <span className="text-white/60 capitalize">{key}</span>
                      <div className="text-white font-semibold">
                        {data.value}
                      </div>
                    </div>
                    <div
                      className={`flex items-center ${
                        data.growth.startsWith('+')
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                      <span>{data.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">성과 추이</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getChartData()}
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
                tickFormatter={formatYAxis}
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
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }} />
              {selectedStartups.length > 0
                ? selectedStartups.map((startupId) => {
                    const company = reportData.startups.find(
                      (s) => s.id === startupId
                    );
                    if (!company) return null;
                    return (
                      <Line
                        key={company.name}
                        type="monotone"
                        dataKey={company.name}
                        stroke={
                          chartColors[company.name as keyof typeof chartColors]
                        }
                        strokeWidth={2}
                        dot={{
                          fill: chartColors[
                            company.name as keyof typeof chartColors
                          ],
                          strokeWidth: 2,
                        }}
                        activeDot={{
                          r: 6,
                          fill: chartColors[
                            company.name as keyof typeof chartColors
                          ],
                        }}
                      />
                    );
                  })
                : Object.entries(chartColors).map(([name, color]) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={color}
                      strokeWidth={2}
                      dot={{ fill: color, strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: color }}
                    />
                  ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
