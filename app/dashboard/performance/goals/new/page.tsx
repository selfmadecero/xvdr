'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  CalendarDaysIcon,
  UserCircleIcon,
  FlagIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface GoalForm {
  title: string;
  company: string;
  type: string;
  description: string;
  dueDate: string;
  target: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  notifications: boolean;
}

const initialForm: GoalForm = {
  title: '',
  company: '',
  type: '',
  description: '',
  dueDate: '',
  target: '',
  priority: 'medium',
  assignee: '',
  notifications: true,
};

const goalTypes = [
  { value: 'revenue', label: '매출' },
  { value: 'users', label: '사용자' },
  { value: 'contracts', label: '계약' },
  { value: 'product', label: '제품' },
  { value: 'other', label: '기타' },
];

export default function NewGoal() {
  const router = useRouter();
  const { portfolios, loading } = usePortfolio();
  const [form, setForm] = useState<GoalForm>(initialForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 실제 구현에서는 여기서 API를 호출하여 목표를 저장합니다
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 후 목표 목록 페이지로 이동
      router.push('/dashboard/performance/goals');
    } catch (error) {
      console.error('목표 생성 실패:', error);
      alert('목표 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">새 목표 설정</h1>
        <button
          onClick={() => router.back()}
          className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/[0.05]"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 목표 설정 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-white mb-2">
                목표 제목
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="예: 2024년 매출 500만 달러 달성"
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-white mb-2">
                대상 기업
              </label>
              <select
                id="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="">기업을 선택하세요</option>
                {portfolios.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 목표 세부 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-white mb-2">
                목표 유형
              </label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                required
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="">유형을 선택하세요</option>
                {goalTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="target" className="block text-white mb-2">
                목표치
              </label>
              <input
                id="target"
                type="text"
                value={form.target}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
                required
                placeholder="예: 500만 달러"
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          </div>

          {/* 마감일 및 담당자 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dueDate" className="block text-white mb-2">
                마감일
              </label>
              <div className="relative">
                <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="date"
                  id="dueDate"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>
            <div>
              <label htmlFor="assignee" className="block text-white mb-2">
                담당자
              </label>
              <div className="relative">
                <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="assignee"
                  value={form.assignee}
                  onChange={(e) =>
                    setForm({ ...form, assignee: e.target.value })
                  }
                  required
                  placeholder="담당자 이름"
                  className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>
          </div>

          {/* 우선순위 */}
          <div>
            <label className="block text-white mb-2">우선순위</label>
            <div className="flex space-x-4">
              {['high', 'medium', 'low'].map((priority) => (
                <label key={priority} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={form.priority === priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority: e.target.value as GoalForm['priority'],
                      })
                    }
                    className="text-blue-500 focus:ring-blue-500/40"
                  />
                  <span className="text-white capitalize">
                    {priority === 'high'
                      ? '높음'
                      : priority === 'medium'
                      ? '중간'
                      : '낮음'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 목표 설명 */}
          <div>
            <label htmlFor="description" className="block text-white mb-2">
              목표 설명
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={4}
              placeholder="목표에 대한 상세 설명을 입력하세요"
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
            />
          </div>

          {/* 알림 설정 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notifications"
              checked={form.notifications}
              onChange={(e) =>
                setForm({ ...form, notifications: e.target.checked })
              }
              className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
            />
            <label
              htmlFor="notifications"
              className="text-white flex items-center"
            >
              <BellIcon className="w-4 h-4 mr-2" />
              목표 진행 상황 알림 받기
            </label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            목표 설정
          </button>
        </div>
      </form>
    </div>
  );
}
