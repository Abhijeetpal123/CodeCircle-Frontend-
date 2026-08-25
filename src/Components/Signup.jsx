import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

// Loose, hand-placed cluster — deliberately not a grid, to feel organic.
const circles = [
  { size: 120, top: "6%", left: "10%", color: "#E8624F", opacity: 0.9 },
  { size: 60, top: "4%", left: "48%", color: "#5B8C6E", opacity: 0.85 },
  { size: 42, top: "16%", left: "72%", color: "#E8A94C", opacity: 0.9 },
  { size: 88, top: "24%", left: "6%", color: "#5B8C6E", opacity: 0.4 },
  { size: 54, top: "22%", left: "34%", color: "#E8624F", opacity: 0.3 },
  { size: 150, top: "36%", left: "56%", color: "#5B8C6E", opacity: 0.5 },
  { size: 34, top: "42%", left: "16%", color: "#E8A94C", opacity: 0.8 },
  { size: 70, top: "52%", left: "42%", color: "#E8624F", opacity: 0.7 },
  { size: 100, top: "58%", left: "8%", color: "#E8A94C", opacity: 0.35 },
  { size: 46, top: "64%", left: "70%", color: "#5B8C6E", opacity: 0.85 },
  { size: 130, top: "74%", left: "30%", color: "#E8624F", opacity: 0.25 },
  { size: 56, top: "82%", left: "60%", color: "#5B8C6E", opacity: 0.6 },
];

const bulletColors = ["#E8624F", "#5B8C6E", "#E8A94C"];

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailID: "",
    passWord: "",
    confirmPassword: "",
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

    if (formData.passWord.length < 8) {
      setError("Password needs to be at least 8 characters.");
      return;
    }
    if (formData.passWord !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:7777/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailID: formData.emailID,
          passWord: formData.passWord,
        },
        { withCredentials: true },
      );
      navigate("/"); // send them wherever a logged-in user should land
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

  const bullets = [
    "Ask the question you'd hesitate to ask elsewhere",
    "Celebrate the win nobody else will notice",
    "Find your people, not just your next role",
  ];

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
            a community for people who build
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#2B2A28]">
            Great things happen when developers show up for each other.
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
          className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 shadow-xl shadow-[#E8624F]/10"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <h1 className="text-2xl font-bold text-[#2B2A28]">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[#756F68]">
              Join CodeCircle and connect with developers.
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

          <div className="grid grid-cols-2 gap-4">
            <label
              htmlFor="firstName"
              className="flex flex-col gap-2 text-sm font-medium text-[#2B2A28]"
            >
              First name
              <input
                id="firstName"
                type="text"
                required
                autoComplete="given-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
              />
            </label>

            <label
              htmlFor="lastName"
              className="flex flex-col gap-2 text-sm font-medium text-[#2B2A28]"
            >
              Last name
              <input
                id="lastName"
                type="text"
                required
                autoComplete="family-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
              />
            </label>
          </div>

          <label
            htmlFor="emailID"
            className="flex flex-col gap-2 text-sm font-medium text-[#2B2A28]"
          >
            Email
            <input
              id="emailID"
              type="email"
              required
              autoComplete="email"
              name="emailID"
              value={formData.emailID}
              onChange={handleChange}
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
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                name="passWord"
                value={formData.passWord}
                onChange={handleChange}
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
            <span className="text-xs font-normal text-[#8A8178]">
              At least 8 characters
            </span>
          </label>

          <label
            htmlFor="confirmPassword"
            className="flex flex-col gap-2 text-sm font-medium text-[#2B2A28]"
          >
            Confirm password
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E8624F] px-4 py-2.5 font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] focus:outline-none focus:ring-2 focus:ring-[#E8624F]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p className="text-center text-sm text-[#756F68]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#5B8C6E] hover:text-[#456F55]"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
