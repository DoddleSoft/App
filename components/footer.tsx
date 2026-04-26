"use client";

import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/doddlesoft",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/doddlesoft/",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/doddlesoft",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@doddlesoft",
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-12 text-sm text-gray-400 relative z-50">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
        {/* Left Section: Brand & Copyright */}
        <div className="text-left">
          <p className="font-bold text-white">DoddleSoft</p>
          <p>&copy; {currentYear} All rights reserved.</p>
        </div>

        {/* middle social section */}
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="hover:text-white transition-all duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {social.icon}
              </svg>
            </Link>
          ))}
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
