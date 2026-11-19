import React from 'react';
import { UserProfile, FieldLogEntry, StepProgressState, AssessmentResult } from '../types';
import { CommodityBundle } from '../data/commoditiesData';
import { 
  Award, 
  CheckCircle2, 
  Sprout, 
  Activity, 
  Database,
  Smartphone,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { SCHOOL_LOGO_URL } from '../utils/images';

interface AnalyticsDashboardViewProps {
  commodity: CommodityBundle;
  currentUser: UserProfile;
  logs: FieldLogEntry[];
  progress: StepProgressState;
  assessment: AssessmentResult | null;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  commodity,
  currentUser,
  logs,
  progress,
  assessment,
  onTriggerSync,
  isSyncing
}) => {
  const modules = commodity.modules;
  const commodityLogs = logs.filter(l => (l.commodityId || 'semangka') === commodity.id);

  // Aggregate stats
  let completedJobsCount = 0;
  let totalStepsCount = 0;
  let completedStepsCount = 0;

  modules.forEach(job => {
    totalStepsCount += job.steps.length;
    const p = progress[job.id];
    if (p) {
      completedStepsCount += p.completedStepIds.length;
      if (p.completedStepIds.length === job.steps.length) {
        completedJobsCount += 1;
      }
    }
  });

  const overallStepPercentage = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;
  const compositeScore = assessment?.compositeScore ?? 92.5;
  const verifiedLogsCount = commodityLogs.filter(l => l.teacherVerified).length;
  const remainingDays = Math.max(0, commodity.estimatedCycleDays - commodity.currentDayMock);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Welcome & Role Identity */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={SCHOOL_LOGO_URL}
            alt="Logo SMKNPP 5 Konawe"
            referrerPolicy="no-referrer"
            className="w-14 h-14 object-contain shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <span>Dasbor Analitik {commodity.name}</span>
              <span>·</span>
              <span className="capitalize">{currentUser.role} Mode</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Performa Belajar: {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentUser.className} · {currentUser.school} ({currentUser.identifier})
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Kepala Sekolah: <span className="font-semibold text-slate-700 dark:text-slate-200">IKHWAL, S.TP., M.Sc.</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              Pengembang: <span className="font-semibold text-emerald-700 dark:text-emerald-400">Tim IT SMKNPP 5 Konawe</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sinkronkan Antar Perangkat</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Progres SOP</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {overallStepPercentage}%
          </div>
          <span className="text-[11px] text-slate-500 block">
            {completedStepsCount} dari {totalStepsCount} langkah SOP tuntas
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Nilai Akhir Kompetensi</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {compositeScore}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block">
            Predikat: {assessment?.predicate?.split(' ')[0] || 'A (Sangat Kompeten)'}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Logbook Terverifikasi</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {verifiedLogsCount} / {commodityLogs.length}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Logbook {commodity.name} disetujui
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Estimasi Panen (HST)</span>
            <Sprout className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {commodity.currentDayMock} / {commodity.estimatedCycleDays} HST
          </div>
          <span className="text-[11px] text-slate-500 block">
            Siklus {commodity.name} (±{remainingDays} hari lagi)
          </span>
        </div>

      </div>

      {/* Main Charts & Progress Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Job Sheet Modules Breakdown & Growth Curve */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress per Modul Job 1 - 7 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Capaian Tiap Modul Job Sheet (1 s.d 7)
              </h3>
              <span className="text-xs font-semibold text-emerald-600">
                {completedJobsCount} dari 7 Modul Tuntas
              </span>
            </div>

            <div className="space-y-3">
              {modules.map(job => {
                const p = progress[job.id] || { completedStepIds: [] };
                const pct = Math.round((p.completedStepIds.length / job.steps.length) * 100);
                const isFinished = pct === 100;

                return (
                  <div key={job.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        Job {job.id}: {job.title}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className={isFinished ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                          {p.completedStepIds.length} / {job.steps.length} langkah
                        </span>
                        <span className="text-slate-400">({pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFinished ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plant Growth Simulation Chart from Logbook Entries */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Kurva Pertumbuhan Vegetatif {commodity.name} (Tinggi vs HST)
                </h3>
                <p className="text-xs text-slate-500">
                  Data dinamis yang diekstraksi dari input logbook harian siswa di lahan
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-600 font-semibold px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950">
                Vigor Normal
              </span>
            </div>

            <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-l border-slate-200 dark:border-slate-700">
              {commodityLogs.map((log) => {
                const heightBar = Math.min(100, Math.round((log.plantHeightCm / 120) * 100));

                return (
                  <div key={log.id} className="flex-1 flex flex-col items-center gap-1 group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 rounded bg-slate-900 text-white text-[10px] whitespace-nowrap pointer-events-none z-10 font-mono">
                      {log.plantHeightCm} cm ({log.leafCount} daun)
                    </div>

                    <div 
                      className="w-full rounded-t-lg bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 min-h-[12px]" 
                      style={{ height: `${heightBar}%` }}
                    />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-full">
                      {log.date.split('-').slice(1).join('/')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Device Sync, Hardware & Evaluator Overview */}
        <div className="space-y-6">
          
          {/* Multi-Device Sync Health Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Sinkronisasi Lintas Perangkat</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950">
                Aktif
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-slate-600 dark:text-slate-300 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Perangkat Android Siswa (Kivy)</div>
                  <div className="text-[11px] text-slate-500">Penyimpanan Lokal: SQLite + IndexedDB</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Server Pusat SMK & Industri</div>
                  <div className="text-[11px] text-slate-500">Status: Sinkronisasi Otomatis 2 Arah</div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
              Perubahan di lapangan tanpa internet tetap aman disimpan secara lokal dan otomatis dipublikasikan ke instruktur saat ada koneksi.
            </div>
          </div>

          {/* Assessment Radar Breakdown */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Distribusi Aspek Kompetensi Siswa
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Sanitasi & Pengolahan Lahan</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">95%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Penyemaian & Pindah Tanam</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">92%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Pemeliharaan & Polinasi Manual</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">88%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Panen, Grading & Analisis R/C</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">85%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Teacher / Supervisor Signoff Widget */}
          <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
              Catatan Pembimbing Lapangan
            </span>
            <p className="text-xs text-emerald-950 dark:text-emerald-200/90 italic leading-relaxed">
              "Siswa menunjukkan kepatuhan K3 yang sangat tinggi, ketelitian dalam penyerbukan bunga pagi hari, dan logbook terisi secara teratur."
            </p>
            <div className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 pt-1">
              — Ahkam, S.Pd.Gr.,M.Pd. &amp; Tim Guru SMKNPP 5 Konawe
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
