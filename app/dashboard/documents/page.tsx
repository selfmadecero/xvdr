'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  DocumentIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

type DocumentStatus = 'all' | 'complete' | 'pending' | 'missing';
type DocumentType = 'all' | 'contract' | 'financial' | 'legal' | 'operational';

export default function Documents() {
  const { portfolios, loading } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DocumentStatus>('all');
  const [typeFilter, setTypeFilter] = useState<DocumentType>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // 모든 문서 목록 생성
  const allDocuments = portfolios.flatMap((company) =>
    Object.entries(company.documentStatus).map(([type, status]) => ({
      id: `${company.id}-${type}`,
      companyName: company.name,
      type,
      status,
      lastUpdated: company.lastUpdated,
    }))
  );

  // 필터링된 문서 목록
  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesSearch =
      doc.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500/20 text-green-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'missing':
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
      case 'missing':
        return <ExclamationCircleIcon className="w-5 h-5" />;
      default:
        return <DocumentIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">문서 관리</h1>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/documents/requests"
            className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            <EnvelopeIcon className="w-5 h-5 mr-2" />
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

      {/* 검색 및 필터 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 검색바 */}
        <div className="md:col-span-2 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="문서 또는 기업 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        {/* 상태 필터 */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as DocumentStatus)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 상태</option>
          <option value="complete">완료</option>
          <option value="pending">진행중</option>
          <option value="missing">누락</option>
        </select>

        {/* 문서 타입 필터 */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as DocumentType)}
          className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <option value="all">모든 문서</option>
          <option value="contract">계약서</option>
          <option value="financial">재무</option>
          <option value="legal">법률</option>
          <option value="operational">운영</option>
        </select>
      </div>

      {/* 문서 목록 */}
      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <Link
            href={`/dashboard/documents/${doc.id}`}
            key={doc.id}
            className="block bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {doc.companyName}
                </h3>
                <p className="text-white/60">문서 유형: {doc.type}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(
                    doc.status
                  )}`}
                >
                  {getStatusIcon(doc.status)}
                  <span className="capitalize">{doc.status}</span>
                </div>
                <span className="text-white/40 text-sm">
                  마지막 업데이트:{' '}
                  {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 보안 정보 */}
      <div className="mt-8 p-4 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-lg">
        <div className="flex items-center text-white/60 text-sm">
          <ShieldCheckIcon className="w-5 h-5 mr-2" />
          <span>모든 문서는 AES-256 암호화로 안전하게 보관됩니다</span>
        </div>
      </div>
    </div>
  );
}
