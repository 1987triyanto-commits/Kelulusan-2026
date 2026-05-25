/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Calendar, AlertCircle, Info, ChevronDown, ChevronUp, UserCheck } from "lucide-react";
import { Student } from "../types";

interface SearchFormProps {
  onSearch: (student: Student) => void;
  onClear: () => void;
  currentStudent: Student | null;
  students: Student[];
  showRosterOnlyForAdmin?: boolean;
}

export default function SearchForm({ onSearch, onClear, currentStudent, students, showRosterOnlyForAdmin = false }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showRoster, setShowRoster] = useState(false);
  const [rosterFilter, setRosterFilter] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!searchTerm.trim()) {
      setErrorMsg("Silakan masukkan NISN atau Nama Siswa.");
      return;
    }

    // Try finding by NISN (with or without leading zero) first, then name
    const cleanedSearchTerm = searchTerm.trim().replace(/^0+/, "");
    const found = students.find(student => {
      const isNisnMatch = student.nisn === searchTerm.trim() || student.nisn.replace(/^0+/, "") === cleanedSearchTerm;
      const isNameMatch = student.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      
      if (isNisnMatch || isNameMatch) {
         // If birth date is provided, validate it. Otherwise alert
        if (birthDate) {
          return student.birthDate === birthDate;
        }
        return true; // Return true, but we will handle date validation check below
      }
      return false;
    });

    if (!found) {
      // Find candidate without DOB checking to see if it's just a DOB mistake or actually not found
      const candidate = students.find(student => 
        student.nisn === searchTerm.trim() || 
        student.nisn.replace(/^0+/, "") === cleanedSearchTerm ||
        student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );

      if (candidate) {
        setErrorMsg("Siswa ditemukan, namun Tanggal Lahir tidak cocok. Silakan periksa kembali.");
      } else {
        setErrorMsg("Data siswa tidak ditemukan. Silakan periksa kembali info NISN/Nama.");
      }
      return;
    }

    onSearch(found);
  };

  const handleSelectFromRoster = (student: Student) => {
    setSearchTerm(student.nisn);
    setBirthDate(student.birthDate);
    onSearch(student);
    setErrorMsg("");
  };

  const handleClearForm = () => {
    setSearchTerm("");
    setBirthDate("");
    setErrorMsg("");
    onClear();
  };

  const filteredRoster = students.filter(student => 
    student.name.toLowerCase().includes(rosterFilter.toLowerCase()) ||
    student.nisn.includes(rosterFilter)
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search Input Card */}
      <div className="rounded-[32px] border-4 border-slate-100 bg-white p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Yellow warm decoration accent circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-105 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="mb-6 flex items-center gap-4 relative z-10">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-xs">Portal Kependidikan Mandiri</span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">Cari Status Kelulusan Anda</h3>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-6 relative z-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* NISN / Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="student-id" className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
                NISN (10 Digit) / Nama Lengkap Siswa
              </label>
              <div className="relative">
                <input
                  id="student-id"
                  type="text"
                  placeholder="Contoh: 0134567801 atau Aditya"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-3.5 pl-4 pr-12 text-base font-bold text-slate-800 transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
                <span className="absolute right-4 top-4 text-slate-400">
                  <span className="text-xs font-black text-slate-305 uppercase tracking-widest">ID</span>
                </span>
              </div>
            </div>

            {/* Date of Birth Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="dob" className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
                Tanggal Lahir Siswa
              </label>
              <div className="relative">
                <input
                  id="dob"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-3.5 pl-4 pr-12 text-base font-bold text-slate-800 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
                />
                <span className="absolute right-4 top-4 text-slate-400">
                  <Calendar className="h-5 w-5 text-slate-400" />
                </span>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-start gap-3 rounded-2xl bg-orange-50 p-4 text-xs font-bold text-orange-900 border-2 border-orange-200">
              <AlertCircle className="h-5 w-5 shrink-0 text-orange-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              id="search-button"
              type="submit"
              className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-6 py-4 text-base font-black uppercase text-white shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Search className="h-5 w-5 animate-pulse" /> Periksa Kelulusan
            </button>
            
            {(currentStudent || searchTerm || birthDate) && (
              <button
                id="clear-button"
                type="button"
                onClick={handleClearForm}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600 transition-all cursor-pointer"
              >
                Reset Form
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50/75 p-4 border border-blue-150 text-xs text-blue-900 font-semibold leading-relaxed">
          <Info className="h-5 w-5 shrink-0 text-blue-600" />
          <p>
            Informasi kelulusan bersifat rahasia dan sah sesuai dengan penetapan kelulusan SDN Karang Anyar 08 Pagi Jakarta Pusat.
          </p>
        </div>
      </div>

      {/* Expandable Simulated Roster helper */}
      {showRosterOnlyForAdmin && (
        <div className="rounded-[32px] border-4 border-slate-100 bg-white shadow-xl">
          <button
            onClick={() => setShowRoster(!showRoster)}
            className="flex w-full items-center justify-between px-6 py-5 text-left font-black text-slate-900 hover:bg-[#FFFBEB]/30 transition-all rounded-t-[28px]"
          >
            <div className="flex items-center gap-3">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <div>
                <span className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight">Daftar Pengendali Simulasi ({students.length} Siswa)</span>
                <p className="text-[11px] font-semibold text-slate-450 mt-0.5 normal-case text-slate-400">Pilih siswa uji coba kelulusan untuk mempercepat simulasi mandiri</p>
              </div>
            </div>
            {showRoster ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
          </button>

          {showRoster && (
            <div className="border-t-2 border-slate-100 p-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari nama pada daftar simulasi..."
                  value={rosterFilter}
                  onChange={(e) => setRosterFilter(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="max-h-60 overflow-y-auto rounded-xl border-2 border-slate-150 bg-slate-50 p-2 text-xs scrollbar-thin">
                <div className="grid gap-2 sm:grid-cols-2">
                  {filteredRoster.map((student, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleSelectFromRoster(student)}
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-150 bg-white p-3 transition-all hover:bg-blue-50/40 hover:border-blue-300"
                    >
                      <div>
                        <p className="font-black text-slate-900">{student.name}</p>
                        <p className="font-mono text-[10px] text-slate-450 mt-0.5">NISN: {student.nisn} | Tgl Lahir: {student.birthDate}</p>
                      </div>
                      <span className="shrink-0 rounded bg-blue-50 border border-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:bg-blue-100">
                        Pilih & Cari
                      </span>
                    </div>
                  ))}
                  {filteredRoster.length === 0 && (
                    <p className="col-span-2 py-4 text-center font-bold text-slate-400">Nama tidak ditemukan dalam database simulasi.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
