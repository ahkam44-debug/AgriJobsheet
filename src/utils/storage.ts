import {
  UserProfile,
  FieldLogEntry,
  StepProgressState,
  AssessmentResult,
  NotificationItem,
  ChatMessage,
  CommodityId,
  CommodityProgressMap,
  CommodityAssessmentMap,
  StudentStepGradesMap,
  StudentProgressDirectory
} from '../types';
import { CommodityPlanningDocument } from '../data/planningData';
import { OFFICIAL_USERS } from '../data/officialUsersData';
import { BUNDLED_IMAGES, resolveImageUrl } from './images';

export const DEFAULT_USERS: UserProfile[] = OFFICIAL_USERS;

const LEGACY_DUMMY_USER_IDS = new Set([
  "user-admin-1",
  "user-siswa-1",
  "user-siswa-2",
  "user-siswa-3",
  "user-siswa-4",
  "user-guru-1",
  "user-guru-2",
  "user-industri-1"
]);

const DEFAULT_SAMPLE_STUDENT_ID = "siswa-xi-1";
const DEFAULT_SAMPLE_STUDENT_NAME = "ADINDA KESYA GUNAWAN";
const DEFAULT_ADMIN_GURU_NAME = "Ahkam, S.Pd.Gr.,M.Pd.";

export const INITIAL_LOG_ENTRIES: FieldLogEntry[] = [
  {
    id: "log-1",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "semangka",
    date: "2026-10-15",
    hstOrPhase: "HST 1 (Pindah Tanam)",
    activityTitle: "Pindah Tanam Bibit Semangka F1 ke Bedengan Mulsa",
    jobId: 4,
    plantHeightCm: 12.5,
    leafCount: 3,
    pestsObserved: "Tidak ada gejala OPT (Nihil)",
    notes: "Pindah tanam sore pukul 16.00 WIB. Bibit dilepas hati-hati dari tray 72 lubang tanpa memutus perakaran, dikocor larutan starter NPK 2 g/L 200 ml.",
    photoUrl: BUNDLED_IMAGES.semangkaBedengan,
    photoStage: "proses",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 16,
    teacherVerified: true,
    teacherFeedback: "SOP penanaman sangat baik, batang tegak dan leher akar terlindungi."
  },
  {
    id: "log-2",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "semangka",
    date: "2026-10-25",
    hstOrPhase: "HST 20 (Vegetatif Lanjutan)",
    activityTitle: "Pemupukan Susulan Kocor & Pewiwilan Cabang Samping",
    jobId: 5,
    plantHeightCm: 48.0,
    leafCount: 16,
    pestsObserved: "Ditemukan kutu kebul 2 ekor di trap kuning blok barat",
    notes: "Kocor NPK 16-16-16 dosis 4 g/L (250 ml/tanaman). Sulur ditata searah, tunas samping di bawah ruas ke-10 dibuang untuk sirkulasi udara optimal.",
    photoUrl: BUNDLED_IMAGES.semangkaPanen,
    photoStage: "sesudah",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 6,
    teacherVerified: true,
    teacherFeedback: "Pengaturan sulur rapi. Tingkatkan pengawasan kutu kebul vektor virus."
  },
  {
    id: "log-3",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "semangka",
    date: "2026-10-30",
    hstOrPhase: "HST 32 (Fase Pembungaan)",
    activityTitle: "Polinasi Manual Bunga Betina Ruas ke-14 & Pemasangan Label",
    jobId: 5,
    plantHeightCm: 95.0,
    leafCount: 28,
    pestsObserved: "Aman, thrips terkendali pada ambang ekonomi rendah",
    notes: "Polinasi dilakukan pukul 07.15 WIB. Bunga jantan dipetik, kelopak dikupas, serbuk sari disapukan rata ke kepala putik bunga betina. Label benang kasur terpasang bertuliskan tanggal 30 Okt.",
    photoUrl: BUNDLED_IMAGES.semangkaPolinasi,
    photoStage: "proses",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    teacherVerified: false,
    teacherFeedback: ""
  },
  {
    id: "log-cabai-1",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "cabai",
    date: "2026-10-20",
    hstOrPhase: "HST 25 (Vegetatif & Pembentukan Cabang Y)",
    activityTitle: "Perempelan Tunas Air di Bawah Cabang Y & Pengikatan Ajir",
    jobId: 5,
    plantHeightCm: 42.0,
    leafCount: 24,
    pestsObserved: "Nihil serangan thrips, daun muda tumbuh tegak dan cerah",
    notes: "Semua tunas air di bawah cabang utama Y dirempel bersih pada pagi hari agar sirkulasi udara lancar dan tajuk tidak lembap. Batang diikat dengan ikatan angka 8 ke ajir bambu.",
    photoUrl: BUNDLED_IMAGES.cabaiLahan,
    photoStage: "sesudah",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 8,
    teacherVerified: true,
    teacherFeedback: "Ikatan ajir kuat dan perempelan rapi tidak melukai kulit batang."
  },
  {
    id: "log-tomat-1",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "tomat",
    date: "2026-10-24",
    hstOrPhase: "HST 30 (Pembungaan Tandan Pertama)",
    activityTitle: "Pewiwilan Tunas Ketiak Daun & Kocor Kalsium Nitrat",
    jobId: 5,
    plantHeightCm: 64.0,
    leafCount: 18,
    pestsObserved: "Tidak ditemukan gejala busuk daun Phytophthora",
    notes: "Tunas aksilar di ketiak daun dipangkas menyisakan 1 batang utama produktif. Dilakukan pengocoran kalsium untuk mencegah ujung buah busuk (BER).",
    photoUrl: BUNDLED_IMAGES.tomatLahan,
    photoStage: "proses",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
    teacherVerified: true,
    teacherFeedback: "Pemeliharaan tandan pertama baik, lanjutkan pemantauan kelembapan tajuk."
  },
  {
    id: "log-timun-1",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "timun",
    date: "2026-10-28",
    hstOrPhase: "HST 18 (Rambatan Sulur Aktif)",
    activityTitle: "Pengarahan Sulur ke Jaring Rambatan & Pewiwilan Ruas Bawah",
    jobId: 5,
    plantHeightCm: 88.0,
    leafCount: 14,
    pestsObserved: "Oteng-oteng terkendali, 2 ekor tertangkap manual pagi hari",
    notes: "Sulur dililitkan searah ke net lanjaran setinggi 180 cm. Tunas dan bunga ruas 1-4 bawah dibuang untuk memaksimalkan pembesaran buah di batang utama.",
    photoUrl: BUNDLED_IMAGES.timunLahan,
    photoStage: "sesudah",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    teacherVerified: true,
    teacherFeedback: "Rambatan simetris dan jaring cukup tegang."
  },
  {
    id: "log-melon-1",
    userId: DEFAULT_SAMPLE_STUDENT_ID,
    studentName: DEFAULT_SAMPLE_STUDENT_NAME,
    commodityId: "melon",
    date: "2026-10-27",
    hstOrPhase: "HST 36 (Seleksi & Penggantungan Buah Melon)",
    activityTitle: "Seleksi 1 Buah Terbaik Ruas Cabang 10 & Pengikatan Tali Penggantung",
    jobId: 5,
    plantHeightCm: 145.0,
    leafCount: 24,
    pestsObserved: "Bebas embun tepung, daun bersih dan vigor kuat",
    notes: "Buah sebesar telur ayam pada cabang lateral ruas ke-10 dipilih karena bentuk oval simetris. Tangkai digantung dengan tali rafia ke palang bambu dan pucuk atas di-topping pada daun ke-26.",
    photoUrl: BUNDLED_IMAGES.melonLahan,
    photoStage: "proses",
    status: "synced",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 4,
    teacherVerified: true,
    teacherFeedback: "Simpul penggantungan tidak mencekik tangkai buah dan posisi cabang ideal."
  }
];

export const INITIAL_STEP_PROGRESS: StepProgressState = {
  1: { completedStepIds: [1, 2, 3, 4, 5, 6, 7, 8], numeracyAnswered: true, studentNotes: "Lahan telah disanitasi bersih, pH terukur 6.3 di 5 titik.", updatedAt: Date.now() - 86400000 * 25 },
  2: { completedStepIds: [1, 2, 3, 4, 5, 6, 7, 8], numeracyAnswered: true, studentNotes: "Bedengan 1.2 x 25 m selesai, mulsa PHP kencang.", updatedAt: Date.now() - 86400000 * 20 },
  3: { completedStepIds: [1, 2, 3, 4, 5, 6, 7, 8], numeracyAnswered: true, studentNotes: "Daya kecambah 94% pada hari ke-4, bibit seragam.", updatedAt: Date.now() - 86400000 * 15 },
  4: { completedStepIds: [1, 2, 3, 4, 5, 6, 7, 8], numeracyAnswered: true, studentNotes: "357 bibit berhasil ditanam pada sore hari teduh.", updatedAt: Date.now() - 86400000 * 10 },
  5: { completedStepIds: [1, 2, 3, 4, 5], numeracyAnswered: true, studentNotes: "Polinasi sedang berjalan di ruas ke 12-18.", updatedAt: Date.now() - 86400000 * 2 },
  6: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
  7: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() }
};

export const INITIAL_PROGRESS_MAP: CommodityProgressMap = {
  semangka: INITIAL_STEP_PROGRESS,
  cabai: {
    1: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Sanitasi bebas gulma Solanaceae, pH 6.4.", updatedAt: Date.now() - 86400000 * 18 },
    2: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bedengan & mulsa PHP terpasang rapi.", updatedAt: Date.now() - 86400000 * 14 },
    3: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bibit cabai berdaun 4-5 sejati siap tanam.", updatedAt: Date.now() - 86400000 * 10 },
    4: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Ajir bambu terpasang miring, pindah tanam selesai.", updatedAt: Date.now() - 86400000 * 6 },
    5: { completedStepIds: [1, 2, 3], numeracyAnswered: false, studentNotes: "Perempelan tunas air di bawah cabang Y sedang berjalan.", updatedAt: Date.now() - 86400000 * 2 },
    6: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
    7: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() }
  },
  tomat: {
    1: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Lahan bersih dan pH dikapur dolomit ke 6.5.", updatedAt: Date.now() - 86400000 * 15 },
    2: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Mulsa PHP berlubang tanam zig-zag selesai.", updatedAt: Date.now() - 86400000 * 12 },
    3: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bibit kokoh di potray siap tanam sore.", updatedAt: Date.now() - 86400000 * 8 },
    4: { completedStepIds: [1, 2, 3, 4], numeracyAnswered: false, studentNotes: "Pindah tanam selesai dan disiram jenuh.", updatedAt: Date.now() - 86400000 * 4 },
    5: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
    6: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
    7: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() }
  },
  timun: {
    1: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Sanitasi bersih, parit drainase diperdalam.", updatedAt: Date.now() - 86400000 * 10 },
    2: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bedengan mulsa siap tanam 2 baris.", updatedAt: Date.now() - 86400000 * 7 },
    3: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bibit 8 HSS vigor seragam.", updatedAt: Date.now() - 86400000 * 5 },
    4: { completedStepIds: [1, 2, 3], numeracyAnswered: false, studentNotes: "Pemasangan lanjaran dan jaring rambatan.", updatedAt: Date.now() - 86400000 * 2 },
    5: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
    6: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
    7: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() }
  },
  melon: {
    1: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Sanitasi screen house/lahan bersih, pH terukur 6.4.", updatedAt: Date.now() - 86400000 * 16 },
    2: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bedengan mulsa PHP & pupuk dasar fertigasi siap.", updatedAt: Date.now() - 86400000 * 12 },
    3: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Bibit melon berdaun 3 sejati sehat di potray.", updatedAt: Date.now() - 86400000 * 9 },
    4: { completedStepIds: [1, 2, 3, 4, 5, 6], numeracyAnswered: true, studentNotes: "Ajir bambu segitiga & benang rambatan terpasang.", updatedAt: Date.now() - 86400000 * 6 },
    5: { completedStepIds: [1, 2, 3], numeracyAnswered: false, studentNotes: "Polinasi & penggantungan buah sedang berlangsung.", updatedAt: Date.now() - 86400000 * 2 },
    6: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() },
    7: { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() }
  }
};

export const INITIAL_ASSESSMENT_MAP: CommodityAssessmentMap = {
  semangka: null,
  cabai: null,
  tomat: null,
  timun: null,
  melon: null
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Pengingat Jadwal Lahan Praktik",
    message: "Waktu ideal pengamatan pagi & polinasi/pemeliharaan pukul 06.00 - 09.00 WIB. Catat progres di logbook lapangan.",
    time: "Hari ini, 06:00",
    read: false,
    type: "jadwal"
  },
  {
    id: "notif-2",
    title: "Jadwal Evaluasi Kuis & Asesmen",
    message: "Kuis evaluasi kompetensi budidaya 5 komoditas (Semangka, Cabai, Tomat, Timun, Melon) telah dibuka untuk siswa SMK ATPH.",
    time: "Kemarin, 14:30",
    read: true,
    type: "evaluasi"
  },
  {
    id: "notif-3",
    title: "Sinkronisasi Data Otomatis Berhasil",
    message: "Data logbook lapangan dan foto dokumentasi berhasil disinkronkan ke server pusat sekolah.",
    time: "2 hari lalu",
    read: true,
    type: "sinkron"
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "instructor",
    senderName: "Ahkam, S.Pd.Gr.,M.Pd. (Admin & Guru PPPK)",
    role: "Admin & Guru SMKNPP 5 Konawe",
    text: "Halo Adinda, pastikan saat praktik di blok Semangka, Cabai, Tomat, Timun, maupun Melon, setiap kegiatan dicatat di Logbook beserta foto dokumentasi tahapannya ya.",
    timestamp: "06:45 WIB",
    badge: "Admin"
  },
  {
    id: "msg-2",
    sender: "user",
    senderName: "ADINDA KESYA GUNAWAN (Siswa)",
    role: "Peserta",
    text: "Siap Pak Ahkam! Tadi sudah saya lakukan praktik pemeliharaan pagi sesuai Job Sheet dan fotonya sudah saya unggah di Logbook.",
    timestamp: "07:30 WIB"
  },
  {
    id: "msg-3",
    sender: "instructor",
    senderName: "Firdaus, S.P.,M.Si. (Guru PNS ATPH)",
    role: "Guru Pembimbing",
    text: "Bagus sekali Adinda. Selalu perhatikan sanitasi alat pangkas dan pemantauan OPT harian di setiap blok komoditas agar target panen Grade A tercapai.",
    timestamp: "08:15 WIB",
    badge: "Guru Pembimbing"
  }
];

// LocalStorage Keys
const KEYS = {
  USERS: "agri_all_users",
  CURRENT_USER: "agri_curr_user",
  LOGS: "agri_field_logs",
  PROGRESS_LEGACY: "agri_step_progress",
  PROGRESS_MAP: "agri_commodity_progress_map",
  ASSESSMENT_LEGACY: "agri_assessment_result",
  ASSESSMENT_MAP: "agri_commodity_assessment_map",
  SELECTED_COMMODITY: "agri_selected_commodity",
  IS_LOGGED_IN: "agri_is_logged_in",
  NOTIFS: "agri_notifications",
  CHAT: "agri_chat_history",
  OFFLINE_MODE: "agri_simulated_offline",
  SYNC_QUEUE: "agri_sync_queue",
  DARK_MODE: "agri_dark_mode",
  STEP_GRADES: "agri_student_step_grades",
  STUDENT_PROGRESS_DIR: "agri_student_progress_dir",
  CUSTOM_PLANNING_DIR: "agri_custom_planning_dir"
};

export function getStoredUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(KEYS.USERS);
    if (raw) {
      const parsed: UserProfile[] = JSON.parse(raw);

      // Remove legacy dummy placeholder accounts so only official attached records + admin-created accounts remain
      const cleaned = parsed.filter((u) => !LEGACY_DUMMY_USER_IDS.has(u.id));
      const storedById = new Map(cleaned.map((u) => [u.id, u]));
      const officialIds = new Set(OFFICIAL_USERS.map((u) => u.id));

      // Merge official users while preserving user-level profile edits (phone, groupName, etc.),
      // and keep official identity fields synchronized if not customized
      const mergedOfficial = OFFICIAL_USERS.map((official) => {
        const existing = storedById.get(official.id);
        if (!existing) return official;
        if (
          official.id === 'user-kepsek-1' &&
          existing.identifier === 'NIP: 197805102005011009'
        ) {
          return { ...official, ...existing, identifier: official.identifier };
        }
        return { ...official, ...existing };
      });

      const customAddedUsers = cleaned.filter((u) => !officialIds.has(u.id));
      return [...mergedOfficial, ...customAddedUsers];
    }
  } catch (e) {
    console.error(e);
  }
  return OFFICIAL_USERS;
}

export function saveStoredUsers(users: UserProfile[]) {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function getStoredCurrentUser(): UserProfile {
  try {
    const raw = localStorage.getItem(KEYS.CURRENT_USER);
    if (raw) {
      const user: UserProfile = JSON.parse(raw);
      if (user.id === 'user-kepsek-1' && user.identifier === 'NIP: 197805102005011009') {
        return { ...user, identifier: 'NIP: 198206012006041014' };
      }
      if (user.id === 'user-admin-1' || (user.id === 'user-guru-1' && user.name.toLowerCase().includes('ahkam'))) {
        return OFFICIAL_USERS.find((u) => u.id === 'guru-4') || OFFICIAL_USERS[0];
      }
      if (LEGACY_DUMMY_USER_IDS.has(user.id)) {
        return OFFICIAL_USERS.find((u) => u.id === DEFAULT_SAMPLE_STUDENT_ID) || OFFICIAL_USERS[0];
      }
      return user;
    }
  } catch (e) {
    console.error(e);
  }
  return OFFICIAL_USERS.find((u) => u.id === DEFAULT_SAMPLE_STUDENT_ID) || OFFICIAL_USERS[0];
}

export function saveStoredCurrentUser(user: UserProfile) {
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
}

export function getStoredSelectedCommodity(): CommodityId {
  try {
    const raw = localStorage.getItem(KEYS.SELECTED_COMMODITY) as CommodityId | null;
    if (raw && (raw === 'semangka' || raw === 'cabai' || raw === 'tomat' || raw === 'timun' || raw === 'melon')) {
      return raw;
    }
  } catch (e) {
    console.error(e);
  }
  return 'semangka';
}

export function saveStoredSelectedCommodity(commodityId: CommodityId) {
  localStorage.setItem(KEYS.SELECTED_COMMODITY, commodityId);
}

export function getStoredLoggedIn(): boolean {
  try {
    const raw = sessionStorage.getItem(KEYS.IS_LOGGED_IN);
    return raw === 'true';
  } catch (e) {
    console.error(e);
  }
  return false;
}

export function saveStoredLoggedIn(loggedIn: boolean) {
  sessionStorage.setItem(KEYS.IS_LOGGED_IN, loggedIn ? 'true' : 'false');
}

export function getStoredLogs(): FieldLogEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.LOGS);
    if (raw) {
      const parsed = JSON.parse(raw) as FieldLogEntry[];
      const normalized = parsed.map((l) => {
        const commId = l.commodityId || 'semangka';
        // Also fix log-2 if it previously pointed to bedengan instead of panen
        const rawUrl = l.id === 'log-2' && l.photoUrl?.includes('bedengan')
          ? BUNDLED_IMAGES.semangkaPanen
          : l.photoUrl;
        return {
          ...l,
          userId: l.userId === 'user-siswa-1' ? DEFAULT_SAMPLE_STUDENT_ID : l.userId,
          studentName: l.userId === 'user-siswa-1' ? DEFAULT_SAMPLE_STUDENT_NAME : l.studentName,
          commodityId: commId,
          photoUrl: resolveImageUrl(rawUrl, commId)
        };
      });
      // Ensure newly introduced commodity seed entries exist if user only had legacy logs
      const existingIds = new Set(normalized.map((l) => l.id));
      const missingSeeds = INITIAL_LOG_ENTRIES.filter(
        (seed) => seed.commodityId !== 'semangka' && !existingIds.has(seed.id)
      );
      return [...normalized, ...missingSeeds];
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_LOG_ENTRIES;
}

export function saveStoredLogs(logs: FieldLogEntry[]) {
  localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
}

export function getStoredProgressMap(): CommodityProgressMap {
  try {
    const rawMap = localStorage.getItem(KEYS.PROGRESS_MAP);
    if (rawMap) {
      const parsed = JSON.parse(rawMap) as Partial<CommodityProgressMap>;
      return {
        semangka: parsed.semangka || INITIAL_PROGRESS_MAP.semangka,
        cabai: parsed.cabai || INITIAL_PROGRESS_MAP.cabai,
        tomat: parsed.tomat || INITIAL_PROGRESS_MAP.tomat,
        timun: parsed.timun || INITIAL_PROGRESS_MAP.timun,
        melon: parsed.melon || INITIAL_PROGRESS_MAP.melon
      };
    }

    // Backwards-compatibility migration from single-commodity progress
    const legacyRaw = localStorage.getItem(KEYS.PROGRESS_LEGACY);
    if (legacyRaw) {
      const legacyProgress = JSON.parse(legacyRaw) as StepProgressState;
      return {
        ...INITIAL_PROGRESS_MAP,
        semangka: legacyProgress
      };
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_PROGRESS_MAP;
}

export function saveStoredProgressMap(progressMap: CommodityProgressMap) {
  localStorage.setItem(KEYS.PROGRESS_MAP, JSON.stringify(progressMap));
}

export function getStoredAssessmentMap(): CommodityAssessmentMap {
  try {
    const rawMap = localStorage.getItem(KEYS.ASSESSMENT_MAP);
    if (rawMap) {
      const parsed = JSON.parse(rawMap) as Partial<CommodityAssessmentMap>;
      return {
        semangka: parsed.semangka ?? null,
        cabai: parsed.cabai ?? null,
        tomat: parsed.tomat ?? null,
        timun: parsed.timun ?? null,
        melon: parsed.melon ?? null
      };
    }

    // Backwards-compatibility migration from legacy single assessment
    const legacyRaw = localStorage.getItem(KEYS.ASSESSMENT_LEGACY);
    if (legacyRaw) {
      const legacyRes = JSON.parse(legacyRaw) as AssessmentResult;
      return {
        ...INITIAL_ASSESSMENT_MAP,
        semangka: {
          ...legacyRes,
          commodityId: legacyRes.commodityId || 'semangka'
        }
      };
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_ASSESSMENT_MAP;
}

export function saveStoredAssessmentMap(assessmentMap: CommodityAssessmentMap) {
  localStorage.setItem(KEYS.ASSESSMENT_MAP, JSON.stringify(assessmentMap));
}

export function getStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(KEYS.NOTIFS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_NOTIFICATIONS;
}

export function saveStoredNotifications(notifs: NotificationItem[]) {
  localStorage.setItem(KEYS.NOTIFS, JSON.stringify(notifs));
}

export function getStoredChat(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(KEYS.CHAT);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_CHAT_MESSAGES;
}

export function saveStoredChat(chat: ChatMessage[]) {
  localStorage.setItem(KEYS.CHAT, JSON.stringify(chat));
}

export function getStoredOfflineQueue(): any[] {
  try {
    const raw = localStorage.getItem(KEYS.SYNC_QUEUE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveStoredOfflineQueue(queue: any[]) {
  localStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify(queue));
}

export const INITIAL_STEP_GRADES: StudentStepGradesMap = {
  [DEFAULT_SAMPLE_STUDENT_ID]: {
    semangka: {
      1: {
        1: { score: 4, verified: true, notes: "APD lengkap dan briefing K3 diikuti tertib.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        2: { score: 4, verified: true, notes: "Riwayat lahan non-Cucurbitaceae tercatat rapi.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        3: { score: 4, verified: true, notes: "Gulma bersih sampai akar.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        4: { score: 4, verified: true, notes: "Sisa tanaman sehat dikomposkan terpisah.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        5: { score: 3, verified: true, notes: "Parit drainase baik, rapikan sedikit sudut timur.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        6: { score: 4, verified: true, notes: "Pengukuran pH 5 titik akurat (rata-rata 6,3).", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        7: { score: 4, verified: true, notes: "Alat dicuci bersih dan disterilkan.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 },
        8: { score: 4, verified: true, notes: "Foto logbook sebelum-sesudah jelas.", gradedBy: DEFAULT_ADMIN_GURU_NAME, gradedAt: Date.now() - 86400000 * 24 }
      }
    }
  }
};

export function getStoredStudentStepGrades(): StudentStepGradesMap {
  try {
    const raw = localStorage.getItem(KEYS.STEP_GRADES);
    if (raw) {
      const parsed = JSON.parse(raw) as StudentStepGradesMap;
      if (parsed["user-siswa-1"] && !parsed[DEFAULT_SAMPLE_STUDENT_ID]) {
        parsed[DEFAULT_SAMPLE_STUDENT_ID] = parsed["user-siswa-1"];
        delete parsed["user-siswa-1"];
      }
      return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_STEP_GRADES;
}

export function saveStoredStudentStepGrades(grades: StudentStepGradesMap) {
  localStorage.setItem(KEYS.STEP_GRADES, JSON.stringify(grades));
}

export function createEmptyCommodityProgressMap(): CommodityProgressMap {
  return {
    semangka: {},
    cabai: {},
    tomat: {},
    timun: {},
    melon: {}
  };
}

export function getStoredStudentProgressDir(): StudentProgressDirectory {
  try {
    const raw = localStorage.getItem(KEYS.STUDENT_PROGRESS_DIR);
    if (raw) {
      const parsed = JSON.parse(raw) as StudentProgressDirectory;
      if (parsed["user-siswa-1"] && !parsed[DEFAULT_SAMPLE_STUDENT_ID]) {
        parsed[DEFAULT_SAMPLE_STUDENT_ID] = parsed["user-siswa-1"];
        delete parsed["user-siswa-1"];
      }
      if (!parsed[DEFAULT_SAMPLE_STUDENT_ID]) {
        parsed[DEFAULT_SAMPLE_STUDENT_ID] = getStoredProgressMap();
      }
      return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    [DEFAULT_SAMPLE_STUDENT_ID]: getStoredProgressMap()
  };
}

export function saveStoredStudentProgressDir(dir: StudentProgressDirectory) {
  localStorage.setItem(KEYS.STUDENT_PROGRESS_DIR, JSON.stringify(dir));
}

export type CustomPlanningDirectory = Record<
  string,
  Partial<Record<CommodityId, CommodityPlanningDocument>>
>;

export function getStoredCustomPlanningDir(): CustomPlanningDirectory {
  try {
    const raw = localStorage.getItem(KEYS.CUSTOM_PLANNING_DIR);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return {};
}

export function saveStoredCustomPlanningDir(dir: CustomPlanningDirectory) {
  localStorage.setItem(KEYS.CUSTOM_PLANNING_DIR, JSON.stringify(dir));
}

