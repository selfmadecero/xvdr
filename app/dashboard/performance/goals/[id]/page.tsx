'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  CalendarDaysIcon,
  UserCircleIcon,
  FlagIcon,
  BellIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

// 더미 데이터
const goalDetails = {
  id: '1',
  title: '2024년 매출 500만 달러 달성',
  company: '테크스타트업 A',
  type: 'revenue',
  description: '2024년 연간 매출 목표 500만 달러 달성을 위한 트래킹',
  dueDate: '2024-12-31',
  target: '500만 달러',
  currentValue: '375만 달러',
  progress: 75,
  priority: 'high',
  assignee: '김유리',
  status: 'in_progress',
  notifications: true,
  history: [
    {
      date: '2024-01-15',
      value: '375만 달러',
      change: '+25만 달러',
      note: '신규 고객사 계약 체결로 인한 매출 증가',
    },
    {
      date: '2024-01-01',
      value: '350만 달러',
      change: '+50만 달러',
      note: '연말 프로모션 성공으로 인한 매출 급증',
    },
    {
      date: '2023-12-15',
      value: '300만 달러',
      change: '+30만 달러',
      note: '주요 고객사 갱신 계약 체결',
    },
  ],
  milestones: [
    {
      title: '1분기 목표',
      target: '200만 달러',
      achieved: '175만 달러',
      dueDate: '2024-03-31',
      status: 'complete',
    },
    {
      title: '2분기 목표',
      target: '300만 달러',
      achieved: '275만 달러',
      dueDate: '2024-06-30',
      status: 'in_progress',
    },
    {
      title: '3분기 목표',
      target: '400만 달러',
      dueDate: '2024-09-30',
      status: 'pending',
    },
    {
      title: '4분기 목표',
      target: '500만 달러',
      dueDate: '2024-12-31',
      status: 'pending',
    },
  ],
  comments: [
    {
      id: '1',
      user: '김유리',
      content: '1분기 목표 초과 달성했습니다. 2분기도 순조롭게 진행 중입니다.',
      timestamp: '2024-01-15T09:00:00Z',
    },
    {
      id: '2',
      user: '이성과',
      content: '신규 고객사 유치로 인한 매출 증가가 긍정적입니다.',
      timestamp: '2024-01-14T15:30:00Z',
    },
  ],
};

export default function GoalDetail() {
  const params = useParams();
  const router = useRouter();
  const [newComment, setNewComment] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500/20 text-green-300';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'pending':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 여기서 댓글을 저장합니다
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {goalDetails.title}
            </h1>
            <p className="text-white/60 mt-1">{goalDetails.company}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(
                goalDetails.status
              )}`}
            >
              <span>
                {goalDetails.status === 'complete'
                  ? '완료'
                  : goalDetails.status === 'in_progress'
                  ? '진행 중'
                  : '대기 중'}
              </span>
            </div>
            <button
              onClick={() =>
                router.push(`/dashboard/performance/goals/${params.id}/edit`)
              }
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              수정
            </button>
          </div>
        </div>
      </div>

      {/* 목표 상세 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 기본 정보 */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">기본 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center text-white/60">
              <FlagIcon className="w-5 h-5 mr-2" />
              <span>목표: {goalDetails.target}</span>
            </div>
            <div className="flex items-center text-white/60">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              <span>마감일: {goalDetails.dueDate}</span>
            </div>
            <div className="flex items-center text-white/60">
              <UserCircleIcon className="w-5 h-5 mr-2" />
              <span>담당자: {goalDetails.assignee}</span>
            </div>
            <div className="flex items-center text-white/60">
              <BellIcon className="w-5 h-5 mr-2" />
              <span>알림: {goalDetails.notifications ? '켜짐' : '꺼짐'}</span>
            </div>
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">진행 상황</h2>
          <div className="space-y-6">
            {/* 진행률 바 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">전체 진행률</span>
                <span className="text-white">{goalDetails.progress}%</span>
              </div>
              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${goalDetails.progress}%` }}
                />
              </div>
            </div>

            {/* 현재 값 */}
            <div className="p-4 bg-white/[0.02] rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-white/60">현재</span>
                <span className="text-2xl font-bold text-white">
                  {goalDetails.currentValue}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 마일스톤 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">마일스톤</h2>
        <div className="space-y-4">
          {goalDetails.milestones.map((milestone, index) => (
            <div key={index} className="p-4 bg-white/[0.02] rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-white/60">목표: {milestone.target}</p>
                  {milestone.achieved && (
                    <p className="text-white/60">달성: {milestone.achieved}</p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-white/60">
                    <CalendarDaysIcon className="w-5 h-5 inline mr-2" />
                    {milestone.dueDate}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      milestone.status
                    )}`}
                  >
                    {milestone.status === 'complete'
                      ? '완료'
                      : milestone.status === 'in_progress'
                      ? '진행 중'
                      : '예정'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 히스토리 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">진행 히스토리</h2>
        <div className="space-y-4">
          {goalDetails.history.map((record, index) => (
            <div key={index} className="p-4 bg-white/[0.02] rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white">{record.value}</span>
                    <span
                      className={`${
                        record.change.startsWith('+')
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {record.change}
                    </span>
                  </div>
                  <p className="text-white/60 mt-1">{record.note}</p>
                </div>
                <div className="text-white/40">{record.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">댓글</h2>
        <form onSubmit={handleAddComment} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              작성
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {goalDetails.comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-white/[0.02] rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-white">
                    {comment.user}
                  </span>
                  <p className="text-white/60 mt-1">{comment.content}</p>
                </div>
                <span className="text-white/40 text-sm">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
