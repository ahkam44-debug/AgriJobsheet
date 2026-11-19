import React, { useState, useMemo } from 'react';
import {
  CommodityId,
  FieldLogEntry,
  StepGradeRecord,
  StepGradeScale,
  StudentProgressDirectory,
  StudentStepGradesMap,
  UserProfile
} from '../types';
import { COMMODITIES, COMMODITY_LIST } from '../data/commoditiesData';
import {
  Award,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Layers,
  RotateCcw,
  ShieldCheck,
  Sprout,
  UserCheck,
  XCircle,
  Maximize2
} from 'lucide-react';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { resolveImageUrl } from '../utils/images';

interface TeacherStepGradingViewProps {
  users: UserProfile[];
  currentUser: UserProfile;
  selectedCommodityId: CommodityId;
  onSelectCommodity: (commodityId: CommodityId) => void;
  initialJobId?: number;
  studentProgressDir: StudentProgressDirectory;
  stepGradesMap: StudentStepGradesMap;
  logs: FieldLogEntry[];
  onToggleStudentStep: (studentId: string, commodityId: CommodityId, jobId: number, stepId: number, completed: boolean) => void;
  onSaveStepGrade: (
    studentId: string,
    commodityId: CommodityId,
    jobId: number,
    stepId: number,
    record: StepGradeRecord
  ) => void;
  onBatchGradeJob: (
    studentId: string,
    commodityId: CommodityId,
    jobId: number,
    records: Record<number, StepGradeRecord>,
    alsoMarkCompletedIds?: number[]
  ) => void;
  onResetJobGrades: (studentId: string, commodityId: CommodityId, jobId: number) => void;
}

const SCORE_LABELS: Record<StepGradeScale, { label: string; short: string }> = {
  1: { label: '1 · Belum Sesuai', short: 'Kurang' },
  2: { label: '2 · Cukup', short: 'Cukup' },
  3: { label: '3 · Baik / Kompeten', short: 'Kompeten' },
  4: { label: '4 · Sangat Baik / Sesuai SOP', short: 'Sesuai SOP' }
};

function getPredicate(score100: number): string {
  if (score100 >= 90) return 'A (Sangat Kompeten)';
  if (score100 >= 80) return 'B (Kompeten)';
  if (score100 >= 75) return 'C (Cukup Kompeten)';
  return 'D (Perlu Bimbingan)';
}

export const TeacherStepGradingView: React.FC<TeacherStepGradingViewProps> = ({
  users,
  currentUser,
  selectedCommodityId,
  onSelectCommodity,
  initialJobId = 1,
  studentProgressDir,
  stepGradesMap,
  logs,
  onToggleStudentStep,
  onSaveStepGrade,
  onBatchGradeJob,
  onResetJobGrades
}) => {
  const isAssessor = currentUser.role === 'instruktur' || currentUser.role === 'admin';
  const studentUsers = useMemo(() => users.filter((u) => u.role === 'peserta'), [users]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    if (currentUser.role === 'peserta') return currentUser.id;
    return studentUsers[0]?.id || currentUser.id;
  });
  const [selectedJobId, setSelectedJobId] = useState<number>(initialJobId);
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    title: string;
    subtitle: string;
    caption: string;
  } | null>(null);

  const activeStudent =
    studentUsers.find((u) => u.id === selectedStudentId) || studentUsers[0] || currentUser;

  const commodity = COMMODITIES[selectedCommodityId];
  const currentJob = commodity.modules.find((m) => m.id === selectedJobId) || commodity.modules[0];

  const studentCommodityProgress = studentProgressDir[activeStudent.id]?.[selectedCommodityId] || {};
  const completedStepIds = studentCommodityProgress[currentJob.id]?.completedStepIds || [];

  const studentCommodityGrades = stepGradesMap[activeStudent.id]?.[selectedCommodityId] || {};
  const currentJobGrades = studentCommodityGrades[currentJob.id] || {};

  // Compute job and overall commodity statistics
  const jobSummaries = commodity.modules.map((job) => {
    const doneIds = studentCommodityProgress[job.id]?.completedStepIds || [];
    const gradesObj = studentCommodityGrades[job.id] || {};
    const gradedEntries = Object.values(gradesObj);
    const totalSteps = job.steps.length;
    const avgScore100 =
      gradedEntries.length > 0
        ? Math.round(
            (gradedEntries.reduce((sum, g) => sum + g.score, 0) / (totalSteps * 4)) * 100
          )
        : 0;
    const avgOfGraded100 =
      gradedEntries.length > 0
        ? Math.round(
            (gradedEntries.reduce((sum, g) => sum + g.score, 0) / (gradedEntries.length * 4)) * 100
          )
        : 0;

    return {
      job,
      doneCount: doneIds.length,
      totalSteps,
      gradedCount: gradedEntries.length,
      verifiedCount: gradedEntries.filter((g) => g.verified).length,
      avgScore100,
      avgOfGraded100
    };
  });

  const totalCommoditySteps = jobSummaries.reduce((acc, j) => acc + j.totalSteps, 0);
  const totalStudentDone = jobSummaries.reduce((acc, j) => acc + j.doneCount, 0);
  const totalTeacherGraded = jobSummaries.reduce((acc, j) => acc + j.gradedCount, 0);
  const totalWeightedPoints = commodity.modules.reduce((acc, job) => {
    const gMap = studentCommodityGrades[job.id] || {};
    return acc + Object.values(gMap).reduce((s, r) => s + r.score, 0);
  }, 0);
  const overallStepScore100 =
    totalCommoditySteps > 0 ? Math.round((totalWeightedPoints / (totalCommoditySteps * 4)) * 100) : 0;

  const currentJobSummary = jobSummaries.find((j) => j.job.id === currentJob.id) || jobSummaries[0];

  // Related field logs for the selected student, commodity & job
  const relatedLogs = logs.filter(
    (l) =>
      l.commodityId === selectedCommodityId &&
      l.jobId === currentJob.id &&
      (l.userId === activeStudent.id || l.studentName.toLowerCase() === activeStudent.name.toLowerCase())
  );

  const handleSetScore = (stepId: number, score: StepGradeScale) => {
    if (!isAssessor) return;
    const prev = currentJobGrades[stepId];
    onSaveStepGrade(activeStudent.id, selectedCommodityId, currentJob.id, stepId, {
      score,
      verified: score >= 3 ? true : prev?.verified ?? false,
      notes: prev?.notes || '',
      gradedBy: currentUser.name,
      gradedAt: Date.now()
    });
  };

  const handleToggleVerified = (stepId: number) => {
    if (!isAssessor) return;
    const prev = currentJobGrades[stepId];
    onSaveStepGrade(activeStudent.id, selectedCommodityId, currentJob.id, stepId, {
      score: prev?.score || 3,
      verified: !(prev?.verified ?? false),
      notes: prev?.notes || '',
      gradedBy: currentUser.name,
      gradedAt: Date.now()
    });
  };

  const handleUpdateNote = (stepId: number, notes: string) => {
    if (!isAssessor) return;
    const prev = currentJobGrades[stepId];
    onSaveStepGrade(activeStudent.id, selectedCommodityId, currentJob.id, stepId, {
      score: prev?.score || 3,
      verified: prev?.verified ?? true,
      notes,
      gradedBy: currentUser.name,
      gradedAt: Date.now()
    });
  };

  const handleGradeCompletedStepsPerfect = () => {
    if (!isAssessor || completedStepIds.length === 0) return;
    const records: Record<number, StepGradeRecord> = {};
    completedStepIds.forEach((stepId) => {
      const prev = currentJobGrades[stepId];
      records[stepId] = {
        score: 4,
        verified: true,
        notes: prev?.notes || 'Dilaksanakan sesuai instruksi & standar hasil Job Sheet.',
        gradedBy: currentUser.name,
        gradedAt: Date.now()
      };
    });
    onBatchGradeJob(activeStudent.id, selectedCommodityId, currentJob.id, records);
  };

  const handleMarkAndGradeAllSteps = () => {
    if (!isAssessor) return;
    const records: Record<number, StepGradeRecord> = {};
    const allStepIds: number[] = [];
    currentJob.steps.forEach((step) => {
      allStepIds.push(step.id);
      const prev = currentJobGrades[step.id];
      records[step.id] = {
        score: prev?.score || 4,
        verified: true,
        notes: prev?.notes || 'Tuntas & dinilai sesuai standar SOP Job Sheet.',
        gradedBy: currentUser.name,
        gradedAt: Date.now()
      };
    });
    onBatchGradeJob(activeStudent.id, selectedCommodityId, currentJob.id, records, allStepIds);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <ClipboardCheck className="w-4 h-4" />
              <span>Instrumen Penilaian Praktik Lapangan Guru / Tim Penilai</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Penilaian Langkah Kerja Siswa Sesuai Instruksi Job Sheet
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Periksa ketuntasan setiap langkah SOP siswa, verifikasi kesesuaian hasil di lahan, dan berikan skor 1–4 beserta catatan umpan balik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 font-mono tabular-nums">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                Nilai Langkah Komoditas
              </span>
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                {overallStepScore100}/100
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-xs">
              <div className="text-slate-600 dark:text-slate-300">
                Tuntas Siswa: <strong>{totalStudentDone}/{totalCommoditySteps}</strong>
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Dinilai Guru: <strong>{totalTeacherGraded}/{totalCommoditySteps}</strong>
              </div>
            </div>
          </div>
        </div>

        {!isAssessor && (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Anda sedang masuk sebagai <strong>Siswa</strong>. Nilai dan verifikasi setiap langkah kerja hanya dapat diisi atau diubah oleh akun <strong>Guru / Tim Penilai</strong>.
            </span>
          </div>
        )}

        {/* Student & Commodity Selector Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="md:col-span-6 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Pilih Siswa yang Dinilai ({studentUsers.length} Siswa Terdaftar)
            </label>
            {isAssessor ? (
              <select
                value={activeStudent.id}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {studentUsers.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.name} — {stu.identifier} ({stu.className})
                  </option>
                ))}
              </select>
            ) : (
              <div className="px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{activeStudent.name} · {activeStudent.identifier}</span>
              </div>
            )}
          </div>

          <div className="md:col-span-6 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Komoditas Job Sheet
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMODITY_LIST.map((item) => {
                const active = item.id === selectedCommodityId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectCommodity(item.id);
                      setSelectedJobId(1);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 7-Job Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {jobSummaries.map((item) => {
          const isSelected = item.job.id === currentJob.id;
          const allGraded = item.gradedCount === item.totalSteps && item.totalSteps > 0;

          return (
            <button
              key={item.job.id}
              type="button"
              onClick={() => setSelectedJobId(item.job.id)}
              className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-700/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`text-[11px] font-bold font-mono ${
                    isSelected ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  Job {item.job.id}
                </span>
                {allGraded && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`}
                  />
                )}
              </div>

              <div
                className={`text-xs font-bold line-clamp-2 leading-snug ${
                  isSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                }`}
              >
                {item.job.title}
              </div>

              <div
                className={`text-[10px] font-mono tabular-nums pt-1 border-t ${
                  isSelected
                    ? 'border-emerald-500 text-emerald-100'
                    : 'border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div>Siswa: {item.doneCount}/{item.totalSteps}</div>
                <div>
                  Nilai: {item.gradedCount > 0 ? `${item.avgScore100}` : '-'} ({item.gradedCount}/{item.totalSteps})
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Step Grading Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Step-by-step Grading Checklist */}
        <section className="lg:col-span-8 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Job {currentJob.id} · {commodity.name}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentJob.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentJob.subtitle} · {currentJob.allocation}
                </p>
              </div>

              <div className="text-right font-mono tabular-nums">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Skor Job {currentJob.id} ({activeStudent.name.split(' ')[0]})
                </div>
                <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {currentJobSummary.avgScore100} / 100
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  {currentJobSummary.gradedCount > 0
                    ? getPredicate(currentJobSummary.avgScore100)
                    : 'Belum Dinilai'}
                </div>
              </div>
            </div>

            {/* Batch Grading Toolbar for Teacher */}
            {isAssessor && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={completedStepIds.length === 0}
                    onClick={handleGradeCompletedStepsPerfect}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Nilai 4 (Sesuai SOP) Langkah Tuntas ({completedStepIds.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMarkAndGradeAllSteps}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tuntas & Nilai Semua Langkah</span>
                  </button>
                </div>

                {currentJobSummary.gradedCount > 0 && (
                  <button
                    type="button"
                    onClick={() => onResetJobGrades(activeStudent.id, selectedCommodityId, currentJob.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Nilai Job Ini</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Step Cards */}
          <div className="space-y-3">
            {currentJob.steps.map((step) => {
              const isStudentDone = completedStepIds.includes(step.id);
              const gradeRecord = currentJobGrades[step.id];

              return (
                <div
                  key={step.id}
                  className={`p-5 rounded-3xl border bg-white dark:bg-slate-900 transition-colors space-y-3.5 ${
                    gradeRecord?.verified
                      ? 'border-emerald-300 dark:border-emerald-800'
                      : isStudentDone
                      ? 'border-blue-200 dark:border-blue-900'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Step Header & Instruction */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-[240px]">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                          Langkah {step.id}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            isStudentDone
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {isStudentDone ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Diselesaikan Siswa</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              <span>Belum Diceklis Siswa</span>
                            </>
                          )}
                        </span>
                        {gradeRecord && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span
                              className={`font-bold ${
                                gradeRecord.verified
                                  ? 'text-emerald-700 dark:text-emerald-400'
                                  : 'text-amber-700 dark:text-amber-400'
                              }`}
                            >
                              {gradeRecord.verified
                                ? `Sah (${gradeRecord.score}/4)`
                                : `Perlu Perbaikan (${gradeRecord.score}/4)`}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    {isAssessor && (
                      <button
                        type="button"
                        onClick={() =>
                          onToggleStudentStep(
                            activeStudent.id,
                            selectedCommodityId,
                            currentJob.id,
                            step.id,
                            !isStudentDone
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-colors shrink-0 cursor-pointer ${
                          isStudentDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        {isStudentDone ? 'Batalkan Ceklis Siswa' : 'Tandai Selesai Dilaksanakan'}
                      </button>
                    )}
                  </div>

                  {/* Standar Hasil Job Sheet */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      Standar Instruksi Job Sheet:{' '}
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{step.standard}</span>
                  </div>

                  {/* Rubric Buttons & Verification Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
                    <div className="sm:col-span-8">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                        Penilaian Kesesuaian Langkah (Skala 1–4):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {([1, 2, 3, 4] as StepGradeScale[]).map((val) => {
                          const isChosen = gradeRecord?.score === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              disabled={!isAssessor}
                              onClick={() => handleSetScore(step.id, val)}
                              className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer disabled:cursor-not-allowed ${
                                isChosen
                                  ? val >= 3
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                    : val === 2
                                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                    : 'bg-red-600 text-white border-red-600 shadow-sm'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                              }`}
                            >
                              {val} · {SCORE_LABELS[val].short}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="sm:col-span-4 flex flex-col justify-end">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                        Status Verifikasi Guru:
                      </div>
                      <button
                        type="button"
                        disabled={!isAssessor}
                        onClick={() => handleToggleVerified(step.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed ${
                          gradeRecord?.verified
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {gradeRecord?.verified ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Sah Sesuai SOP</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-slate-400" />
                            <span>Belum Disahkan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step Feedback Note */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      type="text"
                      disabled={!isAssessor}
                      value={gradeRecord?.notes || ''}
                      onChange={(e) => handleUpdateNote(step.id, e.target.value)}
                      placeholder={
                        isAssessor
                          ? 'Catatan penilaian guru untuk langkah ini (opsional)...'
                          : 'Belum ada catatan guru pada langkah ini'
                      }
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {gradeRecord && (
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        Penilai: {gradeRecord.gradedBy.split(',')[0]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right 4 Cols: Field Evidence Photos + 7-Job Recap */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          {/* Related Field Logbook Photos */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>Bukti Foto Lapangan (Job {currentJob.id})</span>
              </div>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                {relatedLogs.length} log
              </span>
            </div>

            {relatedLogs.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                Belum ada unggahan foto logbook dari {activeStudent.name} untuk Job {currentJob.id} ({commodity.name}).
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {relatedLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800/50"
                  >
                    {log.photoUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            url: resolveImageUrl(log.photoUrl, log.commodityId),
                            title: log.activityTitle,
                            subtitle: `${log.studentName} · ${log.date} (${log.hstOrPhase})`,
                            caption: log.notes
                          })
                        }
                        className="group relative w-full h-36 bg-slate-200 dark:bg-slate-800 block overflow-hidden cursor-pointer"
                      >
                        <img
                          src={resolveImageUrl(log.photoUrl, log.commodityId)}
                          alt={log.activityTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 text-white text-[10px] font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" />
                          <span>Perbesar</span>
                        </span>
                      </button>
                    )}
                    <div className="p-3 space-y-1 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {log.activityTitle}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                        {log.date} · Tinggi {log.plantHeightCm} cm · {log.leafCount} daun
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                        {log.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7-Job Recap Table */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Rekap Nilai Langkah ({commodity.name})</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {jobSummaries.map((item) => (
                <button
                  key={item.job.id}
                  type="button"
                  onClick={() => setSelectedJobId(item.job.id)}
                  className="w-full py-2.5 flex items-center justify-between gap-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white truncate">
                      Job {item.job.id}: {item.job.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                      Siswa {item.doneCount}/{item.totalSteps} · Dinilai {item.gradedCount}/{item.totalSteps}
                    </div>
                  </div>
                  <div className="font-mono font-extrabold text-sm tabular-nums text-emerald-700 dark:text-emerald-400 shrink-0">
                    {item.gradedCount > 0 ? item.avgScore100 : '-'}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Rata-rata Total ({commodity.name})
              </span>
              <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                {overallStepScore100} / 100
              </span>
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
