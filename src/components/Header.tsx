/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, School, MapPin } from "lucide-react";
import { schoolConfig } from "../data/students";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-blue-600 pb-12 pt-14 text-white shadow-lg border-b-4 border-orange-500">
      {/* Decorative Grid SVG background or soft circle */}
      <div className="absolute right-0 top-0 -mr-16 -mt-16 h-80 w-80 rounded-full bg-yellow-400/20 blur-2xl" />
      <div className="absolute left-0 bottom-0 -ml-16 -mb-16 h-80 w-80 rounded-full bg-orange-500/20 blur-2xl" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Custom School Logo Emblem matching the design */}
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white p-1.5 shadow-xl transition-transform hover:scale-105">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-blue-50 border border-blue-100">
              <School className="h-9 w-9 text-blue-600" />
            </div>
            {/* Soft pulsing ring */}
            <span className="absolute -inset-1 rounded-full border-2 border-yellow-400/30 animate-pulse" />
          </div>

          {/* Institutional Heading */}
          <p className="text-xs font-black uppercase tracking-widest text-[#FFFBEB] opacity-90 sm:text-sm">
            Dinas Pendidikan Provinsi DKI Jakarta
          </p>
          <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
            {schoolConfig.name}
          </h1>
          <p className="mt-1 text-sm font-semibold tracking-wide text-blue-100 uppercase">
            Kecamatan {schoolConfig.subdistrict} • {schoolConfig.district}
          </p>
          
          {/* Metadata Badges in Vibrant Palette colors */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-700/60 px-4 py-1.5 border border-blue-500 font-bold text-white">
              <MapPin className="h-3.5 w-3.5 text-yellow-300" /> {schoolConfig.address}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-700/60 px-4 py-1.5 border border-blue-500 font-bold text-white">
              NPSN: {schoolConfig.npsn}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1.5 font-black text-blue-900 shadow-md">
              Tahun Ajaran {schoolConfig.academicYear}
            </span>
          </div>

          <div className="mt-8 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-lg md:text-xl font-black uppercase tracking-wider text-white shadow-md border-b-4 border-orange-700">
              <GraduationCap className="h-5.5 w-5.5 animate-bounce" /> PENGUMUMAN KELULUSAN
            </div>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-blue-50 font-medium">
              Selamat datang di portal kelulusan resmi siswa-siswi Kelas 6 tahun ajaran 2025/2026.
              Gunakan form pencarian di bawah untuk memeriksa status kelulusan, melihat perincian nilai ujian, serta mengunduh dokumen SKL digital.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
