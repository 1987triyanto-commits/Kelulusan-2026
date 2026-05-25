/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, BookOpen, Clock, Download, FileText, Heart, ShieldAlert, Sparkles, User } from "lucide-react";
import { Student } from "../types";
import { schoolConfig } from "../data/students";
import SklDocument from "./SklDocument";

interface StudentResultProps {
  student: Student;
}

export default function StudentResult({ student }: StudentResultProps) {
  const [showSkl, setShowSkl] = useState(false);

  // Calculate final score benchmarks
  const gradesArray = Object.values(student.grades);
  const totalScore = gradesArray.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / gradesArray.length;

  const subjectNames: Record<string, string> = {
    agama: "Pend. Agama",
    ppkn: "PPKn",
    indonesia: "Bahasa Indonesia",
    matematika: "Matematika",
    ipa: "Sains (IPA)",
    ips: "Sosial (IPS)",
    sbdp: "SBdP",
    pjok: "PJOK",
    inggris: "Bahasa Inggris"
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-100";
    if (score >= 70) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  const getShornPerformanceString = (avg: number) => {
    if (avg >= 90) return { label: "Sangat Memuaskan (Cum Laude)", color: "text-amber-600 bg-amber-100" };
    if (avg >= 80) return { label: "Memuaskan", color: "text-blue-600 bg-blue-100" };
    return { label: "Baik", color: "text-slate-600 bg-slate-100" };
  };

  const perf = getShornPerformanceString(averageScore);

  return (
    <div className="w-full flex flex-col gap-6" id="result-section">
      {/* Celebration Main Card */}
      <div className="relative overflow-hidden rounded-[32px] border-4 border-slate-100 bg-white p-6 md:p-8 shadow-2xl">
        {/* Confetti particles mock */}
        <div className="absolute right-0 top-0 -mr-6 -mt-6 h-36 w-36 rounded-full bg-yellow-400/20 blur-2xl pointer-events-none" />
        <div className="absolute left-10 bottom-0 -ml-6 -mb-6 h-36 w-36 rounded-full bg-blue-105/20 blur-2xl pointer-events-none" />
        
        {/* Soft elegant linear background stripe */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-yellow-400 to-orange-500" />

        <div className="flex flex-col items-center justify-center text-center mt-4">
          
          {/* Animated sparkles badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-black uppercase text-blue-900 tracking-wider shadow-md">
            <Sparkles className="h-3.5 w-3.5 animate-bounce" /> Hasil Kelulusan Resmi
          </div>

          <div className="mt-5 flex flex-col items-center">
            {/* Student avatar icon container */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-3 shadow-md shadow-blue-500/20">
              <User className="h-8 w-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              {student.name}
            </h2>
            <p className="text-xs font-mono font-bold text-slate-400 mt-1">
              NISN: <span className="text-slate-800 font-bold">{student.nisn}</span> • No. Ujian: <span className="text-slate-800 font-bold">{student.examNumber}</span>
            </p>
          </div>

          {/* Large Graduation Outcome Badge */}
          <div className="my-8 rounded-3xl bg-blue-600 p-1 shadow-2xl max-w-sm w-full transition-transform hover:scale-102">
            <div className="rounded-[20px] bg-white border-2 border-dashed border-blue-200 py-6 text-center leading-none">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">Status Hasil Akhir</span>
              <span className="text-5xl font-black tracking-widest text-blue-600 block">LULUS</span>
            </div>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Selamat atas keberhasilan menyelesaikan pendidikan dasar 6 tahun di <strong>{schoolConfig.name}</strong> dengan hasil yang amat membanggakan!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowSkl(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 px-6 py-4 text-base font-black uppercase text-white shadow-xl shadow-orange-200 transition-all cursor-pointer max-sm:w-full active:scale-98"
            >
              <FileText className="h-5 w-5" /> Lihat & Cetak SKL Digital
            </button>
            
            <a 
              href="#guestbook-container"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-6 py-4 text-sm font-bold text-slate-600 transition-all max-sm:w-full"
            >
              <Heart className="h-5 w-5 text-red-500 fill-red-500" /> Tulis Ucapan Selamat
            </a>
          </div>
        </div>
      </div>

      {/* Rapor Kelulusan (Grades Details Card) */}
      <div className="rounded-[32px] border-4 border-slate-100 bg-white p-6 shadow-xl">
        <h3 className="text-base font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wide">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <span>Rincian Penilaian Akhir (Nilai Ujian Sekolah)</span>
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 font-semibold">
          {Object.entries(student.grades).map(([key, score]) => (
            <div key={key} className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-4 hover:border-blue-400 hover:bg-white transition-all">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wide">{subjectNames[key]}</span>
                <span className="text-[10px] font-bold text-slate-400 mt-0.5">Nilai Kelulusan</span>
              </div>
              <span className={`inline-flex h-10 w-12 items-center justify-center rounded-xl border-2 text-base font-black ${getScoreColor(score)}`}>
                {score}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Cumulative Average */}
        <div className="mt-8 border-t-2 border-slate-100 pt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">Rata-rata Nilai</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-blue-600">{averageScore.toFixed(2)}</span>
              <span className="text-sm font-black text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2 text-left md:text-right">Predikat Prestasi</span>
            <span className={`rounded-xl px-4 py-2 text-xs font-black border-2 ${perf.color} shadow-sm border-blue-105`}>
              🏆 {perf.label}
            </span>
          </div>
        </div>
      </div>

      {/* Certificate of Commendation Quote */}
      {student.principalMessage && (
        <div className="rounded-[32px] border-4 border-slate-100 bg-white p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Award className="h-28 w-28 text-orange-500" />
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md border border-orange-400">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-orange-600 mb-1">Pesan Hangat Mandat Kepala Sekolah</p>
              <p className="text-base font-medium italic text-slate-700 leading-relaxed">
                "{student.principalMessage}"
              </p>
              <div className="mt-5 flex flex-col">
                <span className="text-sm font-black text-slate-900">{schoolConfig.principalName}</span>
                <span className="text-[11px] text-slate-500 font-bold">NIP: {schoolConfig.principalNip}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded SklDocument Dialog */}
      {showSkl && (
        <SklDocument 
          student={student} 
          onClose={() => setShowSkl(false)} 
        />
      )}
    </div>
  );
}
