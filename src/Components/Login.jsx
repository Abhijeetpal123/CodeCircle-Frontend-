import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

const circles = [
  { size: 110, top: "8%", left: "14%", color: "#5B8C6E", opacity: 0.85 },
  { size: 50, top: "6%", left: "50%", color: "#E8624F", opacity: 0.8 },
  { size: 36, top: "18%", left: "70%", color: "#E8A94C", opacity: 0.85 },
  { size: 80, top: "26%", left: "8%", color: "#E8624F", opacity: 0.35 },
  { size: 48, top: "24%", left: "38%", color: "#5B8C6E", opacity: 0.3 },
  { size: 140, top: "38%", left: "58%", color: "#E8624F", opacity: 0.45 },
  { size: 30, top: "46%", left: "18%", color: "#E8A94C", opacity: 0.8 },
  { size: 64, top: "54%", left: "44%", color: "#5B8C6E", opacity: 0.7 },
  { size: 96, top: "60%", left: "10%", color: "#E8A94C", opacity: 0.3 },
  { size: 42, top: "66%", left: "72%", color: "#E8624F", opacity: 0.8 },
  { size: 120, top: "76%", left: "32%", color: "#5B8C6E", opacity: 0.25 },
  { size: 52, top: "84%", left: "62%", color: "#E8624F", opacity: 0.55 },
];

const bullets = [
  "Pick up right where you left off",
  "See what your circle shipped while you were away",
  "Jump back into the conversations that matter",
];

const bulletColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailID: "",
    passWord: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:7777/login",
        {
          emailID: formData.emailID,
          passWord: formData.passWord,
        },
        { withCredentials: true },
      );
      navigate("/"); // adjust to wherever a logged-in user should land
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[#FBF6EF] lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-[#F3E9DC] lg:flex lg:flex-col lg:justify-end lg:p-12">
        <div aria-hidden="true" className="absolute inset-0">
          {circles.map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: c.size,
                height: c.size,
                top: c.top,
                left: c.left,
                backgroundColor: c.color,
                opacity: c.opacity,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-sm space-y-6 rounded-3xl bg-[#FBF6EF]/70 p-8 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5B8C6E]">
            good to see you again
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#2B2A28]">
            Your circle's been waiting for you.
          </h2>
          <ul className="space-y-3 text-sm text-[#756F68]">
            {bullets.map((text, i) => (
              <li key={text} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: bulletColors[i % bulletColors.length],
                  }}
                />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Right: form */}
      <section className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 shadow-xl shadow-[#E8624F]/10"
          noValidate
        >
          <div>
            <h1 className="text-2xl font-bold text-[#2B2A28]">Welcome back</h1>
            <p className="mt-2 text-sm text-[#756F68]">
              Login to continue to CodeCircle.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-[#C4483D]/30 bg-[#C4483D]/10 px-3 py-2.5 text-sm text-[#C4483D]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <label
              htmlFor="emailID"
              className="flex flex-col gap-2 text-sm font-medium text-[#2B2A28]"
            >
              Email
              <input
                id="emailID"
                value={formData.emailID}
                onChange={handleChange}
                required
                type="email"
                name="emailID"
                autoComplete="email"
                disabled={isSubmitting}
                className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
              />
            </label>

            <label
              htmlFor="passWord"
              className="flex flex-col gap-2 text-sm font-medium text-[#2B2A28]"
            >
              Password
              <div className="relative">
                <input
                  id="passWord"
                  value={formData.passWord}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  name="passWord"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 pr-10 text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8178] transition hover:text-[#2B2A28]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E8624F] px-4 py-2.5 font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] focus:outline-none focus:ring-2 focus:ring-[#E8624F]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in…
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm text-[#756F68]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#5B8C6E] hover:text-[#456F55]"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
