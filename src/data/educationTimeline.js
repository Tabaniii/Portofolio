/**
 * Titik linimasa education / experience.
 *
 * Semua koordinat hidup di ruang model yang sudah dinormalisasi (lihat
 * NORMALIZED_SIZE di EducationScene): objek lukisannya di-center di origin
 * sumbu X/Z dengan alas di y = 0, dan diorama-nya diskalakan ke 10 unit.
 *
 * Tiap jenjang nempel di aset 3D yang terlihat di screenshot:
 * 1. SDN  — kotak kayu + jam oranye ber-semut (dekat, dari kiri-bawah)
 * 2. SMP  — jam meleleh di tepi kotak / jam gantung di pohon
 * 3. SMK  — komposisi penuh (wajah organik + semua jam)
 * 4. Intern — platform air biru di kiri, kamera rendah menghadap horizon
 * 5. Universitas — tebing emas di kanan, sudut rendah yang sama
 *
 * Scene dibuka di kotak bawah supaya jam meleleh langsung kebaca, lalu
 * scroll terbang ke aset berikutnya.
 */
export const INITIAL_STEP_INDEX = 0;

export const educationData = [
  {
    year: "2014 - 2020",
    title: "SDN Grogol Utara 16 Pagi",
    subtitle: "Elementary School",
    cameraPos: [-0.88, 0.52, 2.18],
    targetPos: [-0.14, 0.66, 1.16],
    anchorPos: [-0.21, 0.58, 1.28],
    labelPos: [-0.45, 0.5, 1.42],
    labelSide: "left",
  },
  {
    year: "2020 - 2023",
    title: "SMP Negeri 16 Jakarta",
    subtitle: "Junior High School",
    cameraPos: [0.82, 0.48, 2.28],
    targetPos: [-0.06, 0.78, 1.08],
    anchorPos: [-0.11, 0.72, 1.16],
    labelPos: [0.06, 0.56, 1.58],
    labelSide: "left",
  },
  {
    year: "2023 - 2026",
    title: "SMK Negeri 6 Jakarta",
    subtitle: "Rekayasa Perangkat Lunak",
    cameraPos: [0.22, 0.7, 1.82],
    targetPos: [0.2, 0.58, 0.84],
    anchorPos: [0.33, 0.68, 0.88],
    labelPos: [0.42, 0.62, 1.25],
    labelSide: "right",
  },
  {
    year: "November 2025 - February 2026",
    title: "Rubicweb",
    subtitle: "Web Development Intern",
    cameraPos: [0.1, 1.14, 0.7],
    targetPos: [-0.38, 1.34, -1.5],
    anchorPos: [-1.12, 1.18, -0.88],
    labelPos: [0.11, 1.15, -0.18],
    labelSide: "right",
    labelTone: "bright",
  },
  {
    year: "2026 - 2030",
    title: "Cakrawala University",
    subtitle: "Jurusan Artificial Intelligence",
    cameraPos: [0.48, 1.28, 0.92],
    targetPos: [0.42, 1.68, -1.65],
    anchorPos: [1.08, 1.38, -1.32],
    labelPos: [0.67, 1.37, -0.02],
    labelSide: "right",
    labelTone: "bright",
  },
];

/** Alias yang dipakai komponen scene / kartu. */
export const timelineData = educationData;

/** Dipakai kalau cameraPos / targetPos disetel ke nilai yang tidak valid. */
export const FALLBACK_CAMERA = {
  cameraPos: educationData[INITIAL_STEP_INDEX].cameraPos,
  targetPos: educationData[INITIAL_STEP_INDEX].targetPos,
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
    labelTone: step?.labelTone === "bright" ? "bright" : "default",
  };
}
