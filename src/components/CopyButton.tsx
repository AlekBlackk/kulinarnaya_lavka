"use client";

import { useState } from "react";

// Копирует текст в буфер обмена (например, адрес, чтобы вставить в такси или навигатор).
export function CopyButton({ text, label = "Скопировать" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Буфер недоступен (старый браузер или http): ничего не ломаем, адрес остаётся на экране.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="-my-1 inline-flex min-h-11 items-center rounded-full px-1 text-sm font-semibold text-olive underline decoration-dotted underline-offset-4 transition hover:text-terracotta"
    >
      <span role="status">{copied ? "Скопировано ✓" : label}</span>
    </button>
  );
}
