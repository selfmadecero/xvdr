'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import { useParams } from 'next/navigation';
import {
  ChartBarIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  PhoneIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import DocumentUploader from '@/components/DocumentUploader';
import EmailGenerator from '@/components/EmailGenerator';

type ModalType = 'upload' | 'email' | null;

export default function PortfolioDetail() {
  const params = useParams();
  const { portfolios, loading } = usePortfolio();
  const [modalType, setModalType] = useState<ModalType>(null);

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

  const portfolio = portfolios.find((p) => p.id === params.id);
  if (!portfolio) return <div>포트폴리오를 찾을 수 없습니다.</div>;

  // 더미 데이터
  const companyDetails = {
    foundedDate: '2020년 3월',
    location: '서울시 강남구',
    founders: [
      { name: '김창업', position: 'CEO', linkedin: '#' },
      { name: '이기술', position: 'CTO', linkedin: '#' },
    ],
    businessModel: 'B2B SaaS',
    investmentHistory: [
      {
        round: 'Seed',
        amount: '3억원',
        date: '2021.06',
        investors: ['Angel A', 'Angel B'],
      },
      {
        round: 'Series A',
        amount: '30억원',
        date: '2022.12',
        investors: ['VC X', 'VC Y'],
      },
    ],
    kpis: {
      revenue: { current: 150000000, growth: 23.5, target: 200000000 },
      users: { current: 15000, growth: 45.2, target: 20000 },
      customers: { current: 120, growth: 30.0, target: 150 },
    },
    contacts: {
      email: 'contact@startup.com',
      phone: '02-1234-5678',
      website: 'https://startup.com',
    },
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {portfolio.name}
            </h1>
            <div className="flex items-center space-x-4 text-white/60">
              <span>{portfolio.industry}</span>
              <span>•</span>
              <span>{portfolio.stage}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setModalType('upload')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              문서 업로드
            </button>
            <button
              onClick={() => setModalType('email')}
              className="px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
            >
              이메일 요청
            </button>
          </div>
        </div>
      </div>

      {/* 기업 정보 및 KPI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 기업 정보 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">기업 정보</h2>
            <div className="space-y-4">
              <div className="flex items-center text-white/60">
                <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                <span>설립일: {companyDetails.foundedDate}</span>
              </div>
              <div className="flex items-center text-white/60">
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                <span>위치: {companyDetails.location}</span>
              </div>
              <div className="flex items-center text-white/60">
                <UserGroupIcon className="w-5 h-5 mr-2" />
                <span>사업 모델: {companyDetails.businessModel}</span>
              </div>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">연락처</h2>
            <div className="space-y-4">
              <div className="flex items-center text-white/60">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                <span>{companyDetails.contacts.email}</span>
              </div>
              <div className="flex items-center text-white/60">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span>{companyDetails.contacts.phone}</span>
              </div>
              <div className="flex items-center text-white/60">
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                <a
                  href={companyDetails.contacts.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  웹사이트 방문
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 및 ��과 */}
        <div className="lg:col-span-2 space-y-6">
          {/* KPI 카드 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              핵심 성과 지표
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(companyDetails.kpis).map(([key, value]) => (
                <div key={key} className="p-4 bg-white/[0.02] rounded-xl">
                  <h3 className="text-white/60 capitalize mb-2">{key}</h3>
                  <div className="text-2xl font-bold text-white mb-2">
                    {value.current.toLocaleString()}
                  </div>
                  <div className="flex items-center text-green-400">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    <span>+{value.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 문서 상태 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">문서 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(portfolio.documentStatus).map(([key, status]) => (
                <div
                  key={key}
                  className={`p-4 rounded-xl ${
                    status === 'complete'
                      ? 'bg-green-500/20'
                      : status === 'pending'
                      ? 'bg-yellow-500/20'
                      : 'bg-red-500/20'
                  }`}
                >
                  <h3 className="text-white/80 capitalize mb-2">{key}</h3>
                  <div
                    className={`text-lg font-semibold ${
                      status === 'complete'
                        ? 'text-green-300'
                        : status === 'pending'
                        ? 'text-yellow-300'
                        : 'text-red-300'
                    }`}
                  >
                    {status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 투자 이력 */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">투자 이력</h2>
            <div className="space-y-4">
              {companyDetails.investmentHistory.map((investment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl"
                >
                  <div>
                    <h3 className="text-white font-semibold">
                      {investment.round}
                    </h3>
                    <p className="text-white/60">{investment.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {investment.amount}
                    </div>
                    <div className="text-white/60 text-sm">
                      {investment.investors.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {modalType === 'upload' && (
        <DocumentUploader
          company={portfolio}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === 'email' && (
        <EmailGenerator
          company={portfolio}
          documentType="all"
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}
