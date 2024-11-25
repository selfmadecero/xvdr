'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  ArrowUpTrayIcon,
  DocumentIcon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

interface UploadForm {
  title: string;
  category: string;
  description: string;
  sendNotification: boolean;
}

const initialForm: UploadForm = {
  title: '',
  category: '',
  description: '',
  sendNotification: true,
};

const categories = [
  { value: 'contract', label: '계약서' },
  { value: 'financial', label: '재무 자료' },
  { value: 'legal', label: '법률 문서' },
  { value: 'operational', label: '운영 보고서' },
];

export default function DocumentUpload() {
  const [form, setForm] = useState<UploadForm>(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    // 실제 구현에서는 여기서 파일 업로드 API를 호출합니다
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploading(false);

    // 업로드 성공 후 초기화
    setForm(initialForm);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">문서 업로드</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 파일 업로드 영역 */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex items-center justify-center space-x-4">
              <DocumentIcon className="w-8 h-8 text-blue-400" />
              <div className="text-left">
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-white/60 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <XMarkIcon className="w-5 h-5 text-white/60" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <ArrowUpTrayIcon className="w-8 h-8 text-white/60 mx-auto" />
              <p className="text-white">파일을 드래그하거나 클릭하여 업로드</p>
              <p className="text-white/60 text-sm">
                PDF, DOC, DOCX, XLS, XLSX (최대 50MB)
              </p>
            </div>
          )}
        </div>

        {/* 문서 정보 입력 */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-white mb-2">
              문서 제목
            </label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="문서 제목을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-white mb-2">
              문서 카테고리
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="" disabled>
                카테고리 선택
              </option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-white mb-2">
              문서 설명
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40 h-32 resize-none"
              placeholder="문서에 대한 설명을 입력하세요"
            />
          </div>

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
              팀원들에게 알림 보내기
            </label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!file || !form.title || !form.category || uploading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-white/10 disabled:text-white/60 transition-colors"
          >
            {uploading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </form>
    </div>
  );
}
