// UserCard.jsx (Sirf ek hi file rahegi pure project mein)
import { Link } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function UserCard({
  user,
  index,
  statusText,
  statusColor = "#E8624F",
  children,
}) {
  if (!user) return null;

  const skills = user.skills || [];
  const visibleSkills = skills.slice(0, 4);
  const extraSkillsCount = skills.length - visibleSkills.length;
  const color = avatarColors[index % avatarColors.length];

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-4 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: `${color}33`,
        boxShadow: `0 6px 18px -10px ${color}26`,
      }}
    >
      {/* Accent bar — always visible, overlays without adding height */}
      <div
        className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: color }}
      />

      {/* AVATAR — smaller, tighter margins */}
      <div className="relative mx-auto mb-2 mt-1 h-14 w-14 shrink-0 transition-transform duration-300 group-hover:scale-110">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-25 blur-md transition-opacity duration-300 group-hover:opacity-50"
          style={{ backgroundColor: color }}
        />
        {user.profilePic ? (
          <img
            src={
              user.profilePic.startsWith("http")
                ? user.profilePic
                : `https://codecircle-nq5c.onrender.com${user.profilePic}`
            }
            alt={`${user.firstName} ${user.lastName}`}
            className="h-14 w-14 rounded-full border-2 object-cover shadow-sm"
            style={{ borderColor: color }}
          />
        ) : (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-lg font-bold text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </div>
        )}
      </div>

      <h3 className="flex items-center justify-center text-sm font-bold text-[#2B2A28]">
        {user.firstName} {user.lastName}
      </h3>

      {statusText && (
        <span
          className="mt-1 inline-flex items-center gap-1 self-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: `${statusColor}1A`, color: statusColor }}
        >
          <UserPlus className="h-2.5 w-2.5" />
          {statusText}
        </span>
      )}

      {/* ABOUT — natural height now, no forced min-height padding out short bios */}
      <p className="mt-2 text-[12px] leading-4 text-[#756F68] line-clamp-2">
        {user.about || "This developer hasn't added a bio yet."}
      </p>

      {/* SKILLS — natural height */}
      {(visibleSkills.length > 0 || extraSkillsCount > 0) && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {visibleSkills.map((skill, skillIndex) =>
            skillIndex === 0 ? (
              <span
                key={skill}
                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: color }}
              >
                {skill}
              </span>
            ) : (
              <span
                key={skill}
                className="rounded-full border border-[#EAE1D3] bg-[#FBF6EF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#5B8C6E]"
              >
                {skill}
              </span>
            ),
          )}
          {extraSkillsCount > 0 && (
            <span className="rounded-full border border-[#EAE1D3] bg-[#FBF6EF] px-1.5 py-0.5 text-[10px] font-medium text-[#8A8178]">
              +{extraSkillsCount}
            </span>
          )}
        </div>
      )}

      {/* BOTTOM ACTIONS — tighter gap before buttons */}
      <div className="mt-auto flex flex-col pt-3">
        <Link
          to={`/user/${user._id}`}
          className="mb-2 inline-flex items-center justify-center gap-1 text-[12px] font-bold transition-all"
          style={{ color }}
        >
          View Profile
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <div className="flex gap-2">{children}</div>
      </div>
    </div>
  );
}