import React from 'react';
import { UserProfile, CommodityId } from '../types';
import { CommodityBundle, COMMODITY_LIST } from '../data/commoditiesData';
import { 
  Wifi, 
  WifiOff, 
  Moon, 
  Sun, 
  Fingerprint, 
  Smartphone, 
  Monitor, 
  Bell, 
  UserCheck,
  RefreshCw,
  MessageCircle,
  FileText,
  LogOut,
  Sprout
} from 'lucide-react';
import { SCHOOL_LOGO_URL } from '../utils/images';

interface HeaderTopBarProps {
  users: UserProfile[];
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  selectedCommodity: CommodityBundle;
  onSelectCommodity: (commodityId: CommodityId) => void;
  onLogout: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenBiometric: () => void;
  onOpenNotifications: () => void;
  onOpenChat: () => void;
  onOpenPdf: () => void;
  unreadNotifsCount: number;
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
  syncQueueCount: number;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  users,
  currentUser,
  onSwitchUser,
  selectedCommodity,
  onSelectCommodity,
  onLogout,
  activeTab,
  onSelectTab,
  isOffline,
  onToggleOffline,
  isDark,
  onToggleDark,
  onOpenBiometric,
  onOpenNotifications,
  onOpenChat,
  onOpenPdf,
  unreadNotifsCount,
  isMobileDeviceView,
  onToggleDeviceView,
  syncQueueCount,
  onTriggerSync,
  isSyncing
}) => {
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Left Zone: Brand wordmark & Commodity Selector */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={SCHOOL_LOGO_URL}
            alt="Logo SMKNPP 5 Konawe"
            referrerPolicy="no-referrer"
            className="w-9 h-9 object-contain shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-sm sm:text-base whitespace-nowrap">
                AgriJobSheet
              </span>
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700">
                <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <select
                  aria-label="Pilih Komoditas Job Sheet"
                  value={selectedCommodity.id}
                  onChange={(e) => onSelectCommodity(e.target.value as CommodityId)}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-transparent focus:outline-none cursor-pointer"
                >
                  {COMMODITY_LIST.map((c) => (
                    <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block truncate">
              Job Sheet {selectedCommodity.name} · SMKN PP 5 Konawe
            </span>
          </div>
        </div>

        {/* Center Zone: Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs xl:text-sm font-medium">
          <button
            onClick={() => onSelectTab('komoditas')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'komoditas'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Komoditas
          </button>
          <button
            onClick={() => onSelectTab('perencanaan')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'perencanaan'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Perencanaan
          </button>
          <button
            onClick={() => onSelectTab('jobsheet')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'jobsheet'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            7 Job Sheet
          </button>
          <button
            onClick={() => onSelectTab('logbook')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'logbook'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Log &amp; Foto
          </button>
          <button
            onClick={() => onSelectTab('penilaian')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'penilaian'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Penilaian Guru
          </button>
          <button
            onClick={() => onSelectTab('evaluasi')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'evaluasi'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kuis &amp; Asesmen
          </button>
          <button
            onClick={() => onSelectTab('analitik')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'analitik'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Analitik
          </button>
          <button
            onClick={() => onSelectTab('pengguna')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'pengguna'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Guru &amp; Siswa
          </button>
          <button
            onClick={() => onSelectTab('python')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 font-mono text-xs ${
              activeTab === 'python'
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Python
          </button>
        </nav>

        {/* Right Zone: Controls & User Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Offline/Online Mode Simulator */}
          <button
            onClick={onToggleOffline}
            title={isOffline ? "Sedang Offline di Lahan (Klik untuk menghubungkan internet)" : "Online (Tersambung ke Server)"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isOffline
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isOffline ? 'Offline Lahan' : 'Tersinkron'}
            </span>
          </button>

          {/* Sync Queue Badge if items waiting */}
          {syncQueueCount > 0 && (
            <button
              onClick={onTriggerSync}
              disabled={isOffline || isSyncing}
              title={`Ada ${syncQueueCount} data offline menunggu sinkron`}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{syncQueueCount}</span>
            </button>
          )}

          {/* Mobile phone simulation toggle */}
          <button
            onClick={onToggleDeviceView}
            title={isMobileDeviceView ? "Kembali ke Tampilan Penuh / Desktop" : "Simulasikan Tampilan HP Android Siswa di Lahan"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMobileDeviceView ? (
              <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Smartphone className="w-4 h-4" />
            )}
          </button>

          {/* Biometric Auth Quick Trigger */}
          <button
            onClick={onOpenBiometric}
            title="Autentikasi Biometrik / Sidik Jari"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Fingerprint className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>

          {/* Push Notifications trigger */}
          <button
            onClick={onOpenNotifications}
            title="Notifikasi Jadwal & Pengingat Harian"
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>

          {/* Live Chat trigger */}
          <button
            onClick={onOpenChat}
            title="Bantuan Teknis Lapangan (Chat Langsung)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          {/* Export PDF */}
          <button
            onClick={onOpenPdf}
            title="Ekspor Laporan Kemajuan dalam Format PDF"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap (Kenyamanan Malam)"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Multi-role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight truncate max-w-[110px]">
                  {currentUser.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize leading-none">
                  {currentUser.role}
                </span>
              </div>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500">{currentUser.className} · {currentUser.identifier}</div>
                </div>
                <div className="py-1 max-h-60 overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    Ganti Peran Pengguna (Multi-Role)
                  </div>
                  {users.map((usr) => (
                    <button
                      key={usr.id}
                      onClick={() => {
                        onSwitchUser(usr);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentUser.id === usr.id
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{usr.name}</span>
                        <span className="text-[10px] text-slate-500">{usr.className}</span>
                      </div>
                      {currentUser.id === usr.id && (
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
                {/* Mobile Commodity Switcher inside dropdown */}
                <div className="sm:hidden px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
                    Komoditas Job Sheet
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {COMMODITY_LIST.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          onSelectCommodity(c.id);
                          setShowRoleMenu(false);
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold text-left transition-colors ${
                          selectedCommodity.id === c.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <button
                    onClick={() => {
                      onSelectTab('perencanaan');
                      setShowRoleMenu(false);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                  >
                    Panel Perencanaan Komoditas
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('penilaian');
                      setShowRoleMenu(false);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg text-center text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                  >
                    Panel Penilaian Langkah Kerja
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('pengguna');
                      setShowRoleMenu(false);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                  >
                    + Kelola / Tambah Guru &amp; Siswa
                  </button>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onLogout();
                    }}
                    className="w-full py-1.5 px-3 rounded-lg text-center text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar ke Panel Login</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
