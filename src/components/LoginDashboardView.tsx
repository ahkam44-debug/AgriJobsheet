import React, { useState } from 'react';
import { CommodityId, CommodityProgressMap, UserProfile } from '../types';
import {
  Fingerprint,
  LogIn,
  Sun,
  Moon,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Search
} from 'lucide-react';
import { SCHOOL_LOGO_URL } from '../utils/images';

interface LoginDashboardViewProps {
  users: UserProfile[];
  initialUser: UserProfile;
  initialCommodityId: CommodityId;
  progressMap: CommodityProgressMap;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenBiometricForUser: (user: UserProfile, commodityId: CommodityId, initialJobId: number) => void;
  onLogin: (user: UserProfile, commodityId: CommodityId, initialJobId: number) => void;
}

type LoginMode = 'siswa' | 'guru';

function normalizeName(val: string): string {
  return val.toLowerCase().replace(/\s+/g, ' ').trim();
}

function normalizeIdNumber(val: string): string {
  return val
    .toLowerCase()
    .replace(/^(nisn|nis|nip|nuptk|id pegawai|id mitra|id)\s*[:.\-]?\s*/i, '')
    .replace(/\s+/g, '')
    .trim();
}

function getIdTypeLabel(identifier: string): string {
  const upper = identifier.trim().toUpperCase();
  if (upper.startsWith('NISN')) return 'NISN';
  if (upper.startsWith('NIS')) return 'NIS';
  if (upper.startsWith('NUPTK')) return 'NUPTK';
  if (upper.startsWith('NIP')) return 'NIP';
  return 'NIP / NUPTK';
}

export const LoginDashboardView: React.FC<LoginDashboardViewProps> = ({
  users,
  initialCommodityId,
  isDark,
  onToggleDark,
  onOpenBiometricForUser,
  onLogin
}) => {
  const [loginMode, setLoginMode] = useState<LoginMode>('siswa');
  const [nameInput, setNameInput] = useState<string>('');
  const [idNumberInput, setIdNumberInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [showRegisteredHint, setShowRegisteredHint] = useState<boolean>(false);
  const [accountFilter, setAccountFilter] = useState<string>('');

  const studentUsers = users.filter((u) => u.role === 'peserta');
  const assessorUsers = users.filter((u) => u.role === 'instruktur' || u.role === 'admin');

  const validateRegisteredCredentials = (): UserProfile | null => {
    const cleanName = normalizeName(nameInput);
    const cleanId = normalizeIdNumber(idNumberInput);

    if (!cleanName || !cleanId) {
      setLoginError(
        loginMode === 'siswa'
          ? 'Nama Siswa dan NISN wajib diisi untuk masuk dan memilih Job Sheet.'
          : 'Nama Guru dan NIP (ASN/P3K) atau NUPTK (Non-PNS) wajib diisi sebagai Tim Penilai.'
      );
      return null;
    }

    const pool = loginMode === 'siswa' ? studentUsers : assessorUsers;
    const matched = pool.find(
      (u) => normalizeName(u.name) === cleanName && normalizeIdNumber(u.identifier) === cleanId
    );

    if (matched) {
      setLoginError('');
      return matched;
    }

    // Helpful diagnostic if user is registered in the other role tab or if ID matches another name
    const idMatchedUser = users.find((u) => normalizeIdNumber(u.identifier) === cleanId);
    if (idMatchedUser) {
      if (loginMode === 'siswa' && idMatchedUser.role !== 'peserta') {
        setLoginError(
          'Nomor induk tersebut terdaftar sebagai Guru / Tim Penilai. Silakan pindah ke tab "Guru / Tim Penilai".'
        );
        return null;
      }
      if (loginMode === 'guru' && idMatchedUser.role === 'peserta') {
        setLoginError(
          'NISN tersebut terdaftar sebagai Siswa. Silakan pindah ke tab "Siswa (Peserta)".'
        );
        return null;
      }
      const idType = getIdTypeLabel(idMatchedUser.identifier);
      setLoginError(
        `${idType} cocok dengan data terdaftar atas nama "${idMatchedUser.name}". Pastikan Nama ditulis persis sesuai data terdaftar.`
      );
      return null;
    }

    const nameMatchedUser = users.find((u) => normalizeName(u.name) === cleanName);
    if (nameMatchedUser) {
      const expectedType =
        nameMatchedUser.role === 'peserta' ? 'NISN' : getIdTypeLabel(nameMatchedUser.identifier);
      setLoginError(
        `Nama "${nameMatchedUser.name}" ditemukan, namun ${expectedType} tidak sesuai dengan data resmi.`
      );
      return null;
    }

    setLoginError(
      loginMode === 'siswa'
        ? 'Nama dan NISN siswa tidak terdaftar pada aplikasi. Hubungi Kepala Sekolah atau Admin untuk pendaftaran akun.'
        : 'Nama dan NIP (ASN/P3K) / NUPTK (Non-PNS) belum terdaftar pada aplikasi. Hubungi Kepala Sekolah atau Admin.'
    );
    return null;
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedUser = validateRegisteredCredentials();
    if (!matchedUser) return;
    onLogin(matchedUser, initialCommodityId, 1);
  };

  const handleBiometricVerify = () => {
    const matchedUser = validateRegisteredCredentials();
    if (!matchedUser) return;
    if (!matchedUser.bioAuthEnabled) {
      setLoginError(`Autentikasi biometrik belum diaktifkan untuk akun ${matchedUser.name}. Silakan masuk melalui tombol Masuk Panel.`);
      return;
    }
    onOpenBiometricForUser(matchedUser, initialCommodityId, 1);
  };

  const handleSwitchMode = (mode: LoginMode) => {
    setLoginMode(mode);
    setLoginError('');
    setAccountFilter('');
  };

  const fillCredentialFromList = (usr: UserProfile) => {
    setLoginMode(usr.role === 'peserta' ? 'siswa' : 'guru');
    setNameInput(usr.name);
    setIdNumberInput(usr.identifier.replace(/^(NISN|NIS|NIP|NUPTK|ID Pegawai|ID Mitra)\s*:\s*/i, ''));
    setLoginError('');
  };

  const activePool = loginMode === 'siswa' ? studentUsers : assessorUsers;
  const filteredHintAccounts = accountFilter.trim()
    ? activePool.filter(
        (u) =>
          u.name.toLowerCase().includes(accountFilter.toLowerCase()) ||
          u.identifier.toLowerCase().includes(accountFilter.toLowerCase()) ||
          u.className.toLowerCase().includes(accountFilter.toLowerCase())
      )
    : activePool;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Compact Header */}
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={SCHOOL_LOGO_URL}
              alt="Logo SMK Negeri Pertanian Pembangunan 5 Konawe"
              referrerPolicy="no-referrer"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                AgriJobSheet
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                SMK Negeri Pertanian Pembangunan 5 Konawe · SMK BISA!
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleDark}
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0 cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Mode Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Mode Gelap</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Centered Focused Login Panel */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg space-y-5">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
            {/* School Identity & Title */}
            <div className="text-center space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img
                src={SCHOOL_LOGO_URL}
                alt="Logo Resmi SMKNPP 5 Konawe"
                referrerPolicy="no-referrer"
                className="w-20 h-20 mx-auto object-contain drop-shadow-sm"
              />
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 pt-1">
                Jobsheet Digital
              </p>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug [text-wrap:balance]">
                SMK NEGERI PERTANIAN PEMBANGUNAN 5 KONAWE
              </h1>
              <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                SMK BISA!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                {loginMode === 'siswa'
                  ? 'Masukkan Nama Siswa dan NISN yang terdaftar pada aplikasi untuk masuk dan memilih Job Sheet.'
                  : 'Masukkan Nama Guru dan NIP (untuk ASN/P3K) atau NUPTK (untuk Non-PNS) yang terdaftar pada aplikasi.'}
              </p>
            </div>

            {/* Segmented Role Selector: Siswa vs Guru / Tim Penilai */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => handleSwitchMode('siswa')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  loginMode === 'siswa'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Siswa ({studentUsers.length})</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchMode('guru')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  loginMode === 'guru'
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Guru / Tim Penilai ({assessorUsers.length})</span>
              </button>
            </div>

            {/* Strict Login Form */}
            <form onSubmit={handleSubmitLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {loginMode === 'siswa'
                    ? 'Nama Siswa (Sesuai Data Resmi Sekolah)'
                    : 'Nama Guru / Tim Penilai (Sesuai Data Resmi Sekolah)'}
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder={
                    loginMode === 'siswa'
                      ? 'Contoh: AHMAD NUR WAHYUDI'
                      : 'Contoh: Ahkam, S.Pd.Gr.,M.Pd.'
                  }
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {loginMode === 'siswa'
                    ? 'Nomor Induk Siswa Nasional (NISN)'
                    : 'NIP (ASN / P3K) atau NUPTK (Non-PNS)'}
                </label>
                <input
                  type="text"
                  required
                  value={idNumberInput}
                  onChange={(e) => {
                    setIdNumberInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder={
                    loginMode === 'siswa'
                      ? 'Contoh: 0113721627'
                      : 'Contoh: 198804042023211010 atau 0857781682230022'
                  }
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {loginMode === 'siswa'
                    ? 'Masukkan 10 digit NISN siswa Kelas X, XI, atau XII ATPH.'
                    : 'Guru PNS / PPPK / PPPK Paruh Waktu memakai NIP; Guru Honor Sekolah (Non-PNS) memakai NUPTK.'}
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-2.5 pt-1">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {loginMode === 'siswa'
                      ? 'Masuk & Pilih Job Sheet'
                      : 'Masuk sebagai Tim Penilai'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleBiometricVerify}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Fingerprint className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verifikasi Sidik Jari Biometrik</span>
                </button>
              </div>
            </form>

            {/* Verification Note & Registered Accounts Reference */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Wajib Terdaftar di Sistem ({users.length} akun aktif)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowRegisteredHint(!showRegisteredHint)}
                  className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Daftar Akun</span>
                  {showRegisteredHint ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {showRegisteredHint && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3 space-y-2.5">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Klik salah satu akun terdaftar di bawah untuk menyalin Nama &amp;{' '}
                    {loginMode === 'siswa' ? 'NISN' : 'NIP / NUPTK'} ke formulir login:
                  </p>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={accountFilter}
                      onChange={(e) => setAccountFilter(e.target.value)}
                      placeholder={
                        loginMode === 'siswa'
                          ? 'Cari nama siswa, NISN, atau kelas (X/XI/XII ATPH)...'
                          : 'Cari nama guru, NIP, NUPTK, atau status...'
                      }
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                    {filteredHintAccounts.length === 0 ? (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center py-3">
                        Tidak ada akun yang cocok dengan pencarian &ldquo;{accountFilter}&rdquo;.
                      </div>
                    ) : (
                      filteredHintAccounts.map((usr) => (
                        <button
                          key={usr.id}
                          type="button"
                          onClick={() => fillCredentialFromList(usr)}
                          className="w-full text-left px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white truncate">
                              {usr.name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate tabular-nums">
                              {usr.identifier} · {usr.className}
                            </div>
                          </div>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Institutional Leadership & Developer Credit */}
          <div className="text-center space-y-1 text-[11px] text-slate-500 dark:text-slate-400 px-2">
            <div>
              Kepala Sekolah:{' '}
              <span className="font-bold text-slate-700 dark:text-slate-200">
                IKHWAL, S.TP., M.Sc.
              </span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              Admin:{' '}
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Ahkam, S.Pd.Gr.,M.Pd.
              </span>
            </div>
            <div>
              Pengembang Aplikasi:{' '}
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Tim IT SMKNPP 5 Konawe
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
