'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface RequestForm {
  companyId: string;
  documentType: string;
  dueDate: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  sendNotification: boolean;
}

const documentTypes = [
  { value: 'financial', label: '재무 자료' },
  { value: 'legal', label: '법률 문서' },
  { value: 'operational', label: '운영 보고서' },
  { value: 'contract', label: '계약서' },
  { value: 'other', label: '기타' },
];

const initialForm: RequestForm = {
  companyId: '',
  documentType: '',
  dueDate: '',
  description: '',
  priority: 'medium',
  sendNotification: true,
};

export default function NewDocumentRequest() {
  const router = useRouter();
  const { portfolios, loading } = usePortfolio();
  const [form, setForm] = useState<RequestForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제 구현에서는 여기서 API를 호출하여 문서 요청을 저장합니다
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 후 목록 페이지로 이동
      router.push('/dashboard/documents/requests');
    } catch (error) {
      console.error('문서 요청 생성 실패:', error);
      alert('문서 요청 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
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
        <h1 className="text-2xl font-bold text-white">새 문서 요청</h1>
        <button
          onClick={() => router.back()}
          className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/[0.05]"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 요청 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 space-y-6">
          {/* 기업 선택 */}
          <div>
            <label htmlFor="company" className="block text-white mb-2">
              요청할 기업
            </label>
            <select
              id="company"
              value={form.companyId}
              onChange={(e) => setForm({ ...form, companyId: e.target.value })}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="" disabled>
                기업을 선택하세요
              </option>
              {portfolios.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* 문서 유형 */}
          <div>
            <label htmlFor="documentType" className="block text-white mb-2">
              문서 유형
            </label>
            <select
              id="documentType"
              value={form.documentType}
              onChange={(e) =>
                setForm({ ...form, documentType: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="" disabled>
                문서 유형을 선택하세요
              </option>
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* 마감일 */}
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
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          </div>

          {/* 우선순위 */}
          <div>
            <label className="block text-white mb-2">우선순위</label>
            <div className="flex space-x-4">
              {['low', 'medium', 'high'].map((priority) => (
                <label key={priority} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={form.priority === priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority: e.target.value as RequestForm['priority'],
                      })
                    }
                    className="text-blue-500 focus:ring-blue-500/40"
                  />
                  <span className="text-white capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 요청 내용 */}
          <div>
            <label htmlFor="description" className="block text-white mb-2">
              요청 내용
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={4}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
              placeholder="요청할 문서에 대한 상세 내용을 입력하세요"
            />
          </div>

          {/* 알림 설정 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notification"
              checked={form.sendNotification}
              onChange={(e) =>
                setForm({ ...form, sendNotification: e.target.checked })
              }
              className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
            />
            <label
              htmlFor="notification"
              className="text-white flex items-center"
            >
              <BellIcon className="w-4 h-4 mr-2" />
              이메일 알림 보내기
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
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-500/50 transition-colors"
          >
            {isSubmitting ? '요청 중...' : '요청하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
