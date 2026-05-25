/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, CheckCircle, TrendingUp, Users } from "lucide-react";
import { schoolConfig } from "../data/students";
import { Student } from "../types";

interface StatsDashboardProps {
  students: Student[];
}

export default function StatsDashboard({ students }: StatsDashboardProps) {
  const totalStudents = students.length;

  if (totalStudents === 0) {
    return (
      <div className="w-full rounded-[32px] bg-white p-8 shadow-xl border-4 border-slate-100 text-center font-bold text-slate-400">
        Database siswa masih kosong. Silakan tambahkan data siswa baru melalui formulir input.
      </div>
    );
  }
  
  // Calculate average scores
  const scoreTotals = students.reduce((acc, student) => {
    const gradesValues = Object.values(student.grades);
    const sum = gradesValues.reduce((s, val) => s + val, 0);
    const avg = sum / gradesValues.length;
    return {
      sumAll: acc.sumAll + sum,
      countAll: acc.countAll + gradesValues.length,
      studentAveragesSum: acc.studentAveragesSum + avg
    };
  }, { sumAll: 0, countAll: 0, studentAveragesSum: 0 });

  const classOverallAverage = (scoreTotals.sumAll / scoreTotals.countAll).toFixed(1);
  
  // Find highest average student
  const highestStudent = students.reduce((prev, curr) => {
    const getAvg = (s: typeof curr) => {
      const vals = Object.values(s.grades);
      return vals.reduce((sum, v) => sum + v, 0) / vals.length;
    };
    return getAvg(curr) > getAvg(prev) ? curr : prev;
  }, students[0]);

  const highestAvg = (Object.values(highestStudent.grades).reduce((s, v) => s + v, 0) / Object.values(highestStudent.grades).length).toFixed(1);

  // Calculate passed percentage dynamically
  const passedStudentsCount = students.filter(s => s.status === "LULUS" || s.status === "LULUS" as any).length;
  const passedPercentValue = Math.round((passedStudentsCount / totalStudents) * 100);

  // Subject averages
  const subjectsKeys: Array<keyof typeof students[0]["grades"]> = [
    "agama", "ppkn", "indonesia", "matematika", "ipa", "ips", "sbdp", "pjok", "inggris"
  ];
  const subjectLabels: Record<string, string> = {
    agama: "Agama",
    ppkn: "PPKn",
    indonesia: "B. Indo",
    matematika: "MTK",
    ipa: "IPA",
    ips: "IPS",
    sbdp: "SBdP",
    pjok: "PJOK",
    inggris: "B. Ingr"
  };

  const subjectAverages = subjectsKeys.map(key => {
    const sum = students.reduce((acc, s) => acc + s.grades[key], 0);
    return {
      label: subjectLabels[key],
      avg: (sum / totalStudents).toFixed(1)
    };
  });

  return (
    <div className="w-full rounded-[32px] bg-white p-6 md:p-8 shadow-xl border-4 border-slate-100">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Ikhtisar & Statistik Kelulusan</h2>
          <p className="text-sm font-semibold text-slate-450 text-slate-500">Pencapaian akademik angkatan kelas 6 TA {schoolConfig.academicYear}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-yellow-400 px-4.5 py-1.5 text-xs font-black uppercase text-blue-900 shadow-sm">
          <CheckCircle className="h-4 w-4 text-blue-900" /> {passedPercentValue}% Lulus
        </span>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-semibold">
        {/* Card 1: Total Siswa */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 border-2 border-slate-100 transition-colors hover:border-blue-400">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Siswa Kelas 6</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{totalStudents} <span className="text-xs font-bold text-slate-400">Anak</span></p>
          </div>
        </div>

        {/* Card 2: Status Kelulusan */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 border-2 border-slate-100 transition-colors hover:border-orange-400">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Status Kelulusan</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{passedPercentValue}% <span className="text-xs font-black uppercase text-orange-600">Lulus</span></p>
          </div>
        </div>

        {/* Card 3: Rata-rata Angkatan */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 border-2 border-slate-100 transition-colors hover:border-blue-400">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Rerata Ujian Kelas</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{classOverallAverage} <span className="text-xs font-bold text-slate-450 text-slate-400">/ 100</span></p>
          </div>
        </div>

        {/* Card 4: Siswa Berprestasi */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 border-2 border-slate-100 transition-colors hover:border-yellow-400">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-blue-900 shadow-md">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Rerata Tertinggi</p>
            <p className="text-lg font-black text-slate-900 truncate max-w-[140px] mt-0.5" title={highestStudent.name}>{highestStudent.name}</p>
            <p className="text-xs font-black text-orange-500">Nilai: {highestAvg}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Bar Chart for Subject Averages */}
      <div className="mt-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
          <span>Nilai Rata-rata Ujian Per Mata Pelajaran</span>
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjectAverages.map((sub, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-50/50 p-4 border-2 border-slate-100/60 hover:bg-white transition-all">
              <div className="flex items-center justify-between text-xs font-black text-slate-600 mb-2 uppercase tracking-wide">
                <span>{sub.label}</span>
                <span className="text-blue-600 text-sm font-black">{sub.avg}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200">
                <div 
                  className="h-2.5 rounded-full bg-blue-600 transition-all duration-1000" 
                  style={{ width: `${sub.avg}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
