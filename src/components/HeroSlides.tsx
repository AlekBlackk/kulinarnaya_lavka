"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { FoodImage } from "./FoodImage";

const slides = site.heroSlides;

// Слайдшоу в арке первого экрана: блюда плавно сменяют друг друга, активное медленно «приближается».
// Пар показывается только на горячих блюдах (slide.steam). Родитель задаёт размер и скругление.
export function HeroSlides() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Таймер пересоздаётся при ручном переключении (index в зависимостях), чтобы слайд не сменился сразу после клика.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4800);
    return () => clearInterval(timer);
  }, [paused, index]);

  const current = slides[index];

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <div className={`absolute inset-0 ${i === index ? "kenburns" : ""}`}>
            <FoodImage
              src={slide.src}
              alt={slide.alt}
              sizes="(min-width: 1024px) 480px, (min-width: 448px) 448px, 100vw"
              preload={i === 0}
            />
          </div>
          {slide.steam && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="steam left-[28%]" />
              <span className="steam left-[48%] [animation-delay:1.4s]" />
              <span className="steam left-[66%] [animation-delay:2.6s]" />
            </div>
          )}
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-coffee/60 to-transparent px-5 pb-4 pt-14 text-white">
        <p key={index} className="fade-in text-sm font-semibold leading-tight">
          {current.label}
        </p>
        <div className="flex shrink-0 items-center">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Показать: ${slide.label}`}
              aria-current={i === index}
              className="group flex h-11 items-center px-2"
            >
              <span
                className={`block h-2 rounded-full bg-white transition-all duration-300 ${
                  i === index ? "w-6" : "w-2 opacity-50 group-hover:opacity-80"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
