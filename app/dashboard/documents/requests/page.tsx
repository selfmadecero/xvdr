'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  BellIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// 더미 데이터 - 실제로는 API에서 가져올 데이터
const documentRequests = [
  {
    id: '1',
    title: 'Due Diligence 자료',
    company: '테크스타트업 A',
    status: 'pending',
    requestedAt: '2024-01-15T09:00:00Z',
    expectedDate: '2024-01-22T09:00:00Z',
    description: '최신 재무제표와 함께 업데이트된 사업계획서를 포함해 주세요.',
    priority: 'high',
    notifications: true,
  },
  {
    id: '2',
    title: '법률 검토 문서',
    company: '바이오스타트업 B',
    status: 'complete',
    requestedAt: '2024-01-10T09:00:00Z',
    expectedDate: '2024-01-17T09:00:00Z',
    description: '특허 관련 문서와 법률 검토 의견서를 제출해 주세요.',
    priority: 'medium',
    notifications: true,
  },
  {
    id: '3',
    title: '운영 보고서',
    company: '이커머스 C',
    status: 'overdue',
    requestedAt: '2024-01-05T09:00:00Z',
    expectedDate: '2024-01-12T09:00:00Z',
    description: '월간 운영 보고서와 주요 KPI 지표를 포함해 주세요.',
    priority: 'low',
    notifications: false,
  },
];

type RequestStatus = 'all' | 'pending' | 'complete' | 'overdue';

export default function DocumentRequests() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500/20 text-green-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'overdue':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5" />;
      case 'overdue':
        return <ExclamationCircleIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const filteredRequests = documentRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">문서 요청 현황</h1>
        <Link
          href="/dashboard/documents/requests/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          새 문서 요청
        </Link>
      </div>

      {/* 필터 및 검색 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="문서 또는 기업 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RequestStatus)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 상태</option>
          <option value="pending">진행중</option>
          <option value="complete">완료</option>
          <option value="overdue">지연</option>
        </select>
      </div>

      {/* 요청 목록 */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-white">
                    {request.title}
                  </h3>
                  {request.priority === 'high' && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                      긴급
                    </span>
                  )}
                </div>
                <p className="text-white/60 mt-1">{request.company}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(
                    request.status
                  )}`}
                >
                  {getStatusIcon(request.status)}
                  <span className="capitalize">
                    {request.status === 'overdue'
                      ? '지연'
                      : request.status === 'pending'
                      ? '진행중'
                      : '완료'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-white/60">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <span>
                  요청일: {new Date(request.requestedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-white/60">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>
                  예상 완료일:{' '}
                  {new Date(request.expectedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-white/60">
                <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                <span className="truncate">{request.description}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center border-t border-white/[0.05] pt-4">
              <div className="flex items-center">
                <BellIcon className="w-5 h-5 mr-2 text-white/60" />
                <span className="text-white/60 text-sm">
                  {request.notifications ? '알림 켜짐' : '알림 꺼짐'}
                </span>
              </div>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                자세히 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
