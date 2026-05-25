/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  UserPlus, 
  User, 
  Award, 
  CheckCircle, 
  RotateCcw, 
  Sparkles, 
  Download, 
  UploadCloud, 
  RefreshCw, 
  FileSpreadsheet, 
  FileText, 
  Database, 
  AlertCircle, 
  HelpCircle,
  Eye
} from "lucide-react";
import { Student, GraduationStatus } from "../types";
import { parseCSV, mapRawDataToStudents } from "../utils/csvParser";

interface AddStudentFormProps {
  onAddStudent: (newStudent: Student) => void;
  onAddStudents: (newStudents: Student[], replace: boolean) => void;
  onResetToDefault: () => void;
}

export default function AddStudentForm({ onAddStudent, onAddStudents, onResetToDefault }: AddStudentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ====== Form States for Single Input ======
  const [nisn, setNisn] = useState("");
  const [name, setName] = useState("");
  const [examNumber, setExamNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [parentName, setParentName] = useState("");
  const [status, setStatus] = useState<GraduationStatus>(GraduationStatus.LULUS);
  const [principalMessage, setPrincipalMessage] = useState("");

  // Grade States
  const [gradeAgama, setGradeAgama] = useState("85");
  const [gradePpkn, setGradePpkn] = useState("85");
  const [gradeIndonesia, setGradeIndonesia] = useState("85");
  const [gradeMatematika, setGradeMatematika] = useState("80");
  const [gradeIpa, setGradeIpa] = useState("80");
  const [gradeIps, setGradeIps] = useState("80");
  const [gradeSbdp, setGradeSbdp] = useState("85");
  const [gradePjok, setGradePjok] = useState("85");
  const [gradeInggris, setGradeInggris] = useState("80");

  // ====== Bulk Import & Sync States ======
  const [sheetUrl, setSheetUrl] = useState("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuYkPv_FnG1Ky_suZChwNcugaYBbd75hOl5gfQsk3Bv4IUuGvXCwURIUFHH32I9y4LH0e4SFuAgvMV/pubhtml?gid=0&single=true");
  const [isSyncing, setIsSyncing] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [parsedStudents, setParsedStudents] = useState<Student[]>([]);
  const [bulkError, setBulkError] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState("");
  const [importMode, setImportMode] = useState<"merge" | "replace">("merge");

  const handleAutofill = () => {
    const randomNisn = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const randomNipd = Math.floor(1700 + Math.random() * 100);
    const mockNames = [
      "Budi Cahyono", "Aditya Pratama", "Siti Aminah", "Ahmad Fauzi", "Dewi Lestari",
      "Rizky Ramadhan", "Dian Sastro", "Mega Utami", "Guntur Wibowo", "Putri Lestari"
    ];
    const mockParents = [
      "Slamet Cahyono", "Hendro Pratama", "Haji Amin", "Gatot Fauzi", "Bambang Lestari",
      "Kurniawan Ramadhan", "Surya Sastro", "Joko Utami", "Subagyo Wibowo", "Anton Lestari"
    ];
    const randomIndex = Math.floor(Math.random() * mockNames.length);

    setNisn(randomNisn);
    setName(mockNames[randomIndex]);
    setExamNumber(`5-26-01-04-0192-${randomNipd}`);
    setBirthPlace("Jakarta");
    setBirthDate("2013-08-18");
    setParentName(mockParents[randomIndex]);
    setStatus(GraduationStatus.LULUS);
    
    // Randomize some nice grades
    setGradeAgama(Math.floor(80 + Math.random() * 18).toString());
    setGradePpkn(Math.floor(80 + Math.random() * 18).toString());
    setGradeIndonesia(Math.floor(80 + Math.random() * 18).toString());
    setGradeMatematika(Math.floor(75 + Math.random() * 23).toString());
    setGradeIpa(Math.floor(75 + Math.random() * 23).toString());
    setGradeIps(Math.floor(78 + Math.random() * 20).toString());
    setGradeSbdp(Math.floor(80 + Math.random() * 18).toString());
    setGradePjok(Math.floor(82 + Math.random() * 15).toString());
    setGradeInggris(Math.floor(75 + Math.random() * 23).toString());

    setPrincipalMessage("Selamat! Terus pertahankan prestasimu di masa depan.");
    setSuccessMsg("Formulir berhasil diisi otomatis dengan contoh data siswa!");
    setErrorMsg("");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Validate inputs
    if (!nisn.trim() || nisn.trim().length !== 10 || isNaN(Number(nisn))) {
      setErrorMsg("NISN harus berupa 10 digit angka.");
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Nama Lengkap siswa tidak boleh kosong.");
      return;
    }

    if (!examNumber.trim()) {
      setErrorMsg("Nomor Ujian tidak boleh kosong.");
      return;
    }

    if (!birthPlace.trim()) {
      setErrorMsg("Tempat Lahir tidak boleh kosong.");
      return;
    }

    if (!birthDate) {
      setErrorMsg("Tanggal Lahir harus dipilih.");
      return;
    }

    if (!parentName.trim()) {
      setErrorMsg("Nama Orang Tua/Wali tidak boleh kosong.");
      return;
    }

    // Helper to parse grades
    const parseGrade = (val: string, label: string) => {
      const num = Number(val);
      if (isNaN(num) || num < 0 || num > 100) {
        throw new Error(`Nilai ${label} harus berupa angka antara 0 - 100.`);
      }
      return num;
    };

    try {
      const gradesObj = {
        agama: parseGrade(gradeAgama, "Agama"),
        ppkn: parseGrade(gradePpkn, "PPKn"),
        indonesia: parseGrade(gradeIndonesia, "B. Indonesia"),
        matematika: parseGrade(gradeMatematika, "Matematika"),
        ipa: parseGrade(gradeIpa, "IPA"),
        ips: parseGrade(gradeIps, "IPS"),
        sbdp: parseGrade(gradeSbdp, "SBdP"),
        pjok: parseGrade(gradePjok, "PJOK"),
        inggris: parseGrade(gradeInggris, "B. Inggris"),
      };

      const newStudent: Student = {
        nisn: nisn.trim(),
        examNumber: examNumber.trim(),
        name: name.trim(),
        birthPlace: birthPlace.trim(),
        birthDate,
        parentName: parentName.trim(),
        status,
        grades: gradesObj,
        principalMessage: principalMessage.trim() || "Selamat atas kelulusanmu! Semoga sukses selalu di tingkat sekolah menengah!"
      };

      onAddStudent(newStudent);
      
      // Clear specific fields
      setNisn("");
      setName("");
      setExamNumber("");
      setBirthPlace("");
      setBirthDate("");
      setParentName("");
      setPrincipalMessage("");
      
      setSuccessMsg(`Siswa bernama ${newStudent.name} berhasil ditambahkan ke database sistem!`);
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal menyimpan data siswa. Silakan periksa kembali input Anda.");
    }
  };

  // ====== Core Sync & File Upload Event Handlers ======

  const handleGoogleSheetsSync = async () => {
    setBulkError("");
    setBulkSuccess("");
    setIsSyncing(true);
    setParsedStudents([]);

    try {
      let fetchUrl = sheetUrl.trim();
      if (!fetchUrl) {
        throw new Error("Silakan masukkan URL Google Sheets terlebih dahulu.");
      }

      // Convert standard /pubhtml back to raw CSV export URL
      if (fetchUrl.includes("/pubhtml")) {
        fetchUrl = fetchUrl.replace("/pubhtml", "/pub") + (fetchUrl.includes("?") ? "" : "?") + "&output=csv";
      } else if (fetchUrl.includes("docs.google.com/spreadsheets") && !fetchUrl.includes("output=csv")) {
        const docMatch = fetchUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (docMatch) {
          const docId = docMatch[1];
          let gid = "0";
          const gidMatch = fetchUrl.match(/gid=([0-9]+)/);
          if (gidMatch) gid = gidMatch[1];
          fetchUrl = `https://docs.google.com/spreadsheets/d/${docId}/export?format=csv&gid=${gid}`;
        }
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) {
        throw new Error(`Server Google Sheets merespons dengan kesalahan (${res.status} ${res.statusText}). Pastikan URL benar.`);
      }

      const csvText = await res.text();
      if (!csvText || csvText.trim() === "" || csvText.includes("<html") || csvText.includes("<!DOCTYPE")) {
        throw new Error("Teks data kosong atau Google Spreadsheet belum dipublikasikan ke web. Silakan publikasikan (File > Bagikan > Publikasikan ke Web) dan gunakan tautan publik.");
      }

      const rawRows = parseCSV(csvText);
      const parsed = mapRawDataToStudents(rawRows);

      if (parsed.length === 0) {
        throw new Error("Gagal mengenali data siswa dalam spreadsheet tersebut. Pastikan baris pertama berisi tajuk kolom (NISN, Nama, Nilai).");
      }

      setParsedStudents(parsed);
      setBulkSuccess(`Sinkronisasi berhasil! Ditemukan ${parsed.length} siswa dalam spreadsheet online ini. Periksa pratinjau di bawah dan klik "Terapkan" untuk menyimpan.`);
    } catch (err: any) {
      setBulkError(err.message || "Gagal melakukan sinkronisasi dengan Google Sheets.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkError("");
    setBulkSuccess("");
    setParsedStudents([]);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          throw new Error("Isi file kosong atau tidak dapat diakses.");
        }

        const rawRows = parseCSV(text);
        const parsed = mapRawDataToStudents(rawRows);

        if (parsed.length === 0) {
          throw new Error("Tidak dapat menguraikan data di dalam file. Silakan periksa format kolom (NISN, Nama) dan delimiter.");
        }

        setParsedStudents(parsed);
        setBulkSuccess(`Berhasil membaca ${parsed.length} data siswa dari file "${file.name}"! Periksa pratinjau di bawah dan simpan.`);
      } catch (err: any) {
        setBulkError(err.message || "Format file salah.");
      }
    };
    reader.onerror = () => {
      setBulkError("Kesalahan hardware dalam memuat file.");
    };
    reader.readAsText(file);
  };

  const handlePasteAnalyze = () => {
    setBulkError("");
    setBulkSuccess("");
    setParsedStudents([]);

    if (!pastedText.trim()) {
      setBulkError("Silakan masukkan teks tabel yang telah Anda salin terlebih dahulu.");
      return;
    }

    try {
      const rawRows = parseCSV(pastedText);
      const parsed = mapRawDataToStudents(rawRows);

      if (parsed.length === 0) {
        throw new Error("Gagal mengurai teks tempel. Pastikan Anda menyertakan baris judul kolom utama.");
      }

      setParsedStudents(parsed);
      setBulkSuccess(`Teks berhasil diurai! Ditemukan ${parsed.length} data siswa dari hasil tempelan manual Anda.`);
    } catch (err: any) {
      setBulkError(err.message || "Teks tabel tidak valid.");
    }
  };

  const handleApplyBulkImport = () => {
    if (parsedStudents.length === 0) return;

    const isReplace = importMode === "replace";
    onAddStudents(parsedStudents, isReplace);

    if (isReplace) {
      setSuccessMsg(`Database lokal berhasil DIGANTIKAN sepenuhnya dengan ${parsedStudents.length} siswa baru!`);
    } else {
      setSuccessMsg(`Berhasil menggabungkan ${parsedStudents.length} siswa baru ke dalam database lokal!`);
    }

    setParsedStudents([]);
    setPastedText("");
    setBulkSuccess("");
    setBulkError("");
    
    setTimeout(() => setSuccessMsg(""), 6000);
  };

  const handleConfirmReset = () => {
    if (confirm("Apakah Anda yakin ingin menyetel ulang database kembali ke 29 siswa awal bawaan? Semua data tambahan Anda saat ini akan dihapus.")) {
      onResetToDefault();
      setParsedStudents([]);
      setSuccessMsg("Database berhasil dikembalikan ke 29 siswa bawaan.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  return (
    <div className="w-full rounded-[32px] border-4 border-slate-100 bg-white p-6 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/20">
            <UserPlus className="h-6 w-6" />
          </div>
          <div>
            <span className="text-orange-600 font-extrabold uppercase tracking-widest text-[10px] md:text-sm">Kelola Database Siswa</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Pengolah & Import Data</h3>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            {isOpen ? "Tutup Manajer" : "Buka Panel Pengelola"}
          </button>
          
          <button
            onClick={handleConfirmReset}
            title="Sapu bersih & reset ke 29 siswa awal"
            className="rounded-2xl border-2 border-slate-200 hover:border-red-400 p-3 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer flex items-center justify-center"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-8 pt-6 border-t-2 border-slate-100 space-y-6 animate-fade-in text-slate-800">
          
          {/* Sub-Tabs Selector */}
          <div className="flex border-b border-slate-150 mb-6 font-semibold">
            <button
              type="button"
              onClick={() => { setActiveTab("single"); setBulkError(""); setBulkSuccess(""); }}
              className={`pb-3.5 px-4 text-xs font-black uppercase tracking-wider border-b-4 -mb-[2px] transition-all cursor-pointer ${
                activeTab === "single"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              ➕ Manual Form (1 Siswa)
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("bulk"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`pb-3.5 px-4 text-xs font-black uppercase tracking-wider border-b-4 -mb-[2px] transition-all cursor-pointer ${
                activeTab === "bulk"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              ⚡ Impor Massal / Google Sheets Sync
            </button>
          </div>

          {/* TAB 1: Single Manual Entry */}
          {activeTab === "single" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-50 border border-blue-200 rounded-2xl p-4 gap-3 text-xs font-bold text-blue-900 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>Gunakan pengisi otomatis jika hanya ingin menguji dengan data contoh siap pakai.</span>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-black uppercase text-[10px] shadow transition-all cursor-pointer self-stretch text-center"
                >
                  🚀 Isi Otomatis Contoh Siswa
                </button>
              </div>

              <form onSubmit={handleSingleSubmit} className="space-y-6">
                {/* Biodata */}
                <div className="bg-slate-50/50 rounded-2.5xl p-5 border-2 border-slate-100 space-y-5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <User className="h-4 w-4 text-blue-500" />
                    <span>BIODATA DAN PROFIL SISWA</span>
                  </h4>
                  
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">NISN (10 Digit)*</label>
                      <input
                        type="text"
                        maxLength={10}
                        placeholder="Contoh: 3130278250"
                        value={nisn}
                        onChange={(e) => setNisn(e.target.value.replace(/\D/g, ""))}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">Nama Lengkap Siswa*</label>
                      <input
                        type="text"
                        placeholder="Contoh: Budi Cahyono"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">Nomor Ujian*</label>
                      <input
                        type="text"
                        placeholder="Contoh: 5-26-01-04-0192-1744"
                        value={examNumber}
                        onChange={(e) => setExamNumber(e.target.value)}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">Tempat Lahir*</label>
                      <input
                        type="text"
                        placeholder="Contoh: Jakarta"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">Tanggal Lahir*</label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">Nama Orang Tua/Wali*</label>
                      <input
                        type="text"
                        placeholder="Contoh: Slamet Cahyono"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">Status Kelulusan Akhir*</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: GraduationStatus.LULUS, label: "LULUS", color: "border-emerald-300 bg-emerald-50 text-emerald-800" },
                        { value: GraduationStatus.TUNDA, label: "DITUNDA", color: "border-yellow-300 bg-yellow-50 text-yellow-800" },
                        { value: GraduationStatus.TIDAK_LULUS, label: "TIDAK LULUS", color: "border-red-304 bg-red-50 text-red-800" }
                      ].map((st) => (
                        <button
                          key={st.value}
                          type="button"
                          onClick={() => setStatus(st.value)}
                          className={`rounded-xl border-2 py-3 text-xs font-black uppercase text-center transition-all cursor-pointer ${
                            status === st.value
                              ? "bg-slate-900 border-slate-900 text-white shadow-md"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grades */}
                <div className="bg-slate-50/50 rounded-2.5xl p-5 border-2 border-slate-100 space-y-5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span>NILAI UJIAN SEKOLAH (SKALA 0-100)*</span>
                  </h4>

                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                    {[
                      { label: "Agama", value: gradeAgama, setter: setGradeAgama },
                      { label: "PPKn", value: gradePpkn, setter: setGradePpkn },
                      { label: "B. Indonesia", value: gradeIndonesia, setter: setGradeIndonesia },
                      { label: "Matematika", value: gradeMatematika, setter: setGradeMatematika },
                      { label: "IPA", value: gradeIpa, setter: setGradeIpa },
                      { label: "IPS", value: gradeIps, setter: setGradeIps },
                      { label: "SBdP", value: gradeSbdp, setter: setGradeSbdp },
                      { label: "PJOK", value: gradePjok, setter: setGradePjok },
                      { label: "B. Inggris", value: gradeInggris, setter: setGradeInggris }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5">{item.label}</label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={item.value}
                          onChange={(e) => item.setter(e.target.value.replace(/\D/g, ""))}
                          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-center text-sm font-bold focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="bg-slate-50/50 rounded-2.5xl p-5 border-2 border-slate-100 space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider px-0.5 block">Pesan Khusus Kepala Sekolah (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Tulis ucapan/pesan penyemangat Kepala Sekolah yang dicantumkan di Surat Keterangan Kelulusan (SKL)..."
                    value={principalMessage}
                    onChange={(e) => setPrincipalMessage(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-xs font-bold text-slate-800 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="rounded-2xl border bg-red-50 text-red-900 border-red-200 p-4 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                    <span>⚠️ {errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900 border-dashed animate-pulse">
                    🎉 {successMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 py-4 text-base font-black uppercase text-white shadow-xl shadow-orange-100 transition-all cursor-pointer active:scale-[0.98]"
                >
                  Simpan Siswa Baru
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Bulk Import & Live Google Sheets Sync */}
          {activeTab === "bulk" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Panel left: Google Sheets online sync */}
                <div className="rounded-2.5xl border-2 border-slate-100 bg-slate-50/50 p-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                    <h4 className="text-sm font-black text-slate-850 uppercase tracking-tight">Koneksi Google Sheets Online</h4>
                  </div>
                  
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Sinkronisasikan secara langsung dengan spreadsheet online yang dipublikasikan ke web. Masukkan alamat URL spreadsheet di bawah ini.
                  </p>

                  <div className="space-y-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">Tautan Spreadsheet Utama</label>
                      <input
                        type="url"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        placeholder="Tempel tautan Sheet publik atau pubhtml di sini..."
                        className="rounded-xl border-2 border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isSyncing}
                      onClick={handleGoogleSheetsSync}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase text-xs text-white shadow-md transition-all cursor-pointer active:translate-y-0.5 ${
                        isSyncing ? "bg-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-50/50"
                      }`}
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" /> Sedang Menghubungkan...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" /> Ambil & Sinkronkan Sekarang
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Panel right: Local CSV Uploader & Paste Area */}
                <div className="rounded-2.5xl border-2 border-slate-100 bg-slate-50/50 p-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <UploadCloud className="h-5 w-5 text-blue-600" />
                    <h4 className="text-sm font-black text-slate-850 uppercase tracking-tight">Unggah File CSV Lokal</h4>
                  </div>
                  
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Pilih file berformat .csv yang Anda simpan di perangkat lokal untuk diimpor secara langsung.
                  </p>

                  <div className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-slate-350 hover:border-blue-400 bg-white hover:bg-blue-50/10 transition-all cursor-pointer relative">
                    <input
                      type="file"
                      accept=".csv,text/csv,text/comma-separated-values"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center p-4">
                      <UploadCloud className="mx-auto h-8 w-8 text-slate-400 mb-1" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide block">Seret & taruh file, atau Klik di sini</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Area copy paste input as third convenient option */}
              <div className="rounded-2.5xl border-2 border-slate-100 bg-slate-50/50 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-500" />
                  <h4 className="text-sm font-black text-slate-850 uppercase tracking-tight">Tempel Tabel Excel/Sheets (TSV)</h4>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Cara paling aman & praktis! Blok sel-sel di Excel atau Google Sheets, <strong>salin (Ctrl+C)</strong>, dan <strong>tempel (Ctrl+V)</strong> langsung di bawah ini. Kolom akan diurai otomatis.
                </p>
                <textarea
                  rows={3}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Contoh salinan:&#10;NISN	Nama	Tempat Lahir	Tanggal Lahir	Ayah	Nilai Agama...&#10;3130278258	Abidzar Rizki Hermawan	Jakarta	2013-05-12	Dedy Hermawan	86"
                  className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-xs font-mono text-slate-700 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handlePasteAnalyze}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-black uppercase text-[10px] shadow cursor-pointer transition-all active:scale-98"
                >
                  🔍 Urai Teks Hasil Tempel
                </button>
              </div>

              {/* Local errors/success inside bulk tab */}
              {bulkError && (
                <div className="rounded-2xl border bg-red-50 text-red-900 border-red-200 p-4 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>⚠️ {bulkError}</span>
                </div>
              )}

              {bulkSuccess && (
                <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 text-emerald-950 p-4 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>🎉 {bulkSuccess}</span>
                </div>
              )}

              {successMsg && (
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-900 p-4 text-xs font-bold">
                  🌟 {successMsg}
                </div>
              )}

              {/* ====== TAB 2 SUBSECTION: Parsed Student Live Preview Table & Confirmation ====== */}
              {parsedStudents.length > 0 && (
                <div className="border-t-2 border-slate-100 pt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-yellow-50 border border-yellow-250 p-4 rounded-2xl">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <Database className="h-4 w-4 text-yellow-600" />
                        <span>SIAP DIIMPOR: {parsedStudents.length} SISWA</span>
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Silakan pilih metode penyimpanan di samping sebelum menekan tombol Terapkan.</p>
                    </div>

                    <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setImportMode("merge")}
                        className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase transition-all cursor-pointer ${
                          importMode === "merge" 
                            ? "bg-slate-900 text-white" 
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        ⚠️ Gabungkan (Update)
                      </button>
                      <button
                        type="button"
                        onClick={() => setImportMode("replace")}
                        className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase transition-all cursor-pointer ${
                          importMode === "replace" 
                            ? "bg-red-500 text-white" 
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        🔥 Bersihkan & Timpa
                      </button>
                    </div>
                  </div>

                  {/* Tiny Table Preview scrollbar */}
                  <div className="overflow-x-auto rounded-2xl border-2 border-slate-100 bg-slate-50 max-h-72">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-200 font-black text-slate-700 uppercase tracking-widest text-[9px] border-b border-slate-300">
                          <th className="p-3">No</th>
                          <th className="p-3">NISN</th>
                          <th className="p-3">Nama Lengkap</th>
                          <th className="p-3">Tempat, Tgl Lahir</th>
                          <th className="p-3">Orang Tua</th>
                          <th className="p-3">No Ujian</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-center">Rerata</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-600 bg-white">
                        {parsedStudents.map((st, i) => {
                          const gradesValues = Object.values(st.grades) as number[];
                          const avg = (gradesValues.reduce((s: number, v: number) => s + v, 0) / 9).toFixed(1);
                          return (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="p-3 text-slate-450 text-[10px]">{i+1}</td>
                              <td className="p-3 font-mono text-slate-800">{st.nisn}</td>
                              <td className="p-3 font-black text-slate-900">{st.name}</td>
                              <td className="p-3">{st.birthPlace}, {st.birthDate}</td>
                              <td className="p-3">{st.parentName}</td>
                              <td className="p-3 text-[10px] font-mono">{st.examNumber}</td>
                              <td className="p-3 text-center">
                                <span className={`inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase rounded ${
                                  st.status === GraduationStatus.LULUS 
                                    ? "bg-emerald-100 text-emerald-800" 
                                    : st.status === GraduationStatus.TUNDA 
                                      ? "bg-yellow-105 text-yellow-800" 
                                      : "bg-red-100 text-red-800"
                                }`}>
                                  {st.status}
                                </span>
                              </td>
                              <td className="p-3 text-center font-black text-blue-600">{avg}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyBulkImport}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3.5 text-sm font-black uppercase text-white shadow-lg active:scale-98 cursor-pointer"
                  >
                    🚀 Terapkan & Simpan {parsedStudents.length} Siswa Baru
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
