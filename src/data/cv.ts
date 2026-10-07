/**
 * Language-independent CV facts, from public/Aurelien_Pons_CV.pdf. The prose (summary, skills,
 * bullets, titles) lives in i18n/cv-copy.ts; experience and education entries there line up
 * by index with the dates here.
 */
export const cv = {
  name: "Aurélien Pons",
  phone: "+49 152 33570697",
  email: "ariimoanapons@gmail.com",
  linkedin: "https://linkedin.com/in/aurelienpons2004",
  pdf: "/Aurelien_Pons_CV.pdf",

  experience: [
    { start: "09.2025", end: null },
    { start: "09.2024", end: "02.2025" },
    { start: "06.2023", end: "03.2024" },
    { start: "2023", end: null },
  ],

  education: [
    { start: "07.2025", end: "06.2027", expected: true },
    { start: "02.2023", end: "07.2025", expected: false },
  ],
};
