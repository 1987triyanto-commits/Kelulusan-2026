/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, GraduationStatus } from "../types";

const headerMap: Record<string, string[]> = {
  nisn: ["nisn", "nis"],
  examNumber: ["noujian", "nomorujian", "nopeserta", "nomorpeserta", "noPesertaujian", "nomorpesertaujian", "no_peserta", "nomor_peserta", "no_ujian", "no.peserta"],
  name: ["nama", "namasiswa", "namalengkap", "studentname", "nama_siswa"],
  birthPlace: ["tempatlahir", "tempat", "tempat_lahir"],
  birthDate: ["tanggallahir", "tgllahir", "tanggal", "tanggal_lahir", "tgl_lahir"],
  parentName: ["namaorangtua", "orangtua", "wali", "namaayah", "namaibu", "ayah", "ibu", "orang_tua", "ortu"],
  status: ["status", "keterangan", "statuskelulusan", "kelulusan", "status_kelulusan"],
  agama: ["agama", "pabp", "pendidikanagama", "pab", "religius", "nilai_agama"],
  ppkn: ["ppkn", "pkn", "pendidikanpancasila", "pancasila", "nilai_pkn", "nilai_ppkn"],
  indonesia: ["indonesia", "bindonesia", "bahasaindonesia", "indo", "bind", "nilai_indonesia"],
  matematika: ["matematika", "mtk", "mat", "math", "nilai_matematika", "nilai_mtk"],
  ipa: ["ipa", "ilpupengetahuanalam", "sains", "nilai_ipa"],
  ips: ["ips", "ilpupengetahuansosial", "sosial", "nilai_ips"],
  sbdp: ["sbdp", "sbk", "senibudaya", "seni", "sbd", "nilai_sbdp"],
  pjok: ["pjok", "penjas", "penjasorkes", "olahraga", "nilai_pjok", "nilai_penjas"],
  inggris: ["inggris", "binggris", "bahasainggris", "ing", "bing", "nilai_inggris"],
  principalMessage: ["pesankepalasekolah", "pesan", "catatan", "ucapan", "pesan_kepsek"]
};

function cleanHeader(h: string): string {
  return h.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "");
}

export function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = "";

  // Normalize line endings
  const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = "";
    } else if (char === '\t' && !inQuotes) {
      // Also support Tab-separated (TSV) from Excel Copy-Paste
      row.push(currentVal.trim());
      currentVal = "";
    } else if (char === '\n' && !inQuotes) {
      row.push(currentVal.trim());
      result.push(row);
      row = [];
      currentVal = "";
    } else {
      currentVal += char;
    }
  }

  // Add remaining item and row
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    result.push(row);
  }

  // Filter out completely empty rows
  return result.filter(r => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

export function mapRawDataToStudents(rows: string[][]): Student[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => cleanHeader(h));
  const dataRows = rows.slice(1);

  // Find column indexes
  const colIndexes: Record<string, number> = {};
  
  Object.entries(headerMap).forEach(([key, aliases]) => {
    const index = headers.findIndex(h => aliases.includes(h) || h === cleanHeader(key));
    if (index !== -1) {
      colIndexes[key] = index;
    }
  });

  // Position guess defaults if names/nisn aren't found by raw headers
  if (colIndexes.name === undefined) {
    if (headers.length >= 4) {
      colIndexes.name = 3; // heuristic default
    }
  }
  if (colIndexes.nisn === undefined) {
    if (headers.length >= 3) {
      colIndexes.nisn = 2; // heuristic default
    }
  }

  const students: Student[] = [];

  dataRows.forEach((row, rowIndex) => {
    if (row.length === 0 || row.join("").trim() === "") return;

    const getVal = (key: string, defaultVal: string = ""): string => {
      const idx = colIndexes[key];
      if (idx !== undefined && idx < row.length) {
        return row[idx].trim();
      }
      return defaultVal;
    };

    const getGrade = (key: string, defaultVal: number = 80): number => {
      const val = getVal(key);
      if (!val) return defaultVal;
      const num = Number(val.replace(/,/g, ".")); // handle Indonesian decimals like 85,5
      if (isNaN(num)) return defaultVal;
      return Math.round(num);
    };

    let rawName = getVal("name");
    let rawNisn = getVal("nisn").replace(/\D/g, ""); // strip non-numeric
    
    if (rawNisn.length > 0 && rawNisn.length < 10) {
      rawNisn = rawNisn.padStart(10, '0');
    }

    if (!rawName || !rawNisn) {
      if (row.length >= 4) {
        if (!rawName) rawName = row[3] || row[2] || `Siswa Baru ${rowIndex + 1}`;
        if (!rawNisn) rawNisn = (row[2] || row[1] || "").replace(/\D/g, "").padStart(10, '0');
      } else {
        return; // skip rows that don't have enough data
      }
    }

    // Parse Birthdate
    let rawBirthDate = getVal("birthDate");
    let parsedBirthDate = "2014-01-01"; // default

    if (rawBirthDate) {
      // Clean quotes/spaces
      rawBirthDate = rawBirthDate.replace(/['"]/g, "").trim();
      
      // Look for format DD/MM/YYYY or DD-MM-YYYY
      const parts = rawBirthDate.split(/[-/]/);
      if (parts.length === 3) {
        if (parts[2].trim().length === 4) {
          const day = parts[0].trim().padStart(2, '0');
          const month = parts[1].trim().padStart(2, '0');
          const year = parts[2].trim();
          parsedBirthDate = `${year}-${month}-${day}`;
        } else if (parts[0].trim().length === 4) {
          parsedBirthDate = `${parts[0].trim()}-${parts[1].trim().padStart(2, '0')}-${parts[2].trim().padStart(2, '0')}`;
        }
      } else {
        const nativeDate = new Date(rawBirthDate);
        if (!isNaN(nativeDate.getTime())) {
          parsedBirthDate = nativeDate.toISOString().split('T')[0];
        }
      }
    }

    // Status map
    const rawStatus = getVal("status").toUpperCase();
    let finalStatus = GraduationStatus.LULUS;
    if (rawStatus.includes("TUNDA")) {
      finalStatus = GraduationStatus.TUNDA;
    } else if (rawStatus.includes("TIDAK") || rawStatus.includes("BATAL") || rawStatus.includes("GAGAL")) {
      finalStatus = GraduationStatus.TIDAK_LULUS;
    }

    // Exam number
    let rawExamNumber = getVal("examNumber");
    if (!rawExamNumber || rawExamNumber.length < 5) {
      const idxString = (rowIndex + 1744).toString();
      rawExamNumber = `5-26-01-04-0192-${idxString}`;
    }

    const student: Student = {
      nisn: rawNisn,
      examNumber: rawExamNumber,
      name: rawName,
      birthPlace: getVal("birthPlace", "Jakarta"),
      birthDate: parsedBirthDate,
      parentName: getVal("parentName", "Nama Wali"),
      status: finalStatus,
      grades: {
        agama: getGrade("agama", 85),
        ppkn: getGrade("ppkn", 84),
        indonesia: getGrade("indonesia", 86),
        matematika: getGrade("matematika", 80),
        ipa: getGrade("ipa", 82),
        ips: getGrade("ips", 81),
        sbdp: getGrade("sbdp", 84),
        pjok: getGrade("pjok", 85),
        inggris: getGrade("inggris", 80)
      },
      principalMessage: getVal("principalMessage") || "Selamat atas kelulusanmu! Teruslah berjuang dengan semangat membara di jenjang pendidikan selanjutnya."
    };

    students.push(student);
  });

  return students;
}
