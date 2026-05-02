"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling on the body when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Close the mobile menu automatically if the screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navItemStyles =
    "cursor-pointer transition-colors whitespace-nowrap py-1";
  const activeStyles = "font-semibold border-b-2 border-white text-white";
  const inactiveStyles = "text-gray-300 hover:text-white";

  const navLinks = [
    { name: "Career", path: "/career" },
    { name: "Our Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-8 relative z-50">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2 group relative z-50">
        <Image
          src="/logo.svg"
          alt="DoddleSoft Logo"
          width={30}
          height={30}
          priority
          className="transition-transform group-hover:scale-105"
        />
        <p className="font-bold ms-1 text-xl md:text-2xl tracking-tighter cursor-pointer text-white">
          DoddleSoft
        </p>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex items-center gap-6 md:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${navItemStyles} ${
              isActive(link.path) ? activeStyles : inactiveStyles
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* MOBILE HAMBURGER / CLOSE BUTTON */}
      <button
        className="md:hidden relative z-50 p-2 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* MOBILE GLASSMORPHIC DROPDOWN BOX */}
      {isOpen && (
        <div className="absolute w-48 top-14 right-6 mt-4 md:hidden z-40">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] rounded-2xl p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg text-right tracking-wide ${navItemStyles} ${
                  isActive(link.path)
                    ? "font-bold text-white underline"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
