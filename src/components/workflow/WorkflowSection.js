"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Palette,
  Code2,
  CheckCircle2,
  LifeBuoy,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  Check,
  Clock,
  Sparkles,
  MessageSquare,
  Mail,
  ShieldCheck,
  Laptop,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { WORKFLOW_STAGES } from "../../data/workflowStages";

// Peta ikon Lucide untuk masing-masing tahapan
const ICON_MAP = {
  Compass: Compass,
  Search: Search,
  Palette: Palette,
  Code2: Code2,
  CheckCircle2: CheckCircle2,
  LifeBuoy: LifeBuoy,
};

export default function WorkflowSection() {
  // State untuk menyimpan tahap mana yang sedang dibuka detailnya
  const [expandedSteps, setExpandedSteps] = useState({
    "01": true, // Default buka tahap pertama sebagai referensi
  });

  // Toggle buka/tutup rincian per tahap
  const toggleStep = (step) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  // Buka semua atau tutup semua rincian
  const allExpanded = WORKFLOW_STAGES.every((stage) => expandedSteps[stage.step]);
  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSteps({});
    } else {
      const openAll = {};
      WORKFLOW_STAGES.forEach((s) => {
        openAll[s.step] = true;
      });
      setExpandedSteps(openAll);
    }
  };

  return (
    <section className="relative w-full text-white" aria-label="Alur Kerja Pembuatan Website">
      {/* Tombol aksi cepat: Buka/Tutup Semua Rincian */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Sparkles className="h-4 w-4 text-brand-orange" />
          <span>Alur Terstruktur &amp; Transparan</span>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-brand-red/60 hover:bg-brand-red/10 hover:text-white"
        >
          <span>{allExpanded ? "Tutup Semua Rincian" : "Buka Semua Rincian"}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              allExpanded ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      </div>

      {/* ========================================================
          LAYOUT DESKTOP: Grid 3 Kolom x 2 Baris dengan Stepper / Penghubung
          ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:relative">
        {WORKFLOW_STAGES.map((stage, idx) => {
          const IconComponent = ICON_MAP[stage.iconName] || Compass;
          const isExpanded = Boolean(expandedSteps[stage.step]);

          // Penentu letak penghubung panah desktop
          const hasRightArrow = idx === 0 || idx === 1 || idx === 3 || idx === 4;
          const isRow1End = idx === 2; // Tahap 03 mengalir ke Tahap 04 di baris kedua

          return (
            <div
              key={stage.step}
              className="relative flex flex-col"
            >
              {/* Card Kontainer */}
              <article
                className={cn(
                  "group relative flex flex-col h-full rounded-2xl border bg-neutral-950/80 p-6 backdrop-blur-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:border-brand-red/60 hover:shadow-[0_0_30px_rgba(120,6,6,0.25)]",
                  isExpanded
                    ? "border-brand-red/50 shadow-[0_0_24px_rgba(120,6,6,0.15)] ring-1 ring-brand-red/20"
                    : "border-white/10 hover:border-white/25"
                )}
              >
                {/* Header Card: Nomor & Ikon */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red/30 to-brand-maroon/20 text-sm font-black tracking-wider text-brand-orange border border-brand-red/30">
                      {stage.step}
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-white/10">
                      Tahap {idx + 1}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-300 transition-colors group-hover:bg-brand-red/20 group-hover:text-brand-orange">
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                {/* Judul & Deskripsi Utama */}
                <h3 className="text-xl font-black tracking-tight text-white group-hover:text-white transition-colors">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300 font-medium">
                  {stage.tagline}
                </p>

                {/* Estimasi Durasi */}
                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-brand-orange/80" />
                  <span>Estimasi: {stage.estimatedDuration}</span>
                </div>

                {/* Tombol Interaktif: Lihat Detail */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleStep(stage.step)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Tutup Detail" : "Lihat Rincian"}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        isExpanded ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {stage.phase}
                  </span>
                </div>

                {/* Bagian Detail yang dapat Di-expand */}
                {isExpanded && (
                  <div className="mt-4 space-y-4 pt-3 border-t border-dashed border-white/15 animate-fadeIn">
                    {/* Deliverable yang didapat klien */}
                    <div className="rounded-lg bg-brand-red/10 border border-brand-red/25 p-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                        Hasil yang Anda Terima:
                      </p>
                      <p className="mt-1 text-xs font-semibold text-zinc-200">
                        {stage.deliverables}
                      </p>
                    </div>

                    {/* Rincian kegiatan langkah demi langkah */}
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Apa yang Dilakukan:
                      </p>
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {stage.details.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-brand-orange shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Peran Klien (santai & minim beban) */}
                    <div className="rounded-lg bg-white/5 p-2.5 text-[11px] text-zinc-400">
                      <span className="font-bold text-zinc-300">Peran Klien: </span>
                      {stage.clientInput}
                    </div>
                  </div>
                )}
              </article>

              {/* Panah Penghubung Antar Kolom (Desktop Horizontal Flow) */}
              {hasRightArrow && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 border border-brand-red/40 text-brand-orange shadow-lg"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}

              {/* Penghubung Alur dari Baris 1 ke Baris 2 (Tahap 03 ke 04) */}
              {isRow1End && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 right-1/2 translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-neutral-900 border border-brand-red/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange shadow-lg"
                >
                  <span>Lanjut</span>
                  <ArrowDown className="h-3 w-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================
          LAYOUT MOBILE: Vertical Timeline yang rapi & mudah di-scroll
          ======================================================== */}
      <div className="lg:hidden relative pl-7 sm:pl-10 space-y-6">
        {/* Garis rel timeline vertikal */}
        <div
          aria-hidden="true"
          className="absolute left-3 sm:left-4 top-3 bottom-6 w-0.5 bg-gradient-to-b from-brand-red via-brand-orange/50 to-brand-red/30"
        />

        {WORKFLOW_STAGES.map((stage, idx) => {
          const IconComponent = ICON_MAP[stage.iconName] || Compass;
          const isExpanded = Boolean(expandedSteps[stage.step]);

          return (
            <div key={stage.step} className="relative">
              {/* Node nomor timeline di rel vertikal */}
              <div
                aria-hidden="true"
                className="absolute -left-7 sm:-left-10 top-4 flex h-6 w-6 sm:h-8 sm:w-8 -translate-x-1/2 items-center justify-center rounded-full bg-black border-2 border-brand-red text-[11px] sm:text-xs font-black text-brand-orange shadow-[0_0_12px_rgba(120,6,6,0.6)]"
              >
                {stage.step}
              </div>

              {/* Kartu Tahap */}
              <article
                className={cn(
                  "rounded-2xl border bg-neutral-950/90 p-5 transition-all duration-300",
                  isExpanded
                    ? "border-brand-red/60 shadow-[0_0_24px_rgba(120,6,6,0.2)]"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                      Tahap {idx + 1} of 6
                    </span>
                    <h3 className="text-lg font-black tracking-tight text-white mt-0.5">
                      {stage.title}
                    </h3>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-zinc-300 shrink-0">
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-medium">
                  {stage.tagline}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-brand-orange" />
                    <span>{stage.estimatedDuration}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStep(stage.step)}
                    className="inline-flex items-center gap-1 font-bold text-brand-orange hover:text-white transition-colors"
                  >
                    <span>{isExpanded ? "Tutup" : "Rincian"}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        isExpanded ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>
                </div>

                {/* Detail expand mobile */}
                {isExpanded && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-dashed border-white/15">
                    <div className="rounded-lg bg-brand-red/10 border border-brand-red/25 p-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                        Hasil yang Anda Terima:
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-zinc-200">
                        {stage.deliverables}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Langkah Kegiatan:
                      </p>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {stage.details.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-brand-orange shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg bg-white/5 p-2 text-[11px] text-zinc-400">
                      <span className="font-bold text-zinc-300">Peran Klien: </span>
                      {stage.clientInput}
                    </div>
                  </div>
                )}
              </article>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          CALL TO ACTION (CTA): Konsultasi Gratis & Mulai Diskusi Proyek
          ======================================================== */}
      <div className="mt-14 sm:mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-brand-red/40 bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(120,6,6,0.25)]">
          {/* Ambient Glow di belakang CTA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-red/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-orange/15 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-red/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-brand-orange border border-brand-red/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Konsultasi Bebas Biaya</span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Punya Ide atau Ingin Konsultasi Website Bisnis Anda?
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-zinc-300 font-medium leading-relaxed">
              Tidak perlu bingung soal teknis. Diskusikan rencana dan tujuan bisnis Anda bersama kami secara santai. Gratis tanpa biaya atau komitmen awal — kami bantu petakan solusi website yang tepat sasaran sesuai anggaran Anda.
            </p>

            {/* Tombol Aksi */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/85559536429?text=Halo%20Akmal,%20saya%20tertarik%20konsultasi%20pembuatan%20website%20untuk%20bisnis%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-lg transition-all duration-300 hover:bg-brand-orange hover:text-white hover:shadow-[0_0_25px_rgba(255,141,40,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              >
                <MessageSquare className="h-4 w-4 text-black group-hover:text-white transition-colors" />
                <span>Mulai Diskusi Proyek</span>
              </a>

              <a
                href="mailto:tabani@email.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold tracking-wider text-zinc-300 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                <span>Kirim Email</span>
              </a>
            </div>

            {/* Poin Kepercayaan / Trust Perks */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0" />
                <span>Respon Cepat via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-orange shrink-0" />
                <span>100% Gratis Tanpa Komitmen Awal</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-brand-orange shrink-0" />
                <span>Solusi Ramah Budget UMKM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
