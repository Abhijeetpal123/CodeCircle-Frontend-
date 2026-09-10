import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Compass, Users, Sprout } from "lucide-react";

const techStack = ["React", "Node.js", "Python", "Go", "TypeScript", "Rust"];

const features = [
  {
    icon: Compass,
    title: "Discover",
    desc: "Find developers using the technologies and skills you care about.",
    color: "#E8624F",
  },
  {
    icon: Users,
    title: "Connect",
    desc: "Send connection requests and build your professional network.",
    color: "#5B8C6E",
  },
  {
    icon: Sprout,
    title: "Grow",
    desc: "Share knowledge, collaborate, and grow with other developers.",
    color: "#E8A94C",
  },
];

const steps = [
  { num: "01", title: "Create", desc: "Build your developer profile with your skills and education." },
  { num: "02", title: "Discover", desc: "Search and discover developers based on their skills." },
  { num: "03", title: "Connect", desc: "Send connection requests and grow your network." },
  { num: "04", title: "Collaborate", desc: "Connect, communicate, and build something together." },
];

const stepColors = ["#E8624F", "#5B8C6E", "#E8A94C"];

// Sample-only profiles for the playable hero demo — no backend calls, purely illustrative.
const demoProfiles = [
  { name: "Aisha Khan", role: "Backend Developer", initials: "AK", color: "#5B8C6E", skills: ["Node.js", "MongoDB"] },
  { name: "Rahul Sharma", role: "Frontend Developer", initials: "RS", color: "#E8624F", skills: ["React", "Tailwind"] },
  { name: "Priya Menon", role: "Full Stack Developer", initials: "PM", color: "#E8A94C", skills: ["Next.js", "PostgreSQL"] },
];

function HeroDemo() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(null); // null | "left" | "right"
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleChoice = (direction) => {
    if (leaving) return; // ignore clicks mid-animation
    setLeaving(direction);
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % demoProfiles.length);
      setLeaving(null);
    }, 250);
  };

  const profile = demoProfiles[index];

  const translateClass =
    leaving === "left"
      ? "-translate-x-10 opacity-0"
      : leaving === "right"
        ? "translate-x-10 opacity-0"
        : "translate-x-0 opacity-100";

  return (
    <div className="mx-auto w-full max-w-xs">
      <div
        className={`rounded-3xl bg-white p-6 text-left shadow-2xl shadow-[#E8624F]/10 transition-all duration-250 ${translateClass}`}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: profile.color }}
          >
            {profile.initials}
          </div>
          <div>
            <p className="font-bold text-[#2B2A28]">{profile.name}</p>
            <p className="text-xs text-[#8A8178]">{profile.role}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#F3E9DC] px-2.5 py-1 text-xs font-medium text-[#5B8C6E]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={() => handleChoice("left")}
            className="rounded-full border border-[#EAE1D3] px-5 py-2 text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC]"
          >
            Ignore
          </button>
          <button
            onClick={() => handleChoice("right")}
            className="rounded-full bg-[#E8624F] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544]"
          >
            Interested
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs font-medium text-[#8A8178]">
        👆 Try it yourself — sample profiles, real interaction
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBF6EF]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#5B8C6E]/20 blur-3xl" />
          <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#E8624F]/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#E8A94C]/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#5B8C6E]">
              Welcome to CodeCircle
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-[#2B2A28] md:text-6xl">
              Find people who speak your{" "}
              <span className="text-[#E8624F]">stack</span>.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#756F68] md:text-lg lg:mx-0">
              Discover developers, build meaningful connections, share what
              you know, and grow together.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/signup"
                className="rounded-full bg-[#E8624F] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E8624F]/30 transition hover:-translate-y-0.5 hover:bg-[#DA5544]"
              >
                Join CodeCircle
              </Link>

              <Link
                to="/feed"
                className="rounded-full border border-[#EAE1D3] bg-white px-7 py-3 text-sm font-semibold text-[#5B8C6E] transition hover:-translate-y-0.5 hover:bg-[#F3E9DC]"
              >
                Explore Developers
              </Link>
            </div>

            <p className="mt-9 text-xs font-semibold uppercase tracking-wide text-[#8A8178]">
              Works across every stack
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#EAE1D3] bg-white px-3 py-1 text-xs font-medium text-[#756F68]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroDemo />
          </div>
        </div>

        {/* Mobile: show the demo below the text instead of hiding it entirely */}
        <div className="relative z-10 mt-12 lg:hidden">
          <HeroDemo />
        </div>
      </section>

      {/* Why CodeCircle */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#5B8C6E]">
            Why CodeCircle?
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#2B2A28] md:text-4xl">
            Your skills are better when shared.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#756F68]">
            CodeCircle helps developers discover people with complementary
            skills, build genuine connections, and learn from each other.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl border-t-4 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                style={{ borderTopColor: color }}
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${color}1A` }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <h3 className="text-lg font-bold text-[#2B2A28]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#756F68]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#5B8C6E]">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#2B2A28] md:text-4xl">
              From discovery to connection.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => {
              const color = stepColors[i % stepColors.length];
              return (
                <div
                  key={step.num}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    {step.num}
                  </div>
                  <h3 className="mt-3 font-bold text-[#2B2A28]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#756F68]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#2B2A28] px-6 py-16 text-center shadow-xl">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#E8624F]/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#5B8C6E]/20 blur-2xl" />
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E8A94C]">
              Join the circle
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Your next great connection could be one search away.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[#C9C4BC]">
              Build your profile, discover developers, and start growing your
              network.
            </p>

            <Link
              to="/signup"
              className="mt-7 inline-block rounded-full bg-[#E8624F] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E8624F]/30 transition hover:-translate-y-0.5 hover:bg-[#DA5544]"
            >
              Join CodeCircle
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}   