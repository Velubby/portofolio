export interface CourseCategory {
  title: string;
  courses: string[];
}

export const courseCategories: CourseCategory[] = [
  {
    title: 'Software Engineering & Programming',
    courses: [
      'Pemrograman Mobile (Flutter & Dart)',
      'Pemrograman Web 1 & 2 (Frontend & PHP)',
      'Pemrograman Python',
      'Pemrograman Basis Data (SQL)',
      'Pemrograman Visual',
      'Pemrograman Berorientasi Objek (OOP)',
      'Struktur Data',
      'Rekayasa Perangkat Lunak',
    ],
  },
  {
    title: 'Computer Systems & Distributed Infrastructure',
    courses: [
      'Sistem Terdistribusi',
      'Jaringan Komputer',
      'Sistem Operasi',
      'Organisasi dan Arsitektur Komputer',
      'Keamanan Informasi',
      'Teknik Digital & Elektronika',
      'Pengantar Internet of Things (IoT)',
    ],
  },
  {
    title: 'Algorithms, Data & Machine Intelligence',
    courses: [
      'Kecerdasan Mesin dan Buatan (AI)',
      'Data Mining',
      'Sistem Rekomendasi',
      'Sistem Kendali (Control Systems)',
      'Matematika Diskrit',
      'Aljabar Linier',
      'Kalkulus 2',
      'Statistik & Metode Numerik',
      'Teori Bahasa dan Otomata',
    ],
  },
  {
    title: 'Business, Methods & Professional Skills',
    courses: [
      'Sistem dan Teknologi Informasi',
      'Kewirausahaan 1 & 2',
      'Inovasi dan Kreatifitas',
      'Manajemen',
      'Metodologi Penelitian',
      'Bahasa Inggris II & 3',
      'Bahasa Indonesia',
      'Pendidikan Agama Islam',
      'Kewarganegaraan & Pancasila',
    ],
  },
];
