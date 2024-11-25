'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

// 권한 그룹 정의
const permissionGroups = {
  admin: {
    name: '관리자',
    description: '모든 기능에 대한 접근 권한',
    permissions: {
      canManageUsers: true,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: true,
      canManageSettings: true,
    },
  },
  manager: {
    name: '매니저',
    description: '대부분의 기능에 대한 접근 권한',
    permissions: {
      canManageUsers: false,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: true,
      canManageSettings: false,
    },
  },
  member: {
    name: '팀원',
    description: '기본적인 기능에 대한 접근 권한',
    permissions: {
      canManageUsers: false,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: false,
      canManageSettings: false,
    },
  },
  observer: {
    name: '관찰자',
    description: '읽기 전용 접근 권한',
    permissions: {
      canManageUsers: false,
      canManageDocuments: false,
      canViewAnalytics: true,
      canEditPortfolio: false,
      canManageSettings: false,
    },
  },
};

// 더미 데이터
const employeesData = [
  {
    id: '1',
    name: '김유리',
    email: 'yuri.kim@avc.com',
    role: 'admin',
    department: 'investment',
    position: '팀장',
    group: 'admin',
    customPermissions: null,
  },
  {
    id: '2',
    name: '이성과',
    email: 'sung.lee@avc.com',
    role: 'member',
    department: 'operation',
    position: '매니저',
    group: 'manager',
    customPermissions: {
      canManageUsers: false,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: true,
      canManageSettings: false,
    },
  },
];

interface CustomPermissions {
  canManageUsers: boolean;
  canManageDocuments: boolean;
  canViewAnalytics: boolean;
  canEditPortfolio: boolean;
  canManageSettings: boolean;
}

interface EditPermissionsModalProps {
  employee: (typeof employeesData)[0];
  onClose: () => void;
  onSave: (
    employeeId: string,
    group: string,
    customPermissions: CustomPermissions | null
  ) => void;
}

function EditPermissionsModal({
  employee,
  onClose,
  onSave,
}: EditPermissionsModalProps) {
  const [selectedGroup, setSelectedGroup] = useState(employee.group);
  const [useCustomPermissions, setUseCustomPermissions] = useState(
    !!employee.customPermissions
  );
  const [permissions, setPermissions] = useState(
    employee.customPermissions ||
      permissionGroups[employee.group as keyof typeof permissionGroups]
        .permissions
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      employee.id,
      selectedGroup,
      useCustomPermissions ? permissions : null
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-2xl border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">권한 설정</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 권한 그룹 선택 */}
          <div>
            <label className="block text-white mb-2">권한 그룹</label>
            <select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                if (!useCustomPermissions) {
                  setPermissions(
                    permissionGroups[
                      e.target.value as keyof typeof permissionGroups
                    ].permissions
                  );
                }
              }}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {Object.entries(permissionGroups).map(([key, group]) => (
                <option key={key} value={key}>
                  {group.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-white/60 text-sm">
              {
                permissionGroups[selectedGroup as keyof typeof permissionGroups]
                  .description
              }
            </p>
          </div>

          {/* 커스텀 권한 설정 */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useCustomPermissions}
                onChange={(e) => {
                  setUseCustomPermissions(e.target.checked);
                  if (!e.target.checked) {
                    setPermissions(
                      permissionGroups[
                        selectedGroup as keyof typeof permissionGroups
                      ].permissions
                    );
                  }
                }}
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
              <span className="text-white">커스텀 권한 사용</span>
            </label>
          </div>

          {useCustomPermissions && (
            <div className="space-y-4 border border-white/[0.05] rounded-xl p-4">
              {Object.entries(permissions).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-white">
                    {key === 'canManageUsers'
                      ? '사용자 관리'
                      : key === 'canManageDocuments'
                      ? '문서 관리'
                      : key === 'canViewAnalytics'
                      ? '분석 보기'
                      : key === 'canEditPortfolio'
                      ? '포트폴리오 편집'
                      : '설정 관리'}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setPermissions({
                        ...permissions,
                        [key]: e.target.checked,
                      })
                    }
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                  />
                </label>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Permissions() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    (typeof employeesData)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSavePermissions = (
    employeeId: string,
    group: string,
    customPermissions: CustomPermissions | null
  ) => {
    // 실제 구현에서는 여기서 권한을 저장합니다
    console.log('권한 저장:', { employeeId, group, customPermissions });
  };

  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">권한 관리</h1>
      </div>

      {/* 검색 */}
      <div className="w-full md:max-w-md">
        <input
          type="text"
          placeholder="이름, 이메일 또는 부서 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* 권한 그룹 설명 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(permissionGroups).map(([key, group]) => (
          <div
            key={key}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {group.name}
            </h3>
            <p className="text-white/60 text-sm">{group.description}</p>
          </div>
        ))}
      </div>

      {/* 임직원 목록 */}
      <div className="space-y-4">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {employee.name}
                </h3>
                <p className="text-white/60">{employee.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-white/40">
                    {employee.department} / {employee.position}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/40">
                    {
                      permissionGroups[
                        employee.group as keyof typeof permissionGroups
                      ].name
                    }
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedEmployee(employee);
                  setShowEditModal(true);
                }}
                className="px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
              >
                권한 수정
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 권한 수정 모달 */}
      {showEditModal && selectedEmployee && (
        <EditPermissionsModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSave={handleSavePermissions}
        />
      )}
    </div>
  );
}
