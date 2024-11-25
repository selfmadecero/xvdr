'use client';

import React, { useState } from 'react';
import { usePortfolio, Portfolio } from '../lib/hooks/usePortfolio';
import EmailGenerator from './EmailGenerator';

interface EmailModalState {
  isOpen: boolean;
  company?: Portfolio;
  documentType?: string;
}

export default function DocumentRequests() {
  const { portfolios, loading } = usePortfolio();
  const [emailModal, setEmailModal] = useState<EmailModalState>({
    isOpen: false,
  });

  const getMissingDocuments = () => {
    return portfolios.flatMap((company) =>
      Object.entries(company.documentStatus)
        .filter(([, status]) => status === 'missing')
        .map(([docType]) => ({
          company,
          documentType: docType,
        }))
    );
  };

  if (loading) return <div className="text-white/60">로딩 중...</div>;

  const missingDocs = getMissingDocuments();

  return (
    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6">문서 요청 현황</h2>
      {missingDocs.length === 0 ? (
        <p className="text-white/60">현재 모든 문서가 완료되었습니다.</p>
      ) : (
        <div className="space-y-4">
          {missingDocs.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-white/[0.05] pb-4"
            >
              <div>
                <p className="font-semibold text-white">{doc.company.name}</p>
                <p className="text-white/60">필요 문서: {doc.documentType}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() =>
                  setEmailModal({
                    isOpen: true,
                    company: doc.company,
                    documentType: doc.documentType,
                  })
                }
              >
                요청하기
              </button>
            </div>
          ))}
        </div>
      )}

      {emailModal.isOpen && emailModal.company && (
        <EmailGenerator
          company={emailModal.company}
          documentType={emailModal.documentType || ''}
          onClose={() => setEmailModal({ isOpen: false })}
        />
      )}
    </div>
  );
}
