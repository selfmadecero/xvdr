'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

type FilterType = 'all' | 'seed' | 'series-a' | 'series-b';

export default function Portfolio() {
  const { portfolios, loading } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

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

  const filteredPortfolios = portfolios.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      company.stage.toLowerCase().replace(' ', '-') === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">포트폴리오 관리</h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          스타트업 추가
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="스타트업 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'seed', 'series-a', 'series-b'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as FilterType)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/[0.05] text-white/70 hover:text-white'
              }`}
            >
              {f === 'all' ? '전체' : f.split('-').join(' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPortfolios.map((company) => (
          <Link
            href={`/dashboard/portfolio/${company.id}`}
            key={company.id}
            className="block"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] transition-all">
              {/* Company Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {company.name}
                  </h3>
                  <p className="text-white/60">{company.industry}</p>
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  {company.stage}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center text-white/60">
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    <span>문서 상태</span>
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(company.documentStatus).map(
                      ([key, status]) => (
                        <span
                          key={key}
                          className={`px-2 py-1 rounded text-xs ${
                            status === 'complete'
                              ? 'bg-green-500/20 text-green-300'
                              : status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {key}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-white/60">
                    <ChartBarIcon className="w-4 h-4 mr-2" />
                    <span>성과</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    <span>+23.5%</span>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center text-sm text-white/40">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>
                  마지막 업데이트:{' '}
                  {new Date(company.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
