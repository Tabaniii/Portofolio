"use client";

import { BentoGrid, BentoCard } from "./BentoGrid";
import { LayersIcon, DashboardIcon, BlendingModeIcon, ReaderIcon, FrameIcon, FileTextIcon } from "@radix-ui/react-icons";

export default function BentoSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center py-20" aria-label="Navigasi portfolio">
      <BentoGrid className="max-w-5xl mx-auto w-full auto-rows-[16rem]">
        {/* BARIS 1 */}
        {/* Kartu 1: Stack (Lebar 2 kolom) */}
        <BentoCard
          name="Stack"
          className="col-span-2"
          Icon={LayersIcon}
          description="Teknologi dan alat yang gua pakai buat ngebangun struktur di balik antarmuka digital."
          href="#stack"
          cta="Cek Stack"
          background={<div className="absolute inset-0 bg-zinc-900/40" />}
        />
        {/* Kartu 2: Projek (Lebar 1 kolom) */}
        <BentoCard
          name="Projek"
          className="col-span-1"
          Icon={DashboardIcon}
          description="Kumpulan karya dan eksperimen."
          href="#projek"
          cta="Lihat Projek"
          background={<div className="absolute inset-0 bg-brand-red/10" />}
        />

        {/* BARIS 2 */}
        {/* Kartu 3: Filosofi (Lebar 1 kolom) */}
        <BentoCard
          name="Filosofi"
          className="col-span-1"
          Icon={BlendingModeIcon}
          description="Prinsip desain dan cara gua mengeksekusi ide."
          href="#filosofi"
          cta="Baca Filosofi"
          background={<div className="absolute inset-0 bg-brand-red/10" />}
        />
        {/* Kartu 4: Pendidikan (Lebar 2 kolom) */}
        <BentoCard
          name="Pendidikan"
          className="col-span-2"
          Icon={ReaderIcon}
          description="Latar belakang akademis dan proses belajar gua yang terus berkembang."
          href="#pendidikan"
          cta="Riwayat Pendidikan"
          background={<div className="absolute inset-0 bg-zinc-900/40" />}
        />

        {/* BARIS 3 */}
        {/* Kartu 5: DKV Side (Lebar 2 kolom) */}
        <BentoCard
          name="Sisi DKV"
          className="col-span-2"
          Icon={FrameIcon}
          description="Eksplorasi visual, tipografi, dan komposisi yang jadi ruang bermain estetika gua."
          href="#dkv-side"
          cta="Lihat Desain"
          background={<div className="absolute inset-0 bg-zinc-900/40" />}
        />
        {/* Kartu 6: DW CV (Lebar 1 kolom) */}
        <BentoCard
          name="DW CV"
          className="col-span-1"
          Icon={FileTextIcon}
          description="Dokumen resume profesional."
          href="#cv"
          cta="Unduh CV"
          background={<div className="absolute inset-0 bg-brand-red/10" />}
        />
      </BentoGrid>
    </section>
  );
}
