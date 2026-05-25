/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, GraduationStatus } from "../types";

export interface SchoolConfig {
  name: string;
  npsn: string;
  address: string;
  subdistrict: string; // Kecamatan
  district: string; // Kabupaten/Kota
  province: string;
  postalCode: string;
  principalName: string;
  principalNip: string;
  releaseDate: string; // Tanggal Pengumuman (25 Mei 2026)
  academicYear: string;
  phone: string;
  email: string;
  website: string;
}

export const schoolConfig: SchoolConfig = {
  name: "SDN Karang Anyar 08 Pagi",
  npsn: "20100532",
  address: "Jl. B III Karang Anyar Rt.004/005",
  subdistrict: "Sawah Besar",
  district: "Jakarta Pusat",
  province: "DKI Jakarta",
  postalCode: "10740",
  principalName: "Ana Suprijatin",
  principalNip: "197108122006042029",
  releaseDate: "25 Mei 2026",
  academicYear: "2025/2026",
  phone: "021-62309573",
  email: "sdnkaranganyar08@yahoo.co.id",
  website: "www.sdnkaranganyar08pg.blogspot.com"
};

export const studentsData: Student[] = [
  {
    nisn: "3130278258",
    examNumber: "5-26-01-04-0192-1744",
    name: "Abidzar Rizki Hermawan",
    birthPlace: "Jakarta",
    birthDate: "2013-05-12",
    parentName: "Dedy Hermawan",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 86,
      ppkn: 84,
      indonesia: 88,
      matematika: 82,
      ipa: 85,
      ips: 83,
      sbdp: 85,
      pjok: 88,
      inggris: 80
    },
    principalMessage: "Selamat Abidzar! Terus pertahankan semangat belajarmu di jenjang pendidikan menengah."
  },
  {
    nisn: "3130606237",
    examNumber: "5-26-01-04-0192-1746",
    name: "Ainul Hayati",
    birthPlace: "Jakarta",
    birthDate: "2014-02-14",
    parentName: "Syarif Syaifullah",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 91,
      ppkn: 89,
      indonesia: 92,
      matematika: 86,
      ipa: 88,
      ips: 90,
      sbdp: 92,
      pjok: 85,
      inggris: 90
    },
    principalMessage: "Nilai ujianmu sungguh membanggakan, Ainul! Pertahankan prestasi kependidikanmu di jenjang SMP!"
  },
  {
    nisn: "0139223954",
    examNumber: "5-26-01-04-0192-1747",
    name: "Arya Rizki Pratama",
    birthPlace: "Jakarta",
    birthDate: "2013-08-15",
    parentName: "Pratama Slamet",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 84,
      ppkn: 83,
      indonesia: 85,
      matematika: 78,
      ipa: 82,
      ips: 80,
      sbdp: 82,
      pjok: 89,
      inggris: 79
    },
    principalMessage: "Selamat Arya! Ketekunan dan kegigihanmu pantang menyerah akhirnya membuahkan hasil yang manis hari ini."
  },
  {
    nisn: "3139376379",
    examNumber: "5-26-01-04-0192-1748",
    name: "Azka Putra Djazuli",
    birthPlace: "Jakarta",
    birthDate: "2013-09-19",
    parentName: "Imron Djazuli",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 88,
      ppkn: 86,
      indonesia: 89,
      matematika: 80,
      ipa: 83,
      ips: 85,
      sbdp: 84,
      pjok: 88,
      inggris: 81
    },
    principalMessage: "Selamat Azka! Teruslah meraih cita-citamu setinggi langit di sekolah menengah nanti!"
  },
  {
    nisn: "0138930995",
    examNumber: "5-26-01-04-0192-1749",
    name: "Bastian Okta Narvaez",
    birthPlace: "Jakarta",
    birthDate: "2013-10-05",
    parentName: "Fajar Narvaez",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 89,
      ppkn: 85,
      indonesia: 90,
      matematika: 84,
      ipa: 86,
      ips: 88,
      sbdp: 85,
      pjok: 86,
      inggris: 85
    },
    principalMessage: "Selamat Bastian! Keberhasilanmu hari ini adalah bekal berharga untuk petualangan barumu di jenjang SMP."
  },
  {
    nisn: "0126388969",
    examNumber: "5-26-01-04-0192-1713",
    name: "Daffa Maulana",
    birthPlace: "Jakarta",
    birthDate: "2013-04-25",
    parentName: "Zulkarnaen Maulana",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 83,
      ppkn: 81,
      indonesia: 84,
      matematika: 75,
      ipa: 80,
      ips: 78,
      sbdp: 82,
      pjok: 89,
      inggris: 76
    },
    principalMessage: "Selamat Daffa! Energi positif dan semangat belajarmu adalah aset terbaikmu untuk masa depan."
  },
  {
    nisn: "0139421548",
    examNumber: "5-26-01-04-0192-1750",
    name: "Fahreza Jamica Ramadhan",
    birthPlace: "Jakarta",
    birthDate: "2013-07-07",
    parentName: "Dedy Ramadhan",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 87,
      ppkn: 85,
      indonesia: 88,
      matematika: 82,
      ipa: 84,
      ips: 86,
      sbdp: 85,
      pjok: 90,
      inggris: 81
    },
    principalMessage: "Nilai penunjang akhir yang sangat bagus, Fahreza! Sukses selalu dan gapai mimpimu dunia akhirat."
  },
  {
    nisn: "0139737721",
    examNumber: "5-26-01-04-0192-1751",
    name: "Fikri Alaika Ramadhan",
    birthPlace: "Jakarta",
    birthDate: "2013-08-28",
    parentName: "Hariyanto",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 85,
      ppkn: 84,
      indonesia: 86,
      matematika: 76,
      ipa: 81,
      ips: 80,
      sbdp: 83,
      pjok: 88,
      inggris: 78
    },
    principalMessage: "Selamat Fikri! Sukses selalu menyertaimu di SMP, jadilah anak sholeh yang senantiasa membanggakan orang tua."
  },
  {
    nisn: "0138781860",
    examNumber: "5-26-01-04-0192-1802",
    name: "Jasmeen Alkhyam",
    birthPlace: "Jakarta",
    birthDate: "2013-03-14",
    parentName: "Rudi Alkhyam",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 94,
      ppkn: 92,
      indonesia: 95,
      matematika: 90,
      ipa: 93,
      ips: 91,
      sbdp: 90,
      pjok: 86,
      inggris: 92
    },
    principalMessage: "Jasmeen, prestasimu luar biasa mengagumkan! Pertahankan status kepemimpinan akademikmu di SMP."
  },
  {
    nisn: "0136007813",
    examNumber: "5-26-01-04-0192-1752",
    name: "Jihan Raena Rahman",
    birthPlace: "Jakarta",
    birthDate: "2014-01-18",
    parentName: "Abdul Rahman",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 89,
      ppkn: 87,
      indonesia: 90,
      matematika: 82,
      ipa: 85,
      ips: 86,
      sbdp: 88,
      pjok: 84,
      inggris: 85
    },
    principalMessage: "Selamat Jihan! Tutur katamu yang ramah dan kedisiplinan belajarmu memberikan hasil kependidikan gemilang."
  },
  {
    nisn: "3132788215",
    examNumber: "5-26-01-04-0192-1753",
    name: "Jihan Talita Saki",
    birthPlace: "Jakarta",
    birthDate: "2014-05-25",
    parentName: "Wali Saki",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 91,
      ppkn: 88,
      indonesia: 92,
      matematika: 85,
      ipa: 87,
      ips: 89,
      sbdp: 90,
      pjok: 86,
      inggris: 88
    },
    principalMessage: "Selamat Jihan Talita! Kreativitas seni dan kecerdasanmu adalah inspirasi indah untuk teman-teman sekelas."
  },
  {
    nisn: "0128818873",
    examNumber: "5-26-01-04-0192-1723",
    name: "Muhamad Abdul Al Azar",
    birthPlace: "Jakarta",
    birthDate: "2013-02-12",
    parentName: "Bambang Al Azar",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 84,
      ppkn: 82,
      indonesia: 85,
      matematika: 78,
      ipa: 81,
      ips: 80,
      sbdp: 82,
      pjok: 88,
      inggris: 79
    },
    principalMessage: "Selamat Muhamad! Kejujuran dan kemandirianmu selama menempuh ujian patut diacungi jempol."
  },
  {
    nisn: "3120707066",
    examNumber: "5-26-01-04-0192-1754",
    name: "Muhamad Rifqi",
    birthPlace: "Jakarta",
    birthDate: "2013-06-03",
    parentName: "Hendra Rifqi",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 85,
      ppkn: 83,
      indonesia: 86,
      matematika: 80,
      ipa: 82,
      ips: 81,
      sbdp: 84,
      pjok: 86,
      inggris: 81
    },
    principalMessage: "Selamat Muhamad Rifqi! Raihlah kesuksesan gemilang di jenjang pendidikan selanjutnya dengan gembira."
  },
  {
    nisn: "0111040991",
    examNumber: "5-26-01-04-0192-1686",
    name: "Muhammad Nur Alamsyah",
    birthPlace: "Jakarta",
    birthDate: "2012-11-20",
    parentName: "Mulyono Alamsyah",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 82,
      ppkn: 80,
      indonesia: 83,
      matematika: 76,
      ipa: 79,
      ips: 81,
      sbdp: 80,
      pjok: 87,
      inggris: 75
    },
    principalMessage: "Selamat Muhammad Nur! Usaha luar biasamu akhirnya mengantarkan kelulusan berkah hari ini."
  },
  {
    nisn: "3134958069",
    examNumber: "5-26-01-04-0192-1756",
    name: "Muhammad Rafiq Cahya Sutoyo",
    birthPlace: "Jakarta",
    birthDate: "2013-09-08",
    parentName: "Sutoyo Suwarno",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 88,
      ppkn: 86,
      indonesia: 89,
      matematika: 82,
      ipa: 85,
      ips: 86,
      sbdp: 88,
      pjok: 87,
      inggris: 84
    },
    principalMessage: "Selamat Muhammad Rafiq! Semoga disiplin belajarmu yang kokoh membawamu menuju mimpimu."
  },
  {
    nisn: "0131021448",
    examNumber: "5-26-01-04-0192-1758",
    name: "Naysila Aisyah Hummairoh",
    birthPlace: "Jakarta",
    birthDate: "2013-12-14",
    parentName: "Agus Hummairoh",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 90,
      ppkn: 88,
      indonesia: 91,
      matematika: 85,
      ipa: 86,
      ips: 89,
      sbdp: 91,
      pjok: 83,
      inggris: 88
    },
    principalMessage: "Selamat Naysila! Keanggunan sikap serta kecerdasan bahasamu membuat kami semua bangga."
  },
  {
    nisn: "0136153281",
    examNumber: "5-26-01-04-0192-1759",
    name: "Putri Khansa Humairah",
    birthPlace: "Jakarta",
    birthDate: "2014-01-30",
    parentName: "Rudi Humairah",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 92,
      ppkn: 89,
      indonesia: 93,
      matematika: 86,
      ipa: 89,
      ips: 90,
      sbdp: 91,
      pjok: 85,
      inggris: 91
    },
    principalMessage: "Putri Khansa, selamat atas raihan nilaimu yang amat cemerlang! Sukses menggapai asa di SMP!"
  },
  {
    nisn: "3131970883",
    examNumber: "5-26-01-04-0192-1761",
    name: "Raihan Syabani",
    birthPlace: "Jakarta",
    birthDate: "2013-08-22",
    parentName: "Hadi Syabani",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 84,
      ppkn: 83,
      indonesia: 85,
      matematika: 78,
      ipa: 80,
      ips: 82,
      sbdp: 81,
      pjok: 89,
      inggris: 79
    },
    principalMessage: "Selamat Raihan! Pertahankan kerja samamu yang baik dan ketundukan tata krama di jenjang baru."
  },
  {
    nisn: "3138069990",
    examNumber: "5-26-01-04-0192-1762",
    name: "Raka Pria Admaja",
    birthPlace: "Jakarta",
    birthDate: "2013-10-10",
    parentName: "Indra Admaja",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 87,
      ppkn: 84,
      indonesia: 88,
      matematika: 82,
      ipa: 85,
      ips: 83,
      sbdp: 84,
      pjok: 86,
      inggris: 81
    },
    principalMessage: "Raka, keheningan fokusmu saat mengerjakan tugas adalah tauladan hebat. Selamat melangkah ke SMP!"
  },
  {
    nisn: "3139942463",
    examNumber: "5-26-01-04-0192-1764",
    name: "Shakira Ishmah Salsabill",
    birthPlace: "Jakarta",
    birthDate: "2013-11-05",
    parentName: "Sugeng Salsabill",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 93,
      ppkn: 91,
      indonesia: 94,
      matematika: 90,
      ipa: 92,
      ips: 93,
      sbdp: 92,
      pjok: 85,
      inggris: 94
    },
    principalMessage: "Selamat Shakira! Kamu adalah mutiara berharga dengan bakat kepemimpinan yang santun dan mulia."
  },
  {
    nisn: "0139901332",
    examNumber: "5-26-01-04-0192-1765",
    name: "Sifa Albiah Tridiansyah",
    birthPlace: "Jakarta",
    birthDate: "2013-12-28",
    parentName: "Didik Tridiansyah",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 88,
      ppkn: 86,
      indonesia: 89,
      matematika: 82,
      ipa: 84,
      ips: 85,
      sbdp: 88,
      pjok: 82,
      inggris: 85
    },
    principalMessage: "Selamat Sifa! Keriangan dan senyuman tulusmu membawa kehangatan kependidikan di kelas kita."
  },
  {
    nisn: "3130031502",
    examNumber: "5-26-01-04-0192-1766",
    name: "Siti Alya Assari",
    birthPlace: "Jakarta",
    birthDate: "2013-04-12",
    parentName: "Agus Assari",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 90,
      ppkn: 88,
      indonesia: 91,
      matematika: 85,
      ipa: 86,
      ips: 89,
      sbdp: 90,
      pjok: 84,
      inggris: 88
    },
    principalMessage: "Selamat Siti Alya! Nilai kelulusan yang luar biasa prima, wujudkan selalu cita-citamu!"
  },
  {
    nisn: "0138700473",
    examNumber: "5-26-01-04-0192-1767",
    name: "Siti Natijatul Awaliyah",
    birthPlace: "Jakarta",
    birthDate: "2013-03-27",
    parentName: "Yandri Awaliyah",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 89,
      ppkn: 87,
      indonesia: 90,
      matematika: 82,
      ipa: 85,
      ips: 86,
      sbdp: 88,
      pjok: 83,
      inggris: 85
    },
    principalMessage: "Siti Natijatul, selamat! Tutur bahasamu yang santun nan puitis mencerminkan generasi cerdas beradab."
  },
  {
    nisn: "0138732527",
    examNumber: "5-26-01-04-0192-1768",
    name: "Suci Ririn Riswandini",
    birthPlace: "Jakarta",
    birthDate: "2013-01-15",
    parentName: "M. Riswandini",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 88,
      ppkn: 85,
      indonesia: 89,
      matematika: 80,
      ipa: 83,
      ips: 84,
      sbdp: 85,
      pjok: 88,
      inggris: 83
    },
    principalMessage: "Selamat Suci Ririn! Teruskan kedisiplinan dan rasa tanggung jawab belajarmu di jenjang SMP."
  },
  {
    nisn: "0132796771",
    examNumber: "5-26-01-04-0192-1769",
    name: "Suci Syahqilla Aleanoor Putri",
    birthPlace: "Jakarta",
    birthDate: "2013-06-21",
    parentName: "Robby Aleanoor",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 91,
      ppkn: 88,
      indonesia: 92,
      matematika: 84,
      ipa: 87,
      ips: 89,
      sbdp: 90,
      pjok: 85,
      inggris: 89
    },
    principalMessage: "Selamat Suci Syahqilla! Kebanggaan luar biasa menyertai kelulusanmu yang gemerlap hari ini."
  },
  {
    nisn: "3137368723",
    examNumber: "5-26-01-04-0192-1770",
    name: "Vania Adelia Maharani",
    birthPlace: "Jakarta",
    birthDate: "2013-09-24",
    parentName: "Sutrisno Maharani",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 91,
      ppkn: 89,
      indonesia: 92,
      matematika: 86,
      ipa: 88,
      ips: 90,
      sbdp: 91,
      pjok: 85,
      inggris: 91
    },
    principalMessage: "Selamat Vania! Bakat menggambar kreasimu dan budi pekertimu mencerminkan profil pelajar Pancasila."
  },
  {
    nisn: "0138614999",
    examNumber: "5-26-01-04-0192-1771",
    name: "Vira Zahira Putri",
    birthPlace: "Jakarta",
    birthDate: "2013-07-16",
    parentName: "Zulkifli Putri",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 89,
      ppkn: 87,
      indonesia: 90,
      matematika: 82,
      ipa: 85,
      ips: 86,
      sbdp: 88,
      pjok: 84,
      inggris: 86
    },
    principalMessage: "Selamat Vira! Semoga kelulusan cemerlang ini mendorong kesuksesan yang lebih besar di SMP."
  },
  {
    nisn: "3139491038",
    examNumber: "5-26-01-04-0192-1772",
    name: "Zaskia Susilawati",
    birthPlace: "Jakarta",
    birthDate: "2013-11-11",
    parentName: "Budi Susilawati",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 87,
      ppkn: 85,
      indonesia: 88,
      matematika: 80,
      ipa: 83,
      ips: 82,
      sbdp: 85,
      pjok: 88,
      inggris: 81
    },
    principalMessage: "Zaskia, semangat bersahabat dan kepatuhanmu sangat menyenangkan guru. Terus sukses di SMP!"
  },
  {
    nisn: "3132008006",
    examNumber: "5-26-01-04-0192-1773",
    name: "Zifana Raisa Zafira",
    birthPlace: "Jakarta",
    birthDate: "2014-04-09",
    parentName: "Toni Zafira",
    status: GraduationStatus.LULUS,
    grades: {
      agama: 92,
      ppkn: 90,
      indonesia: 93,
      matematika: 86,
      ipa: 88,
      ips: 91,
      sbdp: 91,
      pjok: 84,
      inggris: 92
    },
    principalMessage: "Selamat Zifana! Kemampuan pemahaman bahasamu luar biasa tinggi. Tetaplah rendah hati dan juara!"
  }
];
