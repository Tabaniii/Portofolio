/**
 * Titik linimasa education / experience.
 *
 * Semua koordinat hidup di ruang model yang sudah dinormalisasi (lihat
 * NORMALIZED_SIZE di EducationScene): objek lukisannya di-center di origin
 * sumbu X/Z dengan alas di y = 0, dan diorama-nya diskalakan ke 10 unit.
 *
 * - `anchorPos` : titik di permukaan objek lukisan tempat kotak penanda menempel.
 * - `labelPos`  : ujung garis putus-putus / pangkal blok judul (tepat di samping teks).
 * - `labelSide` : teks merentang ke kiri atau kanan dari ujung garis.
 * - `cameraPos` / `targetPos` : perhentian kamera untuk node ini.
 *
 * Jarak X/Z antar node sengaja lebar supaya terbang antar tahun terasa
 * seperti berjalan ke titik berikutnya, bukan geser milimeter.
 */
export const educationData = [
  {
    year: "2014 - 2020",
    title: "SDN Grogol Utara 16 Pagi",
    subtitle: "Elementary School",
    cameraPos: [-5.2, 1.22, 7.4],
    targetPos: [-1.35, 0.58, 0.35],
    anchorPos: [-1.28, 0.64, 1.18],
    labelPos: [-3.15, 0.78, 2.05],
    labelSide: "left",
  },
  {
    year: "2020 - 2023",
    title: "SMP Negeri 16 Jakarta",
    subtitle: "Junior High School",
    cameraPos: [-2.6, 1.48, 4.35],
    targetPos: [-0.55, 0.72, -0.25],
    anchorPos: [-0.62, 0.82, 0.28],
    labelPos: [-2.45, 0.98, -0.15],
    labelSide: "left",
  },
  {
    year: "2023 - 2026",
    title: "SMK Negeri 6 Jakarta",
    subtitle: "Rekayasa Perangkat Lunak",
    cameraPos: [0.18, 1.82, 3.05],
    targetPos: [0.08, 0.84, -0.12],
    anchorPos: [0.06, 0.9, 0.92],
    labelPos: [2.15, 0.86, 1.55],
    labelSide: "right",
  },
  {
    year: "Nov 2025 - Feb 2026",
    title: "Rubicweb",
    subtitle: "Web Development Intern",
    cameraPos: [3.15, 1.38, 5.15],
    targetPos: [1.05, 0.64, 0.02],
    anchorPos: [0.78, 0.7, 0.42],
    labelPos: [2.85, 0.74, 0.88],
    labelSide: "right",
  },
  {
    year: "2026 - 2030",
    title: "Cakrawala University",
    subtitle: "Artificial Intelligence Major",
    cameraPos: [5.4, 1.62, 8.05],
    targetPos: [1.85, 0.72, -0.55],
    anchorPos: [1.42, 0.68, -0.42],
    labelPos: [3.55, 0.84, -0.18],
    labelSide: "right",
  },
];

/** Alias yang dipakai komponen scene / kartu. */
export const timelineData = educationData;

/** Dipakai kalau cameraPos / targetPos disetel ke nilai yang tidak valid. */
export const FALLBACK_CAMERA = {
  cameraPos: educationData[0].cameraPos,
  targetPos: educationData[0].targetPos,
};

function toTriple(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) return fallback;
  return value.every((axis) => typeof axis === "number" && Number.isFinite(axis))
    ? value
    : fallback;
}

export function resolveCameraStep(step) {
  return {
    cameraPos: toTriple(step?.cameraPos, FALLBACK_CAMERA.cameraPos),
    targetPos: toTriple(step?.targetPos, FALLBACK_CAMERA.targetPos),
  };
}

export function resolveNodePoints(step, index = 0) {
  const { cameraPos, targetPos } = resolveCameraStep(step);
  return {
    cameraPos,
    targetPos,
    anchorPos: toTriple(step?.anchorPos, targetPos),
    labelPos: toTriple(step?.labelPos, [
      targetPos[0] + 0.85,
      targetPos[1] + 0.28,
      targetPos[2] + 0.35 * index,
    ]),
    labelSide: step?.labelSide === "left" ? "left" : "right",
  };
}
