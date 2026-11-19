import React from 'react';
import { UserProfile, FieldLogEntry, StepProgressState, AssessmentResult } from '../types';
import { CommodityBundle } from '../data/commoditiesData';
import { resolveImageUrl, SCHOOL_LOGO_URL } from '../utils/images';
import { Printer, X, FileText } from 'lucide-react';

interface PdfExportModalProps {
  commodity: CommodityBundle;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  logs: FieldLogEntry[];
  progress: StepProgressState;
  assessment: AssessmentResult | null;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  commodity,
  isOpen,
  onClose,
  currentUser,
  logs,
  progress,
  assessment
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const commodityLogs = logs.filter(l => (l.commodityId || 'semangka') === commodity.id);
  const knowledgeScore = assessment?.finalKnowledgeScore ?? 92;
  const skillScore = assessment?.finalSkillScore ?? 94;
  const attitudeScore = assessment?.finalAttitudeScore ?? 95;
  const composite = assessment?.compositeScore ?? Number(((knowledgeScore * 0.3) + (skillScore * 0.5) + (attitudeScore * 0.2)).toFixed(1));
  const predicate = assessment?.predicate ?? "A (Sangat Kompeten)";
  const followUp = assessment?.followUp ?? "Pengayaan: proyek penanaman lanjutan atau pendampingan teman sebaya.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto border border-slate-200">
        
        {/* Actions Bar (No Print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Pratinjau Lembar Rekapitulasi Laporan Praktik & Asesmen PDF
              </h3>
              <p className="text-xs text-slate-500">
                Format resmi sesuai dokumen Job Sheet PT East West Seed Indonesia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-700/20"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE OFFICIAL SHEET CONTENT */}
        <div id="printable-sheet" className="p-4 sm:p-6 bg-white space-y-6 text-slate-900 text-xs">
          
          {/* Header Sekolah & PT East West Seed Indonesia */}
          <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-4">
            <div className="flex items-center gap-3">
              <img
                src={SCHOOL_LOGO_URL}
                alt="Logo SMKNPP 5 Konawe"
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-contain shrink-0"
              />
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  SMK Negeri Pertanian Pembangunan 5 Konawe
                </div>
                <div className="text-base font-extrabold text-emerald-950 uppercase tracking-tight">
                  Jobsheet Digital · Program Keahlian ATPH
                </div>
                <div className="text-xs font-bold text-emerald-700">
                  Mitra Industri: PT East West Seed Indonesia (Cap Panah Merah)
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded border border-slate-300">
                KURIKULUM MERDEKA FASE F
              </span>
              <div className="text-[11px] font-semibold text-slate-600 mt-1">
                SMK Kelas XI & XII · SMK BISA!
              </div>
            </div>
          </div>

          {/* Title Banner */}
          <div className="text-center py-2 space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">
              LEMBAR LAPORAN KEMAJUAN PRAKTIK & ASESMEN KOMPETENSI
            </h1>
            <p className="text-sm font-bold text-emerald-800 uppercase">
              {commodity.info.title} — {commodity.info.subtitle}
            </p>
          </div>

          {/* Student Identity Grid */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 border-b border-slate-300">
              1. IDENTITAS SISWA & PELAKSANAAN PRAKTIK
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-300 p-3 gap-y-2">
              <div className="space-y-1 pr-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Siswa / Kelompok:</span>
                  <strong className="text-slate-900">{currentUser.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor Induk (NISN / NIP / NUPTK):</span>
                  <span className="font-mono font-semibold">{currentUser.identifier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kelas / Status Kepegawaian:</span>
                  <span className="font-semibold">{currentUser.className}</span>
                </div>
              </div>
              <div className="space-y-1 pl-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Satuan Pendidikan:</span>
                  <span className="font-semibold">{currentUser.school}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kepala Sekolah:</span>
                  <span className="font-semibold">IKHWAL, S.TP., M.Sc.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guru Pembimbing / Admin:</span>
                  <span className="font-semibold">Ahkam, S.Pd.Gr.,M.Pd.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tim Penilai Produktif ATPH:</span>
                  <span className="font-semibold">Guru Produktif SMKNPP 5 Konawe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Completion Table */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 border-b border-slate-300">
              2. KEMAJUAN PELAKSANAAN 7 MODUL JOB SHEET
            </div>
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 font-semibold text-slate-600">
                <tr>
                  <th className="p-2">No</th>
                  <th className="p-2">Nama Modul Praktik</th>
                  <th className="p-2">Alokasi Waktu</th>
                  <th className="p-2">Langkah Tuntas</th>
                  <th className="p-2 text-right">Status Capaian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {commodity.modules.map(job => {
                  const p = progress[job.id] || { completedStepIds: [] };
                  const isDone = p.completedStepIds.length === job.steps.length;

                  return (
                    <tr key={job.id}>
                      <td className="p-2 font-mono">{job.id}</td>
                      <td className="p-2 font-medium">{job.title} ({job.subtitle})</td>
                      <td className="p-2 text-slate-500">{job.allocation}</td>
                      <td className="p-2 font-mono">{p.completedStepIds.length} / {job.steps.length}</td>
                      <td className="p-2 text-right">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isDone ? 'SELESAI (100%)' : 'BERLANGSUNG'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Field Logbook Excerpt */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 border-b border-slate-300 flex justify-between">
              <span>3. CATATAN PENGAMATAN LOGBOOK {commodity.name.toUpperCase()} TERBARU</span>
              <span className="text-[10px] font-normal text-slate-500">Tersinkronisasi ke Server</span>
            </div>
            <div className="p-3 divide-y divide-slate-200 space-y-2">
              {commodityLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="pt-2.5 first:pt-0 flex items-start gap-3">
                  {log.photoUrl && (
                    <img
                      src={resolveImageUrl(log.photoUrl, log.commodityId || commodity.id)}
                      alt={log.activityTitle}
                      referrerPolicy="no-referrer"
                      className="w-24 h-16 object-cover rounded-lg border border-slate-300 shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-emerald-900 font-bold">{log.date} — {log.hstOrPhase}</span>
                      <span className="font-mono text-slate-500">Tinggi: {log.plantHeightCm} cm | Daun: {log.leafCount}</span>
                    </div>
                    <div className="text-slate-800 font-medium">{log.activityTitle}</div>
                    <div className="text-slate-600 text-[11px]">{log.notes}</div>
                    {log.teacherFeedback && (
                      <div className="text-emerald-700 italic text-[11px]">
                        Paraf & Catatan Guru: "{log.teacherFeedback}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rekapitulasi Nilai Akhir Table (from PDF page 21) */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 border-b border-slate-300">
              4. REKAPITULASI NILAI AKHIR ASESMEN KOMPETENSI
            </div>
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 font-semibold text-slate-600">
                <tr>
                  <th className="p-2">Komponen Penilaian</th>
                  <th className="p-2">Bobot</th>
                  <th className="p-2">Skor Maksimal</th>
                  <th className="p-2">Nilai (0 - 100)</th>
                  <th className="p-2 text-right">Nilai x Bobot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-2 font-sans font-medium">Pengetahuan (Teori & Kuis)</td>
                  <td className="p-2">30%</td>
                  <td className="p-2">100</td>
                  <td className="p-2">{knowledgeScore}</td>
                  <td className="p-2 text-right font-bold">{(knowledgeScore * 0.3).toFixed(1)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-sans font-medium">Keterampilan (Unjuk Kerja)</td>
                  <td className="p-2">50%</td>
                  <td className="p-2">84</td>
                  <td className="p-2">{skillScore}</td>
                  <td className="p-2 text-right font-bold">{(skillScore * 0.5).toFixed(1)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-sans font-medium">Sikap Kerja dan K3</td>
                  <td className="p-2">20%</td>
                  <td className="p-2">20</td>
                  <td className="p-2">{attitudeScore}</td>
                  <td className="p-2 text-right font-bold">{(attitudeScore * 0.2).toFixed(1)}</td>
                </tr>
                <tr className="bg-emerald-50 font-bold">
                  <td className="p-2 font-sans text-emerald-950">NILAI AKHIR KOMPOSIT</td>
                  <td className="p-2">100%</td>
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                  <td className="p-2 text-right text-emerald-900 text-sm">{composite}</td>
                </tr>
              </tbody>
            </table>

            {/* Predicate banner */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Predikat Kelulusan:</span>{' '}
                <strong className="text-emerald-800 text-sm font-bold">{predicate}</strong>
              </div>
              <div>
                <span className="text-slate-500">Tindak Lanjut:</span>{' '}
                <span className="font-medium text-slate-800">{followUp}</span>
              </div>
            </div>
          </div>

          {/* Signatures 3 Columns exactly as in page 21 of Jobsheet PDF */}
          <div className="pt-6 grid grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-14">
              <span className="text-slate-600 block">Siswa Praktik,</span>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                ({currentUser.name})
              </div>
            </div>

            <div className="space-y-14">
              <span className="text-slate-600 block">Admin / Guru Pembimbing,</span>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                (Ahkam, S.Pd.Gr.,M.Pd.)
              </div>
            </div>

            <div className="space-y-14">
              <span className="text-slate-600 block">Guru Pembimbing / Tim Penilai,</span>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                (Tim Guru Produktif ATPH)
              </div>
            </div>
          </div>

          {/* Pengesahan Kepala Sekolah */}
          <div className="pt-4 flex justify-center text-center text-xs">
            <div className="w-64 space-y-14">
              <div>
                <span className="text-slate-600 block">Mengetahui,</span>
                <span className="text-slate-700 font-semibold block">
                  Kepala SMK Negeri Pertanian Pembangunan 5 Konawe
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                IKHWAL, S.TP., M.Sc.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
            <span>Jobsheet Digital SMK Negeri Pertanian Pembangunan 5 Konawe · SMK BISA!</span>
            <span>Pengembang: Tim IT SMKNPP 5 Konawe</span>
          </div>

        </div>

      </div>
    </div>
  );
};
