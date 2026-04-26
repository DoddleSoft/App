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
