"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/config/site";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const weekdayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const subscribe = () => () => {};

// День недели в часовом поясе кафе. Число стабильно в течение дня, поэтому подписка не нужна.
const getToday = () =>
  weekdayIndex.indexOf(
    new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: site.hours.timeZone }).format(new Date()),
  );

// Неделя одним взглядом: рабочие дни зелёные, выходные приглушены, сегодняшний обведён.
export function WeekStrip() {
  // На сервере (статическая сборка) сегодняшнего дня нет — null; в браузере подставляется настоящий.
  const today = useSyncExternalStore(subscribe, getToday, () => null);

  return (
    <ul className="grid grid-cols-7 gap-1.5" aria-label="Рабочие дни недели">
      {days.map((day, index) => {
        const open = (site.hours.openDays as readonly number[]).includes(index);
        return (
          <li
            key={day}
            aria-current={today === index ? "date" : undefined}
            className={`rounded-xl py-2 text-center text-sm font-bold ${
              open ? "bg-olive-soft text-olive" : "bg-cream text-muted"
            } ${today === index ? "ring-2 ring-terracotta ring-offset-2 ring-offset-white" : ""}`}
          >
            {day}
            <span className="sr-only">{open ? ", работаем" : ", выходной"}</span>
          </li>
        );
      })}
    </ul>
  );
}
