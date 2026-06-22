import Image from "next/image";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { team, type TeamMember } from "@/data/site";

/** Returns up to two uppercase initials from a name. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function StatusBadge({ status }: { status: TeamMember["status"] }) {
  const available = status === "available";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] ${
        available
          ? "border-white/20 text-foreground"
          : "border-white/10 text-muted/70"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${
          available ? "bg-emerald-400" : "bg-muted/50"
        }`}
      />
      {available ? "Available" : "Coming soon"}
    </span>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const isPlaceholder = member.status === "coming-soon";

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border p-6 transition-colors sm:p-7 ${
        isPlaceholder
          ? "border-dashed border-white/12 bg-transparent"
          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Avatar / placeholder.
            TODO: Add real member photos under /public/team/ and render here. */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-semibold ${
            isPlaceholder
              ? "border-white/10 text-muted/50"
              : "border-white/15 bg-white/[0.04] text-foreground"
          }`}
          aria-hidden
        >
          {isPlaceholder ? (
            <Image
              src="/brand/peak-status-submark-transparent.png"
              alt=""
              width={28}
              height={28}
              className="h-5 w-auto opacity-30"
            />
          ) : (
            initials(member.name)
          )}
        </div>
        <StatusBadge status={member.status} />
      </div>

      <h3
        className={`mt-5 font-display text-lg font-semibold ${
          isPlaceholder ? "text-muted" : "text-foreground"
        }`}
      >
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-muted">{member.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {member.description}
      </p>

      {member.skills.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground/80"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      {member.portfolio && (
        <a
          href={member.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
        >
          View portfolio
          <span aria-hidden>↗</span>
        </a>
      )}
    </article>
  );
}

export default function Team() {
  return (
    <Section id="team">
      <SectionHeading
        eyebrow="Team"
        title="The people behind Peak Status"
        description="A small, multidisciplinary team combining creative design, marketing, and technical implementation. More profiles are on the way."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <Reveal key={`${member.name}-${i}`} delay={(i % 3) * 70}>
            <MemberCard member={member} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
