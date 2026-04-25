"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Link from "next/link";

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

    const handleWheel = () => {
      play();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(pause, 300);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
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

        {/* PRODUCT CARDS SECTION */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full max-w-6xl">
            {PRODUCTS.map((product, idx) => (
              <div
                key={idx}
                className={`group relative bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/10
          flex flex-col md:even:items-end md:even:text-right md:odd:items-start md:odd:text-left items-start text-left`}
              >
                <span className="text-md uppercase tracking-widest text-orange-200 font-semibold mb-4 block">
                  {product.tag}
                </span>

                <h2 className="text-5xl font-bold mb-4 font-recoleta uppercase tracking-tight leading-tight">
                  {product.title}
                </h2>

                <p className="text-gray-200 text-lg mb-8 leading-relaxed max-w-md">
                  {product.description}
                </p>

                <Link
                  href={product.link}
                  className="inline-flex items-center gap-2 bg-orange-200 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-300 transition-colors"
                >
                  View Project
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
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
