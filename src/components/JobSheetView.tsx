import React, { useState, useEffect } from 'react';
import { JobModule } from '../data/jobsheetData';
import { CommodityBundle } from '../data/commoditiesData';
import { StepGradeRecord, StepProgressState, UserProfile } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Calculator, 
  Lightbulb, 
  Sparkles,
  Camera,
  Layers,
  Award,
  Maximize2,
  ClipboardCheck,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { resolveImageUrl } from '../utils/images';

interface JobSheetViewProps {
  commodity: CommodityBundle;
  initialJobId?: number;
  progress: StepProgressState;
  stepGrades?: Record<number, Record<number, StepGradeRecord>>;
  onUpdateStep: (jobId: number, stepId: number, completed: boolean) => void;
  onGoToLogbook: (jobId: number) => void;
  onGoToStepGrading?: (jobId: number) => void;
  onGoToPlanning?: () => void;
  currentUser: UserProfile;
}

export const JobSheetView: React.FC<JobSheetViewProps> = ({
  commodity,
  initialJobId = 1,
  progress,
  stepGrades = {},
  onUpdateStep,
  onGoToLogbook,
  onGoToStepGrading,
  onGoToPlanning,
  currentUser
}) => {
  const [selectedJobId, setSelectedJobId] = useState<number>(initialJobId);
  const [showNumeracySolution, setShowNumeracySolution] = useState<boolean>(false);
  const [showBannerPhoto, setShowBannerPhoto] = useState<boolean>(false);

  useEffect(() => {
    setSelectedJobId(initialJobId);
    setShowNumeracySolution(false);
  }, [commodity.id, initialJobId]);

  const modules = commodity.modules;
  const info = commodity.info;

  const currentJob: JobModule = modules.find(j => j.id === selectedJobId) || modules[0];
  const jobProgress = progress[selectedJobId] || { completedStepIds: [], numeracyAnswered: false };
  const completedCount = jobProgress.completedStepIds.length;
  const totalSteps = currentJob.steps.length;

  const handleToggleStep = (stepId: number) => {
    const isCompleted = jobProgress.completedStepIds.includes(stepId);
    onUpdateStep(selectedJobId, stepId, !isCompleted);

    // If completing the last step, celebrate!
    if (!isCompleted && completedCount + 1 === totalSteps) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Overview Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 tracking-wide mb-2 uppercase">
              <span>{info.classPhase}</span>
              <span>·</span>
              <span>{info.publisher}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
              {info.title}
            </h1>
            <p className="text-emerald-100 text-sm leading-relaxed mb-4">
              {info.subtitle}. Panduan praktik bertahap komoditas {commodity.name} ({commodity.latinName}) mulai dari sanitasi hingga analisis kelayakan usaha pascapanen. Siswa aktif: {currentUser.name}.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-700/60 text-xs">
              {info.growthRequirements.map((req, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-emerald-300 font-medium text-[11px]">{req.factor}</span>
                  <span className="font-semibold text-white truncate" title={req.value}>{req.value}</span>
                </div>
              ))}
            </div>

            {onGoToPlanning && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onGoToPlanning}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buka Panel Perencanaan {commodity.name}</span>
                </button>
              </div>
            )}
          </div>

          {/* Visual Field Photo Showcase */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={() => setShowBannerPhoto(true)}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-slate-900 text-left block"
            >
              <img
                src={resolveImageUrl(commodity.imageUrl, commodity.id)}
                alt={`Referensi Lahan ${commodity.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                <Maximize2 className="w-3 h-3" />
                <span>Lihat Penuh</span>
              </span>
              <div className="absolute bottom-2.5 left-3 right-3">
                <div className="text-xs font-bold text-white">Referensi Lahan {commodity.name}</div>
                <div className="text-[10px] text-emerald-200 italic">{commodity.latinName} · {commodity.harvestDays}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Job Selector / Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {modules.map((job) => {
          const prog = progress[job.id] || { completedStepIds: [] };
          const isDone = prog.completedStepIds.length === job.steps.length;
          const isSelected = job.id === selectedJobId;

          return (
            <button
              key={job.id}
              onClick={() => {
                setSelectedJobId(job.id);
                setShowNumeracySolution(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap border shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-700/20'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isSelected ? 'bg-white text-emerald-700' : isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {job.id}
              </span>
              <span>Job {job.id}: {job.title}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Job Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Steps and Interactive Workflow */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Module Header Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  MODUL JOB {currentJob.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {currentJob.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentJob.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Progres Langkah</div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {completedCount} / {totalSteps} Selesai
                  </div>
                </div>
                <button
                  onClick={() => onGoToLogbook(currentJob.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Foto Lahan</span>
                </button>
              </div>
            </div>

            {/* Meta Tags: Alokasi & Tempat */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Alokasi Waktu: <strong className="text-slate-900 dark:text-white">{currentJob.allocation}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Tempat: <strong className="text-slate-900 dark:text-white">{currentJob.location}</strong></span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Section D: Langkah Kerja (Checklist Interaktif) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>D. Langkah Kerja & Ceklis Hasil di Lahan</span>
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {(currentUser.role === 'instruktur' || currentUser.role === 'admin') && onGoToStepGrading && (
                  <button
                    type="button"
                    onClick={() => onGoToStepGrading(currentJob.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Nilai Langkah Kerja Siswa</span>
                  </button>
                )}
                <span className="text-xs text-slate-500">
                  Centang setiap selesai melakukan langkah SOP
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {currentJob.steps.map((step) => {
                const isStepDone = jobProgress.completedStepIds.includes(step.id);
                const teacherGrade = stepGrades[currentJob.id]?.[step.id];

                return (
                  <div
                    key={step.id}
                    onClick={() => handleToggleStep(step.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isStepDone
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                    >
                      {isStepDone ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${
                          isStepDone ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-slate-900 dark:text-white'
                        }`}>
                          Langkah {step.id}. {step.title}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          isStepDone 
                            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {isStepDone ? 'Tuntas' : 'Belum'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.detail}
                      </p>
                      <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">Standar Hasil:</span>
                        <span>{step.standard}</span>
                      </div>
                      {teacherGrade && (
                        <div className="mt-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="font-bold">
                            Nilai Guru: {teacherGrade.score}/4 ({teacherGrade.verified ? 'Sah Sesuai SOP' : 'Perlu Perbaikan'})
                          </span>
                          <span>·</span>
                          <span>Oleh {teacherGrade.gradedBy.split(',')[0]}</span>
                          {teacherGrade.notes && (
                            <span className="text-slate-600 dark:text-slate-300">
                              — &ldquo;{teacherGrade.notes}&rdquo;
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Tantangan Numerasi */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Tantangan Numerasi Budidaya (Job {currentJob.id})
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Kalkulasi Lapangan
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 leading-relaxed space-y-2">
              <p className="font-medium text-sm text-slate-900 dark:text-white">
                {currentJob.numeracyChallenge.question}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setShowNumeracySolution(!showNumeracySolution)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                {showNumeracySolution ? 'Sembunyikan Kunci & Cara Hitung' : 'Lihat Kunci & Pembahasan Numerasi'}
              </button>
              <span className="text-xs text-slate-500">
                Sesuai Kunci Job Sheet PT East West Seed Indonesia
              </span>
            </div>

            {showNumeracySolution && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-3 animate-fadeIn">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Langkah Penyelesaian Sistematis:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-700 dark:text-slate-300">
                  {currentJob.numeracyChallenge.solutionExplanation.map((sol, idx) => (
                    <li key={idx} className="font-mono text-xs">{sol}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Right 1 Column: Objectives, Tools & Materials, K3, Tips */}
        <div className="space-y-6">
          
          {/* Section C: K3 Safety Alert Box */}
          <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>C. Keselamatan & Kesehatan Kerja (K3)</span>
            </div>
            <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-200/90 pl-4 list-disc">
              {currentJob.k3Guidelines.map((rule, idx) => (
                <li key={idx} className="leading-relaxed">{rule}</li>
              ))}
            </ul>
          </div>

          {/* Section A: Tujuan Pembelajaran */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>A. Tujuan Pembelajaran</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pl-4 list-disc">
              {currentJob.learningObjectives.map((obj, idx) => (
                <li key={idx} className="leading-relaxed">{obj}</li>
              ))}
            </ul>
          </div>

          {/* Section B: Alat dan Bahan */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>B. Alat dan Bahan (Per Kelompok)</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-72 overflow-y-auto pr-1">
              {currentJob.toolsAndMaterials.map((tool, idx) => (
                <div key={idx} className="py-2 flex items-start justify-between gap-2 text-xs">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{tool.name}</div>
                    <div className="text-[11px] text-slate-500">{tool.spec}</div>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                    {tool.qty}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section E: Tips dari Lapangan */}
          <div className="p-5 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              <span>Tips Praktis dari Lapangan</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-900 dark:text-emerald-200/90 pl-4 list-disc">
              {currentJob.fieldTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      <PhotoLightboxModal
        isOpen={showBannerPhoto}
        onClose={() => setShowBannerPhoto(false)}
        imageUrl={resolveImageUrl(commodity.imageUrl, commodity.id)}
        title={`Foto Referensi Lahan ${commodity.name}`}
        subtitle={`${commodity.latinName} · Panen ${commodity.harvestDays}`}
        caption={commodity.shortDesc}
      />

    </div>
  );
};
