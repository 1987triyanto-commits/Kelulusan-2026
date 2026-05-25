/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { Printer, X, Check, Award, FileText, ShieldAlert } from "lucide-react";
import { Student } from "../types";
import { schoolConfig } from "../data/students";
// @ts-ignore
import stampSignatureImg from "../assets/images/stamp_signature_1779674342985.png";

interface SklDocumentProps {
  student: Student;
  onClose: () => void;
}

export default function SklDocument({ student, onClose }: SklDocumentProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Helper to convert index date format YYYY-MM-DD to Indonesian words
  const formatIndonesianDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = parseInt(parts[2], 10);
    const month = months[parseInt(parts[1], 10) - 1];
    const year = parts[0];
    return `${day} ${month} ${year}`;
  };

  // List of subjects with Indonesian titles
  const subjectLabels: Record<keyof typeof student.grades, string> = {
    agama: "Pendidikan Agama dan Budi Pekerti",
    ppkn: "Pendidikan Pancasila dan Kewarganegaraan",
    indonesia: "Bahasa Indonesia",
    matematika: "Matematika",
    ipa: "Ilmu Pengetahuan Alam",
    ips: "Ilmu Pengetahuan Sosial",
    sbdp: "Seni Budaya dan Prakarya",
    pjok: "Pendidikan Jasmani, Olahraga, dan Kesehatan",
    inggris: "Muatan Lokal: Bahasa Inggris"
  };

  // Math helper
  const gradesArray = Object.values(student.grades);
  const totalScore = gradesArray.reduce((acc, score) => acc + score, 0);
  const averageScore = (totalScore / gradesArray.length).toFixed(2);

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Create a clean print frame window or substitute body
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-family: 'Times New Roman', Times, serif !important;
            padding: 1.5cm !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          th, td {
            border: 1px solid black !important;
            padding: 6px !important;
          }
        }
      `;
      document.head.appendChild(style);
      window.print();
      document.head.removeChild(style);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/80 p-4 sm:p-6 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-[32px] bg-white shadow-2xl border-4 border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Top Control Bar */}
        <div className="no-print flex items-center justify-between border-b-2 border-slate-100 bg-slate-50 px-6 py-4 rounded-t-[28px]">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-black text-sm text-slate-900 uppercase tracking-wider">
              Surat Keterangan Kelulusan (SKL) Resmi
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-black uppercase text-white shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Printer className="h-4 w-4" /> Cetak Dokumen
            </button>
            <button
              onClick={onClose}
              className="rounded-xl hover:bg-slate-200 p-2 text-slate-400 hover:text-slate-650 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Area wrapper */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12" ref={printAreaRef}>
          <div className="print-container mx-auto max-w-2xl bg-white text-slate-900 border border-slate-350 p-8 shadow-inner font-serif transition-all">
            
            {/* Kop Surat (Institutional Circular Header) */}
            <div className="relative border-b-4 border-double border-black pb-4 text-center leading-tight flex items-center justify-center min-h-[96px]">
              {/* Logo DKI Jakarta */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center hover:scale-105 transition-transform duration-300">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Coat_of_arms_of_Jakarta.svg"
                  alt="Logo DKI Jakarta"
                  className="h-20 w-auto print:h-20"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Copy / Institutional Text */}
              <div className="pl-24 pr-24 w-full">
                <p className="text-xs sm:text-xs font-bold uppercase tracking-wide">PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA</p>
                <p className="text-[10px] sm:text-[10px] font-bold uppercase tracking-wide mt-0.5">DINAS PENDIDIKAN</p>
                <p className="text-lg sm:text-lg font-black uppercase tracking-wider text-slate-900 mt-1 leading-none">SDN KARANG ANYAR 08 PAGI</p>
                <p className="text-[9px] font-sans text-slate-700 mt-2 leading-snug font-normal">
                  {schoolConfig.address}, Kec. {schoolConfig.subdistrict}, Jakarta Pusat <br />
                  Telp: {schoolConfig.phone} Kode Pos {schoolConfig.postalCode} <br />
                  Website: {schoolConfig.website} | Email: {schoolConfig.email} <br />
                  NPSN: {schoolConfig.npsn}
                </p>
              </div>
            </div>

            {/* Document Title Callout */}
            <div className="mt-6 text-center">
              <h4 className="text-base font-bold uppercase tracking-wide mb-0.5" style={{ textDecoration: "underline" }}>
                SURAT KETERANGAN KELULUSAN
              </h4>
              <p className="text-xs font-sans tracking-wide text-slate-700">
                Nomor: 421.2 / 108 / SDN-KA08P / V / 2026
              </p>
            </div>

            {/* Introductory Body */}
            <p className="mt-6 text-justify text-xs leading-relaxed">
              Yang bertanda tangan di bawah ini Kepala Sekolah Dasar Negeri Karang Anyar 08 Pagi, Kecamatan Sawah Besar, Kota Jakarta Pusat, menerangkan dengan sesungguhnya bahwa:
            </p>

            {/* Student Biodata Sheet */}
            <table className="mt-4 w-full text-xs" style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td className="py-1.5 pr-4 font-bold align-top" style={{ width: "35%" }}>Nama Lengkap</td>
                  <td className="py-1.5 px-2 align-top">:</td>
                  <td className="py-1.5 font-sans uppercase font-bold text-slate-900 align-top">{student.name}</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 font-bold align-top">Tempat, Tanggal Lahir</td>
                  <td className="py-1.5 px-2 align-top">:</td>
                  <td className="py-1.5 align-top">{student.birthPlace}, {formatIndonesianDate(student.birthDate)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 font-bold align-top">Nama Orang Tua / Wali</td>
                  <td className="py-1.5 px-2 align-top">:</td>
                  <td className="py-1.5 font-sans align-top">{student.parentName}</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 font-bold align-top">NISN</td>
                  <td className="py-1.5 px-2 align-top">:</td>
                  <td className="py-1.5 font-mono font-bold align-top">{student.nisn}</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-4 font-bold align-top">Nomor Peserta Ujian</td>
                  <td className="py-1.5 px-2 align-top">:</td>
                  <td className="py-1.5 font-mono align-top">{student.examNumber}</td>
                </tr>
              </tbody>
            </table>

            {/* Verdict Callout */}
            <div className="mt-6 border border-black/45 bg-[#FFFBEB] p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide">Dinyatakan:</p>
              <h3 className="mt-1.5 text-2xl font-black text-rose-600 tracking-widest">{student.status}</h3>
              <p className="mt-1.5 text-[10px] text-justify leading-relaxed">
                dari {schoolConfig.name} berdasarkan Kriteria Kelulusan yang telah ditetapkan oleh Satuan Pendidikan sesuai dengan peraturan perundang-undangan pendidikan nasional Dinas Provinsi DKI Jakarta.
              </p>
            </div>

            {/* Grades Report Sheet */}
            <div className="mt-6">
              <p className="text-xs font-bold mb-2 uppercase tracking-wide">Daftar Nilai Ujian Sekolah Kelas 6:</p>
              <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="bg-slate-100 text-center font-bold">
                    <th className="border border-slate-700 py-1.5" style={{ width: "10%" }}>No</th>
                    <th className="border border-slate-700 py-1.5 px-2 text-left" style={{ width: "65%" }}>Mata Pelajaran</th>
                    <th className="border border-slate-700 py-1.5" style={{ width: "25%" }}>Nilai Ujian</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(student.grades).map(([key, val], idx) => (
                    <tr key={key} className="hover:bg-slate-50/50">
                      <td className="border border-slate-700 text-center py-1 font-sans">{idx + 1}</td>
                      <td className="border border-slate-700 py-1 px-2.5 font-sans">{subjectLabels[key as keyof typeof student.grades]}</td>
                      <td className="border border-slate-700 text-center py-1 font-sans font-bold">{val}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td className="border border-slate-700 text-center py-1.5" colSpan={2}>Jumlah Nilai</td>
                    <td className="border border-slate-700 text-center py-1.5 font-sans">{totalScore}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="border border-slate-700 text-center py-1.5" colSpan={2}>Rata-rata Nilai</td>
                    <td className="border border-slate-700 text-center py-1.5 font-sans text-blue-700">{averageScore}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Signatures Blocks */}
            <div className="mt-8 flex justify-between gap-4 text-xs font-sans">
              
              {/* Left side: QR validation and metadata */}
              <div className="flex flex-col items-center justify-end text-center p-2 rounded-xl bg-slate-50 border border-slate-200" style={{ width: "45%" }}>
                <p className="text-[9px] text-slate-500 mb-1 leading-tight font-medium text-center">Pindai QR ini untuk verifikasi data kependidikan resmi SDN Karang Anyar 08</p>
                {/* SVG Mock QR Code */}
                <div className="h-18 w-18 bg-white border border-slate-200 p-1 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <path d="M5 5h30v30H5zm10 10h10v10H15zm50-10h30v30H65zm10 10h10v10H75zM5 65h30v30H5zm10 10h10v10H15zm60 0h10v10H75zm-15-10h10v10H60zm10-10h10v10H70zm-20-5h10v10H50zm15 15h10v10H65z" fill="#0f172a" />
                  </svg>
                </div>
                <p className="font-mono text-[8px] text-slate-450 mt-2 truncate max-w-full text-slate-400">VERIF_ID: {student.nisn}-{student.examNumber.substring(13)}</p>
              </div>

              {/* Right side: Principal Sign off */}
              <div className="flex flex-col items-start justify-start text-left" style={{ width: "50%" }}>
                <p className="mb-1 text-slate-700">Jakarta, {schoolConfig.releaseDate}</p>
                <p className="font-bold text-slate-900 leading-tight">Kepala Sekolah Dasar Negeri</p>
                <p className="font-bold text-slate-900 leading-tight">Karang Anyar 08 Pagi</p>
                
                {/* Sign Stamp Area with Real Stamp & Signature */}
                <div className="relative -ml-6 my-1 h-24 w-64 select-none flex items-center justify-start pointer-events-none">
                  <img
                    src={stampSignatureImg}
                    alt="Tanda Tangan dan Stempel Resmi Kepala Sekolah"
                    className="h-24 w-auto object-contain print:h-24"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="font-bold text-slate-900 underline leading-tight">{schoolConfig.principalName}</p>
                <p className="text-[10px] text-slate-600">NIP. {schoolConfig.principalNip}</p>
              </div>
            </div>

            {/* Document Caveat Disclaimer */}
            <p className="mt-10 text-center text-[9px] font-sans text-slate-400 italic">
              *Dokumen SKL ini dibuat secara otomatis oleh sistem informasi data kelulusan terpadu sekolah untuk keperluan pendaftaran awal PPDB jenjang selanjutnya.
            </p>
          </div>
        </div>

        {/* Modal Bottom Footer bar */}
        <div className="no-print bg-slate-50 border-t-2 border-slate-100 py-3 px-6 text-center text-xs text-slate-450 text-slate-450 rounded-b-[28px]">
          Gunakan pintasan keyboard <kbd className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-650">CTRL + P</kbd> untuk mencetak langsung dari peramban Anda.
        </div>
      </div>
    </div>
  );
}
