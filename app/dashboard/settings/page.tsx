'use client';

import React, { useState } from 'react';
import {
  UserIcon,
  UserGroupIcon,
  BellIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  MapPinIcon,
  ComputerDesktopIcon,
  Cog6ToothIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

// 타입 정의
type EmployeeRole = 'admin' | 'member' | 'observer';
type EmployeeStatus = 'active' | 'inactive' | 'pending';
type EmployeeDepartment =
  | 'investment'
  | 'operation'
  | 'research'
  | 'management';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  department: EmployeeDepartment;
  position: string;
  status: EmployeeStatus;
  lastLogin: string | null;
  permissions: {
    canManageUsers: boolean;
    canManageDocuments: boolean;
    canViewAnalytics: boolean;
    canEditPortfolio: boolean;
  };
  joinedAt: string;
}

interface CompanyInfo {
  name: string;
  email: string;
  plan: string;
  employeeCount: number;
  subscription: {
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'pending';
  };
  settings: {
    twoFactorAuth: boolean;
    emailNotifications: boolean;
    autoBackup: boolean;
  };
}

// 팀 타입 정의
interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  manager: string;
  permissions: {
    canManageUsers: boolean;
    canManageDocuments: boolean;
    canViewAnalytics: boolean;
    canEditPortfolio: boolean;
  };
  members: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
}

// 더미 데이터
const companyData: CompanyInfo = {
  name: 'A 투자사',
  email: 'contact@avc.com',
  plan: 'Enterprise',
  employeeCount: 25,
  subscription: {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
  },
  settings: {
    twoFactorAuth: true,
    emailNotifications: true,
    autoBackup: true,
  },
};

const employeesData: Employee[] = [
  {
    id: '1',
    name: '김유리',
    email: 'yuri.kim@avc.com',
    role: 'admin',
    department: 'investment',
    position: '팀장',
    status: 'active',
    lastLogin: '2024-01-15T09:00:00Z',
    permissions: {
      canManageUsers: true,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: true,
    },
    joinedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: '이성과',
    email: 'sung.lee@avc.com',
    role: 'member',
    department: 'operation',
    position: '매니저',
    status: 'active',
    lastLogin: '2024-01-14T15:30:00Z',
    permissions: {
      canManageUsers: false,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: false,
    },
    joinedAt: '2023-03-15T00:00:00Z',
  },
  {
    id: '3',
    name: '박담당',
    email: 'dam.park@avc.com',
    role: 'member',
    department: 'research',
    position: '연구원',
    status: 'pending',
    lastLogin: null,
    permissions: {
      canManageUsers: false,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: false,
    },
    joinedAt: '2023-06-01T00:00:00Z',
  },
];

const teamsData: Team[] = [
  {
    id: '1',
    name: '투자팀',
    description: '투자 검토 및 관리 담당 팀',
    memberCount: 5,
    manager: '김유리',
    permissions: {
      canManageUsers: true,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: true,
    },
    members: [
      {
        id: '1',
        name: '김유리',
        email: 'yuri.kim@avc.com',
        role: '팀장',
      },
      {
        id: '2',
        name: '이성과',
        email: 'sung.lee@avc.com',
        role: '매니저',
      },
    ],
  },
  {
    id: '2',
    name: '운영팀',
    description: '포트폴리오 운영 지원 담당 팀',
    memberCount: 3,
    manager: '박운영',
    permissions: {
      canManageUsers: false,
      canManageDocuments: true,
      canViewAnalytics: true,
      canEditPortfolio: false,
    },
    members: [
      {
        id: '3',
        name: '박운영',
        email: 'park.op@avc.com',
        role: '팀장',
      },
    ],
  },
];

// 임직원 추가 모달 Props 타입 정의
interface AddEmployeeModalProps {
  onClose: () => void;
  onSave: (employee: {
    name: string;
    email: string;
    role: EmployeeRole;
    department: EmployeeDepartment;
    position: string;
  }) => void;
}

// 임직원 권한 수정 모달 Props 타입 정의
interface EditPermissionsModalProps {
  employee: Employee;
  onClose: () => void;
  onSave: (employeeId: string, permissions: Employee['permissions']) => void;
}

// 비밀번호 변경 모달 Props 타입 정의
interface ChangePasswordModalProps {
  onClose: () => void;
  onSave: (oldPassword: string, newPassword: string) => void;
}

// 로그인 기록 더미 데이터 추가
const loginHistory = [
  {
    id: '1',
    device: 'MacBook Pro',
    location: '서울, 대한민국',
    ip: '123.456.789.012',
    timestamp: '2024-01-15T09:00:00Z',
    status: 'success',
  },
  {
    id: '2',
    device: 'iPhone 14',
    location: '부산, 대한민국',
    ip: '123.456.789.013',
    timestamp: '2024-01-14T15:30:00Z',
    status: 'success',
  },
  {
    id: '3',
    device: 'Unknown Device',
    location: '도쿄, 일본',
    ip: '123.456.789.014',
    timestamp: '2024-01-14T10:15:00Z',
    status: 'failed',
  },
];

function AddEmployeeModal({ onClose, onSave }: AddEmployeeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<EmployeeRole>('member');
  const [department, setDepartment] =
    useState<EmployeeDepartment>('investment');
  const [position, setPosition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, role, department, position });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">새 임직원 추가</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">역할</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as EmployeeRole)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="admin">관리자</option>
              <option value="member">팀원</option>
              <option value="observer">관찰자</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">부서</label>
            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value as EmployeeDepartment)
              }
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="investment">투자팀</option>
              <option value="operation">운영팀</option>
              <option value="research">리서치팀</option>
              <option value="management">경영지원팀</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">직급</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
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

// 권한 관리 모달 추가
function EditPermissionsModal({
  employee,
  onClose,
  onSave,
}: EditPermissionsModalProps) {
  const [permissions, setPermissions] = useState(employee.permissions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee.id, permissions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">권한 설정</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white">사용자 관리</label>
              <input
                type="checkbox"
                checked={permissions.canManageUsers}
                onChange={(e) =>
                  setPermissions({
                    ...permissions,
                    canManageUsers: e.target.checked,
                  })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white">문서 관리</label>
              <input
                type="checkbox"
                checked={permissions.canManageDocuments}
                onChange={(e) =>
                  setPermissions({
                    ...permissions,
                    canManageDocuments: e.target.checked,
                  })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white">분석 보기</label>
              <input
                type="checkbox"
                checked={permissions.canViewAnalytics}
                onChange={(e) =>
                  setPermissions({
                    ...permissions,
                    canViewAnalytics: e.target.checked,
                  })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white">포트폴리오 편집</label>
              <input
                type="checkbox"
                checked={permissions.canEditPortfolio}
                onChange={(e) =>
                  setPermissions({
                    ...permissions,
                    canEditPortfolio: e.target.checked,
                  })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
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

// 비밀번호 변경 모달 컴포넌트
function ChangePasswordModal({ onClose, onSave }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    onSave(oldPassword, newPassword);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">비밀번호 변경</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">현재 비밀번호</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
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
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 회사 정보 수정 모달 Props 타입 정의
interface EditCompanyModalProps {
  company: CompanyInfo;
  onClose: () => void;
  onSave: (company: CompanyInfo) => void;
}

// 회사 정보 수정 모달 컴포넌트
function EditCompanyModal({ company, onClose, onSave }: EditCompanyModalProps) {
  const [formData, setFormData] = useState(company);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">투자사 정보 수정</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">회사명</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
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

export default function Settings() {
  const [activeTab, setActiveTab] = useState<
    'general' | 'team' | 'notifications' | 'security'
  >('general');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [settings, setSettings] = useState(companyData.settings);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [company, setCompany] = useState(companyData);

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    // 실제 구현에서는 여기서 비밀번호를 변경합니다
    console.log('비밀번호 변경:', { oldPassword, newPassword });
  };

  const handleCompanyUpdate = (updatedCompany: CompanyInfo) => {
    // 실제 구현에서는 여기서 회사 정보를 업데이트합니다
    setCompany(updatedCompany);
    console.log('회사 정보 업데이트:', updatedCompany);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">설정</h1>
      </div>

      {/* 투 메뉴 */}
      <div className="border-b border-white/[0.05]">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-4 relative ${
              activeTab === 'general'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Cog6ToothIcon className="w-5 h-5" />
              <span>일반</span>
            </div>
            {activeTab === 'general' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`pb-4 relative ${
              activeTab === 'team'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <span>팀 관리</span>
            </div>
            {activeTab === 'team' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-4 relative ${
              activeTab === 'notifications'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BellIcon className="w-5 h-5" />
              <span>알림</span>
            </div>
            {activeTab === 'notifications' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-4 relative ${
              activeTab === 'security'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>보안</span>
            </div>
            {activeTab === 'security' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="mt-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* 투자사 정보 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">투자사 정보</h2>
                <button
                  onClick={() => setShowCompanyModal(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white/60 mb-1">회사명</label>
                  <p className="text-white">{companyData.name}</p>
                </div>
                <div>
                  <label className="block text-white/60 mb-1">이메일</label>
                  <p className="text-white">{companyData.email}</p>
                </div>
                <div>
                  <label className="block text-white/60 mb-1">
                    사용 중인 플랜
                  </label>
                  <p className="text-white">{companyData.plan}</p>
                </div>
              </div>
            </div>

            {/* 구독 정보 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">구독 정보</h2>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  플랜 변경
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white/60 mb-1">시작일</label>
                  <p className="text-white">
                    {new Date(
                      companyData.subscription.startDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-white/60 mb-1">만료일</label>
                  <p className="text-white">
                    {new Date(
                      companyData.subscription.endDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-white/60 mb-1">상태</label>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      companyData.subscription.status === 'active'
                        ? 'bg-green-500/20 text-green-300'
                        : companyData.subscription.status === 'expired'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}
                  >
                    {companyData.subscription.status === 'active'
                      ? '활성'
                      : companyData.subscription.status === 'expired'
                      ? '만료'
                      : '대기중'}
                  </span>
                </div>
              </div>
            </div>

            {/* 기본 설정 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">기본 설정</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">자동 백업</h3>
                    <p className="text-white/60 text-sm">
                      매일 자정에 데이터를 자동으로 백업합니다
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={companyData.settings.autoBackup}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          settings: {
                            ...companyData.settings,
                            autoBackup: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">이메일 알림</h3>
                    <p className="text-white/60 text-sm">
                      중요한 업데이트와 알림을 이메일로 받습니다
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={companyData.settings.emailNotifications}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          settings: {
                            ...companyData.settings,
                            emailNotifications: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* 팀 관리 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">팀 관리</h2>
                <button
                  onClick={() => setShowTeamModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />새 팀 만들기
                </button>
              </div>

              {/* 팀 목록 */}
              <div className="space-y-4">
                {teamsData.map((team) => (
                  <div
                    key={team.id}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {team.name}
                        </h3>
                        <p className="text-white/60">{team.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-white/40">
                            팀장: {team.manager}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/40">
                            팀원: {team.memberCount}명
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setSelectedTeam(team);
                            setShowPermissionsModal(true);
                          }}
                          className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
                        >
                          <ShieldCheckIcon className="w-5 h-5 mr-2" />
                          권한 설정
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTeam(team);
                            setShowInviteModal(true);
                          }}
                          className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
                        >
                          <UserPlusIcon className="w-5 h-5 mr-2" />
                          팀원 초대
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTeam(team);
                            setShowTeamModal(true);
                          }}
                          className="flex items-center px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
                        >
                          <PencilIcon className="w-5 h-5 mr-2" />팀 수정
                        </button>
                      </div>
                    </div>

                    {/* 팀원 목록 */}
                    <div className="space-y-3">
                      {team.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl"
                        >
                          <div>
                            <div className="text-white font-medium">
                              {member.name}
                            </div>
                            <div className="text-white/60 text-sm">
                              {member.email}
                            </div>
                          </div>
                          <div className="text-white/40">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* 이메일 알림 설정 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">이메일 알림</h2>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              {settings.emailNotifications && (
                <div className="space-y-4 border-t border-white/[0.05] pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                      <span className="text-white">목표 진행 상황</span>
                      <input
                        type="checkbox"
                        checked={true}
                        className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                      <span className="text-white">문서 업데이트</span>
                      <input
                        type="checkbox"
                        checked={true}
                        className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                      <span className="text-white">보안 알림</span>
                      <input
                        type="checkbox"
                        checked={true}
                        className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                      <span className="text-white">시스템 알림</span>
                      <input
                        type="checkbox"
                        checked={false}
                        className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* 푸시 알림 설정 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BellIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">푸시 알림</h2>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={true}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              <div className="space-y-4 border-t border-white/[0.05] pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 푸시 알림 옵션들... */}
                </div>
              </div>
            </div>

            {/* 알림 빈도 설정 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <ClockIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">알림 빈도</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">
                    알림 수신 빈도
                  </label>
                  <select className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                    <option value="realtime">실시간</option>
                    <option value="daily">매일</option>
                    <option value="weekly">매주</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium mb-1">일간 요약</h3>
                    <p className="text-white/60 text-sm">
                      매일 지정된 시간에 알림 요약을 받습니다
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="time"
                      value="09:00"
                      className="px-3 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={true}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* 2단계 인증 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">2단계 인증</h2>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              {settings.twoFactorAuth && (
                <div className="space-y-4 border-t border-white/[0.05] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">인증 방식</span>
                    <select className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                      <option value="app">인증 앱</option>
                      <option value="sms">SMS</option>
                      <option value="email">이메일</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* 비밀번호 설정 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <KeyIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">비밀번호</h2>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
                >
                  비밀번호 변경
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">비밀번호 변경 주기</span>
                  <select className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                    <option value="30">30일</option>
                    <option value="60">60일</option>
                    <option value="90">90일</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">로그인 시도 제한</span>
                  <select className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                    <option value="3">3회</option>
                    <option value="5">5회</option>
                    <option value="10">10회</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 세션 설정 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <ClockIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">세션 설정</h2>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">자동 로그아웃 시간</span>
                <select className="bg-white/[0.05] border border-white/[0.05] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                  <option value="15">15분</option>
                  <option value="30">30분</option>
                  <option value="60">60분</option>
                </select>
              </div>
            </div>

            {/* 로그인 기록 */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <ComputerDesktopIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">로그인 기록</h2>
              </div>
              <div className="space-y-4">
                {loginHistory.map((login) => (
                  <div
                    key={login.id}
                    className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">
                          {login.device}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            login.status === 'success'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {login.status === 'success' ? '성공' : '실패'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-white/60 text-sm">
                        <span className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {login.location}
                        </span>
                        <span>{login.ip}</span>
                      </div>
                    </div>
                    <span className="text-white/40 text-sm">
                      {new Date(login.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSave={handlePasswordChange}
        />
      )}

      {/* 회사 정보 수정 모달 */}
      {showCompanyModal && (
        <EditCompanyModal
          company={company}
          onClose={() => setShowCompanyModal(false)}
          onSave={handleCompanyUpdate}
        />
      )}
    </div>
  );
}
