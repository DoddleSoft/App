"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../../components/navbar";
import { WAVES } from "../../../utils/WAVES";

export default function Contact() {
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
        @keyframes waveScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
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
            {/* LEFT: INFO */}
            <div className="space-y-4 md:space-y-12 text-center lg:text-left">
              <div>
                <h1 className="text-4xl md:text-7xl font-recoleta [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] tracking-tight leading-tight uppercase mb-2 md:mb-6 mt-2 lg:mt-0">
                  Get in Touch
                </h1>
              </div>

              {/* Tighter spacing for contact details on mobile */}
              <div className="space-y-3 md:space-y-6">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-orange-300 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-0.5 md:mb-1">
                    Office
                  </span>
                  <p className="text-sm md:text-xl">
                    127 Foundry lane, Southampton, UK
                  </p>
                </div>

                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-orange-300 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-0.5 md:mb-1">
                    Inquiries
                  </span>
                  <p className="text-sm md:text-xl font-medium">
                    +44 7300 995914
                  </p>
                  <p className="text-sm md:text-xl text-gray-300">
                    contact@doddlesoft.com
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
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
                {/* Tighter form spacing on mobile */}
                <form className="space-y-3 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="bg-white/[0.05] border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-4 text-sm md:text-base focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all placeholder:text-gray-500 md:placeholder:text-gray-800"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-200 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="bg-white/[0.05] border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-4 text-sm md:text-base focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all placeholder:text-gray-500 md:placeholder:text-gray-800"
                        placeholder="john@doddlesoft.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-300 ml-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      className="bg-white/[0.05] border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-4 text-sm md:text-base focus:outline-none focus:border-orange-300 focus:bg-white/[0.08] transition-all placeholder:text-gray-500 md:placeholder:text-gray-800 resize-none h-20 md:h-auto"
                      placeholder="What's on your mind?"
                    ></textarea>
                  </div>

                  <button className="w-full bg-orange-200 text-black font-bold py-2.5 md:py-4 rounded-xl md:rounded-2xl hover:bg-orange-300 transition-all hover:scale-[1.01] active:scale-[0.98] uppercase tracking-tighter text-sm md:text-lg shadow-xl mt-2 md:mt-0">
                    Send Message
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
