export const units = (inp: string | number, unit?: "px" | "rem") =>
  `${inp}${unit || "rem"}`;
