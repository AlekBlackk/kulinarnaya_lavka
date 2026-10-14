import { site } from "@/config/site";

const weekdayIndex: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
const onDay = ["в понедельник", "во вторник", "в среду", "в четверг", "в пятницу", "в субботу", "в воскресенье"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const duration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h && `${h} ч`, m && `${m} мин`].filter(Boolean).join(" ");
};

// День недели (0 = понедельник) и минуты от полуночи — по часам кафе, а не посетителя.
function cafeTime(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: site.hours.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  return { day: weekdayIndex[parts.weekday], minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

export function getOpenStatus(now: Date): { open: boolean; text: string } {
  const { openDays, opens, closes } = site.hours;
  const isOpenDay = (d: number) => (openDays as readonly number[]).includes(d);
  const { day, minutes } = cafeTime(now);

  if (isOpenDay(day) && minutes >= toMinutes(opens) && minutes < toMinutes(closes)) {
    return { open: true, text: `Открыто до ${closes} · ещё ${duration(toMinutes(closes) - minutes)}` };
  }

  // Ближайшее открытие: сегодня (если ещё не открылись), иначе следующий рабочий день.
  for (let offset = 0; offset < 7; offset++) {
    const d = (day + offset) % 7;
    if (!isOpenDay(d) || (offset === 0 && minutes >= toMinutes(opens))) continue;
    const when = offset === 0 ? "сегодня" : offset === 1 ? "завтра" : onDay[d];
    return { open: false, text: `Закрыто · откроемся ${when} в ${opens}` };
  }
  return { open: false, text: "Закрыто" };
}
