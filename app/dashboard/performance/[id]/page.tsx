'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UsersIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// 더미 데이터
const companyDetails = {
  id: '1',
  name: '테크스타트업 A',
  industry: '핀테크',
  foundedDate: '2022-01-01',
  totalInvestment: '500만 달러',
  stage: 'Series A',
  location: '서울시 강남구',
  kpis: {
    revenue: {
      current: 150000000,
      target: 200000000,
      growth: 23.5,
      history: [
        { date: '2023-10', value: 100000000 },
        { date: '2023-11', value: 120000000 },
        { date: '2023-12', value: 150000000 },
      ],
      prediction: {
        value: 180000000,
        confidence: 80,
      },
    },
    users: {
      current: 15000,
      target: 20000,
      growth: 45.2,
      history: [
        { date: '2023-10', value: 8000 },
        { date: '2023-11', value: 12000 },
        { date: '2023-12', value: 15000 },
      ],
      prediction: {
        value: 18000,
        confidence: 85,
      },
    },
    contracts: {
      current: 120,
      target: 150,
      growth: 30.0,
      history: [
        { date: '2023-10', value: 80 },
        { date: '2023-11', value: 100 },
        { date: '2023-12', value: 120 },
      ],
      prediction: {
        value: 140,
        confidence: 75,
      },
    },
  },
  analysis: {
    revenue:
      '매출은 신규 제품 출시와 마케팅 캠페인의 성공으로 꾸준히 증가하고 있습니다.',
    users: '사용자 수는 바이럴 마케팅과 제품 개선으로 급격히 증가했습니다.',
    contracts:
      '기업 고객과의 계약이 안정적으로 증가하고 있으며, 특히 대기업과의 계약이 주요 성장 동력입니다.',
  },
};

export default function PerformanceDetail() {
  const params = useParams();

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {companyDetails.name}
            </h1>
            <div className="flex items-center space-x-4 text-white/60">
              <span>{companyDetails.industry}</span>
              <span>•</span>
              <span>{companyDetails.stage}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg">
            <CurrencyDollarIcon className="w-5 h-5" />
            <span>투자금액: {companyDetails.totalInvestment}</span>
          </div>
        </div>
      </div>

      {/* 기업 정보 및 KPI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 기업 정보 */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">기업 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center text-white/60">
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              <span>
                설립일:{' '}
                {new Date(companyDetails.foundedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-white/60">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              <span>투자 단계: {companyDetails.stage}</span>
            </div>
            <div className="flex items-center text-white/60">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              <span>위치: {companyDetails.location}</span>
            </div>
          </div>
        </div>

        {/* KPI 목록 */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(companyDetails.kpis).map(([key, data]) => (
            <div
              key={key}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white capitalize">
                  {key}
                </h3>
                <ChartBarIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <h4 className="text-white/60 mb-2">현재</h4>
                  <div className="text-2xl font-bold text-white">
                    {data.current.toLocaleString()}
                  </div>
                  <div
                    className={`flex items-center ${
                      data.growth > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {data.growth > 0 ? (
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                    )}
                    <span>{Math.abs(data.growth)}%</span>
                  </div>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <h4 className="text-white/60 mb-2">목표</h4>
                  <div className="text-2xl font-bold text-white">
                    {data.target.toLocaleString()}
                  </div>
                  <div className="text-white/60">
                    달성률: {((data.current / data.target) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <h4 className="text-white/60 mb-2">예측</h4>
                  <div className="text-2xl font-bold text-white">
                    {data.prediction.value.toLocaleString()}
                  </div>
                  <div className="text-blue-400">
                    신뢰도: {data.prediction.confidence}%
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white/[0.02] rounded-xl">
                <h4 className="text-white/60 mb-2">분석</h4>
                <p className="text-white/80">
                  {
                    companyDetails.analysis[
                      key as keyof typeof companyDetails.analysis
                    ]
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 성과 히스토리 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">성과 히스토리</h2>
        <div className="space-y-6">
          {Object.entries(companyDetails.kpis).map(([key, data]) => (
            <div key={key} className="p-4 bg-white/[0.02] rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 capitalize">
                {key} 추이
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.history}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="date"
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
                      itemStyle={{ color: '#60A5FA' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#60A5FA"
                      strokeWidth={2}
                      dot={{ fill: '#60A5FA', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#60A5FA' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-white/[0.02] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">예측 (다음 분기)</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">신뢰도:</span>
                    <span className="text-white">
                      {data.prediction.confidence}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {data.prediction.value.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
