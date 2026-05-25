/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum GraduationStatus {
  LULUS = "LULUS",
  TUNDA = "DITUNDA",
  TIDAK_LULUS = "TIDAK LULUS"
}

export interface SubjectGrade {
  label: string;
  score: number;
}

export interface Student {
  nisn: string; // 10-digit National Student Identification Number
  examNumber: string; // Nomor Peserta Ujian (e.g., UJ-12345/SD/2026)
  name: string;
  birthPlace: string;
  birthDate: string; // YYYY-MM-DD
  parentName: string;
  status: GraduationStatus;
  grades: {
    agama: number;
    ppkn: number;
    indonesia: number;
    matematika: number;
    ipa: number;
    ips: number;
    sbdp: number;
    pjok: number;
    inggris: number;
  };
  principalMessage?: string;
}

export interface Testimony {
  id: string;
  studentName: string;
  text: string;
  timestamp: string;
  role?: "Siswa" | "Orang Tua" | "Guru";
}
