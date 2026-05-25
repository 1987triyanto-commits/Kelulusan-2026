/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, User, Calendar, Heart, GraduationCap } from "lucide-react";
import { Testimony } from "../types";

export default function MessageBoard() {
  const [messages, setMessages] = useState<Testimony[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"Siswa" | "Orang Tua" | "Guru">("Siswa");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);

  // Load testimonies from localStorage, bootstrap with preseeded ones on first run
  useEffect(() => {
    const saved = localStorage.getItem("sdn_karang_anyar_testimonies");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial: Testimony[] = [
        {
          id: "seed-1",
          studentName: "Nur Alam Syah",
          text: "Selamat teman-teman atas kelulusan kita semua! Makasih buat Bapak dan Ibu guru SDN Karang Anyar 08 yang super baik mendidik kita selama 6 tahun dari kelas 1 sampai lulus kelas 6 hari ini! Semoga kita ketemu lagi di SMP yaaa!",
          role: "Siswa",
          timestamp: "2026-05-25T08:05:00Z"
        },
        {
          id: "seed-2",
          studentName: "Wali Murid",
          text: "Saya mengucapkan beribu terima kasih kepada semua guru SDN Karang Anyar 08 Pagi Jakarta Pusat. Berkat kesabaran pendidik, putri kami bisa lulus dengan nilai yang sangat membanggakan. Sukses selalu untuk sekolah tercinta kita!",
          role: "Orang Tua",
          timestamp: "2026-05-25T08:15:00Z"
        },
        {
          id: "seed-3",
          studentName: " Bapak Triyanto, S.Pd.",
          text: "Selamat atas kelulusan 100% siswa kelas 6 tahun pelajaran 2025/2026. Perjalanan kalian masih panjang, jadikan bekal ilmu karunia guru di sekolah dasar ini sebagai landasan akhlak mulia dan kecerdasan kalian di masa depan. Ibu guru bangga pada kalian!",
          role: "Guru",
          timestamp: "2026-05-25T08:25:00Z"
        },
        {
          id: "seed-4",
          studentName: "Syalia",
          text: "Senang sekali beneran dapet kabar kelulusan hari ini! Semuanya makasih buat kelas 6-A perjuangan kita ngerjain tryout bareng-bareng akhirnya kelar dan sukses semua! Alhamdulillaah lulus semuaaa!",
          role: "Siswa",
          timestamp: "2026-05-25T08:40:00Z"
        }
      ];
      setMessages(initial);
      localStorage.setItem("sdn_karang_anyar_testimonies", JSON.stringify(initial));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newMessage: Testimony = {
      id: "msg-" + Date.now(),
      studentName: name.trim(),
      text: text.trim(),
      role: role,
      timestamp: new Date().toISOString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem("sdn_karang_anyar_testimonies", JSON.stringify(updated));

    // Clear form inputs
    setName("");
    setText("");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const getRoleBadgeColor = (r: typeof role) => {
    switch (r) {
      case "Siswa": return "bg-blue-50 text-blue-700 border-blue-200 font-black";
      case "Orang Tua": return "bg-orange-50 text-orange-700 border-orange-200 font-black";
      case "Guru": return "bg-yellow-100 text-yellow-900 border-yellow-350 font-black";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatRelTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6" id="guestbook-container">
      {/* Messages layout wrapper */}
      <div className="grid gap-6 md:grid-cols-5">
        
        {/* Left Side: Submit Testimony Card */}
        <div className="md:col-span-2 rounded-[32px] border-4 border-slate-100 bg-white p-6 shadow-xl h-fit">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Kesan & Pesan</h3>
              <p className="text-xs text-slate-500 font-semibold">Tuliskan kenangan atau rasa syukur Anda</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user-name" className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">Nama Lengkap</label>
              <input
                id="user-name"
                type="text"
                placeholder="Nama Anda atau Alumnus"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="user-role" className="text-xs font-black text-slate-500 uppercase tracking-wider px-1 block mb-1.5">Peran Anda</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(["Siswa", "Orang Tua", "Guru"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                    }}
                    className={`py-2.5 px-1 rounded-xl border-2 font-black text-center transition-all cursor-pointer ${
                      role === r
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="user-message" className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">Pesan Kebahagiaan</label>
              <textarea
                id="user-message"
                rows={3}
                placeholder="Tulis ucapan selamat / kesan pesan..."
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-xs font-bold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none resize-none"
              />
            </div>

            {success && (
              <p className="text-xs font-bold text-emerald-800 bg-emerald-50 border-2 border-emerald-250 rounded-2xl p-3 text-center">
                ✓ Berhasil dikirim ke mading kelulusan!
              </p>
            )}

            <button
              id="submit-message"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 py-3.5 text-sm font-black uppercase text-white shadow-xl shadow-orange-100 transition-all cursor-pointer active:scale-98"
            >
              <Send className="h-4 w-4" /> Kirim Ucapan
            </button>
          </form>
        </div>

        {/* Right Side: Scrollable Message Feed */}
        <div className="md:col-span-3 rounded-[32px] border-4 border-slate-100 bg-white p-6 shadow-xl flex flex-col max-h-[500px]">
          <div className="mb-5 flex items-center justify-between border-b-2 border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Mading Digital Angkatan</h3>
              <p className="text-xs text-slate-500 font-semibold">Inspirasi cerita dan kenangan tulus</p>
            </div>
            <span className="rounded-xl bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-900">
              {messages.length} Ucapan
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className="rounded-2xl border-2 border-slate-105 bg-slate-50/40 p-4 transition-all hover:bg-slate-50/80"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{msg.studentName}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {formatRelTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`rounded-xl px-2.5 py-1 text-[9px] font-black tracking-wide uppercase border-2 ${getRoleBadgeColor(msg.role || "Siswa")}`}>
                    {msg.role || "Siswa"}
                  </span>
                </div>
 
                <p className="text-xs text-slate-700 leading-relaxed bg-white rounded-xl p-3 border-2 border-slate-100 shadow-sm font-sans italic font-medium">
                  "{msg.text}"
                </p>
              </div>
            ))}

            {messages.length === 0 && (
              <p className="text-center text-xs font-bold text-slate-400 py-10">Belum ada ucapan. Jadilah yang pertama mengirimkan ucapan selamat!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
