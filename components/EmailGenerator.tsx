'use client';

import React, { useState } from 'react';
import { Portfolio } from '../lib/hooks/usePortfolio';

interface EmailGeneratorProps {
  company: Portfolio;
  documentType: string;
  onClose: () => void;
}

export default function EmailGenerator({
  company,
  documentType,
  onClose,
}: EmailGeneratorProps) {
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 실제로는 AI API를 호출하겠지만, 지금은 더미 데이터를 사용합니다
  const generateEmail = async () => {
    setIsGenerating(true);

    // 더미 이메일 템플릿
    const template = `안녕하세요, ${company.name} 담당자님

${company.name}의 ${documentType} 관련 문서가 필요합니다.
현재 투자 단계(${company.stage})에 맞춰 다음 문서들을 제출해주시면 감사하겠습니다.

- ${documentType} 관련 최신 문서
- 관련 증빙 자료

문서는 XVDR 플랫폼을 통해 직접 업로드해주시면 됩니다.
궁금하신 점이 있으시다면 언제든 연락 주시기 바랍니다.

감사합니다.
XVDR 드림`;

    // 실제 구현에서는 여기서 AI API를 호출합니다
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEmailContent(template);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#1F3E5A]">이메일 생성하기</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {!emailContent ? (
          <div className="text-center py-8">
            <button
              onClick={generateEmail}
              disabled={isGenerating}
              className="bg-[#4A90E2] text-white px-6 py-2 rounded hover:bg-[#357ABD] disabled:bg-gray-400"
            >
              {isGenerating ? '생성 중...' : '이메일 생성하기'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="w-full h-64 p-4 border rounded-lg font-['Noto_Sans_KR'] text-[14px]"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100 text-[#4A4A4A]"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('이메일이 발송되었습니다!');
                  onClose();
                }}
                className="px-4 py-2 bg-[#4A90E2] text-white rounded hover:bg-[#357ABD]"
              >
                발송하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
