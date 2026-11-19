import { CommodityId } from '../types';
import { BUNDLED_IMAGES } from '../utils/images';
import {
  JOBSHEET_INFO,
  JOB_MODULES,
  QUIZ_QUESTIONS,
  ESSAY_QUESTIONS,
  PRACTICAL_SKILLS_RUBRIC,
  INITIAL_DAILY_SCHEDULES,
  JobModule,
  QuizQuestion,
  EssayQuestion,
  PracticalSkillItem
} from './jobsheetData';

export interface DailyScheduleItem {
  id: string;
  time: string;
  title: string;
  desc: string;
  jobId: number;
  tag: string;
  active: boolean;
}

export interface CommodityInfo {
  title: string;
  subtitle: string;
  subject: string;
  competencyProgram: string;
  classPhase: string;
  commodity: string;
  totalJobs: string;
  publisher: string;
  growthRequirements: { factor: string; value: string }[];
}

export interface CommodityBundle {
  id: CommodityId;
  name: string;
  latinName: string;
  shortDesc: string;
  harvestDays: string;
  estimatedCycleDays: number;
  currentDayMock: number;
  imageUrl: string;
  info: CommodityInfo;
  modules: JobModule[];
  quizQuestions: QuizQuestion[];
  essayQuestions: EssayQuestion[];
  skillsRubric: PracticalSkillItem[];
  dailySchedules: DailyScheduleItem[];
}

// 1. SEMANGKA (dari PDF PT East West Seed Indonesia)
const SEMANGKA_BUNDLE: CommodityBundle = {
  id: 'semangka',
  name: 'Semangka',
  latinName: 'Citrullus lanatus',
  shortDesc: 'Budidaya semangka hibrida F1 dari sanitasi lahan, polinasi buatan, hingga pascapanen.',
  harvestDays: '60 - 75 HST',
  estimatedCycleDays: 65,
  currentDayMock: 35,
  imageUrl: BUNDLED_IMAGES.semangkaBedengan,
  info: JOBSHEET_INFO,
  modules: JOB_MODULES,
  quizQuestions: QUIZ_QUESTIONS,
  essayQuestions: ESSAY_QUESTIONS,
  skillsRubric: PRACTICAL_SKILLS_RUBRIC,
  dailySchedules: INITIAL_DAILY_SCHEDULES
};

// 2. CABAI MERAH (Capsicum annuum)
const CABAI_BUNDLE: CommodityBundle = {
  id: 'cabai',
  name: 'Cabai Merah',
  latinName: 'Capsicum annuum',
  shortDesc: 'Budidaya cabai merah besar/keriting dengan mulsa PHP, pemasangan ajir, perempelan tunas air, dan PHT.',
  harvestDays: '75 - 85 HST',
  estimatedCycleDays: 80,
  currentDayMock: 42,
  imageUrl: BUNDLED_IMAGES.cabaiLahan,
  info: {
    title: 'JOB SHEET BUDIDAYA CABAI MERAH (Capsicum annuum)',
    subtitle: 'Dari Sanitasi Lahan hingga Pascapanen',
    subject: 'Produksi Tanaman Hortikultura / Budidaya Tanaman Sayuran Buah',
    competencyProgram: 'Agribisnis Tanaman Pangan dan Hortikultura (ATPH)',
    classPhase: 'XI dan XII (Fase F)',
    commodity: 'Cabai Merah Hibrida F1',
    totalJobs: '7 Job (Total 35 JP) + Asesmen',
    publisher: 'Program Keahlian ATPH · Kurikulum Merdeka SMK',
    growthRequirements: [
      { factor: 'Suhu', value: 'Sekitar 24 - 28 °C' },
      { factor: 'Cahaya', value: 'Penuh, 10 - 12 jam per hari' },
      { factor: 'Tanah', value: 'Gembur, subur, pH 6,0 - 6,8' },
      { factor: 'Ketinggian', value: 'Dataran rendah - tinggi (0 - 1.200 mdpl)' },
      { factor: 'Drainase', value: 'Sangat baik, tidak boleh tergenang' },
      { factor: 'Umur Panen', value: 'Sekitar 75 - 85 HST (panen bertahap)' }
    ]
  },
  modules: [
    {
      id: 1,
      title: 'Sanitasi Lahan',
      subtitle: 'Membersihkan lahan bekas tanaman solanaceae dan menguji pH tanah',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengidentifikasi riwayat lahan dan menghindari bekas tanaman famili Solanaceae (tomat, terong, kentang).',
        'Melakukan pembersihan gulma inang virus kuning (kutu kebul & thrips).',
        'Mengukur pH tanah di 5 titik diagonal dengan target 6,0 - 6,8.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, sabit, garpu tanah', spec: 'Tajam dan bersih', qty: '1 set' },
        { name: 'Soil tester / pH meter', spec: 'Kalibrasi siap pakai', qty: '1 unit' },
        { name: 'Karung & gerobak dorong', spec: 'Angkut sisa gulma/akar', qty: '1 unit' },
        { name: 'Desinfektan (alkohol 70% / larutan klorin)', spec: 'Sterilisasi alat kerja', qty: 'Secukupnya' },
        { name: 'APD lengkap', spec: 'Sepatu boot, sarung tangan, topi, masker', qty: 'Per siswa' }
      ],
      k3Guidelines: [
        'Wajib memakai sepatu boot dan sarung tangan selama pembersihan semak dan batu.',
        'Jaga jarak aman ayunan cangkul minimal 2 meter antar siswa.',
        'Musnahkan sisa tanaman terserang layu bakteri/antraknosa di luar area tanam.'
      ],
      steps: [
        { id: 1, title: 'Persiapan dan briefing K3', detail: 'Kenakan APD lengkap, cek alat, bagi plot kelompok.', standard: 'APD lengkap; daftar pembagian tugas tertulis.' },
        { id: 2, title: 'Survei riwayat dan drainase', detail: 'Pastikan lahan bukan bekas cabai/tomat 2 musim terakhir dan saluran air lancar.', standard: 'Sketsa lahan, luas (m²), dan riwayat tanam tercatat.' },
        { id: 3, title: 'Pembersihan gulma inang hama', detail: 'Cabut gulma berdaun lebar (Ageratum/bandotan) hingga akar.', standard: 'Lahan bersih bebas gulma inang kutu kebul.' },
        { id: 4, title: 'Pengelolaan sisa tanaman', detail: 'Komposkan sisa sehat; kubur/musnahkan sisa bergejala penyakit.', standard: 'Area tanam steril dari sisa tanaman sakit.' },
        { id: 5, title: 'Perbaikan parit keliling', detail: 'Dalamkan parit keliling untuk pembuangan air hujan berlebih.', standard: 'Air tidak menggenang saat disiram/hujan.' },
        { id: 6, title: 'Pengukuran pH 5 titik', detail: 'Ambil sampel kedalaman 15-20 cm secara zig-zag, ukur dengan soil tester.', standard: 'pH tanah tercatat (target 6,0 - 6,8).' },
        { id: 7, title: 'Sanitasi alat dan dokumentasi', detail: 'Cuci dan semprot alat dengan desinfektan, unggah foto sebelum-sesudah.', standard: 'Alat bersih kering dan foto tersimpan di logbook.' }
      ],
      fieldTips: [
        'Gulma bandotan (Ageratum conyzoides) adalah inang utama kutu kebul pembawa Virus Gemini (daun keriting kuning).',
        'Drainase yang buruk pada cabai sangat cepat memicu penyakit layu bakteri (Ralstonia) dan layu fusarium.'
      ],
      numeracyChallenge: {
        question: 'Lahan cabai seluas 20 m x 30 m memiliki pH rata-rata 5,3. Jika untuk menaikkan pH menuju 6,5 dibutuhkan dolomit 15 kg per 100 m², berapa luas lahan dan berapa total kg dolomit yang dibutuhkan?',
        subQuestions: [
          'Luas lahan = 20 m × 30 m = 600 m²',
          'Kebutuhan dolomit = (600 / 100) × 15 kg = 90 kg'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Luas lahan = 20 m × 30 m = 600 m².',
          '2. Kelipatan luasan per 100 m² = 600 / 100 = 6 bagian.',
          '3. Total dolomit = 6 × 15 kg = 90 kg dolomit.'
        ]
      }
    },
    {
      id: 2,
      title: 'Pengolahan Lahan',
      subtitle: 'Membuat bedengan, pemberian kapur/pupuk dasar, dan pemasangan mulsa PHP',
      allocation: '6 JP (6 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengolah tanah gembur, mengaplikasikan dolomit, kompos matang, dan NPK dasar.',
        'Membuat bedengan ukuran standar cabai (lebar 100-110 cm, tinggi 35-40 cm).',
        'Memasang mulsa PHP dan melubangi pola zig-zag atau 2 baris (50 x 60 cm).'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, garu, meteran, tali rafia', spec: 'Pengolahan & pengukuran bedengan', qty: '1 set' },
        { name: 'Pupuk kandang matang', spec: 'Terfermentasi sempurna', qty: '150-200 kg/100 m²' },
        { name: 'NPK 16-16-16 + SP-36 + KCl', spec: 'Pupuk dasar', qty: '4 kg/100 m²' },
        { name: 'Dolomit', spec: 'Jika pH < 6,0', qty: '15 kg/100 m²' },
        { name: 'Mulsa PHP & pasak bambu', spec: 'Perak di atas, hitam di bawah', qty: 'Sesuai panjang bedengan' }
      ],
      k3Guidelines: [
        'Gunakan masker dan sarung tangan saat mencampur kapur dolomit dan pupuk kimia.',
        'Berhati-hati saat melubangi mulsa menggunakan pelubang kaleng panas (bara api).'
      ],
      steps: [
        { id: 1, title: 'Pembajakan dan penjemuran tanah', detail: 'Cangkul tanah sedalam 30 cm lalu jemur 5-7 hari untuk menekan patogen tular tanah.', standard: 'Tanah remah dan terjemur merata.' },
        { id: 2, title: 'Pengapuran dan pupuk dasar', detail: 'Sebar dolomit, pupuk kandang matang, dan NPK dasar lalu aduk rata.', standard: 'Pupuk tercampur homogen dalam bedengan.' },
        { id: 3, title: 'Pembentukan bedengan', detail: 'Bentuk bedengan lebar 100-110 cm, tinggi 35-40 cm, parit lebar 50-60 cm.', standard: 'Bedengan lurus, padat merata, parit dalam.' },
        { id: 4, title: 'Pemasangan mulsa PHP', detail: 'Siram bedengan lembap, tarik mulsa kencang saat terik, kunci tepi dengan pasak U.', standard: 'Mulsa kencang tanpa kerutan dan tidak robek.' },
        { id: 5, title: 'Pembuatan lubang tanam 2 baris', detail: 'Buat 2 baris lubang tanam diameter 8-10 cm jarak 50 x 60 cm (pola zig-zag).', standard: 'Lubang sejajar zig-zag berjarak seragam.' }
      ],
      fieldTips: [
        'Pemasangan mulsa paling optimal dilakukan siang hari pukul 11.00-14.00 saat plastik sedikit memuai sehingga hasilnya kencang ketika dingin.',
        'Pola lubang zig-zag memaksimalkan sirkulasi udara dan penangkapan sinar matahari antar kanopi cabai.'
      ],
      numeracyChallenge: {
        question: 'Sebuah bedengan panjang 20 m ditanami cabai sistem 2 baris dengan jarak dalam baris 50 cm. Berapa jumlah lubang tanam pada satu bedengan tersebut?',
        subQuestions: [
          'Lubang per baris = 20 m ÷ 0,5 m = 40 lubang',
          'Total 2 baris = 40 × 2 = 80 lubang tanam'
        ],
        unit: 'lubang',
        solutionExplanation: [
          '1. Jumlah lubang dalam 1 baris = 20 m / 0,5 m = 40 lubang.',
          '2. Karena terdapat 2 baris per bedengan = 40 × 2 = 80 lubang tanam.'
        ]
      }
    },
    {
      id: 3,
      title: 'Penyemaian Benih',
      subtitle: 'Menyiapkan bibit cabai sehat bebas virus selama 21-28 HSS',
      allocation: '4 JP (4 x 45 menit), pengamatan 21-28 hari',
      location: 'Rumah semai berjaring anti-serangga (insect screen)',
      learningObjectives: [
        'Menyiapkan media semai steril (tanah : kompos : arang sekam = 1 : 1 : 1).',
        'Melakukan perlakuan benih air hangat (50 °C) dan penyemaian pada tray/polybag.',
        'Melindungi bibit dari kutu kebul sejak dini di dalam sungkup insect net.'
      ],
      toolsAndMaterials: [
        { name: 'Tray semai (105 atau 72 lubang)', spec: 'Bersih dan steril', qty: 'Sesuai kebutuhan' },
        { name: 'Benih cabai merah hibrida F1', spec: 'Cek daya tumbuh & kadaluwarsa', qty: '1 sachet / sesuai luas' },
        { name: 'Media tanah halus + kompos + sekam bakar', spec: 'Rasio 1 : 1 : 1 diayak', qty: 'Secukupnya' },
        { name: 'Insect screen / kelambu semai', spec: 'Mencegah masuknya kutu kebul', qty: '1 unit sungkup' }
      ],
      k3Guidelines: [
        'Cuci tangan bersih setelah memegang benih yang diberi seed treatment fungisida.',
        'Gunakan masker saat mengayak kompos dan sekam bakar kering.'
      ],
      steps: [
        { id: 1, title: 'Sortasi dan perendaman benih', detail: 'Rendam benih dalam air hangat kuku (50 °C) selama 2-4 jam, buang yang mengapung.', standard: 'Benih bernas tenggelam dan menyerap air.' },
        { id: 2, title: 'Persiapan media dan pengisian tray', detail: 'Ayak media 1:1:1, lembapkan, isi lubang tray hingga penuh rata.', standard: 'Media gembur tidak padat berlebih.' },
        { id: 3, title: 'Penanaman benih', detail: 'Masukkan 1 benih per lubang kedalaman 0,5-1 cm, tutup tipis abu sekam/media halus.', standard: '1 benih/lubang kedalaman seragam.' },
        { id: 4, title: 'Pemeliharaan dalam sungkup screen', detail: 'Siram kabut halus pagi-sore, lindungi selalu dengan insect net untuk cegah virus.', standard: 'Bibit 21-28 HSS punya 4-5 daun sejati, batang kokoh.' }
      ],
      fieldTips: [
        'Kunci sukses cabai bebas keriting daun (Virus Gemini) dimulai di pembibitan: jangan pernah membiarkan persemaian terbuka tanpa kelambu kasa!',
        'Pengerasan bibit (hardening) dilakukan 4 hari sebelum tanam dengan mengurangi siraman.'
      ],
      numeracyChallenge: {
        question: 'Dibutuhkan 1.200 bibit cabai untuk lahan praktik, ditambah cadangan sulaman 10%. Jika menggunakan tray semai isi 105 lubang, berapa jumlah minimal tray yang harus disiapkan?',
        subQuestions: [
          'Total bibit = 1.200 × 1,10 = 1.320 bibit',
          'Jumlah tray = 1.320 ÷ 105 = 12,57 → dibulatkan ke atas menjadi 13 tray'
        ],
        unit: 'tray',
        solutionExplanation: [
          '1. Bibit + cadangan 10% = 1.200 + 120 = 1.320 bibit.',
          '2. Tray dibutuhkan = 1.320 / 105 = 12,57 → 13 tray semai.'
        ]
      }
    },
    {
      id: 4,
      title: 'Penanaman & Pemasangan Ajir',
      subtitle: 'Pindah tanam bibit umur 21-28 HSS dan memasang lanjaran bambu',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Melakukan pindah tanam pada sore hari tanpa merusak gumpalan media akar.',
        'Memasang ajir/turus bambu setinggi 120-150 cm agar tanaman tidak rebah saat berbuah lebat.'
      ],
      toolsAndMaterials: [
        { name: 'Bibit cabai umur 21-28 HSS', spec: '4-5 daun sejati, sehat bebas virus', qty: 'Sesuai lubang + 10%' },
        { name: 'Ajir bambu tinggi 120-150 cm', spec: 'Halus, ujung diruncingkan', qty: '1 batang/tanaman' },
        { name: 'Tali rafia / pengikat', spec: 'Ikatan angka 8 longgar', qty: 'Secukupnya' }
      ],
      k3Guidelines: [
        'Gunakan sarung tangan saat menancapkan ajir bambu agar terhindar dari sembilu/serpihan tajam.',
        'Tanam pada sore hari pukul 15.30-17.30 untuk mencegah stres panas.'
      ],
      steps: [
        { id: 1, title: 'Pemasangan ajir terlebih dahulu', detail: 'Tancapkan ajir berjarak ±10 cm di samping lubang tanam sedalam 25-30 cm sebelum atau segera sesudah tanam.', standard: 'Ajir kokoh miring sedikit ke luar atau tegak lurus.' },
        { id: 2, title: 'Pelepasan dan penanaman bibit', detail: 'Keluarkan bibit dengan media utuh, tanam rata leher akar tanpa mengubur batang.', standard: 'Bibit berdiri tegak lurus.' },
        { id: 3, title: 'Penyiraman awal & penyulaman', detail: 'Siram air bersih/starter 150 ml/tanaman. Lakukan penyulaman pada 7-10 HST.', standard: 'Populasi tumbuh 100%.' }
      ],
      fieldTips: [
        'Memasang ajir di awal sebelum akar tanaman menyebar luas mencegah kerusakan/putusnya perakaran muda.',
        'Jangan mengikat batang terlalu erat ke ajir—gunakan ikatan berbentuk angka 8 agar batang tetap leluasa membesar.'
      ],
      numeracyChallenge: {
        question: 'Kelompok siswa menanam 8 bedengan cabai, masing-masing 80 tanaman. Jika 1 ikat ajir berisi 50 batang bambu, berapa ikat ajir yang harus dibeli?',
        subQuestions: [
          'Total tanaman = 8 × 80 = 640 tanaman',
          'Jumlah ikat = 640 ÷ 50 = 12,8 → dibulatkan ke atas 13 ikat'
        ],
        unit: 'ikat',
        solutionExplanation: [
          '1. Total populasi = 8 bedengan × 80 lubang = 640 tanaman.',
          '2. Kebutuhan ikat = 640 / 50 = 12,8 → 13 ikat ajir.'
        ]
      }
    },
    {
      id: 5,
      title: 'Pemeliharaan Tanaman',
      subtitle: 'Perempelan tunas air, pemupukan susulan kocor, pengikatan ajir, dan PHT',
      allocation: '8 JP (dilaksanakan bertahap per fase)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Melakukan perempelan (pewiwilan) tunas air di bawah cabang utama Y (dikotomi).',
        'Melakukan pemupukan kocor berimbang fase vegetatif dan generatif.',
        'Memantau dan mengendalikan OPT utama cabai (thrips, kutu kebul, tungau, lalat buah, antraknosa).'
      ],
      toolsAndMaterials: [
        { name: 'Pupuk NPK 16-16-16 & KNO3/MKP', spec: 'Sistem kocor pangkal', qty: 'Sesuai fase HST' },
        { name: 'Perangkap kuning & metil eugenol', spec: 'Monitoring kutu kebul & lalat buah', qty: '4-6/100 m²' },
        { name: 'Tali pengikat batang ke ajir', spec: 'Ikatan angka 8', qty: 'Secukupnya' }
      ],
      k3Guidelines: [
        'Gunakan APD lengkap (masker, kacamata, baju lengan panjang) apabila menyemprot pestisida nabati/kimia.',
        'Cuci tangan dengan sabun setelah melakukan perempelan tunas.'
      ],
      steps: [
        { id: 1, title: 'Perempelan (Pewiwilan) tunas air', detail: 'Buang seluruh tunas samping yang tumbuh di ketiak daun di bawah percabangan Y utama pada umur 14-25 HST.', standard: 'Batang bawah cabang Y bersih, sirkulasi udara lancar.' },
        { id: 2, title: 'Pengikatan tanaman ke ajir', detail: 'Ikat batang secara bertahap pada ajir saat tinggi bertambah menggunakan simpul angka 8.', standard: 'Tanaman kokoh menempel aman pada ajir.' },
        { id: 3, title: 'Pemupukan susulan kocor', detail: '10-30 HST: NPK 16-16-16 10 g/L (200 ml/tanaman) tiap 7-10 hari. Masuk fase bunga/buah (>35 HST): tambah Kalsium & Kalium tinggi.', standard: 'Pertumbuhan subur, bunga tidak mudah rontok.' },
        { id: 4, title: 'Pengendalian OPT terpadu (PHT)', detail: 'Pasang perangkap kuning & atraktan lalat buah. Petik buah busuk antraknosa agar spora tidak menyebar.', standard: 'Populasi hama terkendali di bawah ambang ekonomi.' }
      ],
      fieldTips: [
        'Perempelan tunas air dilakukan pada pagi cerah agar bekas luka cepat mengering dan tidak terinfeksi jamur/bakteri.',
        'Kekurangan Kalsium (Ca) pada cabai menyebabkan busuk ujung buah (blossom end rot).'
      ],
      numeracyChallenge: {
        question: 'Populasi 640 tanaman cabai dikocor larutan NPK konsentrasi 10 g/L sebanyak 200 ml per tanaman. Berapa liter air dan berapa kg NPK yang dibutuhkan?',
        subQuestions: [
          'Total air = 640 × 200 ml = 128.000 ml = 128 liter',
          'Total NPK = 128 liter × 10 g/L = 1.280 gram = 1,28 kg'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Volume air = 640 × 0,2 L = 128 liter.',
          '2. Pupuk NPK = 128 L × 10 g/L = 1.280 g = 1,28 kg.'
        ]
      }
    },
    {
      id: 6,
      title: 'Panen Cabai',
      subtitle: 'Memanen cabai sesuai kriteria kemasakan komersial secara bertahap',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengenali tingkat kemasakan buah cabai (80-90% merah penuh atau sesuai permintaan pasar).',
        'Memanen cabai dengan tangkai buah tetap utuh agar daya simpan panjang.'
      ],
      toolsAndMaterials: [
        { name: 'Keranjang plastik berventilasi / karung jaring', spec: 'Wadah panen teduh', qty: 'Secukupnya' },
        { name: 'Timbangan panen', spec: 'Kapasitas 20-50 kg', qty: '1 unit' },
        { name: 'Logbook pencatatan panen', spec: 'Catat tanggal & bobot per petikan', qty: '1 set' }
      ],
      k3Guidelines: [
        'Gunakan sarung tangan dan hindari menyentuh mata setelah memegang cabai agar tidak terasa pedih/panas.',
        'Lakukan panen pagi hari pukul 07.00-10.00 setelah embun mengering.'
      ],
      steps: [
        { id: 1, title: 'Inspeksi kematangan buah', detail: 'Pilih buah cabai yang berwarna merah merata (80-90% merah) dan tekstur keras mengkilap.', standard: 'Warna merah seragam sesuai standar pasar.' },
        { id: 2, title: 'Teknik pemetikan yang benar', detail: 'Petik buah beserta tangkainya menggunakan jari dengan hati-hati agar cabang tidak patah.', standard: 'Tangkai buah utuh; cabang tanaman tidak rusak.' },
        { id: 3, title: 'Penampungan teduh & penimbangan', detail: 'Letakkan hasil panen di tempat teduh berventilasi (jangan dijemur terik) dan catat bobot per petikan.', standard: 'Bobot panen per petikan tercatat di logbook.' }
      ],
      fieldTips: [
        'Memetik cabai saat masih berembun pagi hari dapat mempercepat pembusukan pascapanen di karung. Tunggu hingga embun mengering.',
        'Panen cabai dapat dilakukan berulang setiap 3-5 hari sekali hingga puluhan kali petik.'
      ],
      numeracyChallenge: {
        question: 'Dari 640 tanaman cabai, rata-rata hasil panen kumulatif mencapai 0,8 kg per tanaman. Berapa total kg hasil panen dan berapa rata-rata produksi per m² jika luas lahan 600 m²?',
        subQuestions: [
          'Total hasil = 640 × 0,8 kg = 512 kg',
          'Produktivitas = 512 kg ÷ 600 m² = 0,85 kg/m² (setara 8,5 ton/ha)'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Total panen = 640 tanaman × 0,8 kg = 512 kg.',
          '2. Produktivitas = 512 kg / 600 m² = 0,85 kg/m².'
        ]
      }
    },
    {
      id: 7,
      title: 'Pascapanen Cabai',
      subtitle: 'Sortasi, pengkelasan mutu (grading), pengemasan berventilasi, dan analisis usaha',
      allocation: '5 JP (5 x 45 menit)',
      location: 'Ruang pascapanen / gudang sekolah',
      learningObjectives: [
        'Memisahkan buah cacat/antraknosa dan mengelompokkan Grade A (mulus lurus) serta Grade B.',
        'Menghitung total biaya, pendapatan, keuntungan, dan kelayakan R/C ratio usaha tani cabai.'
      ],
      toolsAndMaterials: [
        { name: 'Meja sortasi & alas terpal bersih', spec: 'Permukaan kering', qty: '1 set' },
        { name: 'Kardus / keranjang plastik berlubang', spec: 'Sirkulasi udara baik', qty: 'Secukupnya' },
        { name: 'Kalkulator & buku analisis usaha', spec: 'Hitung R/C ratio', qty: '1 set' }
      ],
      k3Guidelines: [
        'Buang buah terserang antraknosa/busuk ke tempat tertutup jauh dari gudang agar spora tidak menulari cabai sehat.',
        'Cuci tangan dengan sabun setelah melakukan sortasi.'
      ],
      steps: [
        { id: 1, title: 'Sortasi buah afkir/cacat', detail: 'Pisahkan cabai busuk, berlubang ulat/lalat buah, atau bengkok parah.', standard: 'Buah sehat terpisah 100% dari buah busuk.' },
        { id: 2, title: 'Grading & pengemasan berventilasi', detail: 'Kelompokkan Grade A & B. Kemas dalam kardus berlubang atau karung jaring jangan terlalu padat.', standard: 'Cabai tidak berkeringat/panas di dalam kemasan.' },
        { id: 3, title: 'Analisis usaha tani', detail: 'Hitung total pendapatan, biaya produksi, keuntungan bersih, dan R/C ratio.', standard: 'Perhitungan R/C ratio benar dan runtut.' }
      ],
      fieldTips: [
        'Cabai mudah mengalami "sweating" (berkeringat) dan cepat membusuk jika disimpan dalam plastik kedap udara tanpa ventilasi.',
        'Labelisasi kelompok tani/sekolah dan tanggal panen meningkatkan kepercayaan pembeli pasar modern.'
      ],
      numeracyChallenge: {
        question: 'Hasil panen 512 kg cabai terjual rata-rata Rp 28.000/kg. Jika total biaya produksi Rp 5.200.000, hitunglah pendapatan, keuntungan, dan nilai R/C ratio-nya!',
        subQuestions: [
          'Pendapatan = 512 kg × Rp 28.000 = Rp 14.336.000',
          'Keuntungan = Rp 14.336.000 - Rp 5.200.000 = Rp 9.136.000',
          'R/C ratio = 14.336.000 ÷ 5.200.000 = 2,76 (> 1 sangat menguntungkan)'
        ],
        unit: 'R/C',
        solutionExplanation: [
          '1. Pendapatan = 512 × 28.000 = Rp 14.336.000.',
          '2. Keuntungan = 14.336.000 - 5.200.000 = Rp 9.136.000.',
          '3. R/C ratio = 14.336.000 / 5.200.000 = 2,76 (Layak & menguntungkan).'
        ]
      }
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Mengapa pada sanitasi lahan cabai disarankan menghindari bekas tanaman famili Solanaceae (tomat, terong, kentang)?',
      options: [
        { key: 'A', text: 'Agar warna cabai lebih cerah' },
        { key: 'B', text: 'Memutus siklus hama dan patogen penyakit tular tanah yang sama seperti layu bakteri' },
        { key: 'C', text: 'Memperpendek ukuran ajir bambu' },
        { key: 'D', text: 'Mengurangi kebutuhan air siraman' }
      ],
      correctAnswer: 'B',
      explanation: 'Tanaman satu famili Solanaceae memiliki kerentanan terhadap hama dan penyakit tular tanah yang sama (seperti Ralstonia & Fusarium).',
      points: 4
    },
    {
      id: 2,
      question: 'Kisaran pH tanah yang optimal untuk budidaya tanaman cabai merah adalah ...',
      options: [
        { key: 'A', text: '3,5 - 4,5' },
        { key: 'B', text: '6,0 - 6,8' },
        { key: 'C', text: '8,0 - 9,0' },
        { key: 'D', text: '4,5 - 5,0' }
      ],
      correctAnswer: 'B',
      explanation: 'Pada pH 6,0 - 6,8 unsur hara makro dan mikro tersedia optimal bagi perakaran cabai.',
      points: 4
    },
    {
      id: 3,
      question: 'Fungsi utama pemasangan kelambu jaring (insect screen) pada rumah semai bibit cabai adalah ...',
      options: [
        { key: 'A', text: 'Mencegah masuknya kutu kebul pembawa Virus Gemini sejak fase bibit' },
        { key: 'B', text: 'Mempercepat pembuahan di dalam tray' },
        { key: 'C', text: 'Menurunkan pH media semai' },
        { key: 'D', text: 'Menggantikan fungsi pupuk NPK' }
      ],
      correctAnswer: 'A',
      explanation: 'Serangan kutu kebul (Bemisia tabaci) di pembibitan menyebabkan tanaman terinfeksi virus kuning sebelum dipindah tanam.',
      points: 4
    },
    {
      id: 4,
      question: 'Umur bibit cabai yang siap dipindahtanamkan ke bedengan lahan adalah ...',
      options: [
        { key: 'A', text: '5 - 7 HSS' },
        { key: 'B', text: '21 - 28 HSS (4 - 5 daun sejati)' },
        { key: 'C', text: '50 - 60 HSS' },
        { key: 'D', text: '70 - 80 HSS' }
      ],
      correctAnswer: 'B',
      explanation: 'Bibit cabai siap tanam di umur 21-28 hari setelah semai dengan 4-5 helai daun sejati dan akar kompak.',
      points: 4
    },
    {
      id: 5,
      question: 'Apa tujuan perempelan (pewiwilan) tunas air di bawah percabangan Y utama pada tanaman cabai?',
      options: [
        { key: 'A', text: 'Memperbanyak daun di pangkal batang' },
        { key: 'B', text: 'Memfokuskan nutrisi ke cabang utama produktif dan memperbaiki sirkulasi udara' },
        { key: 'C', text: 'Menghambat pertumbuhan bunga' },
        { key: 'D', text: 'Meningkatkan kelembapan pangkal batang' }
      ],
      correctAnswer: 'B',
      explanation: 'Tunas air di bawah cabang Y hanya menguras nutrisi dan membuat bagian bawah lembap sehingga mudah terserang jamur.',
      points: 4
    },
    {
      id: 6,
      question: 'Simpul ikatan yang disarankan untuk mengikat batang tanaman cabai ke ajir bambu adalah ...',
      options: [
        { key: 'A', text: 'Simpul mati yang sangat kencang' },
        { key: 'B', text: 'Simpul angka 8 yang memberi ruang tumbuh batang' },
        { key: 'C', text: 'Simpul pita pada pucuk daun' },
        { key: 'D', text: 'Tidak perlu diikat' }
      ],
      correctAnswer: 'B',
      explanation: 'Ikatan angka 8 mencegah batang bergesekan langsung dengan bambu sekaligus tetap memberi ruang batang membesar.',
      points: 4
    },
    {
      id: 7,
      question: 'Penyakit cabai yang ditandai bercak melingkar cekung berwarna cokelat/hitam pada buah disebut ...',
      options: [
        { key: 'A', text: 'Antraknosa / Patek (Colletotrichum sp.)' },
        { key: 'B', text: 'Embun tepung' },
        { key: 'C', text: 'Karat daun' },
        { key: 'D', text: 'Akar gada' }
      ],
      correctAnswer: 'A',
      explanation: 'Antraknosa (patek) disebabkan jamur Colletotrichum sp. dan sangat cepat menular pada kondisi lembap.',
      points: 4
    },
    {
      id: 8,
      question: 'Perangkap atraktan metil eugenol di lahan cabai digunakan untuk mengendalikan hama ...',
      options: [
        { key: 'A', text: 'Siput dan keong' },
        { key: 'B', text: 'Lalat buah jantan (Bactrocera sp.)' },
        { key: 'C', text: 'Ulat tanah' },
        { key: 'D', text: 'Tikus sawah' }
      ],
      correctAnswer: 'B',
      explanation: 'Metil eugenol memikat lalat buah jantan masuk ke perangkap botol sehingga perkawinan dan peletakan telur pada buah cabai terhenti.',
      points: 4
    },
    {
      id: 9,
      question: 'Waktu panen cabai terbaik dan cara pemetikan yang dianjurkan adalah ...',
      options: [
        { key: 'A', text: 'Tengah malam dengan cara mencabut buah tanpa tangkai' },
        { key: 'B', text: 'Pagi hari setelah embun kering, dipetik utuh bersama tangkai buahnya' },
        { key: 'C', text: 'Siang terik lalu dijemur di atas mulsa' },
        { key: 'D', text: 'Saat buah masih berukuran 2 cm dan hijau muda' }
      ],
      correctAnswer: 'B',
      explanation: 'Pemetikan setelah embun kering beserta tangkai menjaga kesegaran dan memperpanjang umur simpan cabai.',
      points: 4
    },
    {
      id: 10,
      question: 'Mengapa kemasan cabai hasil panen wajib menggunakan kardus berlubang atau keranjang berventilasi?',
      options: [
        { key: 'A', text: 'Agar cabai terkena sinar matahari langsung' },
        { key: 'B', text: 'Mencegah penumpukan panas respirasi dan kondensasi uap air yang memicu busuk' },
        { key: 'C', text: 'Menurunkan bobot cabai' },
        { key: 'D', text: 'Agar mudah dihinggapi lalat buah' }
      ],
      correctAnswer: 'B',
      explanation: 'Cabai yang dikemas tertutup rapat akan mengalami peningkatan suhu dan kelembapan sehingga mudah berjamur dan busuk.',
      points: 4
    }
  ],
  essayQuestions: [
    {
      id: 11,
      question: 'Jelaskan mengapa pemasangan kelambu kasa (insect net) di rumah semai cabai dan pembersihan gulma bandotan di lahan sangat penting dalam pengendalian Virus Gemini!',
      maxScore: 12,
      sampleAnswer: 'Virus Gemini (daun keriting kuning) ditularkan oleh vektor kutu kebul (Bemisia tabaci). Kelambu kasa melindungi bibit muda di fase paling rentan agar bebas dari tusukan kutu kebul, sedangkan sanitasi gulma bandotan di sekitar bedengan menghilangkan tempat bersembunyi dan inang alternatif vektor tersebut.'
    },
    {
      id: 12,
      question: 'Jelaskan cara pemasangan mulsa PHP, pembuatan lubang tanam pola zig-zag, serta keuntungan sistem tersebut pada budidaya cabai!',
      maxScore: 12,
      sampleAnswer: 'Mulsa PHP dipasang siang hari agar plastik lentur/kencang dengan sisi perak menghadap atas dan hitam ke bawah. Lubang tanam dibuat 2 baris pola zig-zag (50x60 cm). Keuntungannya: memantulkan cahaya ke bawah daun (mengusir thrips/aphid), menekan gulma, menjaga kelembapan, dan memberi ruang sirkulasi udara lebih lega antar tanaman.'
    },
    {
      id: 13,
      question: 'Jelaskan teknik perempelan (pewiwilan) tunas air pada tanaman cabai serta kapan waktu pelaksanaannya yang tepat!',
      maxScore: 12,
      sampleAnswer: 'Perempelan dilakukan dengan membuang seluruh tunas samping pada ketiak daun di bawah percabangan utama (cabang Y/dikotomi) pada umur 14-25 HST. Waktu terbaik adalah pagi hari yang cerah agar bekas luka petikan cepat mengering dan tidak mudah dimasuki patogen jamur/bakteri.'
    },
    {
      id: 14,
      question: 'Sebutkan 3 OPT utama pada tanaman cabai beserta strategi pengendalian berprinsip PHT!',
      maxScore: 12,
      sampleAnswer: '1) Thrips & Kutu Kebul: pasang mulsa PHP + perangkap kuning + sanitasi gulma. 2) Lalat Buah: pasang perangkap atraktan metil eugenol dan kumpulkan buah jatuh. 3) Antraknosa (Patek): perbaiki drainase, rempel/buang buah sakit di luar kebun, gunakan varietas toleran dan fungisida selektif sebagai pilihan terakhir.'
    },
    {
      id: 15,
      question: 'Sebuah kelompok menanam 640 tanaman cabai di lahan 600 m². Rata-rata panen kumulatif 0,8 kg/tanaman dengan harga jual Rp 28.000/kg dan biaya produksi Rp 5.200.000. Hitung total hasil, pendapatan, keuntungan, dan R/C ratio!',
      maxScore: 12,
      sampleAnswer: 'Total hasil = 640 × 0,8 kg = 512 kg. Pendapatan = 512 × Rp 28.000 = Rp 14.336.000. Keuntungan = Rp 14.336.000 - Rp 5.200.000 = Rp 9.136.000. R/C ratio = 14.336.000 : 5.200.000 = 2,76 (usaha sangat menguntungkan karena R/C > 1).'
    }
  ],
  skillsRubric: [
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Menggunakan APD dan membersihkan gulma inang kutu kebul sesuai K3' },
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Mengukur pH tanah di 5 titik diagonal dengan hasil akurat' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Mengolah tanah gembur dan mengaplikasikan kapur serta pupuk dasar rata' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Membuat bedengan standar cabai (L 100-110 cm, T 35-40 cm)' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Memasang mulsa PHP kencang & membuat lubang tanam pola zig-zag 2 baris' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Menyiapkan media steril 1:1:1 dan perendaman benih air hangat' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Menyemai di tray di bawah sungkup kasa anti serangga' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Merawat dan menyeleksi bibit siap tanam umur 21-28 HSS' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memasang ajir bambu kokoh tanpa merusak perakaran' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memindah tanam bibit pada sore hari dengan kedalaman tepat' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Melakukan perempelan tunas air di bawah cabang Y dengan bersih' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Mengikat batang ke ajir menggunakan simpul angka 8' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Mengocor pupuk susulan berimbang tepat dosis dan waktu' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Memasang perangkap kuning/metil eugenol & memantau OPT (PHT)' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Memanen buah matang merah merata beserta tangkainya setelah embun kering' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Menimbang dan mencatat bobot panen per petikan di logbook' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Melakukan sortasi buah cacat/antraknosa dan grading mutu' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Mengemas di wadah berventilasi dan menyusun analisis usaha R/C ratio' }
  ],
  dailySchedules: [
    { id: 'cabai-1', time: '07:00 - 08:30 WIB', title: 'Perempelan Tunas Air & Pengikatan Ajir', desc: 'Buang tunas samping di bawah cabang Y saat pagi cerah dan ikat batang dengan simpul angka 8.', jobId: 5, tag: 'Pembentukan Tajuk', active: true },
    { id: 'cabai-2', time: '09:00 - 10:00 WIB', title: 'Monitoring Thrips, Kutu Kebul & Antraknosa', desc: 'Cek perangkap kuning dan bagian bawah daun pucuk; pisahkan buah bergejala patek.', jobId: 5, tag: 'PHT Rutin', active: true },
    { id: 'cabai-3', time: '15:30 - 17:00 WIB', title: 'Pengocoran Pupuk NPK + Kalsium & Penyiraman', desc: 'Kocor larutan pupuk di sekitar pangkal tanaman (200 ml/tanaman), pastikan drainase parit lancar.', jobId: 5, tag: 'Nutrisi', active: true }
  ]
};

// 3. TOMAT (Solanum lycopersicum)
const TOMAT_BUNDLE: CommodityBundle = {
  id: 'tomat',
  name: 'Tomat Hibrida',
  latinName: 'Solanum lycopersicum',
  shortDesc: 'Budidaya tomat determinit/indeterminit dengan lanjaran bambu, pewiwilan tunas ketiak, dan pengendalian layu.',
  harvestDays: '60 - 70 HST',
  estimatedCycleDays: 65,
  currentDayMock: 38,
  imageUrl: BUNDLED_IMAGES.tomatLahan,
  info: {
    title: 'JOB SHEET BUDIDAYA TOMAT HIBRIDA (Solanum lycopersicum)',
    subtitle: 'Dari Sanitasi Lahan hingga Pascapanen',
    subject: 'Produksi Tanaman Hortikultura / Budidaya Tanaman Sayuran Buah',
    competencyProgram: 'Agribisnis Tanaman Pangan dan Hortikultura (ATPH)',
    classPhase: 'XI dan XII (Fase F)',
    commodity: 'Tomat Hibrida F1',
    totalJobs: '7 Job (Total 35 JP) + Asesmen',
    publisher: 'Program Keahlian ATPH · Kurikulum Merdeka SMK',
    growthRequirements: [
      { factor: 'Suhu', value: 'Sekitar 20 - 27 °C' },
      { factor: 'Cahaya', value: 'Penuh, minimal 8 jam per hari' },
      { factor: 'Tanah', value: 'Gembur, kaya bahan organik, pH 6,0 - 6,8' },
      { factor: 'Ketinggian', value: 'Dataran medium - tinggi (atau varietas dataran rendah)' },
      { factor: 'Kebutuhan Air', value: 'Stabil merata (hindari fluktuasi ekstrem)' },
      { factor: 'Umur Panen', value: 'Sekitar 60 - 70 HST' }
    ]
  },
  modules: [
    {
      id: 1,
      title: 'Sanitasi Lahan',
      subtitle: 'Pembersihan lahan bebas patogen layu bakteri & fusarium dan uji pH',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengidentifikasi riwayat lahan dan melakukan rotasi dari tanaman famili Solanaceae.',
        'Memastikan saluran drainase baik untuk mencegah serangan layu bakteri dan busuk akar.',
        'Mengukur pH tanah di 5 titik dengan target 6,0 - 6,8.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, sabit, garpu tanah', spec: 'Tajam dan bersih', qty: '1 set' },
        { name: 'Soil tester / pH meter', spec: 'Siap pakai', qty: '1 unit' },
        { name: 'Desinfektan alat', spec: 'Alkohol 70% / larutan pemutih', qty: 'Secukupnya' },
        { name: 'APD lengkap', spec: 'Sepatu boot, sarung tangan, topi, masker', qty: 'Per siswa' }
      ],
      k3Guidelines: [
        'Kenakan sepatu boot dan sarung tangan selama bekerja di lahan.',
        'Sterilkan mata cangkul dengan desinfektan jika sebelumnya digunakan di lahan sakit.'
      ],
      steps: [
        { id: 1, title: 'Persiapan & K3', detail: 'Gunakan APD lengkap dan periksa kebersihan peralatan.', standard: 'APD lengkap dan alat disterilkan.' },
        { id: 2, title: 'Survei lahan & riwayat tanam', detail: 'Pastikan lahan mendapat sinar matahari penuh dan bebas genangan.', standard: 'Sketsa dan luas lahan tercatat.' },
        { id: 3, title: 'Pembersihan gulma & sisa tanaman', detail: 'Bersihkan gulma dan musnahkan sisa tanaman sakit jauh dari bedengan.', standard: 'Lahan bersih bebas sisa tanaman terong-terongan.' },
        { id: 4, title: 'Perbaikan drainase & uji pH', detail: 'Bersihkan parit keliling, ambil 5 sampel tanah untuk uji pH.', standard: 'Parit lancar dan nilai pH tercatat.' }
      ],
      fieldTips: [
        'Patogen layu bakteri (Ralstonia solanacearum) dapat bertahan bertahun-tahun dalam tanah dan menyebar lewat aliran air atau alat kotor.',
        'Pengapuran sangat penting pada tomat karena Kalsium membantu mencegah busuk ujung buah (blossom end rot).'
      ],
      numeracyChallenge: {
        question: 'Sebuah lahan praktik tomat berukuran 15 m x 20 m. Berapa luas lahan tersebut dan berapa kebutuhan pupuk kandang matang jika dosis anjuran 1,5 kg per m²?',
        subQuestions: [
          'Luas lahan = 15 m × 20 m = 300 m²',
          'Pupuk kandang = 300 m² × 1,5 kg/m² = 450 kg'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Luas = 15 m × 20 m = 300 m².',
          '2. Pupuk kandang = 300 × 1,5 kg = 450 kg.'
        ]
      }
    },
    {
      id: 2,
      title: 'Pengolahan Lahan',
      subtitle: 'Penggemburan tanah, pemupukan dasar, pembuatan bedengan, dan mulsa PHP',
      allocation: '6 JP (6 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengolah tanah gembur sedalam 30 cm serta mencampur kapur dan pupuk dasar.',
        'Membuat bedengan dan memasang mulsa PHP dengan lubang tanam berjarak 50 x 60 cm.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, garu, tali rafia', spec: 'Pengolahan dan pelurusan bedengan', qty: '1 set' },
        { name: 'Dolomit & pupuk kandang matang', spec: 'Pembenah tanah & pupuk dasar', qty: 'Sesuai luas' },
        { name: 'Pupuk NPK 16-16-16 & SP-36', spec: 'Pupuk dasar', qty: '3-4 kg/100 m²' },
        { name: 'Mulsa PHP & pelubang mulsa', spec: 'Sisi perak menghadap atas', qty: '1 set' }
      ],
      k3Guidelines: [
        'Pakai masker dan sarung tangan saat menebar dolomit dan pupuk.',
        'Gunakan sarung tangan tebal saat memegang pelubang mulsa panas.'
      ],
      steps: [
        { id: 1, title: 'Olah tanah pertama & penjemuran', detail: 'Gemburkan tanah sedalam 30 cm dan jemur selama 5-7 hari.', standard: 'Tanah remah tidak berbongkah.' },
        { id: 2, title: 'Aplikasi dolomit, kompos & NPK', detail: 'Campurkan dolomit, pupuk kandang matang, dan NPK dasar hingga merata.', standard: 'Takaran sesuai dan merata.' },
        { id: 3, title: 'Pembuatan bedengan & mulsa PHP', detail: 'Buat bedengan lebar 100-110 cm tinggi 30-35 cm, pasang mulsa PHP kencang.', standard: 'Bedengan rapi dan mulsa tidak menggelembung.' },
        { id: 4, title: 'Pelubangan tanam', detail: 'Buat 2 baris lubang tanam jarak 50 x 60 cm.', standard: 'Jarak lubang seragam.' }
      ],
      fieldTips: [
        'Tambahkan agens hayati Trichoderma sp. bersama pupuk kandang matang untuk melindungi perakaran tomat dari jamur Fusarium.',
        'Siram bedengan sebelum menutup mulsa agar suhu dan kelembapan tanah stabil sebelum bibit masuk.'
      ],
      numeracyChallenge: {
        question: 'Lahan 300 m² terbagi menjadi 6 bedengan dengan jarak tanam 50 cm x 60 cm (kebutuhan 0,5 m² per tanaman inklusif parit). Berapa total populasi tanaman tomat?',
        subQuestions: [
          'Populasi = 300 m² ÷ 0,5 m²/tanaman = 600 tanaman'
        ],
        unit: 'tanaman',
        solutionExplanation: [
          '1. Luas lahan 300 m² dibagi luas ruang per tanaman 0,5 m² = 600 tanaman.'
        ]
      }
    },
    {
      id: 3,
      title: 'Penyemaian Benih',
      subtitle: 'Menyemai benih tomat di tray selama 21-25 hari hingga siap pindah tanam',
      allocation: '4 JP (4 x 45 menit), pengamatan 21-25 hari',
      location: 'Rumah semai / screen house sekolah',
      learningObjectives: [
        'Menyiapkan media semai 1:1:1 bebas patogen damping-off (rebah kecambah).',
        'Menanam 1 benih per lubang sedalam 0,5 cm dan merawat hingga 4 daun sejati.'
      ],
      toolsAndMaterials: [
        { name: 'Tray semai (72 atau 105 lubang)', spec: 'Steril', qty: 'Sesuai populasi' },
        { name: 'Benih tomat hibrida F1', spec: 'Cek varietas & daya kecambah', qty: 'Sesuai kebutuhan' },
        { name: 'Media tanah : kompos : sekam bakar', spec: '1 : 1 : 1 terayak halus', qty: 'Secukupnya' },
        { name: 'Hand sprayer halus', spec: 'Siram kabut lembut', qty: '1 unit' }
      ],
      k3Guidelines: [
        'Cuci tangan bersih setelah menyentuh benih berlapis fungisida.',
        'Jaga kelembapan rumah semai cukup tetapi tidak becek untuk mencegah rebah semai.'
      ],
      steps: [
        { id: 1, title: 'Uji & perendaman benih', detail: 'Cek tanggal kedaluwarsa, rendam air hangat 2 jam.', standard: 'Benih bernas tenggelam.' },
        { id: 2, title: 'Pengisian tray media 1:1:1', detail: 'Isi tray dengan media halus lembap, tekan ringan.', standard: 'Semua lubang terisi seragam.' },
        { id: 3, title: 'Penanaman & penutupan', detail: 'Tanam 1 benih/lubang kedalaman 0,5-1 cm, tutup tipis.', standard: 'Kecambah muncul merata hari ke 4-6.' },
        { id: 4, title: 'Pemeliharaan & pengerasan bibit', detail: 'Berikan cahaya cukup agar bibit tidak etiolasi. Pilih bibit 21-25 HSS berbatang kokoh.', standard: 'Bibit segar, 4 daun sejati, siap tanam.' }
      ],
      fieldTips: [
        'Bibit tomat sangat rentan mengalami etiolasi (batang kurus memanjang) jika kurang cahaya setelah berkecambah.',
        'Lakukan penyiraman pagi hari agar permukaan media cepat kering pada sore hari dan terhindar dari jamur Pythium (rebah kecambah).'
      ],
      numeracyChallenge: {
        question: 'Populasi lahan 600 tanaman tomat ditambah bibit cadangan 10%. Jika memakai tray semai 72 lubang, berapa total bibit disemai dan berapa tray dibutuhkan?',
        subQuestions: [
          'Total bibit = 600 × 1,10 = 660 bibit',
          'Tray dibutuhkan = 660 ÷ 72 = 9,17 → dibulatkan ke atas menjadi 10 tray'
        ],
        unit: 'tray',
        solutionExplanation: [
          '1. Bibit + cadangan 10% = 600 + 60 = 660 bibit.',
          '2. Jumlah tray = 660 / 72 = 9,17 → 10 tray semai.'
        ]
      }
    },
    {
      id: 4,
      title: 'Penanaman & Pemasangan Ajir',
      subtitle: 'Pindah tanam bibit tomat dan merangkai ajir bambu model silang/segitiga',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Memindahkan bibit umur 21-25 HSS pada sore hari tanpa merusak akar.',
        'Memasang ajir bambu tinggi 150 cm dan palang horizontal penguat.'
      ],
      toolsAndMaterials: [
        { name: 'Bibit tomat umur 21-25 HSS', spec: 'Sehat dan kokoh', qty: '660 bibit' },
        { name: 'Ajir bambu tinggi 150 cm', spec: 'Kuat menopang buah', qty: '1 per tanaman + palang' },
        { name: 'Larutan starter NPK 2 g/L', spec: 'Siram setelah tanam', qty: '150 ml/tanaman' }
      ],
      k3Guidelines: [
        'Hati-hati menggunakan alat tajam saat meruncingkan dan mengikat bambu ajir.',
        'Tanam pada sore hari (15.30-17.30) agar bibit tidak layu terik.'
      ],
      steps: [
        { id: 1, title: 'Pemasangan ajir dan palang', detail: 'Tancapkan ajir 10 cm dari lubang tanam dan pasang palang penguat agar ajir tidak roboh terkena angin.', standard: 'Rangka ajir kuat dan rapi.' },
        { id: 2, title: 'Pindah tanam bibit', detail: 'Keluarkan bibit beserta media dari tray dengan menekan dasar tray, tanam tegak.', standard: 'Bibit tegak, akar tidak terputus.' },
        { id: 3, title: 'Penyiraman & penyulaman', detail: 'Berikan larutan starter 150 ml/tanaman. Sulam bibit mati pada 7 HST.', standard: 'Tanah sekitar akar lembap, populasi 100%.' }
      ],
      fieldTips: [
        'Ajir model segitiga/palang sangat disarankan untuk tomat karena bobot tandan buah tomat cukup berat saat panen.',
        'Pastikan lubang mulsa tidak terlalu mepet dengan pangkal batang agar uap panas dari bawah mulsa tidak membakar batang muda.'
      ],
      numeracyChallenge: {
        question: 'Untuk 600 tanaman tomat dipasang masing-masing 1 ajir tegak ditambah 1 palang horizontal setiap 4 tanaman. Berapa total batang bambu yang dibutuhkan?',
        subQuestions: [
          'Ajir tegak = 600 batang',
          'Palang horizontal = 600 ÷ 4 = 150 batang',
          'Total bambu = 600 + 150 = 750 batang'
        ],
        unit: 'batang',
        solutionExplanation: [
          '1. Ajir tegak = 600 batang.',
          '2. Palang horizontal = 600 / 4 = 150 batang.',
          '3. Total bambu = 600 + 150 = 750 batang.'
        ]
      }
    },
    {
      id: 5,
      title: 'Pemeliharaan Tanaman',
      subtitle: 'Pewiwilan tunas ketiak, pengikatan batang, pemupukan Ca/K, dan PHT',
      allocation: '8 JP (dilaksanakan bertahap per fase)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Melakukan pewiwilan tunas ketiak daun (suckers) untuk menjaga 1-2 batang utama.',
        'Mencegah busuk ujung buah (blossom end rot) dengan kecukupan Kalsium dan air stabil.',
        'Mengendalikan hama ulat buah (Helicoverpa), kutu kebul, dan busuk daun (Phytophthora).'
      ],
      toolsAndMaterials: [
        { name: 'Gunting pangkas bersih', spec: 'Didesinfeksi alkohol 70%', qty: '1 buah/kelompok' },
        { name: 'Pupuk NPK, KNO3, & Kalsium Nitrat', spec: 'Aplikasi kocor berkala', qty: 'Sesuai jadwal' },
        { name: 'Perangkap kuning & tali pengikat', spec: 'Monitoring kutu kebul & ikat batang', qty: '1 set' }
      ],
      k3Guidelines: [
        'Desinfeksi gunting pangkas setiap berpindah antar tanaman untuk mencegah penularan virus mosaik.',
        'Gunakan APD lengkap jika melakukan penyemprotan fungisida/insektisida di bawah arahan guru.'
      ],
      steps: [
        { id: 1, title: 'Pewiwilan tunas ketiak (suckers)', detail: 'Buang tunas yang tumbuh di ketiak antara batang utama dan tangkai daun tiap 5-7 hari saat masih kecil.', standard: 'Hanya 1-2 batang utama produktif yang dipelihara.' },
        { id: 2, title: 'Pengikatan & pemangkasan daun bawah', detail: 'Ikat batang ke ajir dan pangkas daun tua di bawah tandan buah pertama yang sudah menguning.', standard: 'Bagian pangkal bersih, sirkulasi udara baik.' },
        { id: 3, title: 'Pemupukan susulan & pengairan teratur', detail: 'Siram stabil (jangan kekeringan lalu langsung banjir) dan kocor NPK + Kalsium di fase pembungaan-pembuahan.', standard: 'Buah mulus bebas busuk ujung pantat (BER).' },
        { id: 4, title: 'Pengendalian OPT (PHT)', detail: 'Amati ulat buah tomat dan bercak daun; buang bagian sakit dan pasang trap kuning.', standard: 'OPT terpantau dan terkendali di logbook.' }
      ],
      fieldTips: [
        'Fluktuasi penyiraman yang ekstrem (kering lalu disiram deras) adalah penyebab utama buah tomat pecah (fruit cracking) dan busuk pantat.',
        'Pewiwilan tunas ketiak sebaiknya dilakukan dengan mematahkan tunas muda memakai jari bersih di pagi hari.'
      ],
      numeracyChallenge: {
        question: 'Sebanyak 600 tanaman tomat dikocor pupuk Kalsium Nitrat dosis 4 g/L sebanyak 250 ml per tanaman. Berapa liter larutan dan berapa gram Kalsium Nitrat yang diperlukan?',
        subQuestions: [
          'Total larutan = 600 × 250 ml = 150.000 ml = 150 liter',
          'Total Kalsium Nitrat = 150 liter × 4 g/L = 600 gram (0,6 kg)'
        ],
        unit: 'gram',
        solutionExplanation: [
          '1. Volume air = 600 × 0,25 L = 150 liter.',
          '2. Pupuk = 150 L × 4 g/L = 600 gram.'
        ]
      }
    },
    {
      id: 6,
      title: 'Panen Tomat',
      subtitle: 'Menentukan indeks kemasakan (breaker hingga merah penuh) dan panen bertahap',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Menentukan tingkat kematangan panen tomat sesuai jarak distribusi (masak hijau/breaker/merah penuh).',
        'Memanen tomat dengan hati-hati tanpa memar dan mencatat produktivitas.'
      ],
      toolsAndMaterials: [
        { name: 'Keranjang plastik beralas koran/busa', spec: 'Mencegah buah memar', qty: 'Secukupnya' },
        { name: 'Timbangan & logbook panen', spec: 'Pencatatan bobot & jumlah buah', qty: '1 set' }
      ],
      k3Guidelines: [
        'Panen pada pagi hari (06.30-09.30) agar buah tidak panas.',
        'Jangan menumpuk tomat terlalu dalam dalam keranjang karena buah bagian bawah mudah memar.'
      ],
      steps: [
        { id: 1, title: 'Seleksi tingkat kemasakan', detail: 'Petik buah stadium breaker (semburat oranye/merah 10-30%) untuk pengiriman jauh, atau merah penuh untuk pasar lokal.', standard: 'Kematangan seragam sesuai target pasar.' },
        { id: 2, title: 'Teknik pemetikan', detail: 'Tekan tangkai di ruas buku (abscission zone) ke atas hingga buah terlepas bersih atau gunting tangkainya.', standard: 'Buah mulus tidak lecet atau penyok.' },
        { id: 3, title: 'Pencatatan hasil panen', detail: 'Timbang hasil panen per petikan dan catat jumlah buah sehat vs afkir.', standard: 'Data bobot dan persentase buah layak tercatat.' }
      ],
      fieldTips: [
        'Jika memanen tanpa kelopak/tangkai panjang, pastikan ujung tangkai tidak menusuk kulit buah tomat lain di keranjang.',
        'Pemupukan kalium yang cukup pada fase pematangan membuat daging buah tomat lebih padat, bobot tinggi, dan tahan simpan.'
      ],
      numeracyChallenge: {
        question: 'Dari 600 tanaman tomat, rata-rata hasil total mencapai 2,5 kg per tanaman. Jika 92% buah layak jual (grade komersial), berapa kg tomat layak jual yang dihasilkan?',
        subQuestions: [
          'Total panen kotor = 600 × 2,5 kg = 1.500 kg',
          'Tomat layak jual = 92% × 1.500 kg = 1.380 kg'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Total panen = 600 × 2,5 kg = 1.500 kg.',
          '2. Layak jual = 0,92 × 1.500 kg = 1.380 kg.'
        ]
      }
    },
    {
      id: 7,
      title: 'Pascapanen Tomat',
      subtitle: 'Pembersihan, sortasi, grading ukuran/warna, pengemasan peti kayu, dan analisis usaha',
      allocation: '5 JP (5 x 45 menit)',
      location: 'Ruang pascapanen / gudang sekolah',
      learningObjectives: [
        'Melakukan sortasi buah cacat/pecah dan grading berdasarkan ukuran serta tingkat kemasakan.',
        'Mengemas tomat dalam peti kayu/keranjang beralas kertas untuk menghindari memar dan menyusun analisis R/C ratio.'
      ],
      toolsAndMaterials: [
        { name: 'Kain lap bersih & meja sortasi', spec: 'Bersihkan residu debu', qty: '1 set' },
        { name: 'Peti kayu / keranjang beralas koran', spec: 'Tumpukan maks 3 lapis', qty: 'Secukupnya' },
        { name: 'Kalkulator & lembar analisis usaha', spec: 'Hitung R/C ratio', qty: '1 set' }
      ],
      k3Guidelines: [
        'Jaga lantai ruang sortir tetap kering dan bersih dari buah jatuh agar tidak licin.',
        'Pisahkan buah busuk segera ke tempat sampah organik.'
      ],
      steps: [
        { id: 1, title: 'Pembersihan kering & sortasi', detail: 'Lap buah perlahan dengan kain lembut kering, sisihkan buah pecah/berlubang ulat.', standard: 'Buah bersih dan bebas afkir.' },
        { id: 2, title: 'Grading ukuran & kemasakan', detail: 'Kelompokkan Grade A (>120 g/buah), Grade B (80-120 g), Grade C (<80 g).', standard: 'Ukuran & warna seragam per peti.' },
        { id: 3, title: 'Pengemasan & analisis usaha', detail: 'Susun maks 3-4 lapis beralas koran/busa. Hitung pendapatan, keuntungan, dan R/C ratio.', standard: 'Kemasan aman & perhitungan R/C benar.' }
      ],
      fieldTips: [
        'Jangan mencampur buah tomat matang merah penuh dengan buah hijau di satu peti karena gas etilen dari buah merah mempercepat pematangan buah lain.',
        'Simpan tomat matang pada suhu sejuk 12-15 °C (jangan di freezer/terlalu dingin agar rasa tidak hambar).'
      ],
      numeracyChallenge: {
        question: 'Sebanyak 1.380 kg tomat layak jual dijual dengan harga rata-rata Rp 8.500/kg. Total biaya produksi Rp 4.800.000. Hitung pendapatan, keuntungan, dan R/C ratio!',
        subQuestions: [
          'Pendapatan = 1.380 × Rp 8.500 = Rp 11.730.000',
          'Keuntungan = Rp 11.730.000 - Rp 4.800.000 = Rp 6.930.000',
          'R/C ratio = 11.730.000 ÷ 4.800.000 = 2,44'
        ],
        unit: 'R/C',
        solutionExplanation: [
          '1. Pendapatan = 1.380 × 8.500 = Rp 11.730.000.',
          '2. Keuntungan = 11.730.000 - 4.800.000 = Rp 6.930.000.',
          '3. R/C ratio = 11.730.000 / 4.800.000 = 2,44 (> 1 layak usaha).'
        ]
      }
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Penyebab utama terjadinya busuk ujung pantat buah (Blossom End Rot) pada tomat adalah ...',
      options: [
        { key: 'A', text: 'Kelebihan cahaya matahari pagi' },
        { key: 'B', text: 'Kekurangan unsur Kalsium (Ca) yang dipicu ketidakstabilan suplai air' },
        { key: 'C', text: 'Kelebihan ajir bambu' },
        { key: 'D', text: 'Pemberian mulsa jerami' }
      ],
      correctAnswer: 'B',
      explanation: 'Blossom End Rot terjadi karena defisiensi lokal Kalsium (Ca) pada jaringan ujung buah akibat pengairan yang tidak teratur.',
      points: 4
    },
    {
      id: 2,
      question: 'Apa yang dimaksud dengan pewiwilan tunas ketiak (suckers) pada budidaya tomat?',
      options: [
        { key: 'A', text: 'Memotong akar tunggang saat pindah tanam' },
        { key: 'B', text: 'Membuang tunas samping yang muncul di ketiak antara batang utama dan tangkai daun' },
        { key: 'C', text: 'Memetik semua bunga pertama' },
        { key: 'D', text: 'Mencabut mulsa plastik sebelum panen' }
      ],
      correctAnswer: 'B',
      explanation: 'Pewiwilan menjaga agar nutrisi terpusat ke 1-2 batang utama sehingga ukuran buah tomat besar dan seragam.',
      points: 4
    },
    {
      id: 3,
      question: 'Untuk pengiriman jarak jauh agar buah tomat tidak memar/busuk di jalan, stadium panen yang dipilih adalah ...',
      options: [
        { key: 'A', text: 'Matang merah penuh dan lunak' },
        { key: 'B', text: 'Stadium breaker (mulai semburat oranye/merah 10-30% pada ujung buah)' },
        { key: 'C', text: 'Saat bakal buah masih berukuran 1 cm' },
        { key: 'D', text: 'Buah yang sudah retak kulitnya' }
      ],
      correctAnswer: 'B',
      explanation: 'Pada fase breaker, buah tomat masih keras tahan guncangan transportasi dan akan matang merah sempurna saat tiba di pasar.',
      points: 4
    },
    {
      id: 4,
      question: 'Berapa kisaran pH tanah ideal untuk tanaman tomat?',
      options: [
        { key: 'A', text: '4,0 - 4,8' },
        { key: 'B', text: '6,0 - 6,8' },
        { key: 'C', text: '7,8 - 8,5' },
        { key: 'D', text: '3,5 - 4,0' }
      ],
      correctAnswer: 'B',
      explanation: 'Tomat tumbuh baik di tanah gembur dengan pH 6,0 - 6,8.',
      points: 4
    },
    {
      id: 5,
      question: 'Mengapa fluktuasi air ekstrem (lahan kering lalu digenangi air banyak) harus dihindari saat buah tomat membesar?',
      options: [
        { key: 'A', text: 'Menyebabkan buah tomat pecah (fruit cracking)' },
        { key: 'B', text: 'Membuat daun menjadi lebih lebar' },
        { key: 'C', text: 'Mempercepat penuaan ajir' },
        { key: 'D', text: 'Menurunkan suhu udara' }
      ],
      correctAnswer: 'A',
      explanation: 'Penyerapan air mendadak dalam jumlah besar membuat tekanan turgor daging buah melonjak dan merobek kulit buah.',
      points: 4
    },
    {
      id: 6,
      question: 'Umur bibit tomat di persemaian yang siap dipindah ke bedengan adalah ...',
      options: [
        { key: 'A', text: '5 - 7 HSS' },
        { key: 'B', text: '21 - 25 HSS' },
        { key: 'C', text: '45 - 50 HSS' },
        { key: 'D', text: '60 - 65 HSS' }
      ],
      correctAnswer: 'B',
      explanation: 'Bibit tomat umur 21-25 HSS (4 daun sejati) merupakan fase terbaik untuk dipindah tanam.',
      points: 4
    },
    {
      id: 7,
      question: 'Penyakit hawar daun (late blight) yang sering menyerang tomat di musim hujan disebabkan oleh ...',
      options: [
        { key: 'A', text: 'Phytophthora infestans' },
        { key: 'B', text: 'Ulat grayak' },
        { key: 'C', text: 'Defisiensi nitrogen' },
        { key: 'D', text: 'Lalat buah' }
      ],
      correctAnswer: 'A',
      explanation: 'Phytophthora infestans berkembang pesat pada kondisi lembap dan dingin, menyerang daun, batang, serta buah tomat.',
      points: 4
    },
    {
      id: 8,
      question: 'Mengapa gunting pangkas harus didesinfeksi alkohol 70% setiap berpindah tanaman saat memangkas tomat?',
      options: [
        { key: 'A', text: 'Agar gunting menjadi lebih berat' },
        { key: 'B', text: 'Mencegah penularan virus mosaik (TMV) dan bakteri lewat getah tanaman' },
        { key: 'C', text: 'Memberikan nutrisi pada daun' },
        { key: 'D', text: 'Mempercepat pelapukan mulsa' }
      ],
      correctAnswer: 'B',
      explanation: 'Virus TMV sangat mudah menular secara mekanis melalui getah tanaman yang menempel di tangan atau gunting pangkas.',
      points: 4
    },
    {
      id: 9,
      question: 'Fungsi penambahan agens hayati Trichoderma sp. pada pupuk kandang saat pengolahan lahan tomat adalah ...',
      options: [
        { key: 'A', text: 'Mengendalikan jamur patogen tular tanah seperti layu Fusarium' },
        { key: 'B', text: 'Menggantikan penyiraman air' },
        { key: 'C', text: 'Menaikkan pH tanah menjadi 9,0' },
        { key: 'D', text: 'Membunuh serangga penyerbuk' }
      ],
      correctAnswer: 'A',
      explanation: 'Trichoderma adalah jamur antagonis yang menghambat pertumbuhan patogen tular tanah seperti Fusarium dan Pythium.',
      points: 4
    },
    {
      id: 10,
      question: 'Mengapa buah tomat matang penuh tidak disarankan dicampur dengan buah hijau dalam satu wadah penyimpanan tertutup?',
      options: [
        { key: 'A', text: 'Buah matang mengeluarkan gas etilen yang mempercepat pematangan/pembusukan buah lain' },
        { key: 'B', text: 'Buah hijau akan berubah rasa menjadi asin' },
        { key: 'C', text: 'Peti menjadi terlalu ringan' },
        { key: 'D', text: 'Mengurangi ukuran buah' }
      ],
      correctAnswer: 'A',
      explanation: 'Tomat merupakan buah klimakterik penghasil etilen; pencampuran mempercepat pelunakan dan kerusakan stok.',
      points: 4
    }
  ],
  essayQuestions: [
    {
      id: 11,
      question: 'Jelaskan penyebab busuk ujung buah (Blossom End Rot) pada tomat dan 2 langkah pencegahan yang dapat dilakukan siswa di lahan!',
      maxScore: 12,
      sampleAnswer: 'Penyebab: defisiensi lokal unsur Kalsium (Ca) pada jaringan buah yang dipicu oleh pengairan tidak teratur atau pH tanah terlalu asam. Pencegahan: 1) Mengaplikasikan kapur dolomit / pupuk Kalsium Nitrat sesuai dosis. 2) Menjaga penyiraman stabil secara rutin agar transportasi Ca dari akar ke buah tidak terhambat.'
    },
    {
      id: 12,
      question: 'Mengapa pewiwilan tunas ketiak (suckers) penting pada budidaya tomat dan bagaimana prosedur higienis saat melakukannya?',
      maxScore: 12,
      sampleAnswer: 'Pewiwilan mengarahkan fotosintat ke batang utama sehingga menghasilkan ukuran buah besar, seragam, serta memperlancar sirkulasi udara guna menekan jamur Phytophthora. Prosedur higienis: lakukan pada pagi hari cerah saat tunas masih kecil menggunakan tangan bersih atau gunting yang didesinfeksi alkohol 70%.'
    },
    {
      id: 13,
      question: 'Jelaskan perbedaan stadium panen tomat untuk pasar lokal langsung vs pengiriman jarak jauh!',
      maxScore: 12,
      sampleAnswer: 'Untuk pasar lokal langsung dapat dipanen pada stadium merah penuh (80-100% merah) karena rasa manis-asam dan likopen optimal. Untuk pengiriman jarak jauh dipanen pada stadium breaker (semburat merah 10-30%) karena daging buah masih keras tahan benturan peti dan akan matang sempurna di lokasi tujuan.'
    },
    {
      id: 14,
      question: 'Sebutkan 3 OPT utama pada tanaman tomat dan jelaskan pengendaliannya berprinsip PHT!',
      maxScore: 12,
      sampleAnswer: '1) Ulat buah (Helicoverpa): kumpulkan larva secara mekanis, sanitasi buah berlubang, pasang perangkap feromon. 2) Kutu kebul (vektor virus kuning): bersihkan gulma inang, pasang mulsa PHP dan trap kuning. 3) Layu bakteri/fusarium: rotasi non-solanaceae, perbaikan drainase, aplikasi Trichoderma sp.'
    },
    {
      id: 15,
      question: 'Dari 600 tanaman tomat, hasil total mencapai 2,5 kg/tanaman dengan 92% buah layak jual. Harga jual Rp 8.500/kg dan biaya produksi Rp 4.800.000. Hitung bobot layak jual, pendapatan, keuntungan, dan R/C ratio!',
      maxScore: 12,
      sampleAnswer: 'Total = 600 × 2,5 = 1.500 kg. Layak jual = 92% × 1.500 = 1.380 kg. Pendapatan = 1.380 × Rp 8.500 = Rp 11.730.000. Keuntungan = Rp 11.730.000 - Rp 4.800.000 = Rp 6.930.000. R/C ratio = 11.730.000 / 4.800.000 = 2,44 (> 1 menguntungkan).'
    }
  ],
  skillsRubric: [
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Mengenakan APD lengkap dan mensanitasi alat kerja dari patogen tular tanah' },
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Mengukur pH tanah 5 titik dengan target 6,0 - 6,8' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Mengolah tanah gembur dan mengaduk dolomit, kompos, Trichoderma & NPK dasar' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Membuat bedengan rapi dan memasang mulsa PHP kencang' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Menyiapkan media 1:1:1 dan merawat bibit tanpa gejala etiolasi' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Menyeleksi bibit siap tanam umur 21-25 HSS berbatang kokoh' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memasang rangka ajir bambu model silang/palang yang kuat' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memindah tanam bibit pada sore hari tanpa merusak akar' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Melakukan pewiwilan tunas ketiak (suckers) secara higienis dan teratur' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Memangkas daun tua bawah dan mengikat batang ke ajir' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Menjaga kestabilan penyiraman serta mengocor pupuk NPK + Kalsium' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Memantau ulat buah, kutu kebul, dan hawar daun (PHT)' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Menentukan stadium panen (breaker/merah penuh) sesuai tujuan distribusi' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Memetik buah dengan hati-hati tanpa memar dan mencatat bobot' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Melakukan sortasi dan grading ukuran Grade A/B/C secara tepat' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Mengemas dalam peti beralas koran maks 3-4 lapis' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Menyusun analisis kelayakan usaha R/C ratio dengan benar' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Menjaga kebersihan ruang sortasi dari limbah buah busuk' }
  ],
  dailySchedules: [
    { id: 'tomat-1', time: '06:30 - 08:00 WIB', title: 'Pewiwilan Tunas Ketiak (Suckers) & Ikat Ajir', desc: 'Rempel tunas samping muda di ketiak daun dengan tangan bersih/gunting steril, ikat batang ke ajir.', jobId: 5, tag: 'Pembentukan Batang', active: true },
    { id: 'tomat-2', time: '09:00 - 10:00 WIB', title: 'Inspeksi Ulat Buah & Hawar Daun', desc: 'Periksa daun bawah dan tandan buah; buang bagian terinfeksi dan cek perangkap kuning.', jobId: 5, tag: 'PHT Rutin', active: true },
    { id: 'tomat-3', time: '16:00 - 17:00 WIB', title: 'Penyiraman Stabil & Pengocoran Kalsium', desc: 'Siram merata menjaga kelembapan tanah konstan guna mencegah buah pecah dan busuk ujung.', jobId: 5, tag: 'Nutrisi & Air', active: true }
  ]
};

// 4. TIMUN / MENTIMUN (Cucumis sativus)
const TIMUN_BUNDLE: CommodityBundle = {
  id: 'timun',
  name: 'Mentimun',
  latinName: 'Cucumis sativus',
  shortDesc: 'Budidaya mentimun hibrida sistem rambat ajir/jaring net, panen cepat 32-45 HST dengan produktivitas tinggi.',
  harvestDays: '32 - 45 HST',
  estimatedCycleDays: 42,
  currentDayMock: 24,
  imageUrl: BUNDLED_IMAGES.timunLahan,
  info: {
    title: 'JOB SHEET BUDIDAYA MENTIMUN HIBRIDA (Cucumis sativus)',
    subtitle: 'Dari Sanitasi Lahan hingga Pascapanen',
    subject: 'Produksi Tanaman Hortikultura / Budidaya Tanaman Buah Semusim',
    competencyProgram: 'Agribisnis Tanaman Pangan dan Hortikultura (ATPH)',
    classPhase: 'XI dan XII (Fase F)',
    commodity: 'Mentimun Hibrida F1',
    totalJobs: '7 Job (Total 35 JP) + Asesmen',
    publisher: 'Program Keahlian ATPH · Kurikulum Merdeka SMK',
    growthRequirements: [
      { factor: 'Suhu', value: 'Sekitar 24 - 30 °C' },
      { factor: 'Cahaya', value: 'Penuh, minimal 8 jam per hari' },
      { factor: 'Tanah', value: 'Gembur, subur, kaya humus, pH 6,0 - 7,0' },
      { factor: 'Ketinggian', value: 'Dataran rendah sampai medium (0 - 800 mdpl)' },
      { factor: 'Kebutuhan Air', value: 'Cukup dan teratur (tidak tergenang)' },
      { factor: 'Umur Panen', value: 'Cepat, mulai 32 - 45 HST' }
    ]
  },
  modules: [
    {
      id: 1,
      title: 'Sanitasi Lahan',
      subtitle: 'Menyiapkan lahan bersih bebas bekas famili labu-labuan dan mengukur pH',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Memastikan lahan bukan bekas Cucurbitaceae (semangka, melon, pare, labu) minimal 1-2 musim.',
        'Membersihkan gulma dan menguji pH tanah target 6,0 - 7,0.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, sabit, garpu tanah', spec: 'Tajam bersih', qty: '1 set' },
        { name: 'Soil tester & meteran 30 m', spec: 'Ukur pH & luas lahan', qty: '1 set' },
        { name: 'APD lengkap', spec: 'Boot, sarung tangan, topi, masker', qty: 'Per siswa' }
      ],
      k3Guidelines: [
        'Gunakan APD lengkap dan jaga jarak aman saat membabat gulma.',
        'Bersihkan alat kerja dengan desinfektan sebelum disimpan.'
      ],
      steps: [
        { id: 1, title: 'Persiapan K3 & survei lahan', detail: 'Kenakan APD, cek riwayat tanam hindari bekas labu-labuan, catat luas lahan.', standard: 'APD lengkap dan sketsa lahan tercatat.' },
        { id: 2, title: 'Pembersihan gulma & drainase', detail: 'Cabut gulma berakar dan rapikan parit keliling lahan.', standard: 'Lahan bersih dan parit lancar.' },
        { id: 3, title: 'Pengukuran pH tanah 5 titik', detail: 'Ambil sampel zig-zag kedalaman 15 cm, ukur dengan soil tester.', standard: 'Nilai pH tercatat (target 6,0 - 7,0).' }
      ],
      fieldTips: [
        'Mentimun rentan terhadap penyakit embun bulu (downy mildew) dan virus kuning jika ditanam di lahan bekas melon/semangka secara terus-menerus.',
        'Sirkulasi air yang lancar sangat menentukan pertumbuhan akar timun yang dangkal.'
      ],
      numeracyChallenge: {
        question: 'Lahan praktik mentimun berukuran 15 m x 24 m. Berapa luas lahan total dan berapa jam waktu pembersihan jika 4 siswa masing-masing mampu membersihkan 30 m² per jam?',
        subQuestions: [
          'Luas lahan = 15 m × 24 m = 360 m²',
          'Kapasitas kelompok = 4 × 30 m²/jam = 120 m²/jam',
          'Waktu = 360 ÷ 120 = 3 jam'
        ],
        unit: 'jam',
        solutionExplanation: [
          '1. Luas lahan = 15 × 24 = 360 m².',
          '2. Kapasitas kerja = 4 siswa × 30 m²/jam = 120 m²/jam.',
          '3. Waktu selesai = 360 / 120 = 3 jam.'
        ]
      }
    },
    {
      id: 2,
      title: 'Pengolahan Lahan',
      subtitle: 'Olah tanah gembur, bedengan mulsa PHP, dan lubang tanam jarak 40 x 50 cm',
      allocation: '5 JP (5 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengolah bedengan dengan pupuk kandang matang dan NPK dasar.',
        'Memasang mulsa PHP dan melubangi 2 baris dengan jarak 40 x 50 cm.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, garu, meteran', spec: 'Olah tanah & bedengan', qty: '1 set' },
        { name: 'Pupuk kandang matang & NPK 16-16-16', spec: 'Pupuk dasar', qty: '150 kg & 3 kg per 100 m²' },
        { name: 'Mulsa PHP & pasak U', spec: 'Perak di atas', qty: 'Sesuai panjang bedengan' }
      ],
      k3Guidelines: [
        'Gunakan masker saat menebar kapur dan pupuk dasar.',
        'Hati-hati menggunakan pelubang mulsa panas.'
      ],
      steps: [
        { id: 1, title: 'Pengolahan & penjemuran tanah', detail: 'Gemburkan tanah sedalam 25-30 cm dan jemur 5 hari.', standard: 'Tanah gembur remah.' },
        { id: 2, title: 'Pupuk dasar & pembentukan bedengan', detail: 'Campur pupuk kandang matang + NPK + dolomit (bila pH < 6,0). Buat bedengan L 110 cm, T 30 cm.', standard: 'Pupuk rata, bedengan lurus seragam.' },
        { id: 3, title: 'Pemasangan mulsa & lubang tanam', detail: 'Tarik mulsa PHP kencang, buat 2 baris lubang tanam jarak 40 x 50 cm.', standard: 'Mulsa rapat dan jarak lubang presisi.' }
      ],
      fieldTips: [
        'Berbeda dengan semangka yang merambat di tanah, mentimun dianjurkan ditanam 2 baris per bedengan karena sulurnya akan dirambatkan vertikal ke atas menggunakan jaring net!',
        'Pastikan bedengan disiram lembap sebelum penutupan mulsa.'
      ],
      numeracyChallenge: {
        question: 'Satu bedengan mentimun panjang 20 m ditanami 2 baris dengan jarak dalam baris 40 cm. Berapa jumlah lubang tanam per bedengan?',
        subQuestions: [
          'Per baris = 20 m ÷ 0,4 m = 50 lubang',
          '2 baris = 50 × 2 = 100 lubang tanam'
        ],
        unit: 'lubang',
        solutionExplanation: [
          '1. Lubang per baris = 20 m / 0,4 m = 50 lubang.',
          '2. Total 2 baris = 50 × 2 = 100 lubang.'
        ]
      }
    },
    {
      id: 3,
      title: 'Penyemaian / Persiapan Benih',
      subtitle: 'Perlakuan benih unggul dan penyemaian cepat (7-10 HSS) atau tanam langsung',
      allocation: '3 JP (3 x 45 menit)',
      location: 'Rumah semai / lahan praktik',
      learningObjectives: [
        'Membaca label kemasan benih mentimun hibrida dan memilih metode semai tray atau tanam langsung (tugal).',
        'Menghasilkan bibit siap tanam umur 7-10 HSS tanpa kerusakan akar.'
      ],
      toolsAndMaterials: [
        { name: 'Benih mentimun hibrida F1', spec: 'Cek daya tumbuh ≥ 85%', qty: 'Sesuai populasi' },
        { name: 'Tray semai (72 lubang) & media 1:1:1', spec: 'Jika disemai dulu', qty: 'Sesuai kebutuhan' },
        { name: 'Hand sprayer halus', spec: 'Penyiraman lembut', qty: '1 unit' }
      ],
      k3Guidelines: [
        'Cuci tangan bersih setelah memegang benih yang dilapisi seed treatment.',
        'Simpan benih di tempat kering dan sejuk sebelum ditanam.'
      ],
      steps: [
        { id: 1, title: 'Pemeriksaan & perendaman benih', detail: 'Rendam benih mentimun dalam air bersih 1-2 jam untuk mempercepat imbibisi.', standard: 'Benih bernas tenggelam.' },
        { id: 2, title: 'Penyemaian di tray / pemeraman', detail: 'Tanam 1 benih/lubang sedalaman 1 cm dengan bagian runcing calon akar ke bawah.', standard: 'Daya kecambah ≥ 90% dalam 3 hari.' },
        { id: 3, title: 'Pemeliharaan bibit muda', detail: 'Letakkan di tempat terang agar batang tidak memanjang. Siap pindah tanam di umur 7-10 HSS.', standard: 'Bibit segar berdaun sejati 1-2 helai.' }
      ],
      fieldTips: [
        'Mentimun berkecambah sangat cepat (2-3 hari). Jangan membiarkan bibit terlalu lama di tray (>12 hari) karena akar cepat melingkar dan stres saat dipindah.',
        'Jika menanam langsung (tugal), siram lubang tanam sehari sebelumnya dan lindungi dari semut/jangkrik.'
      ],
      numeracyChallenge: {
        question: 'Terdapat 8 bedengan mentimun dengan masing-masing 100 lubang tanam. Jika disiapkan 10% cadangan sulaman dan menggunakan tray 72 lubang, berapa total bibit dan berapa tray yang dibutuhkan?',
        subQuestions: [
          'Populasi = 8 × 100 = 800 lubang',
          'Dengan cadangan 10% = 800 × 1,1 = 880 bibit',
          'Tray = 880 ÷ 72 = 12,22 → 13 tray'
        ],
        unit: 'tray',
        solutionExplanation: [
          '1. Total lubang = 800.',
          '2. Total bibit (+10%) = 880 bibit.',
          '3. Kebutuhan tray = 880 / 72 = 12,22 → 13 tray.'
        ]
      }
    },
    {
      id: 4,
      title: 'Penanaman & Pemasangan Para-para Jaring',
      subtitle: 'Pindah tanam bibit 7-10 HSS dan memasang tiang ajir beserta jaring rambatan',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Memindah tanam bibit mentimun pada sore hari dengan gumpalan media utuh.',
        'Memasang tiang bambu dan jaring rambatan (trellis net) di atas bedengan.'
      ],
      toolsAndMaterials: [
        { name: 'Bibit mentimun 7-10 HSS', spec: 'Kokoh bebas etiolasi', qty: '880 bibit' },
        { name: 'Tiang bambu & jaring rambatan (trellis net)', spec: 'Tinggi 180-200 cm', qty: 'Sesuai panjang bedengan' },
        { name: 'Tali rafia / kawat pengikat', spec: 'Kunci jaring pada tiang', qty: 'Secukupnya' }
      ],
      k3Guidelines: [
        'Pakai sarung tangan saat memasang tiang bambu dan menarik jaring rambatan.',
        'Lakukan penanaman pada sore hari untuk mencegah kelayuan.'
      ],
      steps: [
        { id: 1, title: 'Pemasangan tiang & jaring rambatan', detail: 'Tancapkan tiang bambu tiap 2-2,5 m di tepi/tengah bedengan, bentangkan trellis net setinggi 180 cm.', standard: 'Jaring rambatan tegang, kokoh, dan lurus.' },
        { id: 2, title: 'Pindah tanam bibit', detail: 'Keluarkan bibit hati-hati dari tray tanpa menarik batang, masukkan ke lubang tanam dan siram 150 ml air.', standard: 'Bibit tegak, akar utuh.' },
        { id: 3, title: 'Penyulaman (3-5 HST)', detail: 'Ganti bibit yang mati atau rusak dimakan hama dengan bibit cadangan.', standard: 'Populasi 100% tumbuh seragam.' }
      ],
      fieldTips: [
        'Sistem rambat vertikal membuat buah mentimun menggantung lurus sempurna, kulit bersih tidak bercak tanah, dan mudah dipanen.',
        'Pastikan tali bagian atas jaring terikat kuat agar tidak melorot saat beban buah penuh.'
      ],
      numeracyChallenge: {
        question: 'Satu gulung jaring rambatan memiliki panjang 50 meter. Jika ada 8 bedengan masing-masing panjang 20 meter, berapa gulung jaring yang harus disiapkan?',
        subQuestions: [
          'Total panjang bedengan = 8 × 20 m = 160 meter',
          'Jumlah gulung jaring = 160 ÷ 50 = 3,2 → dibulatkan ke atas 4 gulung'
        ],
        unit: 'gulung',
        solutionExplanation: [
          '1. Total panjang = 8 × 20 m = 160 meter.',
          '2. Gulung dibutuhkan = 160 / 50 = 3,2 → 4 gulung.'
        ]
      }
    },
    {
      id: 5,
      title: 'Pemeliharaan Tanaman',
      subtitle: 'Mengarahkan sulur ke jaring, pewiwilan ruas bawah, pemupukan kocor, dan PHT',
      allocation: '8 JP (dilaksanakan bertahap per fase)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengarahkan sulur utama naik pada mata jaring rambatan dan memangkas cabang bawah ruas ke-5.',
        'Memberikan pemupukan kocor berimbang dan pengendalian OPT (kumbang oteng-oteng, lalat buah, embun bulu).'
      ],
      toolsAndMaterials: [
        { name: 'Pupuk NPK 16-16-16 & KNO3', spec: 'Kocor rutin per minggu', qty: 'Sesuai jadwal' },
        { name: 'Perangkap kuning & metil eugenol', spec: 'Monitoring thrips & lalat buah', qty: '1 set' },
        { name: 'Tali rafia bantu rambat', spec: 'Arahkan sulur awal', qty: 'Secukupnya' }
      ],
      k3Guidelines: [
        'Gunakan APD lengkap jika menyemprot fungisida pengendali embun bulu di bawah arahan guru.',
        'Jangan menginjak bahu bedengan agar akar dangkal mentimun tidak tertekan.'
      ],
      steps: [
        { id: 1, title: 'Pengarahan sulur ke jaring net', detail: 'Bantu lilitkan sulur muda mentimun ke jaring rambatan mulai umur 12-15 HST agar naik vertikal.', standard: 'Sulur merambat rata memenuhi jaring.' },
        { id: 2, title: 'Pewiwilan cabang ruas bawah', detail: 'Buang tunas samping dan bakal bunga pada ruas ke 1-4 dari bawah agar pertumbuhan awal batang utama kokoh.', standard: 'Ruas bawah bersih; buah mulai terbentuk di ruas ke-5 ke atas.' },
        { id: 3, title: 'Penyiraman & pemupukan kocor mingguan', detail: 'Siram rutin menjaga tanah lembap (buah timun 95% air). Kocor NPK 5 g/L 200 ml/tanaman setiap minggu.', standard: 'Daun hijau segar dan bakal buah tidak menguning.' },
        { id: 4, title: 'Pengendalian OPT (PHT)', detail: 'Amati serangan embun bulu (downy mildew), kumbang daun (Aulacophora), dan lalat buah. Pasang perangkap dan sanitasi daun sakit.', standard: 'OPT terpantau di logbook dan terkendali.' }
      ],
      fieldTips: [
        'Kekurangan air pada fase pembesaran buah menyebabkan rasa buah mentimun menjadi pahit dan bentuknya membengkok.',
        'Membuang bunga/cabang pada 4 ruas paling bawah membuat batang utama mentimun sangat kuat dan hasil panen ruas atas jauh lebih lebat.'
      ],
      numeracyChallenge: {
        question: 'Sebanyak 800 tanaman mentimun dikocor larutan NPK 5 g/L sebanyak 200 ml/tanaman. Berapa liter larutan dan berapa gram pupuk NPK yang dibutuhkan?',
        subQuestions: [
          'Total larutan = 800 × 200 ml = 160.000 ml = 160 liter',
          'Total NPK = 160 liter × 5 g/L = 800 gram (0,8 kg)'
        ],
        unit: 'gram',
        solutionExplanation: [
          '1. Volume air = 800 × 0,2 L = 160 liter.',
          '2. Pupuk NPK = 160 L × 5 g/L = 800 gram.'
        ]
      }
    },
    {
      id: 6,
      title: 'Panen Mentimun',
      subtitle: 'Panen cepat mulai 32-38 HST secara rutin setiap 2 hari sekali',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Mengenali ukuran dan warna hijau segar buah mentimun siap panen (sebelum biji mengeras).',
        'Memanen rutin setiap 2 hari sekali dengan gunting bersih.'
      ],
      toolsAndMaterials: [
        { name: 'Gunting pangkas bersih', spec: 'Potong tangkai rapi', qty: '1 buah/kelompok' },
        { name: 'Keranjang plastik beralas koran', spec: 'Cegah goresan kulit', qty: 'Secukupnya' },
        { name: 'Timbangan & logbook panen', spec: 'Catat bobot tiap petikan', qty: '1 set' }
      ],
      k3Guidelines: [
        'Hati-hati saat memotong tangkai dengan gunting; arah potong menjauhi jari.',
        'Panen pagi hari (06.30-09.00) agar buah renyah dan segar.'
      ],
      steps: [
        { id: 1, title: 'Identifikasi buah siap petik', detail: 'Pilih buah berukuran seragam (18-22 cm, bobot 200-250 g tergantung varietas), warna hijau merata, duri kulit mudah rontok.', standard: 'Buah muda renyah, biji belum tua/keras.' },
        { id: 2, title: 'Pemetikan rutin tiap 2 hari', detail: 'Gunting tangkai buah sisakan ±1 cm. Jangan menarik buah langsung karena bisa merobek sulur.', standard: 'Sulur utama tidak putus dan buah utuh.' },
        { id: 3, title: 'Penampungan teduh & pencatatan', detail: 'Simpan di keranjang teduh dan timbang hasil panen.', standard: 'Data bobot dan jumlah buah per panen tercatat.' }
      ],
      fieldTips: [
        'Keterlambatan panen walau 2 hari membuat mentimun terlalu besar, menguning, berbiji keras, dan menghambat pembentukan buah baru di ruas atas!',
        'Panen pagi hari menghasilkan tekstur mentimun yang paling renyah (crisp) dan tahan lama.'
      ],
      numeracyChallenge: {
        question: 'Dari 800 tanaman mentimun, selama masa panen dihasilkan rata-rata 1,8 kg per tanaman. Berapa total kg hasil panen dan berapa produktivitas pada lahan 360 m²?',
        subQuestions: [
          'Total panen = 800 × 1,8 kg = 1.440 kg',
          'Produktivitas = 1.440 kg ÷ 360 m² = 4,0 kg/m² (setara 40 ton/ha)'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Total panen = 800 × 1,8 kg = 1.440 kg.',
          '2. Produktivitas = 1.440 / 360 = 4,0 kg/m².'
        ]
      }
    },
    {
      id: 7,
      title: 'Pascapanen Mentimun',
      subtitle: 'Pembersihan, sortasi buah bengkok, grading, pengemasan, dan analisis usaha',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Ruang pascapanen / gudang sekolah',
      learningObjectives: [
        'Memisahkan buah bengkok/cacat dan mengelompokkan Grade A (lurus seragam) dan Grade B.',
        'Menyusun analisis biaya, pendapatan, keuntungan, dan R/C ratio budidaya mentimun.'
      ],
      toolsAndMaterials: [
        { name: 'Lap lembap lembut & meja sortasi', spec: 'Bersihkan duri halus/debu', qty: '1 set' },
        { name: 'Karung jaring / keranjang plastik', spec: 'Kemasan distribusi', qty: 'Secukupnya' },
        { name: 'Kalkulator & lembar analisis usaha', spec: 'Hitung R/C ratio', qty: '1 set' }
      ],
      k3Guidelines: [
        'Jaga kebersihan lantai gudang pascapanen.',
        'Gunakan sarung tangan lembut saat mengelap duri halus kulit mentimun.'
      ],
      steps: [
        { id: 1, title: 'Pembersihan & pendinginan', detail: 'Usap ringan kotoran/duri halus dan tempatkan di ruangan sejuk berventilasi.', standard: 'Kulit buah bersih mengkilap tidak lecet.' },
        { id: 2, title: 'Sortasi & grading', detail: 'Pisahkan buah bengkok/terserang lalat buah. Kelompokkan Grade A (lurus mulus) & Grade B.', standard: 'Grade A dan B terpisah rapi.' },
        { id: 3, title: 'Pengemasan & analisis usaha', detail: 'Kemas dalam keranjang berventilasi dan hitung total pendapatan serta R/C ratio.', standard: 'Analisis usaha lengkap dan akurat.' }
      ],
      fieldTips: [
        'Jangan menyimpan mentimun di bawah suhu 10 °C terlalu lama karena mudah terkena chilling injury (bercak berair pada kulit). Suhu ideal simpan sementara 10-12 °C RH 90%.',
        'Permintaan pasar sangat menyukai timun Grade A yang lurus, hijau segar, dan seragam panjangnya.'
      ],
      numeracyChallenge: {
        question: 'Hasil panen 1.440 kg mentimun terjual rata-rata Rp 6.000/kg dengan total biaya produksi Rp 3.200.000. Hitunglah total pendapatan, keuntungan, dan R/C ratio!',
        subQuestions: [
          'Pendapatan = 1.440 × Rp 6.000 = Rp 8.640.000',
          'Keuntungan = Rp 8.640.000 - Rp 3.200.000 = Rp 5.440.000',
          'R/C ratio = 8.640.000 ÷ 3.200.000 = 2,70'
        ],
        unit: 'R/C',
        solutionExplanation: [
          '1. Pendapatan = 1.440 × 6.000 = Rp 8.640.000.',
          '2. Keuntungan = 8.640.000 - 3.200.000 = Rp 5.440.000.',
          '3. R/C ratio = 8.640.000 / 3.200.000 = 2,70 (> 1 menguntungkan).'
        ]
      }
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Apa keuntungan utama sistem rambatan vertikal (jaring trellis) pada budidaya mentimun?',
      options: [
        { key: 'A', text: 'Buah tumbuh lurus bersih tanpa bercak tanah dan populasi tanaman per bedengan lebih banyak' },
        { key: 'B', text: 'Membuat buah mentimun tumbuh di dalam tanah' },
        { key: 'C', text: 'Menghentikan kebutuhan penyiraman air' },
        { key: 'D', text: 'Memperpanjang umur panen menjadi 120 hari' }
      ],
      correctAnswer: 'A',
      explanation: 'Dengan rambatan vertikal, buah menggantung lurus, warna kulit hijau merata, terhindar dari busuk tanah, dan sirkulasi udara baik.',
      points: 4
    },
    {
      id: 2,
      question: 'Pada umur berapa mentimun hibrida umumnya sudah dapat dipanen pertama kali?',
      options: [
        { key: 'A', text: '10 - 15 HST' },
        { key: 'B', text: '32 - 45 HST' },
        { key: 'C', text: '80 - 95 HST' },
        { key: 'D', text: '110 - 120 HST' }
      ],
      correctAnswer: 'B',
      explanation: 'Mentimun termasuk komoditas berumur sangat genjah yang mulai dipanen pada 32-45 hari setelah tanam.',
      points: 4
    },
    {
      id: 3,
      question: 'Mengapa pewiwilan cabang samping dan bunga pada ruas ke 1 sampai ke 4 paling bawah dianjurkan?',
      options: [
        { key: 'A', text: 'Agar batang utama cepat kuat naik ke jaring dan buah bagian bawah tidak menyentuh tanah' },
        { key: 'B', text: 'Agar mentimun tidak memiliki akar' },
        { key: 'C', text: 'Mempercepat kelayuan daun' },
        { key: 'D', text: 'Menurunkan hasil panen' }
      ],
      correctAnswer: 'A',
      explanation: 'Membersihkan ruas 1-4 mendorong pertumbuhan vegetatif batang utama kokoh dan menjaga buah tidak terserang patogen tanah.',
      points: 4
    },
    {
      id: 4,
      question: 'Apa akibatnya jika tanaman mentimun mengalami kekurangan air saat fase pembesaran buah?',
      options: [
        { key: 'A', text: 'Buah terasa pahit dan bentuknya cenderung bengkok' },
        { key: 'B', text: 'Buah menjadi sangat manis seperti semangka' },
        { key: 'C', text: 'Jaring rambatan mengendur' },
        { key: 'D', text: 'Warna kulit menjadi merah cerah' }
      ],
      correctAnswer: 'A',
      explanation: 'Stres air memicu akumulasi senyawa cucurbitacin (rasa pahit) dan pertumbuhan sel buah yang tidak simetris.',
      points: 4
    },
    {
      id: 5,
      question: 'Cara terbaik memanen buah mentimun agar sulur utama tidak sobek atau rusak adalah ...',
      options: [
        { key: 'A', text: 'Ditarik paksa ke bawah' },
        { key: 'B', text: 'Memotong tangkai buah dengan gunting pangkas bersih menyisakan ±1 cm' },
        { key: 'C', text: 'Diputar hingga sulur terlepas dari jaring' },
        { key: 'D', text: 'Menunggu buah jatuh sendiri ke tanah' }
      ],
      correctAnswer: 'B',
      explanation: 'Menggunakan gunting bersih menjaga sulur tetap menempel utuh di jaring sehingga mampu terus menghasilkan bunga baru.',
      points: 4
    },
    {
      id: 6,
      question: 'Mengapa keterlambatan panen mentimun walau 2-3 hari merugikan petani?',
      options: [
        { key: 'A', text: 'Buah menjadi terlalu tua/menguning, biji mengeras, dan menghambat pembuahan ruas atas' },
        { key: 'B', text: 'Kulit buah menghilang' },
        { key: 'C', text: 'Tanaman langsung mati keesokan harinya' },
        { key: 'D', text: 'pH tanah langsung turun drastis' }
      ],
      correctAnswer: 'A',
      explanation: 'Buah tua menyedot sebagian besar fotosintat tanaman dan menekan pembentukan bunga betina di ruas berikutnya.',
      points: 4
    },
    {
      id: 7,
      question: 'Hama kumbang daun pemakan daun muda mentimun yang berwarna kuning kecokelatan disebut ...',
      options: [
        { key: 'A', text: 'Oteng-oteng (Aulacophora similis)' },
        { key: 'B', text: 'Penggerek batang padi' },
        { key: 'C', text: 'Wereng batang cokelat' },
        { key: 'D', text: 'Kutu loncat jeruk' }
      ],
      correctAnswer: 'A',
      explanation: 'Oteng-oteng sangat menyukai daun muda tanaman famili Cucurbitaceae seperti mentimun dan semangka.',
      points: 4
    },
    {
      id: 8,
      question: 'Pada penyemaian mentimun, mengapa bibit tidak boleh dibiarkan terlalu lama (>12 hari) di tray semai?',
      options: [
        { key: 'A', text: 'Akar cepat melingkar (rootbound) dan tanaman cepat tua sebelum merambat di lahan' },
        { key: 'B', text: 'Benih akan berubah menjadi tanaman tomat' },
        { key: 'C', text: 'Daun menjadi kebal hama' },
        { key: 'D', text: 'Media berubah menjadi batu' }
      ],
      correctAnswer: 'A',
      explanation: 'Bibit mentimun tumbuh sangat cepat sehingga pindah tanam terbaik adalah pada umur 7-10 HSS.',
      points: 4
    },
    {
      id: 9,
      question: 'Penyakit daun mentimun dengan bercak bersudut kekuningan yang dibatasi tulang daun dan terdapat miselium keunguan di bawah daun disebut ...',
      options: [
        { key: 'A', text: 'Embun bulu / Downy mildew (Pseudoperonospora cubensis)' },
        { key: 'B', text: 'Busuk pangkal batang' },
        { key: 'C', text: 'Bercak kering' },
        { key: 'D', text: 'Patek buah' }
      ],
      correctAnswer: 'A',
      explanation: 'Embun bulu merupakan penyakit utama mentimun yang muncul saat kelembapan tinggi dan embun pagi lama mengering.',
      points: 4
    },
    {
      id: 10,
      question: 'Berapa kisaran pH tanah optimal untuk pertumbuhan mentimun?',
      options: [
        { key: 'A', text: '3,5 - 4,5' },
        { key: 'B', text: '6,0 - 7,0' },
        { key: 'C', text: '8,5 - 9,5' },
        { key: 'D', text: '4,0 - 5,0' }
      ],
      correctAnswer: 'B',
      explanation: 'Mentimun tumbuh paling subur pada tanah gembur dengan pH mendekati netral (6,0 - 7,0).',
      points: 4
    }
  ],
  essayQuestions: [
    {
      id: 11,
      question: 'Jelaskan mengapa budidaya mentimun dianjurkan menggunakan jaring rambatan (trellis) dan pola 2 baris dibandingkan dibiarkan menjalar di tanah!',
      maxScore: 12,
      sampleAnswer: 'Sistem rambatan vertikal menghasilkan buah yang lurus, bersih tidak bercak tanah, terhindar dari busuk buah karena kontak tanah basah, memperlancar sirkulasi udara sehingga mengurangi penyakit embun bulu, serta meningkatkan populasi tanaman per luas lahan.'
    },
    {
      id: 12,
      question: 'Mengapa buah mentimun harus dipanen tepat waktu setiap 2 hari sekali dan menggunakan gunting pangkas?',
      maxScore: 12,
      sampleAnswer: 'Panen rutin tiap 2 hari mencegah buah menjadi terlalu tua, menguning, dan berbiji keras yang tidak disukai pasar, sekaligus merangsang munculnya bunga dan buah baru. Pemotongan tangkai memakai gunting mencegah sulur utama robek atau terlepas dari jaring rambatan.'
    },
    {
      id: 13,
      question: 'Apa penyebab mentimun berasa pahit atau berbentuk bengkok, dan bagaimana pencegahannya?',
      maxScore: 12,
      sampleAnswer: 'Penyebab utama adalah kekurangan/stres air selama pembesaran buah, gangguan penyerbukan, atau serangan hama pengisap. Pencegahannya: menjaga penyiraman stabil teratur, pemupukan berimbang, dan memastikan sirkulasi udara serta serangga penyerbuk aktif di pagi hari.'
    },
    {
      id: 14,
      question: 'Sebutkan 3 OPT utama pada tanaman mentimun dan cara pengendaliannya menggunakan prinsip PHT!',
      maxScore: 12,
      sampleAnswer: '1) Kumbang oteng-oteng: sanitasi lahan dan pengumpulan mekanis pagi hari. 2) Lalat buah: pasang perangkap metil eugenol dan kumpulkan buah jatuh. 3) Embun bulu (downy mildew): atur jarak tanam, rempel daun tua bawah yang lembap, serta aplikasikan fungisida selektif bila melewati ambang.'
    },
    {
      id: 15,
      question: 'Dari 800 tanaman mentimun di lahan 360 m², dihasilkan rata-rata 1,8 kg/tanaman dengan harga jual Rp 6.000/kg. Biaya produksi Rp 3.200.000. Hitung total hasil panen, pendapatan, keuntungan, dan R/C ratio!',
      maxScore: 12,
      sampleAnswer: 'Total hasil = 800 × 1,8 kg = 1.440 kg. Pendapatan = 1.440 × Rp 6.000 = Rp 8.640.000. Keuntungan = Rp 8.640.000 - Rp 3.200.000 = Rp 5.440.000. R/C ratio = 8.640.000 / 3.200.000 = 2,70 (usaha menguntungkan karena > 1).'
    }
  ],
  skillsRubric: [
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Mengenakan APD dan memastikan lahan bebas bekas tanaman Cucurbitaceae' },
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Membersihkan gulma, memperbaiki parit, dan mengukur pH tanah (6,0 - 7,0)' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Mengolah tanah gembur dan mengaplikasikan pupuk dasar rata' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Memasang mulsa PHP kencang dan membuat 2 baris lubang 40 x 50 cm' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Melakukan perlakuan imbibisi benih dan menyemai rata di tray' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Menyeleksi bibit sehat umur 7-10 HSS sebelum akar melingkar' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memasang tiang bambu dan membentangkan jaring rambatan dengan tegang' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memindah tanam bibit pada sore hari tanpa merusak akar' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Mengarahkan sulur muda melilit rapi pada jaring rambatan' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Melakukan pewiwilan tunas dan bunga di ruas ke 1-4 bawah' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Menjaga pengairan stabil dan mengocor pupuk NPK mingguan' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Memantau embun bulu, oteng-oteng, dan lalat buah (PHT)' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Memilih buah ukuran komersial yang renyah sebelum biji mengeras' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Memanen dengan gunting pangkas bersih menyisakan tangkai 1 cm' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Menimbang dan mencatat produktivitas tiap petikan di logbook' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Membersihkan duri halus dan melakukan sortasi buah bengkok/cacat' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Melakukan grading Grade A & B dan pengemasan berventilasi' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Menyusun analisis kelayakan usaha R/C ratio dengan benar' }
  ],
  dailySchedules: [
    { id: 'timun-1', time: '06:30 - 08:30 WIB', title: 'Panen Rutin 2 Hari Sekali & Arahkan Sulur', desc: 'Gunting mentimun ukuran siap jual di pagi hari agar renyah dan lilitkan sulur muda ke jaring.', jobId: 6, tag: 'Panen & Rambatan', active: true },
    { id: 'timun-2', time: '09:00 - 10:00 WIB', title: 'Cek Embun Bulu & Kumbang Oteng-oteng', desc: 'Amati permukaan bawah daun serta cek perangkap metil eugenol lalat buah.', jobId: 5, tag: 'PHT Rutin', active: true },
    { id: 'timun-3', time: '15:30 - 17:00 WIB', title: 'Penyiraman Rutin & Kocor Pupuk Mingguan', desc: 'Jaga kelembapan tanah agar buah mentimun tidak pahit atau membengkok.', jobId: 5, tag: 'Nutrisi & Air', active: true }
  ]
};

// 5. MELON HIBRIDA (Cucumis melo)
const MELON_BUNDLE: CommodityBundle = {
  id: 'melon',
  name: 'Melon',
  latinName: 'Cucumis melo',
  shortDesc: 'Budidaya melon net hibrida sistem lanjaran vertikal, seleksi buah, penggantungan buah, topping, dan uji Brix.',
  harvestDays: '65 - 75 HST',
  estimatedCycleDays: 70,
  currentDayMock: 36,
  imageUrl: BUNDLED_IMAGES.melonLahan,
  info: {
    title: 'JOB SHEET BUDIDAYA MELON HIBRIDA (Cucumis melo)',
    subtitle: 'Dari Sanitasi Lahan hingga Pascapanen',
    subject: 'Produksi Tanaman Hortikultura / Budidaya Tanaman Buah Semusim',
    competencyProgram: 'Agribisnis Tanaman Pangan dan Hortikultura (ATPH)',
    classPhase: 'XI dan XII (Fase F)',
    commodity: 'Melon Net Hibrida F1',
    totalJobs: '7 Job (Total 35 JP) + Asesmen',
    publisher: 'Program Keahlian ATPH · Kurikulum Merdeka SMK',
    growthRequirements: [
      { factor: 'Suhu', value: 'Sekitar 25 - 30 °C' },
      { factor: 'Cahaya', value: 'Penuh, 10 - 12 jam per hari' },
      { factor: 'Tanah', value: 'Gembur, lempung berpasir, pH 6,0 - 6,8' },
      { factor: 'Ketinggian', value: 'Dataran rendah - menengah (0 - 700 mdpl)' },
      { factor: 'Kelembapan', value: '50 - 70% (cegah embun tepung)' },
      { factor: 'Umur Panen', value: 'Sekitar 65 - 75 HST (Brix ≥ 11 - 13%)' }
    ]
  },
  modules: [
    {
      id: 1,
      title: 'Sanitasi Lahan',
      subtitle: 'Membersihkan lahan/screen house bebas inokulum layu & menguji pH tanah',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Memastikan lahan bukan bekas tanaman Cucurbitaceae (semangka, mentimun, labu) minimal 1 musim.',
        'Membersihkan gulma dan sisa akar terinfeksi layu Fusarium atau virus kuning.',
        'Mengukur pH tanah di 5 titik diagonal dengan target pH 6,0 - 6,8.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul, sabit, garpu tanah', spec: 'Bersih dan tajam', qty: '1 set' },
        { name: 'Soil tester / pH meter', spec: 'Kalibrasi siap pakai', qty: '1 unit' },
        { name: 'Karung & gerobak dorong', spec: 'Pembuangan limbah gulma', qty: '1 unit' },
        { name: 'Desinfektan (alkohol 70% / klorin)', spec: 'Sterilisasi gunting & alat', qty: 'Secukupnya' },
        { name: 'APD lengkap', spec: 'Sepatu boot, sarung tangan, topi, masker', qty: 'Per siswa' }
      ],
      k3Guidelines: [
        'Gunakan sepatu boot dan sarung tangan saat membersihkan lahan dan parit.',
        'Jangan membakar sampah plastik di area lahan atau dekat screen house.',
        'Sterilkan alat potong sebelum berpindah antar blok untuk mencegah penularan virus.'
      ],
      steps: [
        { id: 1, title: 'Survei Riwayat Lahan & Drainase', detail: 'Catat riwayat komoditas sebelumnya, pastikan bebas inokulum Cucurbitaceae dan aliran air lancar.', standard: 'Data riwayat & drainase tercatat rapi' },
        { id: 2, title: 'Pembersihan Gulma & Sisa Tanaman', detail: 'Cabut seluruh gulma inang kutu kebul, thrips, dan tungau di bedengan dan pematang.', standard: 'Bedengan dan parit bersih 100% dari gulma' },
        { id: 3, title: 'Isolasi Sisa Tanaman Sakit', detail: 'Kumpulkan sisa batang/akar bergejala layu ke dalam karung dan keluarkan dari blok tanam.', standard: 'Tidak ada sisa tanaman sakit tertinggal' },
        { id: 4, title: 'Perbaikan Saluran Drainase', detail: 'Dalamkan parit keliling minimal 30-40 cm agar air hujan tidak menggenang di zona perakaran.', standard: 'Parit mengalir lancar tanpa genangan' },
        { id: 5, title: 'Pengukuran pH Tanah 5 Titik', detail: 'Ukur pH tanah di 5 titik diagonal pada kedalaman 15 cm dan hitung rata-ratanya.', standard: 'pH terukur akurat di kisaran 6,0 - 6,8' },
        { id: 6, title: 'Sanitasi Peralatan Kerja', detail: 'Cuci bersih cangkul, sabit, dan semprot disinfektan pada gunting pangkas.', standard: 'Alat bersih, kering, dan steril' }
      ],
      fieldTips: [
        'Melon sangat sensitif terhadap genangan air di zona leher akar; pastikan drainase sempurna.',
        'Jika pH < 6,0, siapkan kapur dolomit pada tahap pengolahan tanah.'
      ],
      numeracyChallenge: {
        question: 'Sebuah greenhouse memiliki 4 petak tanam melon dengan pH rata-rata 5,6. Untuk menaikkan pH ke kisaran optimal 6,4 diperlukan dolomit 200 g/m². Jika tiap petak berukuran 1,2 m × 20 m, berapa kg total dolomit yang dibutuhkan?',
        subQuestions: [
          'Total luas 4 petak = 4 × (1,2 m × 20 m) = 96 m²',
          'Kebutuhan dolomit = 96 m² × 200 g/m² = 19.200 g = 19,2 kg'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Luas 1 petak = 1,2 m × 20 m = 24 m²',
          '2. Total luas 4 petak = 4 × 24 m² = 96 m²',
          '3. Kebutuhan dolomit = 96 m² × 200 g/m² = 19.200 g = 19,2 kg dolomit'
        ]
      }
    },
    {
      id: 2,
      title: 'Pengolahan Lahan & Mulsa PHP',
      subtitle: 'Membuat bedengan tinggi, aplikasi pupuk dasar, dan pemasangan mulsa PHP',
      allocation: '5 JP (5 x 45 menit)',
      location: 'Lahan praktik / screen house sekolah',
      learningObjectives: [
        'Membentuk bedengan tinggi dengan struktur remah dan drainase optimal.',
        'Mengaplikasikan pupuk kandang matang, dolomit, dan NPK dasar secara merata.',
        'Memasang mulsa plastik hitam perak (PHP) dan membuat lubang tanam 2 baris zig-zag.'
      ],
      toolsAndMaterials: [
        { name: 'Cangkul & garu', spec: 'Pengolahan tanah halus', qty: '2 set' },
        { name: 'Pupuk kandang matang / kompos', spec: 'Terfermentasi penuh', qty: '2 kg/m²' },
        { name: 'Kapur dolomit + NPK 16-16-16 + SP-36', spec: 'Sesuai dosis anjuran', qty: '1 paket' },
        { name: 'Mulsa PHP', spec: 'Lebar 120 cm', qty: '1 gulung' },
        { name: 'Pelubang mulsa & bambu pasak', spec: 'Diameter lubang 8-10 cm', qty: '1 set' }
      ],
      k3Guidelines: [
        'Gunakan masker dan sarung tangan saat mencampur pupuk dasar dan kapur dolomit.',
        'Waspadai alat pelubang mulsa panas agar tidak mengenai tangan atau bagian plastik lain.'
      ],
      steps: [
        { id: 1, title: 'Pembajakan / Pencangkulan Dalam', detail: 'Gemburkan tanah sedalam 30 cm, hancurkan bongkahan dan singkirkan kerikil.', standard: 'Tanah remah dan bebas bongkahan besar' },
        { id: 2, title: 'Pembentukan Bedengan Tinggi', detail: 'Bentuk bedengan lebar 100-120 cm, tinggi 35-40 cm, dan jarak antar bedengan 60 cm.', standard: 'Bedengan lurus, padat merata, tinggi sesuai standar' },
        { id: 3, title: 'Pemberian Pupuk Dasar & Dolomit', detail: 'Taburkan pupuk kandang matang, dolomit, SP-36, dan NPK dasar lalu aduk rata dengan tanah bedengan.', standard: 'Pupuk dasar tercampur homogen' },
        { id: 4, title: 'Pengairan Awal & Inkubasi Bedengan', detail: 'Basahi bedengan hingga lembap merata agar pupuk bereaksi dan terikat tanah.', standard: 'Kelembapan bedengan merata sebelum ditutup mulsa' },
        { id: 5, title: 'Pemasangan Mulsa PHP Siang Hari', detail: 'Bentangkan mulsa dengan sisi perak menghadap atas pada siang terik lalu kunci dengan pasak bambu.', standard: 'Mulsa kencang, rata, tidak kendor' },
        { id: 6, title: 'Pembuatan Lubang Tanam 2 Baris', detail: 'Buat lubang tanam pola zig-zag berjarak 50 cm antar tanaman dan 60 cm antar baris.', standard: 'Lubang tanam rapi sesuai jarak 50 × 60 cm' }
      ],
      fieldTips: [
        'Sisi perak mulsa memantulkan cahaya ke bawah daun sehingga membantu mengurangi populasi thrips dan kutu daun.',
        'Diamkan bedengan bermulsa 5-7 hari sebelum tanam agar panas dekomposisi dan reaksi pupuk stabil.'
      ],
      numeracyChallenge: {
        question: 'Satu bedengan berukuran panjang 25 m ditanami melon 2 baris dengan jarak dalam baris 50 cm. Jika ujung bedengan disisakan masing-masing 50 cm, berapa jumlah lubang tanam pada 1 bedengan tersebut?',
        subQuestions: [
          'Panjang efektif = 25 m - 1 m = 24 m',
          'Total 2 baris = (24 ÷ 0,5) × 2 = 96 lubang tanam'
        ],
        unit: 'lubang',
        solutionExplanation: [
          '1. Panjang efektif tanam = 25 m - (2 × 0,5 m) = 24 m',
          '2. Jumlah tanaman per baris = (24 / 0,5) + 1 = 48 + 1 = 49 tanaman (atau 48 jika dihitung per segmen 0,5 m)',
          '3. Total 2 baris pada 1 bedengan = 48 × 2 = 96 sampai 98 lubang tanam'
        ]
      }
    },
    {
      id: 3,
      title: 'Penyemaian Benih Melon F1',
      subtitle: 'Perlakuan benih, media semai steril, dan pemeliharaan bibit umur 10-12 HSS',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Rumah pembibitan / screen house',
      learningObjectives: [
        'Melakukan sortasi dan pemeraman benih melon hibrida untuk perkecambahan seragam.',
        'Menyiapkan media tanam steril cocopeat : kompos : sekam bakar (1:1:1) di potray.',
        'Memelihara bibit hingga siap pindah tanam pada umur 10-12 HSS (2-3 daun sejati).'
      ],
      toolsAndMaterials: [
        { name: 'Benih Melon Net Hibrida F1', spec: 'Daya tumbuh ≥ 85%', qty: '150 butir' },
        { name: 'Potray semai 50 / 72 lubang', spec: 'Bersih dan steril', qty: '3 tray' },
        { name: 'Cocopeat, kompos halus, sekam bakar', spec: 'Perbandingan 1:1:1', qty: '1 paket' },
        { name: 'Sprayer halus & kain lembap', spec: 'Pemeraman benih', qty: '1 set' }
      ],
      k3Guidelines: [
        'Cuci tangan bersih sebelum memegang benih berlapis fungisida (seed treatment).',
        'Pastikan meja semai beratap plastik UV dan berjaring insect screen.'
      ],
      steps: [
        { id: 1, title: 'Persiapan Media Semai Halus', detail: 'Ayak kompos, cocopeat, dan sekam bakar perbandingan 1:1:1 lalu basahi hingga lembap.', standard: 'Media gembur dan lembap tanpa menetes' },
        { id: 2, title: 'Pengisian Potray Merata', detail: 'Isi setiap lubang potray dengan media hingga penuh tanpa dipadatkan berlebihan.', standard: 'Seluruh lubang terisi seragam' },
        { id: 3, title: 'Perendaman & Pemeraman Benih', detail: 'Rendam benih di air hangat kuku 2-3 jam lalu peram di tisu/kain lembap 24 jam hingga radikula muncul.', standard: 'Minimal 90% benih mulai berkecambah' },
        { id: 4, title: 'Penanaman Benih ke Potray', detail: 'Masukkan 1 benih berkecambah ke tiap lubang sedalam 0,5-1 cm dengan radikula menghadap bawah.', standard: 'Kedalaman tanam tepat, benih tertutup tipis' },
        { id: 5, title: 'Penyiraman & Pemantauan Harian', detail: 'Semprot kabut halus pagi/sore dan beri cahaya cukup agar bibit tidak etiolasi (kutilang).', standard: 'Batang bibit kokoh dan hijau segar' },
        { id: 6, title: 'Aklimatisasi & Seleksi Bibit', detail: 'Kurangi naungan 2 hari sebelum tanam; seleksi bibit sehat berdaun 2-3 sejati (10-12 HSS).', standard: 'Bibit seragam siap pindah tanam tanpa cacat' }
      ],
      fieldTips: [
        'Jangan menanam bibit melon yang terlalu tua (>15 HSS) di potray kecil karena perakaran sudah melingkar dan pertumbuhan lambat.',
        'Hindari penyiraman berlebihan di malam hari untuk mencegah rebah kecambah (damping-off).'
      ],
      numeracyChallenge: {
        question: 'Untuk 4 bedengan dibutuhkan 384 bibit melon. Jika disiapkan cadangan sulaman 10% dan daya kecambah benih 92%, berapa minimal butir benih yang harus disemai?',
        subQuestions: [
          'Kebutuhan + cadangan 10% = 384 × 1,10 = 423 bibit',
          'Minimal benih disemai = 423 ÷ 0,92 = 460 butir'
        ],
        unit: 'butir',
        solutionExplanation: [
          '1. Kebutuhan bibit + cadangan 10% = 384 × 1,10 = 422,4 ≈ 423 bibit',
          '2. Penyesuaian daya kecambah 92% = 423 / 0,92 = 459,7 ≈ 460 butir benih'
        ]
      }
    },
    {
      id: 4,
      title: 'Pemasangan Lanjaran & Pindah Tanam',
      subtitle: 'Merakit ajir bambu/tali rambatan dan memindah tanam bibit pada sore hari',
      allocation: '5 JP (5 x 45 menit)',
      location: 'Lahan praktik / screen house',
      learningObjectives: [
        'Memasang ajir bambu/kayu palang atas atau tali penggantung vertikal yang kokoh menahan beban buah.',
        'Melakukan pindah tanam bibit melon pada sore hari tanpa merusak perakaran.',
        'Mengaplikasikan penyiraman dan larutan starter pascatanam secara tepat.'
      ],
      toolsAndMaterials: [
        { name: 'Ajir bambu tinggi 200 cm & palang atas', spec: 'Kuat dan bersih', qty: '100 batang' },
        { name: 'Tali rafia / nilon rambatan', spec: 'Tahan cuaca', qty: '2 gulung' },
        { name: 'Bibit melon sehat 10-12 HSS', spec: '2-3 daun sejati', qty: 'Sesuai lubang' },
        { name: 'Ember & gayung takar + NPK starter', spec: 'Dosis 2 g/L air', qty: '1 set' }
      ],
      k3Guidelines: [
        'Hati-hati saat menancapkan ajir bambu agar tidak mengenai mata atau melukai tangan akibat sembilu.',
        'Pastikan ikatan palang atas kuat menahan angin dan bobot total buah nantinya.'
      ],
      steps: [
        { id: 1, title: 'Pemasangan Ajir Segitiga / Vertikal', detail: 'Tancapkan ajir setinggi 200 cm di samping lubang tanam dan pasang palang horizontal di bagian atas.', standard: 'Rangka ajir kokoh dan simetris' },
        { id: 2, title: 'Pemasangan Tali Rambatan', detail: 'Ikatkan tali nilon/rafia dari pangkal ajir ke palang atas untuk media rambatan batang utama.', standard: 'Tali terpasang kencang siap rambat' },
        { id: 3, title: 'Penyiraman Lubang Tanam', detail: 'Siram lubang tanam pada pagi/siang sebelum pindah tanam agar tanah lembap dan tidak panas.', standard: 'Media lubang tanam lembap merata' },
        { id: 4, title: 'Pelepasan Bibit dari Potray', detail: 'Tekan dasar potray perlahan dan keluarkan bibit utuh beserta media akar tanpa pecah.', standard: 'Bola akar utuh 100% tidak putus' },
        { id: 5, title: 'Penanaman Bibit Sore Hari', detail: 'Tanam bibit pada pukul 15.30-17.30 WIB sebatas leher akar lalu padatkan tanah di sekelilingnya.', standard: 'Batang tegak, daun kotiledon di atas permukaan tanah' },
        { id: 6, title: 'Pengocoran Starter & Penyulaman', detail: 'Kocor 150-200 ml larutan NPK starter 2 g/L dan lakukan penyulaman jika ada bibit mati dalam 3-5 HST.', standard: 'Tingkat hidup bibit ≥ 98%' }
      ],
      fieldTips: [
        'Jangan menimbun batang muda hingga melewati kotiledon karena memicu busuk pangkal batang.',
        'Pindah tanam sore hari mencegah layu stres akibat radiasi matahari tinggi.'
      ],
      numeracyChallenge: {
        question: 'Untuk mengocor starter sebanyak 400 bibit melon dengan dosis 200 ml per tanaman dan konsentrasi NPK 2 gram/liter, berapa liter total larutan dan berapa gram pupuk NPK yang harus ditimbang?',
        subQuestions: [
          'Total larutan = 400 × 200 ml = 80 liter',
          'Total NPK = 80 liter × 2 g/L = 160 gram'
        ],
        unit: 'gram NPK',
        solutionExplanation: [
          '1. Total volume larutan = 400 tanaman × 200 ml = 80.000 ml = 80 liter',
          '2. Total pupuk NPK = 80 liter × 2 g/liter = 160 gram NPK'
        ]
      }
    },
    {
      id: 5,
      title: 'Pemeliharaan, Polinasi & Penggantungan Buah',
      subtitle: 'Pewiwilan tunas, polinasi cabang ruas 9-12, gantung buah, topping, dan PHT',
      allocation: '8 JP (8 x 45 menit)',
      location: 'Lahan praktik / screen house',
      learningObjectives: [
        'Melakukan pelilitan batang utama dan pemangkasan tunas cabang ruas ke-1 sampai ke-8.',
        'Melakukan polinasi bunga betina pada cabang lateral ruas ke-9 sampai ke-12 pukul 06.00-09.00 WIB.',
        'Melakukan seleksi 1 buah terbaik, menggantung buah dengan tali rafia, serta topping di daun ke-25-28.'
      ],
      toolsAndMaterials: [
        { name: 'Gunting pangkas steril & alkohol 70%', spec: 'Tajam dan bersih', qty: '1 set' },
        { name: 'Tali rafia penggantung buah & label', spec: 'Warna mencolok', qty: '1 gulung' },
        { name: 'Pupuk NPK 16-16-16, KNO3 putih, Kalsium', spec: 'Sesuai fase tumbuh', qty: '1 paket' },
        { name: 'Yellow sticky trap & botol perangkap lalat buah', spec: 'Pengendalian PHT', qty: '4 unit' }
      ],
      k3Guidelines: [
        'Sterilkan gunting pangkas dengan alkohol 70% setiap pindah tanaman untuk mencegah penularan virus.',
        'Gunakan APD lengkap dan masker saat melakukan penyemprotan PHT.'
      ],
      steps: [
        { id: 1, title: 'Pelilitan Batang & Pewiwilan Ruas 1-8', detail: 'Lilitkan batang utama ke tali ajir dan buang semua tunas samping di ketiak daun ruas ke-1 hingga ke-8.', standard: 'Batang utama tumbuh vertikal bersih tanpa tunas bawah' },
        { id: 2, title: 'Pemeliharaan Cabang Produktif Ruas 9-12', detail: 'Pelihara cabang samping pada ruas ke-9 sampai ke-12, sisakan 1-2 daun setelah bakal bunga betina.', standard: 'Cabang buah ruas 9-12 siap berbunga' },
        { id: 3, title: 'Polinasi Manual Pagi Hari & Pelabelan', detail: 'Serbukkan serbuk sari bunga jantan ke kepala putik bunga betina pukul 06.00-09.00 WIB dan pasang label tanggal.', standard: 'Bakal buah membengkak dalam 3-5 hari pasca polinasi' },
        { id: 4, title: 'Seleksi Buah & Penggantungan Buah', detail: 'Saat buah sebesar telur ayam, pilih 1 buah terbaik per tanaman dan gantung tangkainya dengan tali ke palang atas.', standard: '1 buah simetris tergantung aman tanpa membebani cabang' },
        { id: 5, title: 'Topping Pucuk & Pengaturan Nutrisi Kalium', detail: 'Potong pucuk batang utama pada daun ke-25-28; kocor pupuk tinggi Kalium (KNO3) saat pembesaran & pembentukan net.', standard: 'Pertumbuhan fokus ke net dan kemanisan buah' },
        { id: 6, title: 'Pengendalian Embun Tepung & Lalat Buah (PHT)', detail: 'Pasang perangkap lalat buah, kurangi daun tua terlalu rimbun, dan pantau gejala embun tepung.', standard: 'OPT terkendali di bawah ambang ekonomi' }
      ],
      fieldTips: [
        'Pengikatan tali penggantung dilakukan pada tangkai cabang berbentuk huruf T agar simpul tidak mencekik leher buah yang terus membesar.',
        'Kurangi penyiraman secara bertahap 7-10 hari sebelum panen untuk meningkatkan kadar gula (Brix).'
      ],
      numeracyChallenge: {
        question: 'Dari 360 tanaman melon, dilakukan seleksi 1 buah per tanaman. Setelah polinasi berhasil 95% dan rata-rata bobot buah panen 1,6 kg/buah, hitung perkiraan total produksi melon (kg)!',
        subQuestions: [
          'Jumlah buah berhasil = 360 × 95% = 342 buah',
          'Perkiraan total produksi = 342 × 1,6 kg = 547,2 kg'
        ],
        unit: 'kg',
        solutionExplanation: [
          '1. Jumlah tanaman berbuah = 360 × 95% = 342 buah',
          '2. Perkiraan total produksi = 342 buah × 1,6 kg = 547,2 kg melon'
        ]
      }
    },
    {
      id: 6,
      title: 'Panen Melon Standar Brix',
      subtitle: 'Menentukan indeks kematangan net, uji refraktometer Brix, dan teknik petik',
      allocation: '4 JP (4 x 45 menit)',
      location: 'Lahan praktik / screen house',
      learningObjectives: [
        'Mengidentifikasi ciri fisiologis melon siap panen (umur 65-75 HST, pembentukan net merata, aroma harum).',
        'Mengukur kadar kemanisan daging buah dengan refraktometer (standar ≥ 11-13 Brix).',
        'Memanen buah dengan menyisakan tangkai huruf T agar awet saat distribusi.'
      ],
      toolsAndMaterials: [
        { name: 'Gunting pangkas bersih', spec: 'Potong tangkai huruf T', qty: '2 unit' },
        { name: 'Refraktometer Brix', spec: 'Skala 0 - 32% Brix', qty: '1 unit' },
        { name: 'Keranjang panen berlapis busa/koran', spec: 'Anti memar', qty: '4 unit' },
        { name: 'Timbangan digital & catatan panen', spec: 'Akurasi 10 g', qty: '1 set' }
      ],
      k3Guidelines: [
        'Gunakan gunting pangkas dengan hati-hati saat melepas tali penggantung buah di ketinggian.',
        'Angkat keranjang buah dengan posisi punggung tegak.'
      ],
      steps: [
        { id: 1, title: 'Verifikasi Umur Label Polinasi', detail: 'Periksa label tanggal polinasi: umur buah umumnya 35-42 hari setelah polinasi (65-75 HST).', standard: 'Label sesuai umur panen varietas' },
        { id: 2, title: 'Inspeksi Visual Netting & Tangkai', detail: 'Pastikan jaring (net) kulit tebal dan rata, daun bendera mengering, dan muncul aroma harum khas melon.', standard: 'Net tebal rata dan tangkai mulai retak halus' },
        { id: 3, title: 'Uji Sampel Refraktometer Brix', detail: 'Ambil 1-2 buah sampel, peras cairan daging buah tengah dan ukur di refraktometer.', standard: 'Kadar gula terukur minimal 11 - 13 Brix' },
        { id: 4, title: 'Pemetikan Pagi dengan Tangkai Huruf T', detail: 'Potong cabang pada kedua sisi tangkai buah sehingga membentuk huruf T sepanjang 3-5 cm pada pagi hari.', standard: 'Tangkai T utuh, kulit net tidak tergores' },
        { id: 5, title: 'Penimbangan & Pencatatan Hasil', detail: 'Lepas tali penggantung dengan rapi, timbang bobot tiap buah, dan catat ke logbook panen.', standard: 'Data produksi tercatat lengkap per blok' }
      ],
      fieldTips: [
        'Panen pada pagi hari (06.30-09.00 WIB) menjaga suhu buah tetap dingin dan kesegaran daging buah bertahan lebih lama.',
        'Tangkai berbentuk huruf T merupakan ciri mutu pasar melon premium.'
      ],
      numeracyChallenge: {
        question: 'Hasil panen 1 blok menghasilkan 320 buah melon dengan bobot rata-rata 1,55 kg/buah. Jika harga jual tingkat petani Rp 16.000/kg, berapa total pendapatan kotor dari blok tersebut?',
        subQuestions: [
          'Total bobot panen = 320 × 1,55 kg = 496 kg',
          'Pendapatan kotor = 496 kg × Rp 16.000 = Rp 7.936.000'
        ],
        unit: 'Rupiah',
        solutionExplanation: [
          '1. Total bobot panen = 320 × 1,55 kg = 496 kg',
          '2. Pendapatan kotor = 496 kg × Rp 16.000/kg = Rp 7.936.000'
        ]
      }
    },
    {
      id: 7,
      title: 'Pascapanen, Grading & Analisis Usaha',
      subtitle: 'Pembersihan buah, grading bobot & Brix, pelabelan, dan analisis kelayakan R/C ratio',
      allocation: '5 JP (5 x 45 menit)',
      location: 'Ruang pascapanen & kelas ATPH',
      learningObjectives: [
        'Melakukan pembersihan kering, sortasi, dan grading melon berdasarkan bobot, kerapatan net, dan Brix.',
        'Mengemas buah dengan pelindung jaring foam (fruit net) dalam keranjang berventilasi.',
        'Menghitung biaya produksi, pendapatan, keuntungan, BEP, dan R/C ratio budidaya melon.'
      ],
      toolsAndMaterials: [
        { name: 'Kain lap lembut & sikat halus', spec: 'Bersihkan debu kulit buah', qty: '2 set' },
        { name: 'Jaring busa pelindung buah (foam net)', spec: 'Ukuran melon 1,2 - 2 kg', qty: 'Secukupnya' },
        { name: 'Timbangan duduk & stiker label kelas', spec: 'Grade A / Grade B', qty: '1 set' },
        { name: 'Kalkulator / lembar kerja usaha tani', spec: 'Perhitungan R/C & BEP', qty: '1 set' }
      ],
      k3Guidelines: [
        'Susun buah maksimal 2 lapis dengan alas kardus/busa di ruang teduh agar buah tidak memar.',
        'Jaga kebersihan lantai ruang pascapanen dari air atau sisa tangkai buah.'
      ],
      steps: [
        { id: 1, title: 'Pendinginan Ruang Teduh (Pre-cooling)', detail: 'Letakkan melon hasil panen di tempat teduh berventilasi selama 2-4 jam agar panas lapangan turun.', standard: 'Suhu buah turun merata' },
        { id: 2, title: 'Pembersihan & Sortasi Buah Cacat', detail: 'Lap kulit buah secara kering dengan kain lembut dan pisahkan buah retak, busuk, atau net tidak terbentuk.', standard: 'Buah bersih bebas tanah dan buah cacat terpisah' },
        { id: 3, title: 'Grading Mutu (Grade A & B)', detail: 'Grade A: bobot ≥ 1,4 kg, net tebal rata, Brix ≥ 12%; Grade B: bobot 1,0-1,39 kg atau net sedang.', standard: 'Pengelompokan kelas mutu seragam' },
        { id: 4, title: 'Pelindung Foam Net & Pengemasan', detail: 'Pasang jaring busa (foam net) di tiap buah Grade A, tempel label kelas/Brix, lalu tata dalam krat/kardus berventilasi.', standard: 'Buah terlindungi aman dari benturan selama angkut' },
        { id: 5, title: 'Perhitungan Analisis Usaha R/C & BEP', detail: 'Rekap biaya tetap + variabel, total penerimaan, laba bersih, R/C ratio, dan BEP harga.', standard: 'Laporan kelayakan usaha selesai dan akurat' }
      ],
      fieldTips: [
        'Jangan mencuci melon ber-net dengan air karena kelembapan yang terperangkap di sela net memicu jamur selama penyimpanan.',
        'Pencantuman stiker hasil uji Brix meningkatkan daya tawar jual ke pasar modern.'
      ],
      numeracyChallenge: {
        question: 'Biaya produksi budidaya melon 1 greenhouse adalah Rp 4.200.000. Jika total panen 500 kg dijual dengan harga rata-rata Rp 15.000/kg, hitung keuntungan bersih dan nilai R/C ratio-nya!',
        subQuestions: [
          'Total Penerimaan = 500 kg × Rp 15.000 = Rp 7.500.000',
          'Keuntungan bersih = Rp 3.300.000 dan R/C ratio = 1,79'
        ],
        unit: 'R/C & Rp',
        solutionExplanation: [
          '1. Total Penerimaan (Revenue) = 500 kg × Rp 15.000 = Rp 7.500.000',
          '2. Keuntungan (Profit) = Rp 7.500.000 - Rp 4.200.000 = Rp 3.300.000',
          '3. R/C ratio = 7.500.000 / 4.200.000 = 1,79 (> 1, usaha layak dan menguntungkan)'
        ]
      }
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Kisaran pH tanah optimal untuk budidaya tanaman melon (Cucumis melo) agar penyerapan hara berjalan baik adalah...',
      options: [
        { key: 'A', text: '4,0 - 4,8' },
        { key: 'B', text: '6,0 - 6,8' },
        { key: 'C', text: '7,8 - 8,5' },
        { key: 'D', text: '3,5 - 4,2' }
      ],
      correctAnswer: 'B',
      points: 4,
      explanation: 'Melon tumbuh optimal pada pH netral agak asam yaitu 6,0 - 6,8 untuk mencegah defisiensi unsur hara dan menekan layu Fusarium.'
    },
    {
      id: 2,
      question: 'Untuk memutus siklus hama dan penyakit tular tanah, lahan budidaya melon sebaiknya tidak ditanami tanaman sefamili sebelumnya yaitu...',
      options: [
        { key: 'A', text: 'Padi dan jagung' },
        { key: 'B', text: 'Kacang tanah dan kedelai' },
        { key: 'C', text: 'Semangka, mentimun, atau labu (Cucurbitaceae)' },
        { key: 'D', text: 'Bayam dan kangkung' }
      ],
      correctAnswer: 'C',
      points: 4,
      explanation: 'Melon termasuk famili Cucurbitaceae sehingga rawan tertular patogen yang sama bila ditanam di bekas lahan semangka atau mentimun.'
    },
    {
      id: 3,
      question: 'Umur bibit melon di persemaian potray yang paling ideal untuk dipindah tanam ke bedengan mulsa adalah...',
      options: [
        { key: 'A', text: '3 - 4 HSS sebelum berkecambah penuh' },
        { key: 'B', text: '10 - 12 HSS (memiliki 2 - 3 daun sejati)' },
        { key: 'C', text: '28 - 30 HSS setelah berbunga' },
        { key: 'D', text: '40 HSS' }
      ],
      correctAnswer: 'B',
      points: 4,
      explanation: 'Bibit melon umur 10-12 HSS (2-3 daun sejati) berakar kuat namun belum melingkar di potray sehingga cepat beradaptasi setelah tanam.'
    },
    {
      id: 4,
      question: 'Pada budidaya melon lanjaran vertikal, cabang samping yang dipelihara untuk pembuahan umumnya berada pada ruas ke...',
      options: [
        { key: 'A', text: '1 - 3' },
        { key: 'B', text: '4 - 6' },
        { key: 'C', text: '9 - 12' },
        { key: 'D', text: '25 - 28' }
      ],
      correctAnswer: 'C',
      points: 4,
      explanation: 'Tunas pada ruas 1-8 dibuang agar tanaman kokoh; cabang produktif pada ruas 9-12 menghasilkan ukuran buah dan kualitas net optimal.'
    },
    {
      id: 5,
      question: 'Waktu terbaik melakukan penyerbukan (polinasi) buatan pada bunga melon di pagi hari adalah...',
      options: [
        { key: 'A', text: '06.00 - 09.00 WIB' },
        { key: 'B', text: '12.00 - 14.00 WIB' },
        { key: 'C', text: '16.00 - 18.00 WIB' },
        { key: 'D', text: '19.00 - 21.00 WIB' }
      ],
      correctAnswer: 'A',
      points: 4,
      explanation: 'Pukul 06.00-09.00 WIB bunga mekar sempurna dan kepala putik dalam kondisi paling reseptif menerima serbuk sari.'
    },
    {
      id: 6,
      question: 'Tujuan utama penggantungan buah melon menggunakan tali rafia ke palang ajir atas adalah...',
      options: [
        { key: 'A', text: 'Agar buah lebih cepat layu sebelum panen' },
        { key: 'B', text: 'Menopang beban buah agar cabang tidak patah dan net terbentuk merata' },
        { key: 'C', text: 'Mencegah daun menyerap sinar matahari' },
        { key: 'D', text: 'Mengurangi ukuran buah agar kecil' }
      ],
      correctAnswer: 'B',
      points: 4,
      explanation: 'Buah melon berukuran 1,2-2,0 kg akan mematahkan batang/cabang jika tidak digantung, sekaligus menjaga kulit buah tidak menyentuh tanah.'
    },
    {
      id: 7,
      question: 'Tindakan pemotongan pucuk batang utama (topping) pada budidaya melon umumnya dilakukan pada ruas daun ke...',
      options: [
        { key: 'A', text: '5 - 7' },
        { key: 'B', text: '10 - 12' },
        { key: 'C', text: '25 - 28' },
        { key: 'D', text: '45 - 50' }
      ],
      correctAnswer: 'C',
      points: 4,
      explanation: 'Topping pada daun ke-25-28 menghentikan pertumbuhan vegetatif memanjang sehingga asimilat terfokus untuk pengisian daging dan net buah.'
    },
    {
      id: 8,
      question: 'Penyakit daun melon yang berciri lapisan tepung berwarna putih di permukaan daun terutama saat kelembapan tidak stabil adalah...',
      options: [
        { key: 'A', text: 'Embun tepung (Powdery mildew)' },
        { key: 'B', text: 'Akar gada' },
        { key: 'C', text: 'Busuk ujung buah (BER)' },
        { key: 'D', text: 'Karat daun kopi' }
      ],
      correctAnswer: 'A',
      points: 4,
      explanation: 'Powdery mildew disebabkan jamur Podosphaera xanthii dengan ciri bercak putih seperti tepung pada daun.'
    },
    {
      id: 9,
      question: 'Tujuan pengurangan penyiraman secara bertahap pada 7-10 hari menjelang panen melon adalah...',
      options: [
        { key: 'A', text: 'Membuat tanaman layu permanen' },
        { key: 'B', text: 'Meningkatkan kadar kemanisan (Brix) dan mencegah buah pecah' },
        { key: 'C', text: 'Menghilangkan net di kulit melon' },
        { key: 'D', text: 'Memperbanyak tunas air baru' }
      ],
      correctAnswer: 'B',
      points: 4,
      explanation: 'Pengurangan air menjelang panen mengonsentrasikan gula pada daging buah sehingga Brix meningkat dan kulit tidak pecah (cracking).'
    },
    {
      id: 10,
      question: 'Mengapa buah melon Grade A dipanen dengan menyisakan tangkai berbentuk huruf T sepanjang 3-5 cm dan tidak dicuci dengan air?',
      options: [
        { key: 'A', text: 'Memperpanjang daya simpan dan mencegah jamur terperangkap di sela net' },
        { key: 'B', text: 'Menambah berat timbangan hingga 50%' },
        { key: 'C', text: 'Agar buah mudah busuk di keranjang' },
        { key: 'D', text: 'Supaya warna kulit berubah menjadi hitam' }
      ],
      correctAnswer: 'A',
      points: 4,
      explanation: 'Tangkai huruf T menjaga kesegaran visual serta mengurangi penguapan, sedangkan pembersihan kering mencegah jamur tumbuh di sela net kulit.'
    }
  ],
  essayQuestions: [
    {
      id: 11,
      question: 'Jelaskan tahapan pemangkasan (pewiwilan) tunas samping dan topping pucuk pada budidaya melon sistem lanjaran vertikal!',
      maxScore: 12,
      sampleAnswer: '1) Tunas samping pada ruas daun ke 1-8 dibuang bersih agar batang utama kokoh. 2) Cabang lateral pada ruas ke 9-12 dipelihara untuk pembentukan bunga betina & polinasi (disisakan 1-2 daun setelah bakal buah). 3) Setelah buah terpilih 1 per tanaman, tunas samping di ruas atasnya dibuang dan pucuk utama di-topping pada daun ke 25-28.'
    },
    {
      id: 12,
      question: 'Bagaimana teknik seleksi buah dan cara menggantung buah melon yang benar agar cabang tidak patah?',
      maxScore: 12,
      sampleAnswer: 'Seleksi dilakukan saat bakal buah sebesar telur ayam dengan memilih 1 buah paling simetris bebas cacat di cabang ruas 9-12. Tangkai cabang berbentuk huruf T diikat menggunakan tali rafia ke palang ajir atas (bukan mengikat langsung leher buah yang masih membesar).'
    },
    {
      id: 13,
      question: 'Jelaskan strategi pengendalian embun tepung (powdery mildew) dan lalat buah pada tanaman melon sesuai prinsip PHT!',
      maxScore: 12,
      sampleAnswer: 'Sanitasi lahan dari gulma Cucurbitaceae, menjaga jarak tanam & sirkulasi udara dengan memangkas daun tua bawah, memasang perangkap metil eugenol/yellow trap untuk lalat buah dan vektor virus, serta aplikasi fungisida selektif berbahan aktif sulfur/azoksistrobin bila gejala melampaui ambang kendali.'
    },
    {
      id: 14,
      question: 'Sebutkan indikator kematangan melon net siap panen dan cara uji mutu Brix menggunakan refraktometer!',
      maxScore: 12,
      sampleAnswer: 'Umur 65-75 HST (35-42 hari pascapolinasi), jaringan net kulit tebal dan merata hingga pangkal, daun bendera mengering, cincin tangkai mulai retak halus (half-slip), dan aroma harum. Uji Brix: teteskan perasan daging buah bagian tengah ke prisma refraktometer dan pastikan pembacaan minimal 11-13% Brix.'
    },
    {
      id: 15,
      question: 'Suatu kelompok siswa memanen 300 buah melon dengan bobot rata-rata 1,5 kg/buah dan harga jual Rp 16.000/kg. Biaya produksi total Rp 3.800.000. Hitung total hasil panen, penerimaan kotor, keuntungan bersih, dan R/C ratio!',
      maxScore: 12,
      sampleAnswer: 'Total hasil panen = 300 × 1,5 kg = 450 kg. Penerimaan kotor = 450 × Rp 16.000 = Rp 7.200.000. Keuntungan bersih = Rp 7.200.000 - Rp 3.800.000 = Rp 3.400.000. R/C ratio = 7.200.000 / 3.800.000 = 1,89 (> 1, usaha layak).'
    }
  ],
  skillsRubric: [
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Mengenakan APD dan memastikan lahan bebas bekas tanaman Cucurbitaceae' },
    { jobId: 1, jobName: 'Job 1 Sanitasi', aspect: 'Membersihkan gulma, memperbaiki drainase, dan mengukur pH tanah (6,0 - 6,8)' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Membentuk bedengan tinggi remah dan mengaplikasikan pupuk dasar merata' },
    { jobId: 2, jobName: 'Job 2 Pengolahan', aspect: 'Memasang mulsa PHP kencang dengan lubang tanam 2 baris zig-zag' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Menyiapkan media steril 1:1:1 dan memeram benih hingga berkecambah' },
    { jobId: 3, jobName: 'Job 3 Penyemaian', aspect: 'Memelihara bibit bebas rebah kecambah hingga siap tanam (10-12 HSS)' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Merakit ajir lanjaran vertikal, palang atas, dan tali rambatan kokoh' },
    { jobId: 4, jobName: 'Job 4 Penanaman', aspect: 'Memindah tanam bibit pada sore hari tanpa merusak perakaran' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Melilitkan batang utama dan memangkas tunas cabang ruas 1-8' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Melakukan polinasi pagi hari pada cabang ruas 9-12 dan memasang label' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Menyeleksi 1 buah terbaik, menggantung buah tanpa mencekik tangkai, dan topping pucuk' },
    { jobId: 5, jobName: 'Job 5 Pemeliharaan', aspect: 'Mengatur pemupukan Kalium serta pengendalian embun tepung & lalat buah (PHT)' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Menguji kematangan net kulit, aroma, dan kadar Brix (≥ 11-13%)' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Memanen pagi hari dengan menyisakan tangkai berbentuk huruf T sepanjang 3-5 cm' },
    { jobId: 6, jobName: 'Job 6 Panen', aspect: 'Menimbang hasil dan mencatat data produksi di logbook dengan teliti' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Membersihkan buah secara kering (tanpa dicuci air) dan menyortir buah cacat' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Melakukan grading Grade A/B, memasang foam net, dan memberi label Brix' },
    { jobId: 7, jobName: 'Job 7 Pascapanen', aspect: 'Menyusun analisis kelayakan usaha R/C ratio dan BEP secara tepat' }
  ],
  dailySchedules: [
    { id: 'melon-1', time: '06:30 - 09:00 WIB', title: 'Polinasi Cabang Ruas 9-12 & Pemasangan Label', desc: 'Serbukkan bunga jantan ke bunga betina cabang lateral ruas 9-12 sebelum suhu greenhouse panas.', jobId: 5, tag: 'Polinasi Kritis', active: true },
    { id: 'melon-2', time: '09:30 - 11:00 WIB', title: 'Seleksi Buah, Gantung Tali & Cek Embun Tepung', desc: 'Pilih 1 buah simetris terbaik, gantung tangkai huruf T ke palang atas, dan periksa daun dari bercak tepung.', jobId: 5, tag: 'Gantung & PHT', active: true },
    { id: 'melon-3', time: '16:00 - 17:00 WIB', title: 'Kocor Kalium (KNO3) & Atur Kelembapan Bedengan', desc: 'Berikan fertigasi kalium untuk pembentukan net dan kurangi air 7-10 hari jelang panen untuk naikkan Brix.', jobId: 5, tag: 'Nutrisi & Brix', active: true }
  ]
};

export const COMMODITIES: Record<CommodityId, CommodityBundle> = {
  semangka: SEMANGKA_BUNDLE,
  cabai: CABAI_BUNDLE,
  tomat: TOMAT_BUNDLE,
  timun: TIMUN_BUNDLE,
  melon: MELON_BUNDLE
};

export const COMMODITY_LIST: CommodityBundle[] = [
  SEMANGKA_BUNDLE,
  CABAI_BUNDLE,
  TOMAT_BUNDLE,
  TIMUN_BUNDLE,
  MELON_BUNDLE
];
