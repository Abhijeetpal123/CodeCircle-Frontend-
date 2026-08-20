import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-[#EAE1D3] bg-[#FBF6EF]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-lg font-bold text-[#2B2A28]"
          aria-label="CodeCircle home"
        >
          CodeCircle
          <span className="h-2 w-2 rounded-full bg-[#E8624F] motion-safe:animate-pulse" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/login"
            className={`text-sm font-medium transition ${
              isActive("/login")
                ? "text-[#E8624F]"
                : "text-[#8A8178] hover:text-[#2B2A28]"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-[#E8624F] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544]"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-[#2B2A28] md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {isMenuOpen && (
        <div className="border-t border-[#EAE1D3] bg-[#FBF6EF] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive("/login") ? "text-[#E8624F]" : "text-[#8A8178]"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-[#E8624F] px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}