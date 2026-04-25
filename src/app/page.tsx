"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  {
    fill: "#f2a67e",
    d: "M0,100 C250,200 450,-50 720,100 C1000,250 1200,50 1440,100 C1690,200 1890,-50 2160,100 C2440,250 2640,50 2880,100 L2880,800 L0,800 Z",
    duration: "8s",
    delay: "0s",
  },
  {
    fill: "#e66885",
    d: "M0,200 C250,150 450,300 720,200 C1000,100 1200,250 1440,200 C1690,150 1890,300 2160,200 C2440,100 2640,250 2880,200 L2880,800 L0,800 Z",
    duration: "11s",
    delay: "-2s",
  },
  {
    fill: "#bc4d90",
    d: "M0,320 C250,420 450,220 720,320 C1000,420 1200,270 1440,320 C1690,420 1890,220 2160,320 C2440,420 2640,270 2880,320 L2880,800 L0,800 Z",
    duration: "14s",
    delay: "-4s",
  },
  {
    fill: "#8e4693",
    d: "M0,450 C250,350 450,550 720,450 C1000,350 1200,500 1440,450 C1690,350 1890,550 2160,450 C2440,350 2640,500 2880,450 L2880,800 L0,800 Z",
    duration: "9s",
    delay: "-1s",
  },
  {
    fill: "#543c7f",
    d: "M0,580 C250,680 450,480 720,580 C1000,680 1200,530 1440,580 C1690,680 1890,480 2160,580 C2440,680 2640,530 2880,580 L2880,800 L0,800 Z",
    duration: "12s",
    delay: "-3s",
  },
  {
    fill: "#312c5f",
    d: "M0,680 C250,630 450,730 720,680 C1000,630 1200,710 1440,680 C1690,630 1890,730 2160,680 C2440,630 2640,710 2880,680 L2880,800 L0,800 Z",
    duration: "16s",
    delay: "-5s",
  },
  {
    fill: "#161536",
    d: "M0,750 C250,780 450,720 720,750 C1000,780 1200,730 1440,750 C1690,780 1890,720 2160,750 C2440,780 2640,730 2880,750 L2880,800 L0,800 Z",
    duration: "7s",
    delay: "-2s",
  },
];

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
        <nav className="flex items-center justify-between px-12 py-8">
          <p className="font-bold text-2xl tracking-tighter cursor-pointer">
            DoddleSoft
          </p>
          <div className="flex items-center gap-8 md:gap-12">
            <p className="cursor-pointer hover:text-gray-300 transition-colors whitespace-nowrap">
              Our Products
            </p>
            <p className="cursor-pointer hover:text-gray-300 transition-colors whitespace-nowrap">
              About Us
            </p>
            <p className="cursor-pointer hover:text-gray-300 transition-colors whitespace-nowrap">
              Contact Us
            </p>
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-right">
          <div className="flex flex-col items-end">
            <h1 className="text-white text-8xl uppercase font-recoleta [-webkit-text-stroke:2px_white] tracking-tight leading-tight mb-4">
              Your Business
            </h1>
            <h3 className="text-5xl font-recoleta text-gray-200/90 max-w-3xl">
              minus the boring part
            </h3>
          </div>
        </div>

        <footer className="py-8 px-12 text-sm text-gray-400">
          <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
            {/* Left Section: Copyright */}
            <div className="text-left">
              <p>
                &copy; {new Date().getFullYear()} DoddleSoft. All rights
                reserved.
              </p>
            </div>

            {/* Right Section: Location & Contact */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="flex items-center gap-2 mb-2">
                {/* Simple Pin Icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>123-Southampton, Foundry lane, UK</span>
              </div>
              <p className="font-medium">+44 7300 995914</p>
              <a
                href="mailto:help@doddlesoft.com"
                className="hover:text-white transition-colors"
              >
                help@doddlesoft.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
