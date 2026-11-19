import { UserProfile } from '../types';

const SCHOOL_NAME = 'SMK Negeri Pertanian Pembangunan 5 Konawe';

export const OFFICIAL_USERS: UserProfile[] = [
  // Kepala Sekolah (Admin & Penanggung Jawab Sekolah)
  {
    id: 'user-kepsek-1',
    name: 'IKHWAL, S.TP., M.Sc.',
    role: 'admin',
    school: SCHOOL_NAME,
    className: 'Kepala Sekolah SMKNPP 5 Konawe',
    identifier: 'NIP: 198206012006041014',
    expertise: 'Kepala Sekolah & Penanggung Jawab Program',
    bioAuthEnabled: true,
    status: 'aktif'
  },

  // ============================================================================
  // DAFTAR GURU SMKNPP 5 KONAWE (31 Guru sesuai data_guru_2026.pdf)
  // ASN (PNS) & P3K (PPPK / PPPK Paruh Waktu) -> menggunakan NIP
  // Non-PNS (Guru Honor Sekolah) -> menggunakan NUPTK
  // ============================================================================
  {
    id: 'guru-1',
    name: 'ABIMAYU, S.Pd.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 199703132025211046',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-2',
    name: 'Agus, S.P.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198808292023211004',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-3',
    name: 'Agustina Reko Pasorong, S.P.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 197712272025212005',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-4',
    name: 'Ahkam, S.Pd.Gr.,M.Pd.',
    role: 'admin',
    school: SCHOOL_NAME,
    className: 'PPPK · Admin Aplikasi & Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198804042023211010',
    expertise: 'Admin Aplikasi & Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-5',
    name: 'Andi Windi Indrawati, S.TP.,M.Sc.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 197508272008012006',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-6',
    name: 'Anggun Rosiani, S.Pd.I.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'Guru Honor Sekolah (Non-PNS)',
    identifier: 'NUPTK: 0857781682230022',
    expertise: 'Guru Honor Sekolah',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-7',
    name: 'ANNA YUNIAR, S.P.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'Guru Honor Sekolah (Non-PNS)',
    identifier: 'NUPTK: 1335779680230023',
    expertise: 'Guru Honor Sekolah',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-8',
    name: 'Brustito Sampolawa, S.St.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198602052025211029',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-9',
    name: 'Dian Bayu Rini, S.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198901102023212026',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-10',
    name: 'Ega Sagita, S.P.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'Guru Honor Sekolah (Non-PNS)',
    identifier: 'NUPTK: 5854777678230142',
    expertise: 'Guru Honor Sekolah',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-11',
    name: 'Erlin, S.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198808062022212004',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-12',
    name: 'ERWIN BANU, S.St.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198609232023211012',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-13',
    name: 'Firdaus, S.P.,M.Si.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 196806062000031009',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-14',
    name: 'GITA DWI AYU, S.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 199502052023212027',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-15',
    name: 'Hadijah, S.E.,Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 196906302014122001',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-16',
    name: 'Hasnani, S.Pd.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198612082023212026',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-17',
    name: 'Hasniati, S.P.,M.Si.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198404012023212010',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-18',
    name: 'IRWAN, S.Pd.,M.Si.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 197803252005021001',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-19',
    name: 'Joko Prayogo, S.E.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 197401162014081001',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-20',
    name: 'Merit Heppinia, S.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 199303142023212027',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-21',
    name: 'Misnawati, S.Ag.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 197904212023212009',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-22',
    name: 'Nancy Lukitasari Anjaswati, S.E.Gr',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198611032023212020',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-23',
    name: 'Naro Detakka, S.Pd.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198701192015041001',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-24',
    name: 'NITA SEPRIANTI, S.P.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK Paruh Waktu · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198809212025212148',
    expertise: 'Guru PPPK Paruh Waktu',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-25',
    name: 'Nur Hayati, S.Pt.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 199208032024212037',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-26',
    name: 'Rahmilda Sutrianingsih, S.Pd.,M.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PNS · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198903222014022002',
    expertise: 'Guru PNS',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-27',
    name: 'Riani, S.I.Pust.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'Guru Honor Sekolah (Non-PNS)',
    identifier: 'NUPTK: 3841765666230232',
    expertise: 'Guru Honor Sekolah',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-28',
    name: 'ROSTINA ANDRIANI, S.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK Paruh Waktu · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 199510282025212196',
    expertise: 'Guru PPPK Paruh Waktu',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-29',
    name: 'SATRIYANI, S.Pt.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 199010072024212041',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-30',
    name: 'Wilda, S.Pd.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'PPPK · Guru SMKNPP 5 Konawe',
    identifier: 'NIP: 198411112023212019',
    expertise: 'Guru PPPK',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'guru-31',
    name: 'ZAINUL SYAHRIL, S.Pd.Gr.',
    role: 'instruktur',
    school: SCHOOL_NAME,
    className: 'Guru Honor Sekolah (Non-PNS)',
    identifier: 'NUPTK: 2462776677130133',
    expertise: 'Guru Honor Sekolah',
    bioAuthEnabled: true,
    status: 'aktif'
  },

  // ============================================================================
  // DAFTAR SISWA KELAS X ATPH (17 Siswa — Tahun Pelajaran 2026/2027)
  // Menggunakan Nama Siswa dan NISN verbatim
  // ============================================================================
  {
    id: 'siswa-x-1',
    name: 'AHMAD NUR WAHYUDI',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0113721627',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-2',
    name: 'BUDI SETYA UTAMA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0111747076',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-3',
    name: 'M. BOBI. R',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0114443109',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-4',
    name: 'DAMAR JULIANZAH',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0126562776',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-5',
    name: 'DILA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0124659753',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-6',
    name: 'ERBILAL RAJAB',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 3117588846',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-7',
    name: 'HARPIN',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0114629838',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-8',
    name: 'JUSMIANTO',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0133813922',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-9',
    name: 'KHANAYA SIVA RAIHANA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0117014606',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-10',
    name: 'MUH. ISFATHUL APRILIANSYAH',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0113398331',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-11',
    name: 'MUH. JIBRAN',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0112309305',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-12',
    name: 'MUHAMMAD AL FAJAR',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0113837302',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-13',
    name: 'NABIL AL ARABI',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0114854745',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-14',
    name: 'PUTRI PARAMITHA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0116079863',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-15',
    name: 'TESAR PERMANA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0111865681',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-16',
    name: 'VIRNA IFTYA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0114573930',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-x-17',
    name: 'RAYHAN MUPLIH GHALIB',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS X ATPH',
    identifier: 'NISN: 0118904103',
    bioAuthEnabled: true,
    status: 'aktif'
  },

  // ============================================================================
  // DAFTAR SISWA KELAS XI ATPH (23 Siswa — Tahun Pelajaran 2026/2027)
  // Menggunakan Nama Siswa dan NISN verbatim
  // ============================================================================
  {
    id: 'siswa-xi-1',
    name: 'ADINDA KESYA GUNAWAN',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0104491612',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-2',
    name: 'ACHMAD FAISAL WIJAYA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0102074814',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-3',
    name: 'AGISTA RAMADHANI SAID',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0101927086',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-4',
    name: 'AGUNG PRAJA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0104982917',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-5',
    name: 'ARJUNA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0104975943',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-6',
    name: 'DIAN',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0076446944',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-7',
    name: 'FAHRI',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0102783346',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-8',
    name: 'GUSTAP BINTANG PURNAMA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0107869971',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-9',
    name: 'IBRAHIM KIAS',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0103493763',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-10',
    name: 'M.ANAS ABABILLAH',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0107624464',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-11',
    name: 'MUH. FAUDZAN',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 3102387651',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-12',
    name: 'MUH. MIKAIL MANSRUR',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0091493094',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-13',
    name: 'MUH.ABIL',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0089783257',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-14',
    name: 'MUH.BILAL AL FURQAM',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0103824900',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-15',
    name: 'MUH.FAIS',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 3105800527',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-16',
    name: 'MUH.IRAWANSYA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 3106620411',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-17',
    name: 'MUHAMMAD ARDIANSYA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0106762678',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-18',
    name: 'MUHAMMAD REFAN SYAFUTRA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0109456428',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-19',
    name: 'NAURA AFIYYAH',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0115036276',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-20',
    name: 'NIFTA ANGGUN ZASKHYNAN',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0097255673',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-21',
    name: 'RASTA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0104455170',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-22',
    name: 'RISKY ADITIA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0097333258',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xi-23',
    name: 'YUSMAN ADITAMA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XI ATPH',
    identifier: 'NISN: 0105408165',
    bioAuthEnabled: true,
    status: 'aktif'
  },

  // ============================================================================
  // DAFTAR SISWA KELAS XII ATPH (10 Siswa)
  // Menggunakan Nama Siswa dan NISN verbatim
  // ============================================================================
  {
    id: 'siswa-xii-1',
    name: 'ALIANTI PURNAMA SAR',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0097802705',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-2',
    name: 'MALIK CAHYONO',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0091771602',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-3',
    name: 'MUH. AL KAUSAR',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0095959976',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-4',
    name: 'MUH. ALIF ALHABSI',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0096173352',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-5',
    name: 'MUH. ZULFIKAR S.',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0093584467',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-6',
    name: 'MUHAMMAD ALMUBARAQ MATTARA',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0102354314',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-7',
    name: 'MUHAMMAD RAHMAT HIDAYAT',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0099298642',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-8',
    name: 'PUTRI LIA SUTRISNO',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0086763777',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-9',
    name: 'RIFAL',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 3095771241',
    bioAuthEnabled: true,
    status: 'aktif'
  },
  {
    id: 'siswa-xii-10',
    name: 'VELICIA RIMA CAHYANI',
    role: 'peserta',
    school: SCHOOL_NAME,
    className: 'KELAS XII ATPH',
    identifier: 'NISN: 0098980008',
    bioAuthEnabled: true,
    status: 'aktif'
  }
];
