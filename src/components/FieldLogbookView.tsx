import React, { useState, useRef, useEffect } from 'react';
import { FieldLogEntry, UserProfile } from '../types';
import { CommodityBundle } from '../data/commoditiesData';
import { compressImageFile, FIELD_IMAGE_PRESETS, resolveImageUrl } from '../utils/images';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { 
  Camera, 
  Upload, 
  Plus, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  WifiOff, 
  Wifi, 
  FileCheck, 
  Image as ImageIcon,
  Maximize2
} from 'lucide-react';

interface FieldLogbookViewProps {
  commodity: CommodityBundle;
  logs: FieldLogEntry[];
  onAddLog: (entry: Omit<FieldLogEntry, 'id' | 'timestamp' | 'teacherVerified'>) => void;
  onVerifyLog: (logId: string, feedback: string) => void;
  currentUser: UserProfile;
  isOffline: boolean;
  defaultJobId?: number;
}

export const FieldLogbookView: React.FC<FieldLogbookViewProps> = ({
  commodity,
  logs,
  onAddLog,
  onVerifyLog,
  currentUser,
  isOffline,
  defaultJobId = 5
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [hstOrPhase, setHstOrPhase] = useState(`HST ${commodity.currentDayMock} (Pemeliharaan Lahan)`);
  const [activityTitle, setActivityTitle] = useState(`Pemeliharaan & Pengamatan ${commodity.name}`);
  const [jobId, setJobId] = useState<number>(defaultJobId);
  const [plantHeightCm, setPlantHeightCm] = useState<number>(65.0);
  const [leafCount, setLeafCount] = useState<number>(22);
  const [pestsObserved, setPestsObserved] = useState("Kutu kebul 1 ekor pada yellow sticky trap, kondisi aman.");
  const [notes, setNotes] = useState(`Pelaksanaan praktik ${commodity.name} sesuai SOP Job Sheet di lahan sekolah.`);
  const [photoStage, setPhotoStage] = useState<"sebelum" | "proses" | "sesudah">("proses");
  const [photoPreview, setPhotoPreview] = useState<string>(() => resolveImageUrl(commodity.imageUrl, commodity.id));
  const [isCompressingPhoto, setIsCompressingPhoto] = useState<boolean>(false);
  const [photoError, setPhotoError] = useState<string>('');
  const [filterJob, setFilterJob] = useState<number | 'all'>('all');
  const [lightboxLog, setLightboxLog] = useState<FieldLogEntry | null>(null);
  
  // Instructor verification modal state
  const [verifyingLogId, setVerifyingLogId] = useState<string | null>(null);
  const [teacherNote, setTeacherNote] = useState("");

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHstOrPhase(`HST ${commodity.currentDayMock} (Pemeliharaan Lahan)`);
    setActivityTitle(`Pemeliharaan & Pengamatan ${commodity.name}`);
    setNotes(`Pelaksanaan praktik ${commodity.name} sesuai SOP Job Sheet di lahan sekolah.`);
    setPhotoPreview(resolveImageUrl(commodity.imageUrl, commodity.id));
    setFilterJob('all');
  }, [commodity.id, commodity.currentDayMock, commodity.imageUrl, commodity.name]);

  useEffect(() => {
    setJobId(defaultJobId);
  }, [defaultJobId]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError('');
    setIsCompressingPhoto(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.82);
      setPhotoPreview(compressedDataUrl);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : 'Gagal memproses foto.');
    } finally {
      setIsCompressingPhoto(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle.trim()) return;

    onAddLog({
      userId: currentUser.id,
      studentName: currentUser.name,
      commodityId: commodity.id,
      date,
      hstOrPhase,
      activityTitle,
      jobId,
      plantHeightCm: Number(plantHeightCm) || 0,
      leafCount: Number(leafCount) || 0,
      pestsObserved,
      notes,
      photoUrl: photoPreview,
      photoStage,
      status: isOffline ? 'pending_offline' : 'synced'
    });

    setShowAddForm(false);
  };

  const commodityLogs = logs.filter(log => (log.commodityId || 'semangka') === commodity.id);
  const filteredLogs = commodityLogs.filter(log => {
    if (filterJob === 'all') return true;
    return log.jobId === filterJob;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Header & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Lampiran 1: Logbook Praktik {commodity.name} ({commodity.latinName})
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Laporan Kegiatan & Foto Lahan {commodity.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dicatat setiap kali bekerja di lahan sekolah/screen house. Dilengkapi foto dokumentasi lapangan dan sinkronisasi offline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Offline badge reminder */}
          {isOffline && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-medium">
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span>Tersimpan di Memori HP (Auto-Sync saat Ada Sinyal)</span>
            </div>
          )}

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 shadow-md shadow-emerald-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat Kegiatan & Foto</span>
          </button>
        </div>
      </div>

      {/* Filter by Job Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterJob('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            filterJob === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Semua Kegiatan ({commodityLogs.length})
        </button>
        {commodity.modules.map(j => (
          <button
            key={j.id}
            onClick={() => setFilterJob(j.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              filterJob === j.id
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Job {j.id}: {j.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Add New Activity Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Form Laporan Kegiatan Lahan & Unggah Foto
                </h3>
                <span className="text-xs text-slate-500">
                  {isOffline ? 'Mode Offline: Data otomatis masuk antrean sinkronisasi' : 'Koneksi Online: Tersinkron langsung ke server sekolah'}
                </span>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    HST / Fase Tanaman
                  </label>
                  <input
                    type="text"
                    value={hstOrPhase}
                    onChange={(e) => setHstOrPhase(e.target.value)}
                    placeholder="Contoh: HST 35 (Pembungaan)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Job Sheet Terkait
                  </label>
                  <select
                    value={jobId}
                    onChange={(e) => setJobId(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {commodity.modules.map(j => (
                      <option key={j.id} value={j.id}>Job {j.id}: {j.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tinggi Rata-rata (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={plantHeightCm}
                    onChange={(e) => setPlantHeightCm(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Jumlah Daun Sejati
                  </label>
                  <input
                    type="number"
                    value={leafCount}
                    onChange={(e) => setLeafCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Kegiatan Praktik
                </label>
                <input
                  type="text"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  placeholder="Mis: Polinasi Bunga Betina, Pemupukan Kocor NPK, dll"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pengamatan Organisme Pengganggu Tanaman (OPT)
                </label>
                <input
                  type="text"
                  value={pestsObserved}
                  onChange={(e) => setPestsObserved(e.target.value)}
                  placeholder="Contoh: Kutu kebul 2 ekor pada trap kuning, nihil layu fusarium"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Uraian Langkah Kerja & Pengamatan Lapangan
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Deskripsikan detail langkah SOP yang dikerjakan dan kondisi bedengan..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Unggah Foto Bukti Lapangan</span>
                  </span>
                  
                  {/* Stage Selector */}
                  <div className="flex items-center gap-1 p-0.5 bg-slate-200 dark:bg-slate-700 rounded-lg text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPhotoStage('sebelum')}
                      className={`px-2 py-0.5 rounded-md font-semibold ${photoStage === 'sebelum' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Sebelum
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoStage('proses')}
                      className={`px-2 py-0.5 rounded-md font-semibold ${photoStage === 'proses' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Proses
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoStage('sesudah')}
                      className={`px-2 py-0.5 rounded-md font-semibold ${photoStage === 'sesudah' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Sesudah
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {photoPreview && (
                    <div className="relative w-full aspect-video max-h-60 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900">
                      <img 
                        src={photoPreview} 
                        alt="Pratinjau Foto Bukti Lapangan" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-2 right-2 text-[10px] bg-black/75 text-white px-2 py-0.5 rounded-md uppercase font-bold">
                        Tahap: {photoStage}
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <input 
                      type="file" 
                      ref={galleryInputRef} 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                    <input 
                      type="file" 
                      ref={cameraInputRef} 
                      accept="image/*" 
                      capture="environment" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        disabled={isCompressingPhoto}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isCompressingPhoto ? 'Memproses Foto...' : 'Pilih Foto Galeri / File'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        disabled={isCompressingPhoto}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Ambil Foto Kamera</span>
                      </button>
                    </div>

                    {/* Quick Field Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500">Contoh Foto Lahan:</span>
                      {FIELD_IMAGE_PRESETS.filter(p => p.commodityId === commodity.id || p.commodityId === 'semangka').slice(0, 3).map(preset => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setPhotoPreview(preset.url)}
                          className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                            photoPreview === preset.url
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-300 font-semibold'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {photoError && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                        {photoError}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-500">
                      Foto otomatis dioptimalkan (maks. 1280px JPEG) agar tajam saat diperbesar dan tetap ringan disimpan secara offline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-700/20"
                >
                  Simpan Laporan Kegiatan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Verification Modal for Guru / Instruktur */}
      {verifyingLogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span>Verifikasi & Paraf Laporan Siswa</span>
            </h3>
            <p className="text-xs text-slate-500">
              Sebagai Instruktur / Guru Pembimbing, berikan catatan evaluasi lapangan untuk siswa.
            </p>

            <textarea
              rows={3}
              value={teacherNote}
              onChange={(e) => setTeacherNote(e.target.value)}
              placeholder="Contoh: Sangat baik, teknik penyerbukan sudah tepat. Terus pantau kelembapan mulsa..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setVerifyingLogId(null)}
                className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onVerifyLog(verifyingLogId, teacherNote);
                  setVerifyingLogId(null);
                  setTeacherNote("");
                }}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-sm"
              >
                Verifikasi & Beri Paraf
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Grid */}
      {filteredLogs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 space-y-3">
          <Camera className="w-10 h-10 mx-auto text-slate-400" />
          <div className="text-sm font-semibold">Belum ada catatan logbook untuk kategori ini</div>
          <p className="text-xs max-w-sm mx-auto">
            Gunakan tombol "+ Catat Kegiatan & Foto" saat berada di lahan untuk mendokumentasikan praktik budidaya {commodity.name.toLowerCase()}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLogs.map((log) => {
            return (
              <div 
                key={log.id}
                className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  {/* Photo Container */}
                  {log.photoUrl ? (
                    <div
                      onClick={() => setLightboxLog(log)}
                      className="group relative h-52 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-pointer"
                    >
                      <img 
                        src={resolveImageUrl(log.photoUrl, log.commodityId || commodity.id)} 
                        alt={log.activityTitle}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = resolveImageUrl(undefined, log.commodityId || commodity.id);
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/65 text-white backdrop-blur-xs uppercase tracking-wide">
                          Job {log.jobId}
                        </span>
                        {log.photoStage && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600/90 text-white backdrop-blur-xs uppercase">
                            {log.photoStage}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        {log.status === 'pending_offline' ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-sm">
                            <WifiOff className="w-3 h-3" />
                            <span>Offline</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-sm">
                            <Wifi className="w-3 h-3" />
                            <span>Tersinkron</span>
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/65 text-white text-[10px] font-semibold backdrop-blur-xs">
                          <Maximize2 className="w-3 h-3" />
                          <span>Lihat Foto Penuh</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{log.date}</span>
                      </div>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {log.hstOrPhase}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">
                      {log.activityTitle}
                    </h3>

                    {/* Measurements snippet */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[11px] border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tinggi Tanaman:</span>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">{log.plantHeightCm} cm</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Jumlah Daun:</span>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">{log.leafCount} helai</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {log.notes}
                    </p>

                    {log.pestsObserved && (
                      <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-900/60 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                        <span><strong>OPT:</strong> {log.pestsObserved}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Instructor Verification */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 rounded-b-3xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Siswa: <strong className="text-slate-700 dark:text-slate-300">{log.studentName}</strong>
                    </span>

                    {log.teacherVerified ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Terverifikasi Guru</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Menunggu Paraf</span>
                      </span>
                    )}
                  </div>

                  {log.teacherFeedback && (
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[11px] text-emerald-800 dark:text-emerald-300 italic border border-emerald-200/50 dark:border-emerald-900/40">
                      "{log.teacherFeedback}"
                    </div>
                  )}

                  {/* Verification Button for Instructor role */}
                  {(currentUser.role === 'instruktur' || currentUser.role === 'admin') && !log.teacherVerified && (
                    <button
                      onClick={() => setVerifyingLogId(log.id)}
                      className="w-full mt-2 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      Beri Paraf & Catatan Instruktur
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      <PhotoLightboxModal
        isOpen={!!lightboxLog}
        onClose={() => setLightboxLog(null)}
        imageUrl={lightboxLog ? resolveImageUrl(lightboxLog.photoUrl, lightboxLog.commodityId || commodity.id) : ''}
        title={lightboxLog?.activityTitle || ''}
        subtitle={lightboxLog ? `${lightboxLog.date} · ${lightboxLog.hstOrPhase} · Siswa: ${lightboxLog.studentName}` : undefined}
        caption={lightboxLog ? `${lightboxLog.notes} (Tinggi: ${lightboxLog.plantHeightCm} cm, Daun: ${lightboxLog.leafCount} helai)` : undefined}
      />

    </div>
  );
};
