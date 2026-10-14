"use client";

import { useEffect, useRef, useState } from "react";

// Число «набегает» от нуля, когда блок появляется на экране. Без JavaScript и при reduced motion сразу видно итог.
export function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1200, 1);
        setValue(to * (1 - (1 - t) ** 3)); // easeOutCubic
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return <span ref={ref}>{value.toFixed(decimals).replace(".", ",")}</span>;
}
