import React, { useState, useRef } from 'react';
import { UserProfile, UserRole } from '../types';
import {
  FileSpreadsheet,
  Upload,
  Download,
  Sparkles,
  Trash2,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
  Users,
  Fingerprint
} from 'lucide-react';

interface BulkUserImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingUsers: UserProfile[];
  onImportUsers: (newUsers: UserProfile[]) => void;
}

interface BulkDraftRow {
  tempId: string;
  selected: boolean;
  name: string;
  identifier: string;
  role: UserRole;
  className: string;
  groupName: string;
  phone: string;
}

const SAMPLE_EMPLOYEE_LIST = `Nama Lengkap;NISN / NIP / NUPTK;Jabatan / Kelas;Peran;Unit / Blok Praktik;No. HP
IKHWAL, S.TP., M.Sc.;NIP: 198206012006041014;Kepala Sekolah SMKNPP 5 Konawe;admin;Pimpinan Sekolah;
Ahkam, S.Pd.Gr.,M.Pd.;NIP: 198804042023211010;PPPK · Admin Aplikasi & Guru SMKNPP 5 Konawe;admin;Administrator Sistem;
Firdaus, S.P.,M.Si.;NIP: 196806062000031009;PNS · Guru SMKNPP 5 Konawe;instruktur;Guru Produktif;
Anggun Rosiani, S.Pd.I.;NUPTK: 0857781682230022;Guru Honor Sekolah (Non-PNS);instruktur;Guru Honor Sekolah;
AHMAD NUR WAHYUDI;NISN: 0113721627;KELAS X ATPH;peserta;Kelompok 1;
ADINDA KESYA GUNAWAN;NISN: 0104491612;KELAS XI ATPH;peserta;Kelompok 2;`;

function splitDelimitedLine(line: string): string[] {
  if (line.includes('\t')) {
    return line.split('\t').map((c) => c.trim());
  }
  if (line.includes(';')) {
    return line.split(';').map((c) => c.trim());
  }
  if (line.includes('|')) {
    return line.split('|').map((c) => c.trim());
  }
  if (line.includes(',')) {
    return line.split(',').map((c) => c.trim());
  }
  return [line.trim()];
}

function inferRole(rawRole: string | undefined, rawPosition: string | undefined, defaultRole: UserRole): UserRole {
  const combined = `${rawRole || ''} ${rawPosition || ''}`.toLowerCase();
  if (!combined.trim()) return defaultRole;
  if (
    combined.includes('admin') ||
    combined.includes('tata usaha') ||
    combined.includes('staf tu') ||
    combined.includes('operator') ||
    combined.includes('kepala sekolah') ||
    combined.includes('kepala tu')
  ) {
    return 'admin';
  }
  if (
    combined.includes('siswa') ||
    combined.includes('peserta') ||
    combined.includes('murid') ||
    /\b(x|xi|xii)\s+atph\b/i.test(combined)
  ) {
    return 'peserta';
  }
  if (
    combined.includes('guru') ||
    combined.includes('instruktur') ||
    combined.includes('pegawai') ||
    combined.includes('teknisi') ||
    combined.includes('laboran') ||
    combined.includes('pembimbing') ||
    combined.includes('penyuluh')
  ) {
    return 'instruktur';
  }
  return defaultRole;
}

function normalizeIdentifier(rawId: string, role: UserRole, index: number): string {
  const cleaned = rawId.trim();
  if (!cleaned) {
    const seq = String(index + 1).padStart(3, '0');
    if (role === 'peserta') return `NISN: 0110000${seq}`;
    if (role === 'admin') return `NIP: 198804042023211${seq}`;
    return `NUPTK: 0857781682230${seq}`;
  }
  if (
    cleaned.toUpperCase().startsWith('NIP') ||
    cleaned.toUpperCase().startsWith('NISN') ||
    cleaned.toUpperCase().startsWith('NIS') ||
    cleaned.toUpperCase().startsWith('ID') ||
    cleaned.toUpperCase().startsWith('NUPTK')
  ) {
    return cleaned;
  }
  if (role === 'peserta') return `NISN: ${cleaned}`;
  return `NIP: ${cleaned}`;
}

function defaultPositionForRole(role: UserRole): string {
  if (role === 'peserta') return 'KELAS XI ATPH';
  if (role === 'admin') return 'Admin Aplikasi / Pimpinan';
  return 'Guru SMKNPP 5 Konawe';
}

function parseCollectiveText(text: string, defaultRole: UserRole): BulkDraftRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  const rows: BulkDraftRow[] = [];

  lines.forEach((line, idx) => {
    const cols = splitDelimitedLine(line).map((c) => c.replace(/^["']|["']$/g, '').trim());
    const firstColLower = (cols[0] || '').toLowerCase();
    const secondColLower = (cols[1] || '').toLowerCase();

    // Skip CSV/Excel header row automatically
    if (
      idx === 0 &&
      (firstColLower === 'nama' ||
        firstColLower === 'nama lengkap' ||
        firstColLower === 'name' ||
        firstColLower.includes('nama pegawai') ||
        secondColLower === 'nip' ||
        secondColLower === 'nisn' ||
        secondColLower === 'nuptk' ||
        secondColLower === 'nis' ||
        secondColLower.includes('nip') ||
        secondColLower.includes('nisn'))
    ) {
      return;
    }

    // Handle optional leading sequence number column ("1; Ahmad; ...")
    let offset = 0;
    if (/^\d{1,3}\.?$/.test(cols[0]) && cols.length >= 2) {
      offset = 1;
    }

    const name = cols[offset] || '';
    if (!name) return;

    const rawId = cols[offset + 1] || '';
    const rawPosition = cols[offset + 2] || '';
    const rawRole = cols[offset + 3] || '';
    const rawGroup = cols[offset + 4] || '';
    const rawPhone = cols[offset + 5] || '';

    const role = inferRole(rawRole, rawPosition, defaultRole);
    const identifier = normalizeIdentifier(rawId, role, rows.length);
    const className = rawPosition || defaultPositionForRole(role);

    rows.push({
      tempId: `draft-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      selected: true,
      name,
      identifier,
      role,
      className,
      groupName: rawGroup,
      phone: rawPhone
    });
  });

  return rows;
}

export const BulkUserImportModal: React.FC<BulkUserImportModalProps> = ({
  isOpen,
  onClose,
  existingUsers,
  onImportUsers
}) => {
  const [defaultRole, setDefaultRole] = useState<UserRole>('instruktur');
  const [defaultSchool, setDefaultSchool] = useState('SMK Negeri Pertanian Pembangunan 5 Konawe');
  const [enableBiometric, setEnableBiometric] = useState(true);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [rawText, setRawText] = useState('');
  const [draftRows, setDraftRows] = useState<BulkDraftRow[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const applyParsedText = (text: string, roleForBatch: UserRole = defaultRole) => {
    setRawText(text);
    const parsed = parseCollectiveText(text, roleForBatch);
    setDraftRows(parsed);
  };

  const handleRoleDefaultChange = (nextRole: UserRole) => {
    setDefaultRole(nextRole);
    if (rawText.trim()) {
      setDraftRows(parseCollectiveText(rawText, nextRole));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      applyParsedText(content, defaultRole);
      setUploadStatus(`File "${file.name}" berhasil dibaca (${content.split(/\r?\n/).filter(Boolean).length} baris).`);
    };
    reader.onerror = () => {
      setUploadStatus('Gagal membaca file daftar. Pastikan format CSV/TSV/TXT UTF-8.');
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([SAMPLE_EMPLOYEE_LIST], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template_daftar_pegawai_guru_siswa_smknpp5konawe.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddEmptyManualRow = () => {
    const nextIdx = draftRows.length;
    setDraftRows((prev) => [
      ...prev,
      {
        tempId: `manual-${Date.now()}-${nextIdx}`,
        selected: true,
        name: '',
        identifier: normalizeIdentifier('', defaultRole, nextIdx),
        role: defaultRole,
        className: defaultPositionForRole(defaultRole),
        groupName: '',
        phone: ''
      }
    ]);
  };

  const updateRowField = <K extends keyof BulkDraftRow>(tempId: string, field: K, value: BulkDraftRow[K]) => {
    setDraftRows((prev) => prev.map((r) => (r.tempId === tempId ? { ...r, [field]: value } : r)));
  };

  const removeRow = (tempId: string) => {
    setDraftRows((prev) => prev.filter((r) => r.tempId !== tempId));
  };

  const existingIdsSet = new Set(existingUsers.map((u) => u.identifier.trim().toLowerCase()));
  const existingNamesSet = new Set(existingUsers.map((u) => u.name.trim().toLowerCase()));

  const isRowDuplicate = (row: BulkDraftRow) => {
    const idKey = row.identifier.trim().toLowerCase();
    const nameKey = row.name.trim().toLowerCase();
    return (idKey && existingIdsSet.has(idKey)) || (nameKey && existingNamesSet.has(nameKey));
  };

  const readyRows = draftRows.filter((row) => {
    if (!row.selected || !row.name.trim() || !row.identifier.trim()) return false;
    if (skipDuplicates && isRowDuplicate(row)) return false;
    return true;
  });

  const duplicateCount = draftRows.filter((row) => row.selected && isRowDuplicate(row)).length;

  const handleConfirmImport = () => {
    if (readyRows.length === 0) return;
    const timestamp = Date.now();
    const newUsers: UserProfile[] = readyRows.map((row, idx) => ({
      id: `user-bulk-${timestamp}-${idx}`,
      name: row.name.trim(),
      role: row.role,
      identifier: row.identifier.trim(),
      school: defaultSchool.trim() || 'SMK Negeri Pertanian Pembangunan 5 Konawe',
      className: row.className.trim() || defaultPositionForRole(row.role),
      groupName: row.groupName.trim() || undefined,
      phone: row.phone.trim() || undefined,
      expertise: row.role === 'instruktur' ? row.className.trim() || 'Guru / Pegawai ATPH' : undefined,
      bioAuthEnabled: enableBiometric,
      status: 'aktif'
    }));

    onImportUsers(newUsers);
    setRawText('');
    setDraftRows([]);
    setUploadStatus('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">
                Tambah Kolektif Daftar Pegawai, Guru & Siswa
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Tempel daftar dari Excel/CSV, unggah berkas daftar pegawai, atau isi beberapa baris sekaligus.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Batch Defaults */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-5 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Peran Default untuk Baris Tanpa Kolom Peran
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleRoleDefaultChange('instruktur')}
                  className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-colors cursor-pointer ${
                    defaultRole === 'instruktur'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Guru / Pegawai
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleDefaultChange('admin')}
                  className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-colors cursor-pointer ${
                    defaultRole === 'admin'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Pegawai TU / Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleDefaultChange('peserta')}
                  className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-colors cursor-pointer ${
                    defaultRole === 'peserta'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Siswa / Peserta
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Satuan Pendidikan Default
              </label>
              <input
                type="text"
                value={defaultSchool}
                onChange={(e) => setDefaultSchool(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="lg:col-span-3 flex flex-col justify-center gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={enableBiometric}
                  onChange={(e) => setEnableBiometric(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <Fingerprint className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Aktifkan Biometrik</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span>Lewati data duplikat</span>
              </label>
            </div>
          </div>

          {/* Paste / Upload Toolbar + Textarea */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                1. Masukkan atau Tempel Daftar Pegawai / Guru / Siswa
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.tsv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unggah CSV / TXT</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Unduh Template CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    applyParsedText(SAMPLE_EMPLOYEE_LIST, 'instruktur');
                    setUploadStatus('Contoh daftar pegawai, guru, dan siswa SMKN PP 5 Konawe dimuat.');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Isi Contoh Daftar Pegawai</span>
                </button>

                {rawText && (
                  <button
                    type="button"
                    onClick={() => {
                      setRawText('');
                      setDraftRows([]);
                      setUploadStatus('');
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                  >
                    Bersihkan
                  </button>
                )}
              </div>
            </div>

            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => applyParsedText(e.target.value, defaultRole)}
              placeholder={`Tempel langsung dari Excel atau ketik satu baris per orang.\nFormat fleksibel (dipisah Tab / Titik Koma / Koma):\nNama Lengkap ; NISN / NIP / NUPTK ; Kelas / Status ; Peran (peserta/instruktur/admin) ; Unit/Blok ; No HP\n\nContoh:\nFirdaus, S.P.,M.Si. ; NIP: 196806062000031009 ; PNS · Guru SMKNPP 5 Konawe ; instruktur\nAnggun Rosiani, S.Pd.I. ; NUPTK: 0857781682230022 ; Guru Honor Sekolah ; instruktur\nAHMAD NUR WAHYUDI ; NISN: 0113721627 ; KELAS X ATPH ; peserta`}
              className="w-full p-3.5 text-xs font-mono rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>
                Mendukung salin-tempel langsung dari Microsoft Excel / Google Sheets (Tab) maupun CSV (`;` atau `,`).
              </span>
              {uploadStatus && (
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {uploadStatus}
                </span>
              )}
            </div>
          </div>

          {/* Preview & Inline Edit Table */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  2. Pratinjau & Verifikasi Data Kolektif ({draftRows.length} baris)
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddEmptyManualRow}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Baris Manual</span>
              </button>
            </div>

            {draftRows.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Belum ada daftar kolektif yang dimasukkan
                </p>
                <p>
                  Tempel daftar pegawai/guru/siswa di kotak atas, unggah file CSV, klik &ldquo;Isi Contoh Daftar Pegawai&rdquo;, atau klik &ldquo;Tambah Baris Manual&rdquo;.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      <th className="py-2.5 px-3 w-10 text-center">Pilih</th>
                      <th className="py-2.5 px-3">Nama Lengkap</th>
                      <th className="py-2.5 px-3">NISN / NIP / NUPTK</th>
                      <th className="py-2.5 px-3 w-36">Peran</th>
                      <th className="py-2.5 px-3">Jabatan / Kelas</th>
                      <th className="py-2.5 px-3">Unit / Kelompok</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 w-10 text-center">Hapus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {draftRows.map((row) => {
                      const dup = isRowDuplicate(row);
                      const valid = row.name.trim().length > 0 && row.identifier.trim().length > 0;

                      return (
                        <tr
                          key={row.tempId}
                          className={`${
                            !row.selected
                              ? 'opacity-50 bg-slate-50/50 dark:bg-slate-900/40'
                              : dup && skipDuplicates
                              ? 'bg-amber-50/50 dark:bg-amber-950/20'
                              : 'bg-white dark:bg-slate-900'
                          }`}
                        >
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={row.selected}
                              onChange={(e) => updateRowField(row.tempId, 'selected', e.target.checked)}
                              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.name}
                              onChange={(e) => updateRowField(row.tempId, 'name', e.target.value)}
                              placeholder="Nama lengkap..."
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.identifier}
                              onChange={(e) => updateRowField(row.tempId, 'identifier', e.target.value)}
                              placeholder="NISN / NIP / NUPTK..."
                              className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <select
                              value={row.role}
                              onChange={(e) => updateRowField(row.tempId, 'role', e.target.value as UserRole)}
                              className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                              <option value="instruktur">Guru / Pegawai</option>
                              <option value="admin">Admin / TU</option>
                              <option value="peserta">Siswa</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.className}
                              onChange={(e) => updateRowField(row.tempId, 'className', e.target.value)}
                              placeholder="Jabatan / Kelas..."
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.groupName}
                              onChange={(e) => updateRowField(row.tempId, 'groupName', e.target.value)}
                              placeholder="Unit / Blok..."
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap">
                            {dup ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>{skipDuplicates ? 'Duplikat (Lewati)' : 'Duplikat'}</span>
                              </span>
                            ) : valid ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Siap Impor</span>
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                                Lengkapi Nama/ID
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeRow(row.tempId)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                              title="Hapus baris"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-slate-300 font-mono tabular-nums">
            <strong className="text-emerald-700 dark:text-emerald-400">{readyRows.length}</strong> akun baru siap disimpan
            {duplicateCount > 0 && skipDuplicates && (
              <span className="text-amber-700 dark:text-amber-400"> · {duplicateCount} duplikat dilewati</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={readyRows.length === 0}
              onClick={handleConfirmImport}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white shadow-md shadow-emerald-700/20 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan {readyRows.length} Akun Kolektif</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
