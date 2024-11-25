'use client';

import React, { useState } from 'react';
import {
  DocumentIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// 더미 데이터
const documentDetails = {
  id: '1',
  title: '계약서_ABC 회사',
  type: 'contract',
  status: 'review',
  uploadedAt: '2024-01-15T09:00:00Z',
  fileType: 'pdf',
  fileSize: '2.5MB',
  description: '투자 계약서 최종본',
  company: 'ABC 스타트업',
  versions: [
    {
      version: 'v1.2',
      updatedAt: '2024-01-15T09:00:00Z',
      updatedBy: '김투자',
      changes: '최종 수정본',
    },
    {
      version: 'v1.1',
      updatedAt: '2024-01-10T15:30:00Z',
      updatedBy: '이매니저',
      changes: '법무팀 검토 반영',
    },
    {
      version: 'v1.0',
      updatedAt: '2024-01-05T11:20:00Z',
      updatedBy: '박대표',
      changes: '최초 업로드',
    },
  ],
  history: [
    {
      action: '검토 시작',
      timestamp: '2024-01-15T10:00:00Z',
      user: '김투자',
    },
    {
      action: '문서 업로드',
      timestamp: '2024-01-15T09:00:00Z',
      user: '이매니저',
    },
  ],
};

type DocumentStatus = 'review' | 'approved' | 'rejected' | 'pending';

export default function DocumentDetail({ id }: { id: string }) {
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<DocumentStatus>(
    documentDetails.status as DocumentStatus
  );

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-300';
      case 'review':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'rejected':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'review':
        return <ClockIcon className="w-5 h-5" />;
      case 'rejected':
        return <ExclamationCircleIcon className="w-5 h-5" />;
      default:
        return <DocumentIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 문서 헤더 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {documentDetails.title}
            </h1>
            <p className="text-white/60">{documentDetails.company}</p>
          </div>
          <div
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(
              currentStatus
            )}`}
          >
            {getStatusIcon(currentStatus)}
            <span className="capitalize">{currentStatus}</span>
          </div>
        </div>
      </div>

      {/* 문서 액션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 문서 미리보기 */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
          <div className="aspect-[3/4] flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
            <div className="text-center space-y-4">
              <DocumentIcon className="w-16 h-16 text-white/40 mx-auto" />
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                <EyeIcon className="w-5 h-5" />
                <span>미리보기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 문서 정보 */}
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">문서 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">파일 형식</span>
                <span className="text-white">
                  {documentDetails.fileType.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">파일 크기</span>
                <span className="text-white">{documentDetails.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">업로드 날짜</span>
                <span className="text-white">
                  {new Date(documentDetails.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>다운로드</span>
              </button>
            </div>
          </div>

          {/* 상태 변경 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">상태 변경</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCurrentStatus('approved')}
                className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                승인
              </button>
              <button
                onClick={() => setCurrentStatus('rejected')}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                반려
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 버전 히스토리 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <button
          onClick={() => setShowVersionHistory(!showVersionHistory)}
          className="flex items-center justify-between w-full text-white"
        >
          <h2 className="text-lg font-semibold">버전 히스토리</h2>
          <ChevronDownIcon
            className={`w-5 h-5 transform transition-transform ${
              showVersionHistory ? 'rotate-180' : ''
            }`}
          />
        </button>
        {showVersionHistory && (
          <div className="mt-4 space-y-4">
            {documentDetails.versions.map((version, index) => (
              <div
                key={version.version}
                className="flex items-start justify-between p-4 bg-white/[0.02] rounded-lg"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {version.version}
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">
                        최신
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mt-1">
                    {version.changes}
                  </p>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-white/40">
                    <span>{version.updatedBy}</span>
                    <span>•</span>
                    <span>
                      {new Date(version.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  보기
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
