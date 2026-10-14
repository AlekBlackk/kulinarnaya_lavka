"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus } from "@/lib/openStatus";

// Пересчитываем раз в 30 секунд — хватает, чтобы минуты «до закрытия» были точными.
const subscribe = (onChange: () => void) => {
  const timer = setInterval(onChange, 30_000);
  return () => clearInterval(timer);
};
// Строка, а не объект: снимок должен быть стабильным между вызовами.
const getSnapshot = () => JSON.stringify(getOpenStatus(new Date()));

// Живой статус «открыто/закрыто». В статической сборке его нет (зависит от текущего времени),
// поэтому до загрузки скрипта место просто зарезервировано.
export function OpenNow({ className = "justify-center" }: { className?: string }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const status = snapshot ? (JSON.parse(snapshot) as ReturnType<typeof getOpenStatus>) : null;

  return (
    <p className={`flex min-h-9 ${className}`} role="status">
      {status && (
        <span
          className={`fade-in inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
            status.open ? "bg-olive-soft text-olive" : "bg-cream text-coffee-soft"
          }`}
        >
          <span aria-hidden="true" className="relative flex size-2.5">
            {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-olive/60 motion-reduce:hidden" />}
            <span className={`relative size-2.5 rounded-full ${status.open ? "bg-olive" : "bg-terracotta-soft"}`} />
          </span>
          {status.text}
        </span>
      )}
    </p>
  );
}
