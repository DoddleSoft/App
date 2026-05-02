"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../../components/navbar";
import Link from "next/link";
import { WAVES } from "../../../utils/WAVES";

const PRODUCTS = [
  {
    title: "SuperMock",
    description:
      "Manage your IELTS mock test and your center with SuperMock.net",
    link: "https://www.supermock.net/",
    tag: "IELTS mock tests",
  },
  {
    title: "Manifest",
    description:
      "AI Task Management, Goal Tracking & Project Planning Designed for Solopreneurs",
    link: "https://www.trymanifest.app/",
    tag: "Agentic AI",
  },
];

export default function Products() {
  const bgRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const layers =
      bgRef.current?.querySelectorAll<HTMLDivElement>(".wave-layer");
    if (!layers) return;

    const pause = () => {
      layers.forEach((el) => (el.style.animationPlayState = "paused"));
    };

    const play = () => {
      layers.forEach((el) => (el.style.animationPlayState = "running"));
    };

    const handleScroll = () => {
      play();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(pause, 300);
    };

    // Listen to both wheel (desktop) and touchmove (mobile)
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    pause();

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#09090b] text-white font-sans overflow-hidden">
      <style>{`
        @keyframes waveScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* BACKGROUND — Shared Component logic */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {WAVES.map((wave, i) => (
          <div
            key={i}
            className="wave-layer"
            style={{
              position: "absolute",
              inset: 0,
              // FIX: Ensures wave doesn't get squished on tall mobile screens
              width: "max(200vw, 400vh, 2560px)",
              willChange: "transform",
              animationName: "waveScroll",
              animationDuration: wave.duration,
              animationDelay: wave.delay,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: "paused",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2880 800"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <path fill={wave.fill} d={wave.d} />
            </svg>
          </div>
        ))}
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* PRODUCT CARDS SECTION - Tighter padding on mobile to prevent scroll */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-12 py-4 md:py-16">
          {/* Reduced gap on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 lg:gap-20 w-full max-w-6xl">
            {PRODUCTS.map((product, idx) => (
              <div
                key={idx}
                className={`group relative bg-white/[0.03] backdrop-blur-md border border-white/10 
                  p-6 md:p-10 rounded-3xl md:rounded-4xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08] shadow-2xl
                  flex flex-col items-center text-center md:even:items-end md:even:text-right md:odd:items-start md:odd:text-left`}
              >
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-orange-300 font-bold mb-2 md:mb-4 block">
                  {product.tag}
                </span>

                <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 font-recoleta uppercase tracking-tight leading-tight">
                  {product.title}
                </h2>

                <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8 leading-relaxed max-w-md">
                  {product.description}
                </p>

                <Link
                  href={product.link}
                  className="inline-flex items-center justify-center gap-2 bg-orange-200 text-black px-5 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-orange-300 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-tighter text-sm md:text-base shadow-xl"
                >
                  View Project
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
