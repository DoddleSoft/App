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

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex items-center justify-center px-12 py-16">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: TEXT */}
            <div className="space-y-8">
              <div>
                <h1 className="text-7xl font-recoleta [-webkit-text-stroke:2px_white] tracking-tight leading-tight uppercase mb-6">
                  Join the <br />
                  <span className="text-orange-300 [-webkit-text-stroke:2px_orange-200]">
                    Vibe Tribe
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-4 text-orange-300 font-bold tracking-widest uppercase text-xs">
                <span className="h-[1px] w-8 bg-orange-300"></span>
                Remote Friendly • UK Based
              </div>
            </div>

            {/* RIGHT: CAREER FORM */}
            <div className="relative group">
              <div
                className={`
      relative bg-white/[0.03] backdrop-blur-md border border-white/10 p-10 rounded-4xl shadow-2xl
      before:absolute before:inset-0 before:rounded-4xl before:p-[1px] 
      before:bg-gradient-to-br before:from-white/20 before:to-transparent 
      before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
      before:mask-composite-exclude before:pointer-events-none
    `}
              >
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* EMAIL & ROLE ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="johndoe@mail.com"
                        className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all placeholder:text-gray-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                        Desired Role
                      </label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          className="w-full bg-white/[0.05] border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all appearance-none text-gray-200"
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
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                      Resume / CV
                    </label>
                    <label className="group/file relative flex flex-col items-center justify-center w-full h-[140px] border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/[0.08] hover:border-orange-300 transition-all">
                      <div className="flex flex-col items-center justify-center text-gray-400 group-hover/file:text-orange-200 transition-colors">
                        <svg
                          className="w-8 h-8 mb-2"
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
                        <p className="text-sm font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs italic opacity-60">
                          PDF, DOCX (MAX. 5MB)
                        </p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <button className="w-full bg-orange-200 text-black font-bold py-4 rounded-2xl hover:bg-orange-300 transition-all hover:scale-[1.01] active:scale-[0.98] uppercase tracking-tighter text-lg shadow-xl mt-4">
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
