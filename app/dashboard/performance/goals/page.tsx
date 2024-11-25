'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BellIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// 더미 데이터
const goalsData = {
  summary: {
    totalGoals: 12,
    completed: 5,
    inProgress: 5,
    overdue: 2,
  },
  recentGoals: [
    {
      id: '1',
      title: '2024년 매출 500만 달러 달성',
      company: '테크스타트업 A',
      type: 'revenue',
      progress: 75,
      dueDate: '2024-12-31',
      priority: 'high',
      status: 'in_progress',
      assignee: '김유리',
    },
    {
      id: '2',
      title: '신규 사용자 1,000명 확보',
      company: '바이오스타트업 B',
      type: 'users',
      progress: 50,
      dueDate: '2024-06-30',
      priority: 'medium',
      status: 'in_progress',
      assignee: '이성과',
    },
    {
      id: '3',
      title: '특허 출원 5건 완료',
      company: '이커머스 C',
      type: 'project',
      progress: 100,
      dueDate: '2024-03-31',
      priority: 'low',
      status: 'completed',
      assignee: '박담당',
    },
  ],
};

type GoalStatus = 'all' | 'in_progress' | 'completed' | 'overdue';
type GoalType = 'all' | 'revenue' | 'users' | 'project';

export default function Goals() {
  const [statusFilter, setStatusFilter] = useState<GoalStatus>('all');
  const [typeFilter, setTypeFilter] = useState<GoalType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { portfolios, loading } = usePortfolio();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'overdue':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'low':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">목표 관리</h1>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/performance/notifications"
            className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            <BellIcon className="w-5 h-5 mr-2" />
            알림 관리
          </Link>
          <Link
            href="/dashboard/performance/goals/analysis"
            className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            성과 분석
          </Link>
          <Link
            href="/dashboard/performance/goals/new"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />새 목표 설정
          </Link>
        </div>
      </div>

      {/* 목표 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">전체 목표</h3>
            <FlagIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {goalsData.summary.totalGoals}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">완료</h3>
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">
            {goalsData.summary.completed}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">진행 중</h3>
            <ClockIcon className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {goalsData.summary.inProgress}
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">지연</h3>
            <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400">
            {goalsData.summary.overdue}
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="목표 또는 기업 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as GoalStatus)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 상태</option>
          <option value="in_progress">진행 중</option>
          <option value="completed">완료</option>
          <option value="overdue">지연</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as GoalType)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 유형</option>
          <option value="revenue">매출</option>
          <option value="users">사용자</option>
          <option value="project">프로젝트</option>
        </select>
      </div>

      {/* 목표 목록 */}
      <div className="space-y-4">
        {goalsData.recentGoals.map((goal) => (
          <Link
            key={goal.id}
            href={`/dashboard/performance/goals/${goal.id}`}
            className="block"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">
                      {goal.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                        goal.priority
                      )}`}
                    >
                      {goal.priority === 'high'
                        ? '높음'
                        : goal.priority === 'medium'
                        ? '중간'
                        : '낮음'}
                    </span>
                  </div>
                  <p className="text-white/60 mt-1">{goal.company}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(
                      goal.status
                    )}`}
                  >
                    <span>
                      {goal.status === 'completed'
                        ? '완료'
                        : goal.status === 'in_progress'
                        ? '진행 중'
                        : '지연'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* 진행률 바 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">진행률</span>
                    <span className="text-white">{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* 목표 세부 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-white/60">
                    <CalendarDaysIcon className="w-5 h-5 mr-2" />
                    <span>마감일: {goal.dueDate}</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <UserCircleIcon className="w-5 h-5 mr-2" />
                    <span>담당자: {goal.assignee}</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <BellIcon className="w-5 h-5 mr-2" />
                    <span>알림 켜짐</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
