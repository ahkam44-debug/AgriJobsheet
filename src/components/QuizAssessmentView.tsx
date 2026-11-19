import React, { useState, useEffect } from 'react';
import { ATTITUDE_ASPECTS } from '../data/jobsheetData';
import { CommodityBundle } from '../data/commoditiesData';
import { AssessmentResult, UserProfile } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizAssessmentViewProps {
  commodity: CommodityBundle;
  currentUser: UserProfile;
  savedAssessment: AssessmentResult | null;
  onSaveAssessment: (result: AssessmentResult) => void;
  onOpenPdfExport: () => void;
}

export const QuizAssessmentView: React.FC<QuizAssessmentViewProps> = ({
  commodity,
  currentUser,
  savedAssessment,
  onSaveAssessment,
  onOpenPdfExport
}) => {
  const [activeSection, setActiveSection] = useState<'pg' | 'uraian' | 'keterampilan' | 'sikap' | 'rekap'>('pg');

  const quizQuestions = commodity.quizQuestions;
  const essayQuestions = commodity.essayQuestions;
  const skillsRubric = commodity.skillsRubric;

  const buildDefaultSkillsScores = () => {
    const initial: Record<number, number> = {};
    skillsRubric.forEach((_, idx) => {
      initial[idx] = 4;
    });
    return initial;
  };

  const buildDefaultAttitudeScores = () => {
    const initial: Record<number, number> = {};
    ATTITUDE_ASPECTS.forEach((item) => {
      initial[item.id] = 4;
    });
    return initial;
  };

  // Answers State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>(
    savedAssessment?.quizAnswers || {}
  );
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(!!savedAssessment);

  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>(
    savedAssessment?.essayAnswers || {}
  );
  const [essayScores, setEssayScores] = useState<Record<number, number>>(
    savedAssessment?.essayScores || { 11: 12, 12: 12, 13: 11, 14: 12, 15: 12 }
  );

  // Practical skills scores (1 to 4 per aspect)
  const [skillsScores, setSkillsScores] = useState<Record<number, number>>(
    () => savedAssessment?.skillsScores || buildDefaultSkillsScores()
  );

  // Attitude scores (1 to 4 per aspect)
  const [attitudeScores, setAttitudeScores] = useState<Record<number, number>>(
    () => savedAssessment?.attitudeScores || buildDefaultAttitudeScores()
  );

  useEffect(() => {
    setQuizAnswers(savedAssessment?.quizAnswers || {});
    setSubmittedQuiz(!!savedAssessment);
    setEssayAnswers(savedAssessment?.essayAnswers || {});
    setEssayScores(savedAssessment?.essayScores || { 11: 12, 12: 12, 13: 11, 14: 12, 15: 12 });
    setSkillsScores(savedAssessment?.skillsScores || buildDefaultSkillsScores());
    setAttitudeScores(savedAssessment?.attitudeScores || buildDefaultAttitudeScores());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commodity.id, savedAssessment]);

  // Calculation logic
  const calculateScores = () => {
    // 1. Pilihan Ganda (max 40)
    let pgScore = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        pgScore += q.points;
      }
    });

    // 2. Uraian (max 60)
    let essayScore = 0;
    essayQuestions.forEach(eq => {
      essayScore += (essayScores[eq.id] || 0);
    });

    // Total Pengetahuan = pgScore (40) + essayScore (60) = 100
    const finalKnowledgeScore = Math.min(100, Math.round(pgScore + essayScore));

    // 3. Keterampilan
    let totalSkillRaw = 0;
    Object.values(skillsScores).forEach(score => {
      totalSkillRaw += score;
    });
    const maxSkillRaw = Math.max(1, skillsRubric.length * 4);
    const finalSkillScore = Math.min(100, Math.round((totalSkillRaw / maxSkillRaw) * 100));

    // 4. Sikap: Total skor (max 20)
    let totalAttitudeRaw = 0;
    Object.values(attitudeScores).forEach(score => {
      totalAttitudeRaw += score;
    });
    const finalAttitudeScore = Math.min(100, Math.round((totalAttitudeRaw / 20) * 100));

    // Composite Final: (Pengetahuan x 0.3) + (Keterampilan x 0.5) + (Sikap x 0.2)
    const compositeScore = Number(
      ((finalKnowledgeScore * 0.3) + (finalSkillScore * 0.5) + (finalAttitudeScore * 0.2)).toFixed(1)
    );

    let predicate: AssessmentResult['predicate'] = "A (Sangat Kompeten)";
    let followUp = "Pengayaan: proyek penanaman lanjutan atau pendampingan teman sebaya.";

    if (compositeScore >= 90) {
      predicate = "A (Sangat Kompeten)";
      followUp = "Pengayaan: proyek penanaman lanjutan atau pendampingan teman sebaya.";
    } else if (compositeScore >= 80) {
      predicate = "B (Kompeten)";
      followUp = "Pemantapan pada aspek yang masih lemah.";
    } else if (compositeScore >= 75) {
      predicate = "C (Cukup Kompeten)";
      followUp = "Bimbingan tambahan dan pengulangan langkah kerja di lahan.";
    } else {
      predicate = "D (Belum Kompeten)";
      followUp = "Remedial: ulangi job yang belum tuntas, lalu asesmen ulang.";
    }

    return {
      pgScore,
      essayScore,
      finalKnowledgeScore,
      finalSkillScore,
      finalAttitudeScore,
      compositeScore,
      predicate,
      followUp
    };
  };

  const scores = calculateScores();

  const handleSelectOption = (questionId: number, optionKey: string) => {
    if (submittedQuiz) return;
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleSubmitQuiz = () => {
    setSubmittedQuiz(true);
    const calculated = calculateScores();
    
    const result: AssessmentResult = {
      userId: currentUser.id,
      studentName: currentUser.name,
      commodityId: commodity.id,
      quizScore: calculated.pgScore,
      quizAnswers,
      essayAnswers,
      essayScores,
      skillsScores,
      attitudeScores,
      finalKnowledgeScore: calculated.finalKnowledgeScore,
      finalSkillScore: calculated.finalSkillScore,
      finalAttitudeScore: calculated.finalAttitudeScore,
      compositeScore: calculated.compositeScore,
      predicate: calculated.predicate,
      followUp: calculated.followUp,
      submittedAt: Date.now(),
      status: 'submitted'
    };

    onSaveAssessment(result);

    if (calculated.compositeScore >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleAutoFillAnswers = () => {
    const perfect: Record<number, string> = {};
    quizQuestions.forEach(q => {
      perfect[q.id] = q.correctAnswer;
    });
    setQuizAnswers(perfect);
    setSubmittedQuiz(true);

    const sampleEssays: Record<number, string> = {};
    const sampleEssayScores: Record<number, number> = {};
    essayQuestions.forEach(eq => {
      sampleEssays[eq.id] = eq.sampleAnswer;
      sampleEssayScores[eq.id] = eq.maxScore;
    });
    setEssayAnswers(sampleEssays);
    setEssayScores(sampleEssayScores);

    const perfectSkills = buildDefaultSkillsScores();
    const perfectAttitude = buildDefaultAttitudeScores();
    setSkillsScores(perfectSkills);
    setAttitudeScores(perfectAttitude);

    const result: AssessmentResult = {
      userId: currentUser.id,
      studentName: currentUser.name,
      commodityId: commodity.id,
      quizScore: 40,
      quizAnswers: perfect,
      essayAnswers: sampleEssays,
      essayScores: sampleEssayScores,
      skillsScores: perfectSkills,
      attitudeScores: perfectAttitude,
      finalKnowledgeScore: 100,
      finalSkillScore: 100,
      finalAttitudeScore: 100,
      compositeScore: 100,
      predicate: "A (Sangat Kompeten)",
      followUp: "Pengayaan: proyek penanaman lanjutan atau pendampingan teman sebaya.",
      submittedAt: Date.now(),
      status: 'submitted'
    };
    onSaveAssessment(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Banner Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span>Sistem Evaluasi Kompetensi</span>
            <span>·</span>
            <span>{commodity.info.classPhase}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Asesmen & Penilaian Budidaya {commodity.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Penilaian mencakup 3 komponen: Pengetahuan (30%), Keterampilan Unjuk Kerja (50%), dan Sikap Kerja & K3 (20%).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFillAnswers}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
            title="Isi jawaban standar untuk demonstrasi penilaian"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulasi Nilai Standar</span>
          </button>

          <button
            onClick={onOpenPdfExport}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Ekspor Lembar PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveSection('pg')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activeSection === 'pg'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          1. Kuis Pilihan Ganda (10 Soal)
        </button>
        <button
          onClick={() => setActiveSection('uraian')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activeSection === 'uraian'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          2. Soal Uraian (5 Soal)
        </button>
        <button
          onClick={() => setActiveSection('keterampilan')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activeSection === 'keterampilan'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          3. Keterampilan Unjuk Kerja (50%)
        </button>
        <button
          onClick={() => setActiveSection('sikap')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activeSection === 'sikap'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          4. Sikap Kerja & K3 (20%)
        </button>
        <button
          onClick={() => setActiveSection('rekap')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activeSection === 'rekap'
              ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          ★ Rekapitulasi Nilai Akhir
        </button>
      </div>

      {/* SECTION 1: PILIHAN GANDA */}
      {activeSection === 'pg' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
            <div>
              <strong className="text-emerald-900 dark:text-emerald-200">Petunjuk Pilihan Ganda:</strong> Pilihlah salah satu jawaban yang paling tepat (masing-masing 4 poin, skor maksimal 40).
            </div>
            {submittedQuiz && (
              <div className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                Skor PG: {scores.pgScore} / 40
              </div>
            )}
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, idx) => {
              const selected = quizAnswers[q.id];
              const isCorrect = selected === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {idx + 1}. {q.question}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      (4 poin)
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isChosen = selected === opt.key;
                      const showResult = submittedQuiz;
                      const isTargetCorrect = opt.key === q.correctAnswer;

                      let btnStyle = "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";

                      if (isChosen && !showResult) {
                        btnStyle = "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold";
                      } else if (showResult) {
                        if (isTargetCorrect) {
                          btnStyle = "bg-green-100 dark:bg-green-950/70 border-green-500 text-green-900 dark:text-green-100 font-bold";
                        } else if (isChosen && !isTargetCorrect) {
                          btnStyle = "bg-red-100 dark:bg-red-950/70 border-red-500 text-red-900 dark:text-red-100 line-through";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.key)}
                          className={`p-3 rounded-2xl border text-xs text-left flex items-start gap-2.5 transition-all ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {opt.key}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {submittedQuiz && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong>Kunci Jawaban: {q.correctAnswer}</strong> — {q.explanation}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500">
              Terjawab: {Object.keys(quizAnswers).length} dari 10 Soal
            </span>
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              {submittedQuiz ? 'Perbarui & Simpan Hasil Kuis' : 'Kirim Jawaban Kuis'}
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: SOAL URAIAN */}
      {activeSection === 'uraian' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
            <strong className="text-emerald-900 dark:text-emerald-200">Petunjuk Soal Uraian:</strong> Jawablah pertanyaan uraian no 11 - 15 (masing-masing maksimal 12 poin, total 60 poin). Jawaban dapat diketik oleh siswa dan dinilai oleh guru pembimbing.
          </div>

          <div className="space-y-4">
            {essayQuestions.map((eq) => (
              <div
                key={eq.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {eq.id}. {eq.question}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs text-slate-500">Skor:</span>
                    <input
                      type="number"
                      min={0}
                      max={eq.maxScore}
                      value={essayScores[eq.id] ?? eq.maxScore}
                      onChange={(e) => {
                        const val = Math.min(eq.maxScore, Math.max(0, parseInt(e.target.value) || 0));
                        setEssayScores(prev => ({ ...prev, [eq.id]: val }));
                      }}
                      className="w-14 px-2 py-1 text-xs text-center font-bold font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                    <span className="text-xs text-slate-400 font-mono">/ {eq.maxScore}</span>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={essayAnswers[eq.id] || eq.sampleAnswer}
                  onChange={(e) => setEssayAnswers(prev => ({ ...prev, [eq.id]: e.target.value }))}
                  placeholder="Ketik uraian jawaban siswa di sini..."
                  className="w-full p-3 text-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200"
                />

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Kunci Jawaban & Rubrik Penilaian (PT East West Seed Indonesia):
                  </div>
                  <p>{eq.sampleAnswer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 font-bold">
              Total Skor Uraian: {scores.essayScore} / 60
            </span>
            <button
              onClick={() => setActiveSection('keterampilan')}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Lanjut ke Asesmen Keterampilan →
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: KETERAMPILAN UNJUK KERJA */}
      {activeSection === 'keterampilan' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <strong className="text-emerald-900 dark:text-emerald-200">Asesmen Keterampilan (Unjuk Kerja):</strong> Guru/instruktur mengamati siswa saat praktik dan memberi skor 1 - 4 pada setiap aspek pekerjaan.
            </div>
            <div className="font-bold text-sm text-emerald-700 dark:text-emerald-300">
              Nilai Keterampilan: {scores.finalSkillScore} / 100 (Bobot 50%)
            </div>
          </div>

          {/* Scoring Rubric Reference */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-emerald-600">Skor 4: Sangat Baik</span>
              <p className="text-[11px] text-slate-500">Semua langkah benar sesuai SOP, mandiri, rapi & K3.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600">Skor 3: Baik</span>
              <p className="text-[11px] text-slate-500">Langkah benar dengan sedikit arahan; hasil sesuai standar.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-amber-600">Skor 2: Cukup</span>
              <p className="text-[11px] text-slate-500">Sebagian keliru/bimbingan; belum sepenuhnya standar.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-red-600">Skor 1: Kurang</span>
              <p className="text-[11px] text-slate-500">Banyak langkah salah/terlewat; hasil tidak sesuai standar.</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Modul Job</th>
                  <th className="py-2.5 px-3">Aspek yang Dinilai</th>
                  <th className="py-2.5 px-3 text-center">Skor (1 - 4)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {skillsRubric.map((item, idx) => {
                  const currentScore = skillsScores[idx] || 4;

                  return (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-3 font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        {item.jobName}
                      </td>
                      <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                        {item.aspect}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4].map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSkillsScores(prev => ({ ...prev, [idx]: s }))}
                              className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors ${
                                currentScore === s
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500">
              {skillsRubric.length} Aspek Telah Dinilai Lengkap
            </span>
            <button
              onClick={() => setActiveSection('sikap')}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Lanjut ke Asesmen Sikap & K3 →
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: SIKAP KERJA & K3 */}
      {activeSection === 'sikap' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <strong className="text-emerald-900 dark:text-emerald-200">Asesmen Sikap Kerja dan K3:</strong> Evaluasi 5 aspek karakter kerja agribisnis: Disiplin, Tanggung Jawab, Kerja Sama, K3, dan Peduli Lingkungan (Skor maksimal 20, bobot 20%).
            </div>
            <div className="font-bold text-sm text-emerald-700 dark:text-emerald-300">
              Nilai Sikap: {scores.finalAttitudeScore} / 100
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {ATTITUDE_ASPECTS.map((item) => {
                const currentScore = attitudeScores[item.id] || 4;

                return (
                  <div key={item.id} className="py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="max-w-xl">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.id}. Aspek {item.aspect}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.indicator}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setAttitudeScores(prev => ({ ...prev, [item.id]: s }))}
                          className={`w-9 h-9 rounded-xl font-bold text-xs transition-colors flex items-center justify-center ${
                            currentScore === s
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500">
              5 Aspek Sikap Dinilai Sesuai Pengamatan Lahan
            </span>
            <button
              onClick={() => setActiveSection('rekap')}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              Lihat Rekapitulasi Nilai Akhir & Predikat →
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: REKAPITULASI NILAI AKHIR */}
      {activeSection === 'rekap' && (
        <div className="space-y-6">
          
          {/* Composite Final Score Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Hasil Akhir Evaluasi Kompetensi
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Predikat: {scores.predicate}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
                  {scores.followUp}
                </p>
              </div>

              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 min-w-[130px]">
                <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-bold">
                  Nilai Akhir
                </span>
                <span className="text-4xl font-extrabold font-mono text-white">
                  {scores.compositeScore}
                </span>
                <span className="text-[10px] text-emerald-200 block">Skala 0 - 100</span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs font-mono text-emerald-200/90">
              Rumus: Nilai Akhir = (Pengetahuan × 0,3) + (Keterampilan × 0,5) + (Sikap × 0,2)
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Rincian Komponen Penilaian Siswa
            </h4>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 text-xs">
              
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">1. Pengetahuan Teori Budidaya</span>
                  <span className="text-slate-500">Kuis Pilihan Ganda ({scores.pgScore}/40) + Uraian ({scores.essayScore}/60)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-slate-800 dark:text-slate-200">{scores.finalKnowledgeScore}</span>
                  <span className="text-[10px] text-slate-400 block">Bobot 30% = {(scores.finalKnowledgeScore * 0.3).toFixed(1)}</span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">2. Keterampilan Unjuk Kerja</span>
                  <span className="text-slate-500">{skillsRubric.length} Aspek Observasi Praktik Lahan (Job 1 hingga 7)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-slate-800 dark:text-slate-200">{scores.finalSkillScore}</span>
                  <span className="text-[10px] text-slate-400 block">Bobot 50% = {(scores.finalSkillScore * 0.5).toFixed(1)}</span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">3. Sikap Kerja dan K3</span>
                  <span className="text-slate-500">Disiplin, Tanggung Jawab, Kerja Sama, K3, Peduli Lingkungan</span>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-slate-800 dark:text-slate-200">{scores.finalAttitudeScore}</span>
                  <span className="text-[10px] text-slate-400 block">Bobot 20% = {(scores.finalAttitudeScore * 0.2).toFixed(1)}</span>
                </div>
              </div>

            </div>

            {/* Scale Standard Reference */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200">
                <strong>90 - 100: A</strong>
                <p className="text-[10px]">Sangat Kompeten (Pengayaan)</p>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                <strong>80 - 89: B</strong>
                <p className="text-[10px]">Kompeten (Pemantapan)</p>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200">
                <strong>75 - 79: C</strong>
                <p className="text-[10px]">Cukup (Bimbingan ulang)</p>
              </div>
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200">
                <strong>&lt; 75: D</strong>
                <p className="text-[10px]">Belum Kompeten (Remedial)</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Siswa: <strong>{currentUser.name}</strong> · {currentUser.className}
              </span>
              <button
                onClick={onOpenPdfExport}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak & Simpan Lembar Raport PDF</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
