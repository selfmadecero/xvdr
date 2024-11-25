'use client';

import React, { useState } from 'react';
import {
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon,
  UserPlusIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

// 팀 타입 정의
type TeamPermissions = {
  canManageUsers: boolean;
  canManageDocuments: boolean;
  canViewAnalytics: boolean;
  canEditPortfolio: boolean;
  canManageSettings: boolean;
};

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  manager: string;
  permissions: TeamPermissions;
  members: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
}

// 더미 데이터
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
      canManageSettings: true,
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
      canManageSettings: false,
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

// 팀 생성/수정 모달 Props
interface TeamModalProps {
  team?: Team;
  onClose: () => void;
  onSave: (team: Partial<Team>) => void;
}

// 팀원 초대 모달 Props
interface InviteMemberModalProps {
  teamId: string;
  onClose: () => void;
  onSave: (teamId: string, memberData: { email: string; role: string }) => void;
}

// 권한 설정 모달 Props
interface PermissionsModalProps {
  team: Team;
  onClose: () => void;
  onSave: (teamId: string, permissions: TeamPermissions) => void;
}

// 팀 생성/수정 모달
function TeamModal({ team, onClose, onSave }: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: team?.name || '',
    description: team?.description || '',
    manager: team?.manager || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {team ? '팀 수정' : '새 팀 생성'}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">팀 이름</label>
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
            <label className="block text-white mb-2">설명</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-white mb-2">팀장</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) =>
                setFormData({ ...formData, manager: e.target.value })
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

// 팀원 초대 모달
function InviteMemberModal({
  teamId,
  onClose,
  onSave,
}: InviteMemberModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(teamId, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">팀원 초대</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-white mb-2">역할</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
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
              초대
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 권한 설정 모���
function PermissionsModal({ team, onClose, onSave }: PermissionsModalProps) {
  const [permissions, setPermissions] = useState(team.permissions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(team.id, permissions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A0F1E] rounded-2xl p-6 w-full max-w-md border border-white/[0.05]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">팀 권한 설정</h3>
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
            <div className="flex items-center justify-between">
              <label className="text-white">설정 관리</label>
              <input
                type="checkbox"
                checked={permissions.canManageSettings}
                onChange={(e) =>
                  setPermissions({
                    ...permissions,
                    canManageSettings: e.target.checked,
                  })
                }
                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/40"
              />
            </div>
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

export default function Teams() {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSaveTeam = (teamData: Partial<Team>) => {
    // 실제 구현에서는 여기서 팀을 저장합니다
    console.log('팀 저장:', teamData);
  };

  const handleInviteMember = (
    teamId: string,
    memberData: { email: string; role: string }
  ) => {
    // 실제 구현에서는 여기서 팀원을 초대합니다
    console.log('팀원 초대:', { teamId, memberData });
  };

  const handleSavePermissions = (
    teamId: string,
    permissions: TeamPermissions
  ) => {
    // 실제 구현에서는 여기서 권한을 저장합니다
    console.log('권한 저장:', { teamId, permissions });
  };

  const filteredTeams = teamsData.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">팀 관리</h1>
        <button
          onClick={() => setShowTeamModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />새 팀 만들기
        </button>
      </div>

      {/* 검색 */}
      <div className="w-full md:max-w-md">
        <input
          type="text"
          placeholder="팀 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* 팀 목록 */}
      <div className="space-y-4">
        {filteredTeams.map((team) => (
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
                  <span className="text-white/40">팀장: {team.manager}</span>
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
                    <div className="text-white font-medium">{member.name}</div>
                    <div className="text-white/60 text-sm">{member.email}</div>
                  </div>
                  <div className="text-white/40">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {showTeamModal && (
        <TeamModal
          team={selectedTeam || undefined}
          onClose={() => {
            setShowTeamModal(false);
            setSelectedTeam(null);
          }}
          onSave={handleSaveTeam}
        />
      )}
      {showInviteModal && selectedTeam && (
        <InviteMemberModal
          teamId={selectedTeam.id}
          onClose={() => {
            setShowInviteModal(false);
            setSelectedTeam(null);
          }}
          onSave={handleInviteMember}
        />
      )}
      {showPermissionsModal && selectedTeam && (
        <PermissionsModal
          team={selectedTeam}
          onClose={() => {
            setShowPermissionsModal(false);
            setSelectedTeam(null);
          }}
          onSave={handleSavePermissions}
        />
      )}
    </div>
  );
}
