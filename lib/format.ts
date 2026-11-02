
export function fmt12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);

  if (h === 24) return "12:00 AM";

  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;

  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function fmtDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
