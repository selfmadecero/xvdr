'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Portfolio } from '../lib/hooks/usePortfolio';

interface DocumentUploaderProps {
  company: Portfolio;
  onClose: () => void;
}

export default function DocumentUploader({
  company,
  onClose,
}: DocumentUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
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
  });

  const handleUpload = async () => {
    setUploading(true);
    // 실제로는 여기서 Firebase Storage에 업로드합니다
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('문서가 업로드되었습니다!');
    setUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#1F3E5A]">
            {company.name} - 문서 업로드
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${
              isDragActive ? 'border-[#4A90E2] bg-blue-50' : 'border-gray-300'
            }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? '여기에 파일을 놓으세요'
              : '파일을 드래그하여 놓거나 클릭하여 선택하세요'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            지원 형식: PDF, DOC, DOCX, XLS, XLSX
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">업로드할 파일:</h4>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">{file.name}</span>
                  <button
                    onClick={() => {
                      setUploadedFiles((files) =>
                        files.filter((_, i) => i !== index)
                      );
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 text-[#4A4A4A]"
          >
            취소
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0 || uploading}
            className="px-4 py-2 bg-[#4A90E2] text-white rounded hover:bg-[#357ABD] disabled:bg-gray-400"
          >
            {uploading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </div>
    </div>
  );
}
