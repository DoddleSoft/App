"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  // Shared style for nav items
  const navItemStyles =
    "cursor-pointer transition-colors whitespace-nowrap py-1";
  const activeStyles = "font-semibold border-b-2 border-white";
  const inactiveStyles = "hover:text-gray-300";

  return (
    <nav className="flex items-center justify-between px-12 py-8 relative z-50">
      <Link href="/">
        <p className="font-bold text-2xl tracking-tighter cursor-pointer">
          DoddleSoft
        </p>
      </Link>

      <div className="flex items-center gap-6 md:gap-10">
        <Link
          href="/career"
          className={`${navItemStyles} ${isActive("/career") ? activeStyles : inactiveStyles}`}
        >
          Career
        </Link>
        <Link
          href="/products"
          className={`${navItemStyles} ${isActive("/products") ? activeStyles : inactiveStyles}`}
        >
          Our Products
        </Link>

        <Link
          href="/about"
          className={`${navItemStyles} ${isActive("/about") ? activeStyles : inactiveStyles}`}
        >
          About Us
        </Link>

        <Link
          href="/contact"
          className={`${navItemStyles} ${isActive("/contact") ? activeStyles : inactiveStyles}`}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
