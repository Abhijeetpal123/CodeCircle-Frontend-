export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBF6EF]">
      <section className="px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#5B8C6E]">
          Welcome to CodeCircle
        </p>

        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#2B2A28] md:text-6xl">
          Find people who speak your stack.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#756F68] md:text-lg">
          Discover developers, build meaningful connections, share what you
          know, and grow together.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="rounded-full cursor-pointer bg-[#E8624F] px-7 py-3 text-sm font-semibold text-white shadow-sm">
            Join CodeCircle
          </button>

          <button className=" cursor-pointer rounded-full border border-[#EAE1D3] bg-white px-7 py-3 text-sm font-semibold text-[#5B8C6E]">
            Explore Developers
          </button>
        </div>
      </section>

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
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2B2A28]">Discover</h3>
              <p className="mt-2 text-sm leading-6 text-[#756F68]">
                Find developers using the technologies and skills you care
                about.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2B2A28]">Connect</h3>
              <p className="mt-2 text-sm leading-6 text-[#756F68]">
                Send connection requests and build your professional network.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2B2A28]">Grow</h3>
              <p className="mt-2 text-sm leading-6 text-[#756F68]">
                Share knowledge, collaborate, and grow with other developers.
              </p>
            </div>
          </div>
        </div>
      </section>
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
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#E8624F]">01</div>
              <h3 className="mt-3 font-bold text-[#2B2A28]">Create</h3>
              <p className="mt-2 text-sm text-[#756F68]">
                Build your developer profile with your skills and education.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#E8624F]">02</div>
              <h3 className="mt-3 font-bold text-[#2B2A28]">Discover</h3>
              <p className="mt-2 text-sm text-[#756F68]">
                Search and discover developers based on their skills.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#E8624F]">03</div>
              <h3 className="mt-3 font-bold text-[#2B2A28]">Connect</h3>
              <p className="mt-2 text-sm text-[#756F68]">
                Send connection requests and grow your network.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#E8624F]">04</div>
              <h3 className="mt-3 font-bold text-[#2B2A28]">Collaborate</h3>
              <p className="mt-2 text-sm text-[#756F68]">
                Connect, communicate, and build something together.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#5B8C6E]">
            Join the circle
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#2B2A28] md:text-4xl">
            Your next great connection could be one search away.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#756F68]">
            Build your profile, discover developers, and start growing your
            network.
          </p>

          <button className="mt-7 rounded-full bg-[#E8624F] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#DA5544]">
            Join CodeCircle
          </button>
        </div>
      </section>
    </main>
  );
}
