"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import { WAVES } from "../../../utils/WAVES";

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

    const handleWheel = () => {
      play();
      // Clear any existing stop timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // Pause ~300ms after scrolling stops
      timeoutRef.current = setTimeout(pause, 300);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    // Start paused
    pause();

    return () => {
      window.removeEventListener("wheel", handleWheel);
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

      {/* BACKGROUND — fixed, scroll-driven animation */}
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
              width: "200%",
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

        {/* ABOUT US CONTENT LAYER */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full gap-16 items-center">
            {/* Left Side: Statement */}
            <div className="space-y-6">
              <h2 className="text-white text-6xl uppercase font-recoleta [-webkit-text-stroke:2px_white] tracking-tight leading-tight">
                We build Digital flow
              </h2>
              <p className="text-gray-200 text-lg max-w-4xl text-body leading-relaxed">
                At DoddleSoft, we craft high-performance apps that turn your
                toughest business challenges into simple, seamless solutions
                (doddles)—no headaches required.
              </p>
            </div>
            <Link
              href={"/contact"}
              className="inline-flex items-center gap-2 bg-orange-200 text-black px-6 py-3 rounded-full mt-10 font-bold hover:bg-orange-300 transition-colors"
            >
              Get in Touch
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
