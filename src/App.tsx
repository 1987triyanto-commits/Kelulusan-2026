/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import StudentResult from "./components/StudentResult";
import StatsDashboard from "./components/StatsDashboard";
import MessageBoard from "./components/MessageBoard";
import AddStudentForm from "./components/AddStudentForm";
import { Student } from "./types";
import { schoolConfig, studentsData } from "./data/students";
import { BookOpen, Award, MessageCircle, HelpCircle, School, Phone, Mail, Clock, Lock, Key, LogOut, Check } from "lucide-react";

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem("sdn_students_database_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved students database", e);
      }
    }
    return studentsData;
  });

  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);
  const [userRole, setUserRole] = useState<"siswa" | "guru">("siswa");
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("sdn_teacher_auth_v2") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    localStorage.setItem("sdn_students_database_v2", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => {
      const filtered = prev.filter(s => s.nisn !== newStudent.nisn);
      return [newStudent, ...filtered];
    });
  };

  const handleAddStudents = (newStudents: Student[], replace: boolean) => {
    if (replace) {
      setStudents(newStudents);
    } else {
      setStudents((prev) => {
        const merged = [...newStudents];
        const addedNisns = new Set(newStudents.map(s => s.nisn));
        prev.forEach(student => {
          if (!addedNisns.has(student.nisn)) {
            merged.push(student);
          }
        });
        return merged;
      });
    }
  };

  const handleResetToDefault = () => {
    setStudents(studentsData);
    localStorage.removeItem("sdn_students_database_v2");
    setSearchedStudent(null);
  };

  // Switch Role Handler
  const handleSwitchRole = (role: "siswa" | "guru") => {
    setUserRole(role);
    setPinInput("");
    setPinError("");
  };

  // Verify PIN Access
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "2026" || pinInput === "1234") {
      setIsTeacherAuthenticated(true);
      localStorage.setItem("sdn_teacher_auth_v2", "true");
      setPinError("");
    } else {
      setPinError("PIN Salah. Gunakan PIN demo yang tercantum.");
    }
  };

  const handleLogoutTeacher = () => {
    setIsTeacherAuthenticated(false);
    localStorage.removeItem("sdn_teacher_auth_v2");
    setUserRole("siswa");
    setPinInput("");
    setPinError("");
  };

  // Auto scroll to results when search succeeds
  useEffect(() => {
    if (searchedStudent) {
      setTimeout(() => {
        const section = document.getElementById("result-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchedStudent]);

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-[#FFFBEB] font-sans text-slate-800 scrollbar-thin">
      
      {/* 0. Top Mode Selector Ribbon */}
      <div className="sticky top-0 z-40 bg-slate-900 border-b-4 border-orange-500 text-white shadow-xl">
        <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <School className="h-4 w-4 text-yellow-400 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">
              Sistem Informasi Kelulusan Terpadu SDN Karang Anyar 08 Pagi
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSwitchRole("siswa")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                userRole === "siswa"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              🎓 Portal Siswa
            </button>
            <button
              onClick={() => handleSwitchRole("guru")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1 ${
                userRole === "guru"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Key className="h-3 w-3" /> Portal Guru/Admin
            </button>
          </div>
        </div>
      </div>

      {/* 1. Header (School logo, Cop, & Hero description) */}
      <Header />

      {/* 2. Main Area */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner Announcement of Operational date details */}
        <div className="bg-white border-2 border-orange-200 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-blue-950/5">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 font-bold border border-orange-200 text-xl">
              📢
            </span>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">Pemberitahuan Kelulusan Terpadu</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Kelulusan secara resmi dirilis pada tanggal <strong>{schoolConfig.releaseDate}</strong> berdasarkan keputusan bersama dewan guru SDN Karang Anyar 08 Pagi Jakarta Pusat.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start md:self-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-black uppercase text-white shadow-md">
            <Clock className="h-3 w-3 text-yellow-300" /> Server Online
          </span>
        </div>

        {/* Dynamic Mode Switch rendering */}
        {userRole === "siswa" ? (
          /* =======================================
             I. SISWA (PESERTA) VIEW - CLEAN & COMPACT
             ======================================= */
          <div className="space-y-10">
            {/* Search Area */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-blue-605 border-blue-600 pl-3">
                <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Portal Pelacakan Siswa</h3>
              </div>
              
              <SearchForm 
                onSearch={(student) => setSearchedStudent(student)} 
                onClear={() => setSearchedStudent(null)} 
                currentStudent={searchedStudent}
                students={students}
                showRosterOnlyForAdmin={false} // Hidden for students
              />
            </div>
          </div>
        ) : (
          /* =======================================
             II. GURU (PENGELOLA) VIEW - DATABASE MANAGEMENT
             ======================================= */
          <div className="space-y-10">
            {!isTeacherAuthenticated ? (
              /* A. Secure Lock screen barrier */
              <div className="mx-auto max-w-md w-full border-4 border-orange-100 bg-white p-8 rounded-[32px] shadow-2xl text-center space-y-6 animate-fade-in my-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500/10 text-orange-600 border border-orange-200">
                  <Lock className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Verifikasi Akses Guru</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Halaman ini dikhususkan untuk dewan guru dan panitia kelulusan dalam memperbarui database dan melakukan impor sheets.
                  </p>
                </div>

                <form onSubmit={handleVerifyPin} className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="Masukkan PIN Akses"
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError("");
                      }}
                      className="w-full text-center tracking-widest text-lg font-black rounded-2xl border-2 border-slate-200 bg-slate-50 py-3.5 px-4 focus:border-orange-500 focus:bg-white focus:outline-none placeholder:tracking-normal placeholder:font-semibold placeholder:text-sm"
                    />
                    {pinError && (
                      <p className="text-xs font-bold text-rose-600 animate-pulse">{pinError}</p>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-500 font-semibold text-center mt-2 leading-relaxed">
                    💡 <strong>PIN Akses:</strong> Masukkan <span className="text-orange-600 font-extrabold">2026</span> atau <span className="text-orange-600 font-extrabold">1234</span> untuk autentikasi demo.
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setUserRole("siswa")}
                      className="flex-1 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 text-xs font-black uppercase tracking-wider cursor-pointer transition-all"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white py-3 text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-500/20 cursor-pointer transition-all active:scale-95"
                    >
                      Masuk
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* B. Fully authenticated Guru Database Dashboard */
              <div className="space-y-10 animate-fade-in">
                {/* Session Active Notice Toolbar */}
                <div className="bg-orange-600 text-white rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-orange-950/10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white font-bold border border-white/20 text-lg">
                      🔑
                    </span>
                    <div className="text-center sm:text-left">
                      <h4 className="text-sm font-black uppercase tracking-wide">Mengelola Database sebagai Guru</h4>
                      <p className="text-xs text-orange-100 mt-0.5">
                        Sistem sinkronisasi Google Sheets, reset database, dan edit data siswa aktif. Kepala Sekolah: <strong>{schoolConfig.principalName}</strong>.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogoutTeacher}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-orange-50 text-orange-600 py-2 px-4 text-xs font-black uppercase shadow-md cursor-pointer transition-all active:scale-95 whitespace-nowrap"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Log Out Sesi Guru
                  </button>
                </div>

                {/* Form Input Peserta Didik Baru */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-l-4 border-orange-500 pl-3">
                    <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Input Peserta Didik Baru (Guru)</h3>
                  </div>
                  <AddStudentForm 
                    onAddStudent={handleAddStudent} 
                    onAddStudents={handleAddStudents} 
                    onResetToDefault={handleResetToDefault} 
                  />
                </div>

                {/* Statistics Info Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-l-4 border-amber-500 pl-3">
                    <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Prestasi Angkatan (Guru Analyst)</h3>
                  </div>
                  <StatsDashboard students={students} />
                </div>

                {/* Search / Verification Area also exposed for easy testing */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                    <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Verifikasi Kelulusan Siswa (Simulation Roster Aktif)</h3>
                  </div>
                  <SearchForm 
                    onSearch={(student) => setSearchedStudent(student)} 
                    onClear={() => setSearchedStudent(null)} 
                    currentStudent={searchedStudent}
                    students={students}
                    showRosterOnlyForAdmin={true} // Enabled for Teachers for validation
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section B: Student Results (Rendered dynamically upon lookup match) - Shared across both modes */}
        {searchedStudent && (
          <div id="result-section" className="space-y-4 animate-fade-in pt-4">
            <div className="flex items-center justify-between border-l-4 border-emerald-550 border-emerald-600 pl-3">
              <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Hasil Ujian & SKL Hasil Saringan</h3>
              <button 
                onClick={() => setSearchedStudent(null)}
                className="text-xs font-black uppercase tracking-wider text-orange-500 bg-white/80 border border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Tutup Hasil [x]
              </button>
            </div>
            
            <StudentResult student={searchedStudent} />
          </div>
        )}

        {/* Section D: Mading Gembira / Support wall - Shared across both modes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-purple-600 pl-3">
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Buku Tamu Kesan & Pesan</h3>
          </div>
          <MessageBoard />
        </div>

        {/* Section E: FAQ/Guideline Box - Shared across both modes */}
        <div className="rounded-3xl border-4 border-slate-100 bg-white p-6 shadow-xl shadow-blue-900/5">
          <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
            <HelpCircle className="h-5 w-5 text-blue-600 animate-pulse" />
            <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
          </h3>
          <div className="space-y-5 text-xs font-semibold text-slate-600">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-black text-slate-900 text-sm">1. Bagaimana jika data Tanggal Lahir saya tidak cocok?</h4>
              <p className="mt-1.5 leading-relaxed text-slate-600 font-medium">
                Silakan periksa kembali format pengisian tanggal lahir Anda. Tanggal lahir harus sesuai dengan data Akta Kelahiran dan Dapodik resmi sekolah. Silakan hubungi wali kelas Anda apabila data tidak terdaftar di sistem kelulusan resmi.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-black text-slate-900 text-sm">2. Apakah SKL Digital ini sah digunakan untuk PPDB?</h4>
              <p className="mt-1.5 leading-relaxed text-slate-600 font-medium">
                Ya, dokumen Surat Keterangan Kelulusan (SKL) elektronik ini diterbitkan secara sah dan ditandatangani oleh Kepala Sekolah Ibu <strong>{schoolConfig.principalName}</strong>, sehingga sah dipergunakan sementara untuk keperluan pendaftaran PPDB jenjang SMP.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-black text-slate-900 text-sm">3. Kapan Ijazah Asli lulusan diterbitkan?</h4>
              <p className="mt-1.5 leading-relaxed text-slate-600 font-medium">
                Ijazah fisik asli akan diterbitkan sesuai dengan regulasi resmi Dinas Pendidikan DKI Jakarta. Informasi pengambilan ijazah kelulusan akan diberitahukan resmi melalui WhatsApp Group guru-ortu sekolah.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* 3. Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-400 py-12 border-t-4 border-orange-500">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {/* School Profile */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white">
                <School className="h-5 w-5 text-amber-400" />
                <span className="font-extrabold tracking-wider text-sm">SDN Karang Anyar 08</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                SD Negeri di bawah naungan Dinas Pendidikan DKI Jakarta Suku Dinas Wilayah II Jakarta Pusat yang berkomitmen menyelenggarakan pendidikan dasar bermutu dan berkarakter luhur Pancasila.
              </p>
            </div>

            {/* School Contact */}
            <div className="flex flex-col gap-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Hubungi Sekolah</h4>
              <p className="leading-relaxed">
                Telepon: {schoolConfig.phone} <br />
                Email: {schoolConfig.email} <br />
                Jam Kerja: Senin - Jumat (07:00 - 15:05 WIB)
              </p>
            </div>

            {/* Development / Application info */}
            <div className="flex flex-col gap-3 text-xs sm:col-span-2 md:col-span-1">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Informasi Sistem</h4>
              <p className="leading-relaxed">
                Sistem Pengumuman Kelulusan Elektronik Terpadu (S-PKET). <br />
                Hak Cipta © 2026 SDN Karang Anyar 08 Pagi Jakarta Pusat. <br />
                Semua hak dilindungi undang-undang.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>Dibuat dengan dedikasi penuh untuk menyambut masa depan putra-putri bangsa generasi kelas 6 SDN Karang Anyar 08 Pagi Jakarta Pusat.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
