"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-12 text-sm text-gray-400 relative z-50">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
        {/* Left Section: Brand & Copyright */}
        <div className="text-left">
          <p className="mb-1 font-semibold text-gray-200">DoddleSoft</p>
          <p>&copy; {currentYear} All rights reserved.</p>
        </div>

        {/* Right Section: Location & Contact */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <div className="flex items-center gap-2 mb-2">
            {/* Location Pin Icon */}
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
            <span className="hover:text-gray-200 transition-colors cursor-default">
              123-Southampton, Foundry lane, UK
            </span>
          </div>

          <p className="font-medium text-gray-300 tracking-wide">
            +44 7300 995914
          </p>

          <a
            href="mailto:contact@doddlesoft.com"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            contact@doddlesoft.com
          </a>
        </div>
      </div>
    </footer>
  );
}
