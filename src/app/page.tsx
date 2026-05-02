"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { WAVES } from "../../utils/WAVES";

export default function Home() {
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

    const handleActivity = () => {
      play();
      // Clear any existing stop timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // Pause ~300ms after scrolling/swiping stops
      timeoutRef.current = setTimeout(pause, 300);
    };

    // Listen to both wheel (desktop) and touchmove (mobile)
    window.addEventListener("wheel", handleActivity, { passive: true });
    window.addEventListener("touchmove", handleActivity, { passive: true });

    // Start paused
    pause();

    return () => {
      window.removeEventListener("wheel", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
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

      {/* BACKGROUND — fixed, scroll/touch-driven animation */}
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
              // Enforcing min-width keeps desktop wave curves intact on mobile
              width: "max(200vw, 2560px)",
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

        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center md:text-right">
          {/* Removed w-full max-w-5xl so the block centers automatically like your original code */}
          <div className="flex flex-col items-center md:items-end">
            <h1 className="text-white text-5xl sm:text-6xl md:text-8xl uppercase font-recoleta [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] tracking-tight leading-tight mb-2 md:mb-4">
              Your Business
            </h1>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-recoleta text-gray-200/90 max-w-3xl">
              minus the boring part
            </h3>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
