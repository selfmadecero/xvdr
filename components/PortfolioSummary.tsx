'use client';

import React from 'react';
import { usePortfolio } from '../lib/hooks/usePortfolio';
import Link from 'next/link';

export default function PortfolioSummary() {
  const { portfolios, loading, error } = usePortfolio();

  if (loading) return <div className="text-white/60">로딩 중...</div>;
  if (error)
    return (
      <div className="text-red-400">에러가 발생했습니다: {error.message}</div>
    );

  return (
    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">포트폴리오 현황</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolios.map((company) => (
          <Link href={`/portfolio/${company.id}`} key={company.id}>
            <div className="border border-white/[0.05] rounded-lg p-4 hover:bg-white/[0.05] transition-all cursor-pointer backdrop-blur-xl">
              <h3 className="font-bold text-lg text-white">{company.name}</h3>
              <div className="mt-2 text-white/60 space-y-1">
                <p>산업: {company.industry}</p>
                <p>단계: {company.stage}</p>
                <div className="mt-3">
                  <h4 className="font-semibold text-white/80">문서 상태:</h4>
                  <div className="space-y-1 mt-1">
                    {Object.entries(company.documentStatus).map(
                      ([key, status]) => (
                        <div key={key} className="flex items-center">
                          <span className="capitalize text-white/60">
                            {key}:
                          </span>
                          <span
                            className={`ml-2 px-2 py-1 rounded text-sm ${
                              status === 'complete'
                                ? 'bg-green-500/20 text-green-300'
                                : status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      )
                    )}
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
