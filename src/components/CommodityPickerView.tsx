import React, { useState } from 'react';
import { CommodityId, CommodityProgressMap, UserProfile } from '../types';
import { COMMODITIES, COMMODITY_LIST } from '../data/commoditiesData';
import {
  Sprout,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  Maximize2,
  ArrowRight,
  UserCheck,
  FileText
} from 'lucide-react';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { resolveImageUrl, SCHOOL_LOGO_URL } from '../utils/images';

interface CommodityPickerViewProps {
  currentUser: UserProfile;
  selectedCommodityId: CommodityId;
  progressMap: CommodityProgressMap;
  onOpenJobSheet: (commodityId: CommodityId, jobId: number) => void;
  onOpenPlanning: (commodityId: CommodityId) => void;
}

export const CommodityPickerView: React.FC<CommodityPickerViewProps> = ({
  currentUser,
  selectedCommodityId,
  progressMap,
  onOpenJobSheet,
  onOpenPlanning
}) => {
  const [focusedCommodityId, setFocusedCommodityId] = useState<CommodityId>(selectedCommodityId);
  const [selectedJobId, setSelectedJobId] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    title: string;
    subtitle: string;
    caption: string;
  } | null>(null);

  const activeCommodity = COMMODITIES[focusedCommodityId];

  const getCommodityCompletion = (id: CommodityId) => {
    const bundle = COMMODITIES[id];
    const prog = progressMap[id] || {};
    let totalSteps = 0;
    let doneSteps = 0;
    bundle.modules.forEach((m) => {
      totalSteps += m.steps.length;
      doneSteps += prog[m.id]?.completedStepIds?.length || 0;
    });
    const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;
    return { doneSteps, totalSteps, pct };
  };

  const roleBadgeLabel =
    currentUser.role === 'peserta'
      ? 'Siswa Terdaftar'
      : currentUser.role === 'admin'
      ? 'Tim Penilai / Admin Sekolah'
      : 'Guru / Tim Penilai';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Verified User & Instruction Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={SCHOOL_LOGO_URL}
            alt="Logo SMKNPP 5 Konawe"
            referrerPolicy="no-referrer"
            className="w-14 h-14 object-contain shrink-0"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <UserCheck className="w-4 h-4" />
              <span>{roleBadgeLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{currentUser.identifier}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Selamat Datang, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Pilih salah satu dari {COMMODITY_LIST.length} komoditas budidaya hortikultura dan modul Job Sheet untuk memulai praktik atau penilaian.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
              Kepala Sekolah: <span className="font-semibold text-slate-700 dark:text-slate-200">IKHWAL, S.TP., M.Sc.</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              Admin: <span className="font-semibold text-slate-700 dark:text-slate-200">Ahkam, S.Pd.Gr.,M.Pd.</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              Pengembang: <span className="font-semibold text-emerald-700 dark:text-emerald-400">Tim IT SMKNPP 5 Konawe</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenPlanning(focusedCommodityId)}
            className="px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Perencanaan {activeCommodity.name}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenJobSheet(focusedCommodityId, selectedJobId)}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Buka Job {selectedJobId}: {activeCommodity.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Commodity Cards */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Sprout className="w-4 h-4" />
            <span>Pilih Komoditas Job Sheet ({COMMODITY_LIST.length} Komoditas)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMMODITY_LIST.map((item) => {
              const isSelected = item.id === focusedCommodityId;
              const stats = getCommodityCompletion(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFocusedCommodityId(item.id);
                    setSelectedJobId(1);
                  }}
                  className={`group text-left rounded-2xl overflow-hidden border transition-all flex flex-col bg-white dark:bg-slate-900 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-900/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700 shadow-sm'
                  }`}
                >
                  <div className="relative h-40 sm:h-44 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={resolveImageUrl(item.imageUrl, item.id)}
                      alt={`Lahan praktik budidaya ${item.name}`}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = resolveImageUrl(undefined, item.id);
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage({
                            url: resolveImageUrl(item.imageUrl, item.id),
                            title: `Foto Lahan Komoditas ${item.name}`,
                            subtitle: `${item.latinName} · Estimasi Panen ${item.harvestDays}`,
                            caption: item.shortDesc
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            setLightboxImage({
                              url: resolveImageUrl(item.imageUrl, item.id),
                              title: `Foto Lahan Komoditas ${item.name}`,
                              subtitle: `${item.latinName} · Estimasi Panen ${item.harvestDays}`,
                              caption: item.shortDesc
                            });
                          }
                        }}
                        title="Lihat Foto Ukuran Penuh"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/55 hover:bg-black/80 text-white text-[10px] font-semibold backdrop-blur-xs transition-colors"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Perbesar</span>
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-sm">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Terpilih</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-black/55 text-white text-[10px] font-mono font-semibold backdrop-blur-xs">
                          {item.harvestDays}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <div className="font-extrabold text-base leading-tight drop-shadow-xs">
                        Job Sheet {item.name}
                      </div>
                      <div className="text-[11px] italic text-emerald-200 drop-shadow-xs">
                        {item.latinName}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between w-full">
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {item.shortDesc}
                    </p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono tabular-nums">
                      <span className="text-slate-500 dark:text-slate-400">
                        7 Job · {item.harvestDays}
                      </span>
                      <span
                        className={`font-bold ${
                          isSelected
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Progres {stats.pct}%
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 7 Job Sheet Selector */}
        <aside className="lg:col-span-5 lg:sticky lg:top-20">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Daftar 7 Job Sheet {activeCommodity.name}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {activeCommodity.info.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeCommodity.info.totalJobs}
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {activeCommodity.modules.map((job) => {
                const jobProg = progressMap[focusedCommodityId]?.[job.id];
                const doneCount = jobProg?.completedStepIds?.length || 0;
                const totalSteps = job.steps.length;
                const isJobSelected = job.id === selectedJobId;
                const isCompleted = doneCount === totalSteps && totalSteps > 0;

                return (
                  <div
                    key={job.id}
                    className={`px-4 sm:px-5 py-3 flex items-center justify-between gap-3 transition-colors ${
                      isJobSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/35'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedJobId(job.id)}
                      className="flex-1 text-left flex items-start gap-3 min-w-0 cursor-pointer"
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isJobSelected
                            ? 'bg-emerald-600 text-white'
                            : isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {job.id}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          Job {job.id}: {job.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {job.subtitle}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.allocation.split(' ')[0]} JP
                          </span>
                          <span>·</span>
                          <span className={isCompleted ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}>
                            {doneCount}/{totalSteps} SOP
                          </span>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenJobSheet(focusedCommodityId, job.id)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                    >
                      <span>Buka</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
              <button
                type="button"
                onClick={() => onOpenPlanning(focusedCommodityId)}
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Buka Panel Perencanaan {activeCommodity.name}</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenJobSheet(focusedCommodityId, selectedJobId)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-colors cursor-pointer"
              >
                <span>Masuk ke Job {selectedJobId}: {activeCommodity.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      <PhotoLightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage?.url || ''}
        title={lightboxImage?.title || ''}
        subtitle={lightboxImage?.subtitle}
        caption={lightboxImage?.caption}
      />
    </div>
  );
};
