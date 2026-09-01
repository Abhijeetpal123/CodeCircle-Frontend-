import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:7777/profile/view", {
          withCredentials: true,
        });
        console.log("AUTH SUCCESS:", res.data);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("AUTH FAILED:", err.response?.data || err.message);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, [location.pathname]);

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition ${
      isActive(path) ? "text-[#E8624F]" : "text-[#8A8178] hover:text-[#2B2A28]"
    }`;

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
          {isLoggedIn ? (
            <>
              <Link className={navLinkClass("/feed")} to="/feed">
                Feed
              </Link>
              <Link className={navLinkClass("/request")} to="/request">
                Requests
              </Link>
              <Link className={navLinkClass("/connection")} to="/connection">
                Connections
              </Link>
              <Link className={navLinkClass("/profile")} to="/profile">
                Profile
              </Link>

              <button
                onClick={handleLogOut}
                className="rounded-full border border-[#EAE1D3] px-5 py-2 text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC] cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={navLinkClass("/login")} to="/login">
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-[#E8624F] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-[#2B2A28] md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile panel */}
      {isMenuOpen && (
        <div className="border-t border-[#EAE1D3] bg-[#FBF6EF] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/feed"
                  onClick={() => setIsMenuOpen(false)}
                  className={navLinkClass("/feed")}
                >
                  Feed
                </Link>
                <Link
                  to="/request"
                  onClick={() => setIsMenuOpen(false)}
                  className={navLinkClass("/request")}
                >
                  Requests
                </Link>
                <Link
                  to="/connection"
                  onClick={() => setIsMenuOpen(false)}
                  className={navLinkClass("/connection")}
                >
                  Connections
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={navLinkClass("/profile")}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogOut();
                  }}
                  className="rounded-full border border-[#EAE1D3] px-5 py-2 text-center text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={navLinkClass("/login")}
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}