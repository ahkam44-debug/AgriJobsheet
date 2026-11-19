import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import {
  Users,
  UserPlus,
  GraduationCap,
  Briefcase,
  Search,
  Edit3,
  Trash2,
  UserCheck,
  Fingerprint,
  Phone,
  Building2,
  Layers,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Save,
  LayoutGrid,
  Table2,
  Award,
  Check,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { BulkUserImportModal } from './BulkUserImportModal';

interface UserManagementViewProps {
  users: UserProfile[];
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  onAddUser: (user: UserProfile) => void;
  onAddBulkUsers: (users: UserProfile[]) => void;
  onUpdateUser: (user: UserProfile) => void;
  onDeleteUser: (userId: string) => void;
}

interface InlineDraft {
  name: string;
  identifier: string;
  role: UserRole;
  className: string;
  groupName: string;
  expertise: string;
  phone: string;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  currentUser,
  onSelectUser,
  onAddUser,
  onAddBulkUsers,
  onUpdateUser,
  onDeleteUser
}) => {
  const [filterRole, setFilterRole] = useState<'all' | 'peserta' | 'instruktur' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'inline'>('cards');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  const canManageUsers = currentUser.role === 'admin';

  // Inline table edit drafts keyed by user.id
  const [inlineDrafts, setInlineDrafts] = useState<Record<string, InlineDraft>>({});
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());

  // Reset inline edit mode if switched to non-admin account
  useEffect(() => {
    if (!canManageUsers && viewMode === 'inline') {
      setViewMode('cards');
    }
  }, [canManageUsers, viewMode]);

  // Sync inline drafts when users change (for untouched rows)
  useEffect(() => {
    setInlineDrafts(prev => {
      const next: Record<string, InlineDraft> = {};
      users.forEach(u => {
        if (prev[u.id] && dirtyIds.has(u.id)) {
          next[u.id] = prev[u.id];
        } else {
          next[u.id] = {
            name: u.name,
            identifier: u.identifier,
            role: u.role,
            className: u.className,
            groupName: u.groupName || '',
            expertise: u.expertise || '',
            phone: u.phone || ''
          };
        }
      });
      return next;
    });
  }, [users, dirtyIds]);

  // Modal Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('peserta');
  const [formIdentifier, setFormIdentifier] = useState('');
  const [formSchool, setFormSchool] = useState('SMK Negeri Pertanian Pembangunan 5 Konawe');
  const [formClassName, setFormClassName] = useState('KELAS XI ATPH');
  const [formGroupName, setFormGroupName] = useState('Kelompok 1 (Bedengan Blok A)');
  const [formPhone, setFormPhone] = useState('');
  const [formExpertise, setFormExpertise] = useState('');
  const [formBioAuth, setFormBioAuth] = useState(true);

  const showSaveFeedback = (message: string) => {
    setSaveBanner(message);
    window.setTimeout(() => {
      setSaveBanner(prev => (prev === message ? null : prev));
    }, 4000);
  };

  // Reset form
  const resetForm = () => {
    setFormName('');
    setFormRole('peserta');
    setFormIdentifier('');
    setFormSchool('SMK Negeri Pertanian Pembangunan 5 Konawe');
    setFormClassName('KELAS XI ATPH');
    setFormGroupName('Kelompok 1 (Bedengan Blok A)');
    setFormPhone('');
    setFormExpertise('');
    setFormBioAuth(true);
    setEditingUserId(null);
  };

  const handleOpenAdd = () => {
    if (!canManageUsers) return;
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (user: UserProfile) => {
    if (!canManageUsers && user.id !== currentUser.id) return;
    setEditingUserId(user.id);
    setFormName(user.name);
    setFormRole(user.role);
    setFormIdentifier(user.identifier);
    setFormSchool(user.school);
    setFormClassName(user.className);
    setFormGroupName(user.groupName || '');
    setFormPhone(user.phone || '');
    setFormExpertise(user.expertise || '');
    setFormBioAuth(user.bioAuthEnabled);
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formIdentifier.trim()) return;

    if (editingUserId) {
      const existing = users.find(u => u.id === editingUserId);
      const updated: UserProfile = {
        ...(existing || {}),
        id: editingUserId,
        name: formName.trim(),
        role: formRole,
        identifier: formIdentifier.trim(),
        school: formSchool.trim() || 'SMK Negeri Pertanian Pembangunan 5 Konawe',
        className: formClassName.trim(),
        groupName: formGroupName.trim() || undefined,
        phone: formPhone.trim() || undefined,
        expertise: formExpertise.trim() || undefined,
        bioAuthEnabled: formBioAuth,
        status: existing?.status || 'aktif'
      };
      onUpdateUser(updated);
      showSaveFeedback(`Data "${updated.name}" (${updated.identifier}) berhasil diperbarui.`);
    } else {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: formName.trim(),
        role: formRole,
        identifier: formIdentifier.trim(),
        school: formSchool.trim() || 'SMK Negeri Pertanian Pembangunan 5 Konawe',
        className: formClassName.trim(),
        groupName: formGroupName.trim() || undefined,
        phone: formPhone.trim() || undefined,
        expertise: formExpertise.trim() || undefined,
        bioAuthEnabled: formBioAuth,
        status: 'aktif'
      };
      onAddUser(newUser);
      showSaveFeedback(`Akun baru "${newUser.name}" berhasil ditambahkan.`);
    }

    setShowAddModal(false);
    resetForm();
  };

  // Inline table draft handlers
  const handleInlineFieldChange = (
    userId: string,
    field: keyof InlineDraft,
    value: string
  ) => {
    setInlineDrafts(prev => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {
          name: '',
          identifier: '',
          role: 'peserta' as UserRole,
          className: '',
          groupName: '',
          expertise: '',
          phone: ''
        }),
        [field]: value
      }
    }));
    setDirtyIds(prev => {
      const next = new Set(prev);
      next.add(userId);
      return next;
    });
  };

  const handleSaveInlineRow = (user: UserProfile) => {
    const draft = inlineDrafts[user.id];
    if (!draft || !draft.name.trim() || !draft.identifier.trim()) return;

    const updated: UserProfile = {
      ...user,
      name: draft.name.trim(),
      identifier: draft.identifier.trim(),
      role: draft.role,
      className: draft.className.trim(),
      groupName: draft.groupName.trim() || undefined,
      expertise: draft.expertise.trim() || undefined,
      phone: draft.phone.trim() || undefined
    };
    onUpdateUser(updated);
    setDirtyIds(prev => {
      const next = new Set(prev);
      next.delete(user.id);
      return next;
    });
    showSaveFeedback(`Perubahan data "${updated.name}" berhasil disimpan.`);
  };

  const handleSaveAllInline = () => {
    let savedCount = 0;
    users.forEach(user => {
      if (!dirtyIds.has(user.id)) return;
      const draft = inlineDrafts[user.id];
      if (!draft || !draft.name.trim() || !draft.identifier.trim()) return;
      onUpdateUser({
        ...user,
        name: draft.name.trim(),
        identifier: draft.identifier.trim(),
        role: draft.role,
        className: draft.className.trim(),
        groupName: draft.groupName.trim() || undefined,
        expertise: draft.expertise.trim() || undefined,
        phone: draft.phone.trim() || undefined
      });
      savedCount += 1;
    });
    setDirtyIds(new Set());
    if (savedCount > 0) {
      showSaveFeedback(`${savedCount} perubahan data guru & siswa berhasil disimpan sekaligus.`);
    }
  };

  // Filtered list
  const filteredUsers = users.filter(user => {
    const matchRole = filterRole === 'all' || user.role === filterRole;
    const matchSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.groupName && user.groupName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.expertise && user.expertise.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRole && matchSearch;
  });

  const studentCount = users.filter(u => u.role === 'peserta').length;
  const teacherCount = users.filter(u => u.role === 'instruktur').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  const getRoleLabel = (user: UserProfile) => {
    if (user.role === 'instruktur') {
      return user.identifier.includes('EWI') ? 'Instruktur Industri' : 'Guru Pembimbing';
    }
    if (user.role === 'admin') return 'Pimpinan / Admin';
    return 'Siswa (Peserta)';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span>Manajemen Pengguna Aplikasi</span>
            <span>·</span>
            <span>SMKNPP 5 Konawe &amp; Mitra Industri</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Panel Data Guru, Instruktur &amp; Siswa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {canManageUsers
              ? 'Anda masuk sebagai Kepala Sekolah / Admin. Anda berwenang menambah, menghapus, serta mengedit seluruh data Guru & Siswa.'
              : 'Lihat daftar Guru & Siswa terdaftar serta edit data profil Anda sendiri melalui menu Edit Data Saya.'}
          </p>
        </div>

        {canManageUsers ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowBulkModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-sm transition-all cursor-pointer"
              title="Masukkan daftar pegawai, guru, atau siswa secara kolektif (paste Excel / upload CSV)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>+ Tambah Kolektif (Daftar Pegawai)</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Tambah Pengguna Baru</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Tambah Akun: Khusus Kepsek &amp; Admin</span>
          </div>
        )}
      </div>

      {/* Authorization Info Strip */}
      <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Otoritas penambahan &amp; pengelolaan seluruh akun Guru/Siswa:{' '}
            <strong className="text-slate-900 dark:text-white">Kepala Sekolah (IKHWAL, S.TP., M.Sc.)</strong>
            {' '}dan{' '}
            <strong className="text-slate-900 dark:text-white">Admin (Ahkam, S.Pd.Gr.,M.Pd.)</strong>.
          </span>
        </div>
        {!canManageUsers && (
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            Anda dapat mengedit data pribadi Anda sendiri
          </span>
        )}
      </div>

      {/* Save Confirmation Feedback */}
      {saveBanner && (
        <div className="px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{saveBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveBanner(null)}
            className="text-emerald-700 dark:text-emerald-300 hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active User Self-Edit Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span>Profil Akun Anda Sekarang</span>
              <span aria-hidden="true">·</span>
              <span>{getRoleLabel(currentUser)}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
              {currentUser.name}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-mono font-semibold">{currentUser.identifier}</span>
              <span aria-hidden="true">·</span>
              <span>{currentUser.className}</span>
              {currentUser.groupName && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{currentUser.groupName}</span>
                </>
              )}
              {currentUser.phone && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{currentUser.phone}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleOpenEdit(currentUser)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Data Saya</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Pengguna</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">{users.length}</span>
          <span className="text-[10px] text-slate-500 block">Akun terdaftar</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-600 block">Siswa (Peserta Praktik)</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">{studentCount}</span>
          <span className="text-[10px] text-slate-500 block">Kelas X, XI &amp; XII ATPH (2026/2027)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-semibold text-blue-600 block">Guru &amp; Instruktur</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">{teacherCount}</span>
          <span className="text-[10px] text-slate-500 block">PNS, PPPK &amp; Guru Honor</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-600 block">Pimpinan &amp; Admin</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">{adminCount}</span>
          <span className="text-[10px] text-slate-500 block">Kepala Sekolah &amp; Pengelola</span>
        </div>
      </div>

      {/* Search, Filters & View Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, NISN, NIP, NUPTK, kelas, atau status..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterRole === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Semua ({users.length})
          </button>
          <button
            onClick={() => setFilterRole('peserta')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterRole === 'peserta'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Siswa ({studentCount})
          </button>
          <button
            onClick={() => setFilterRole('instruktur')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterRole === 'instruktur'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Guru &amp; Instruktur ({teacherCount})
          </button>
          <button
            onClick={() => setFilterRole('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterRole === 'admin'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Admin ({adminCount})
          </button>
        </div>

        {/* Mode Tampilan: Kartu vs Edit Cepat Tabel (khusus Kepsek & Admin) */}
        {canManageUsers && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kartu</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('inline')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'inline'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>Edit Cepat Tabel</span>
            </button>
          </div>
        )}
      </div>

      {/* Mode 1: Users Grid (Kartu dengan tombol Edit Data jelas) */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => {
            const isCurrent = user.id === currentUser.id;
            const roleLabel = getRoleLabel(user);

            let roleColorText = 'text-emerald-700 dark:text-emerald-400';
            if (user.role === 'instruktur') {
              roleColorText = 'text-blue-700 dark:text-blue-400';
            } else if (user.role === 'admin') {
              roleColorText = 'text-amber-700 dark:text-amber-400';
            }

            return (
              <div
                key={user.id}
                className={`p-5 rounded-3xl bg-white dark:bg-slate-800/90 border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  {/* Header row: Avatar + Name + Role text */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {user.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block truncate">
                          {user.identifier}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold whitespace-nowrap shrink-0 ${roleColorText}`}>
                      {roleLabel}
                    </span>
                  </div>

                  {/* Details list */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user.className}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user.school}</span>
                    </div>

                    {user.groupName && (
                      <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{user.groupName}</span>
                      </div>
                    )}

                    {user.expertise && (
                      <div className="flex items-center gap-2 text-[11px] text-blue-700 dark:text-blue-400 font-medium">
                        <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{user.expertise}</span>
                      </div>
                    )}

                    {user.phone && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Biometric Status indicator */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <Fingerprint className={`w-3.5 h-3.5 ${user.bioAuthEnabled ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{user.bioAuthEnabled ? 'Sidik Jari Biometrik Aktif' : 'Biometrik Nonaktif'}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {(canManageUsers || isCurrent) ? (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(user)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400'
                        }`}
                        title={`Edit data ${user.name}`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isCurrent ? 'Edit Data Saya' : 'Edit Data'}</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Lock className="w-3 h-3" />
                        <span>Hanya Pemilik / Admin</span>
                      </span>
                    )}

                    {canManageUsers && users.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteUser(user.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                        title="Hapus Akun"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Akun Aktif</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectUser(user)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Pakai Akun</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Inline Quick Edit Table for Guru & Siswa */}
      {viewMode === 'inline' && (
        <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/50">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">Mode Edit Cepat:</strong> Ubah langsung Nama, NISN/NIP/NUPTK, Peran, Kelas/Status, Kelompok/Unit, atau No. HP pada tabel lalu klik <strong>Simpan</strong>.
            </div>
            {dirtyIds.size > 0 && (
              <button
                type="button"
                onClick={handleSaveAllInline}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Semua Perubahan ({dirtyIds.size})</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 min-w-[180px]">Nama Lengkap</th>
                  <th className="p-3 min-w-[170px]">NISN / NIP / NUPTK</th>
                  <th className="p-3 min-w-[130px]">Peran</th>
                  <th className="p-3 min-w-[180px]">Kelas / Jabatan</th>
                  <th className="p-3 min-w-[170px]">Kelompok / Unit</th>
                  <th className="p-3 min-w-[130px]">No. WhatsApp</th>
                  <th className="p-3 text-right min-w-[170px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/80">
                {filteredUsers.map((user) => {
                  const draft = inlineDrafts[user.id] || {
                    name: user.name,
                    identifier: user.identifier,
                    role: user.role,
                    className: user.className,
                    groupName: user.groupName || '',
                    expertise: user.expertise || '',
                    phone: user.phone || ''
                  };
                  const isDirty = dirtyIds.has(user.id);
                  const isCurrent = user.id === currentUser.id;

                  return (
                    <tr
                      key={user.id}
                      className={
                        isDirty
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                          : isCurrent
                          ? 'bg-slate-50/70 dark:bg-slate-800/60'
                          : ''
                      }
                    >
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={draft.name}
                          onChange={(e) => handleInlineFieldChange(user.id, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={draft.identifier}
                          onChange={(e) => handleInlineFieldChange(user.id, 'identifier', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-2.5">
                        <select
                          value={draft.role}
                          onChange={(e) => handleInlineFieldChange(user.id, 'role', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="peserta">Siswa</option>
                          <option value="instruktur">Guru / Instruktur</option>
                          <option value="admin">Pimpinan / Admin</option>
                        </select>
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={draft.className}
                          onChange={(e) => handleInlineFieldChange(user.id, 'className', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={draft.groupName}
                          placeholder="Kelompok / Blok..."
                          onChange={(e) => handleInlineFieldChange(user.id, 'groupName', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={draft.phone}
                          placeholder="08xx..."
                          onChange={(e) => handleInlineFieldChange(user.id, 'phone', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-2.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveInlineRow(user)}
                            disabled={!isDirty}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              isDirty
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-default'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Simpan</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(user)}
                            className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-xs font-semibold cursor-pointer"
                            title="Edit lengkap (termasuk sekolah, keahlian & biometrik)"
                          >
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tambah / Edit Pengguna */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-4">

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600">
                  {editingUserId ? <Edit3 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingUserId ? 'Edit Data Guru / Siswa' : 'Tambah Pengguna Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {editingUserId
                      ? 'Perbarui nama, NISN/NIP/NUPTK, kelas/jabatan, atau kontak akun masing-masing'
                      : 'Daftarkan siswa (NISN), guru ASN/P3K (NIP), atau guru non-PNS (NUPTK)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">

              {/* Role Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Peran Akun (Role)
                  </label>
                  {!canManageUsers && (
                    <span className="text-[10px] text-slate-400">
                      Dikunci (hanya Kepsek / Admin yang dapat mengubah peran)
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    onClick={() => {
                      if (!canManageUsers) return;
                      setFormRole('peserta');
                      if (!editingUserId && !formIdentifier.includes('NISN')) {
                        setFormIdentifier('NISN: ');
                      }
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                      !canManageUsers ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      formRole === 'peserta'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Siswa (Peserta)</span>
                  </button>

                  <button
                    type="button"
                    disabled={!canManageUsers}
                    onClick={() => {
                      if (!canManageUsers) return;
                      setFormRole('instruktur');
                      if (!editingUserId && !formIdentifier.includes('NIP') && !formIdentifier.includes('NUPTK')) {
                        setFormIdentifier('NIP: ');
                      }
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                      !canManageUsers ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      formRole === 'instruktur'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Guru / Instruktur</span>
                  </button>

                  <button
                    type="button"
                    disabled={!canManageUsers}
                    onClick={() => {
                      if (!canManageUsers) return;
                      setFormRole('admin');
                      if (!editingUserId && !formIdentifier.includes('NIP')) {
                        setFormIdentifier('NIP: ');
                      }
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                      !canManageUsers ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      formRole === 'admin'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Admin Sekolah</span>
                  </button>
                </div>
              </div>

              {/* Name & Identifier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap {formRole !== 'peserta' && '(Beserta Gelar)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={formRole === 'peserta' ? 'Contoh: AHMAD NUR WAHYUDI' : 'Contoh: Firdaus, S.P.,M.Si.'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {formRole === 'peserta' ? 'Nomor Induk Siswa Nasional (NISN)' : 'NIP (ASN/P3K) atau NUPTK (Non-PNS)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formIdentifier}
                    onChange={(e) => setFormIdentifier(e.target.value)}
                    placeholder={formRole === 'peserta' ? 'Contoh: NISN: 0113721627' : 'Contoh: NIP: 196806062000031009 / NUPTK: 0857781682230022'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* School & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Satuan Pendidikan / Lembaga
                  </label>
                  <input
                    type="text"
                    value={formSchool}
                    onChange={(e) => setFormSchool(e.target.value)}
                    placeholder="Contoh: SMK Negeri Pertanian Pembangunan 5 Konawe"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {formRole === 'peserta' ? 'Kelas / Rombongan Belajar' : 'Jabatan / Tugas Pengampu'}
                  </label>
                  <input
                    type="text"
                    value={formClassName}
                    onChange={(e) => setFormClassName(e.target.value)}
                    placeholder={formRole === 'peserta' ? 'Contoh: XI ATPH 1 (Fase F)' : 'Contoh: Guru Produktif ATPH'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Group & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {formRole === 'peserta' ? 'Kelompok Lahan / Blok Praktik' : 'Unit Kerja / Blok Tanggung Jawab'}
                  </label>
                  <input
                    type="text"
                    value={formGroupName}
                    onChange={(e) => setFormGroupName(e.target.value)}
                    placeholder={formRole === 'peserta' ? 'Contoh: Kelompok 2 (Bedengan Blok B)' : 'Contoh: Blok Greenhouse Melon & Tomat'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor WhatsApp / Kontak (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Expertise field (especially helpful for Guru / Instruktur / Admin) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {formRole === 'peserta' ? 'Minat / Fokus Komoditas Praktik (Opsional)' : 'Bidang Keahlian / Mata Pelajaran Diampu'}
                </label>
                <input
                  type="text"
                  value={formExpertise}
                  onChange={(e) => setFormExpertise(e.target.value)}
                  placeholder={formRole === 'peserta' ? 'Contoh: Budidaya Semangka & Melon' : 'Contoh: Agribisnis Tanaman Pangan & Hortikultura'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Biometric Toggle */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Fingerprint className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Autentikasi Biometrik (Sidik Jari)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Izinkan login cepat menggunakan sensor biometrik perangkat
                    </span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={formBioAuth}
                  onChange={(e) => setFormBioAuth(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  {editingUserId ? 'Simpan Perubahan' : 'Tambahkan Pengguna'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Kolektif Daftar Pegawai, Guru & Siswa (Khusus Kepsek & Admin) */}
      {canManageUsers && (
        <BulkUserImportModal
          isOpen={showBulkModal}
          onClose={() => setShowBulkModal(false)}
          existingUsers={users}
          onImportUsers={onAddBulkUsers}
        />
      )}

    </div>
  );
};
