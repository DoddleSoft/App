"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../../components/navbar";
import { WAVES } from "../../../utils/WAVES";

const ROLES = [
  "Junior Developer",
  "Web Developer",
  "Automation Engineer",
  "Full Stack Engineer (MERN)",
  "Vibe Coder",
];

export default function Careers() {
  const bgRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const layers =
      bgRef.current?.querySelectorAll<HTMLDivElement>(".wave-layer");
    if (!layers) return;

    const pause = () =>
      layers.forEach((el) => (el.style.animationPlayState = "paused"));

    const play = () =>
      layers.forEach((el) => (el.style.animationPlayState = "running"));

    const handleScroll = () => {
      play();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(pause, 300);
    };

    // Listen for desktop scroll (wheel) AND mobile swipe (touchmove)
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
        @keyframes waveScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        select option { background: #161536; color: white; }
      `}</style>

      {/* BACKGROUND */}
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

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* MAIN CONTENT - Tighter padding on mobile to prevent scroll */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-12 py-4 md:py-16">
          {/* Reduced gap on mobile */}
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 lg:gap-16 items-center">
            {/* LEFT: TEXT */}
            <div className="space-y-4 md:space-y-12 text-center lg:text-left">
              <div>
                <h1 className="text-4xl md:text-7xl font-recoleta [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] tracking-tight leading-tight uppercase mb-2 md:mb-6 mt-2 lg:mt-0">
                  Join the <br />
                  <span className="text-orange-300 [-webkit-text-stroke:1px_orange-200] md:[-webkit-text-stroke:2px_orange-200]">
                    Vibe Tribe
                  </span>
                </h1>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-4 text-orange-300 font-bold tracking-widest uppercase text-[10px] md:text-xs">
                <span className="h-[1px] w-6 md:w-8 bg-orange-300"></span>
                Remote Friendly • UK Based
              </div>
            </div>

            {/* RIGHT: CAREER FORM */}
            <div className="relative group w-full max-w-2xl mx-auto lg:max-w-none">
              <div
                className={`
                  relative bg-white/[0.03] backdrop-blur-md border border-white/10 
                  p-4 md:p-10 rounded-3xl md:rounded-4xl shadow-2xl
                  before:absolute before:inset-0 before:rounded-3xl md:before:rounded-4xl before:p-[1px] 
                  before:bg-gradient-to-br before:from-white/20 before:to-transparent 
                  before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                  before:mask-composite-exclude before:pointer-events-none
                `}
              >
                <form
                  className="space-y-3 md:space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* EMAIL & ROLE ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="johndoe@mail.com"
                        className="bg-white/[0.05] border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-4 text-sm md:text-base focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all placeholder:text-gray-500 md:placeholder:text-gray-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                        Desired Role
                      </label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          className="w-full bg-white/[0.05] border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-4 text-sm md:text-base focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all appearance-none text-gray-200"
                        >
                          <option value="" disabled>
                            Select a role
                          </option>
                          {ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-gray-400"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FILE UPLOAD ROW */}
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                      Resume / CV
                    </label>
                    <label className="group/file relative flex flex-col items-center justify-center w-full h-[80px] md:h-[140px] border-2 border-dashed border-white/10 rounded-xl md:rounded-2xl cursor-pointer hover:bg-white/[0.08] hover:border-orange-300 transition-all">
                      <div className="flex flex-col items-center justify-center text-gray-400 group-hover/file:text-orange-200 transition-colors">
                        <svg
                          className="w-5 h-5 mb-1 md:w-8 md:h-8 md:mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-xs md:text-sm font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-[10px] md:text-xs italic opacity-60 md:mt-1">
                          PDF, DOCX (MAX. 5MB)
                        </p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <button className="w-full bg-orange-200 text-black font-bold py-2.5 md:py-4 rounded-xl md:rounded-2xl hover:bg-orange-300 transition-all hover:scale-[1.01] active:scale-[0.98] uppercase tracking-tighter text-sm md:text-lg shadow-xl mt-2 md:mt-4">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
