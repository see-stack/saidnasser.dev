import {
  profile,
  projects,
  experience,
  education,
  skills,
  topSkills,
  toolGroups,
  contributions,
} from "@/lib/data";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import Collapsible from "@/components/Collapsible";
import ShowMore from "@/components/ShowMore";
import ToolIcon from "@/components/ToolIcon";
import Clock from "@/components/Clock";
import { getAllPosts } from "@/lib/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ProjectBox({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <h3 className="font-medium">
        {p.title}{" "}
        <span className="text-xs font-normal text-muted">· {p.description}</span>
      </h3>
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-2">
          <ProfileCard />

          <Collapsible
            title="🛠️ Skills"
            preview={
              <div className="flex flex-wrap gap-2">
                {topSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-chip px-2.5 py-1 font-mono text-[13px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {skills.map((g) => (
                <div key={g.label}>
                  <p className="text-xs font-medium text-muted">{g.label}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-chip px-2 py-0.5 font-mono text-[12px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible
            title="📝 Posts"
            minHeight={127}
            preview={
              <div className="space-y-1">
                {posts.slice(0, 3).map((p) => (
                  <div
                    key={p.slug}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <span className="truncate">{p.title}</span>
                    <span className="whitespace-nowrap text-xs text-muted">
                      {formatDate(p.date)}
                    </span>
                  </div>
                ))}
              </div>
            }
          >
            <ShowMore limit={3}>
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-baseline justify-between gap-3"
                >
                  <h3 className="font-medium hover:text-accent">{p.title}</h3>
                  <span className="whitespace-nowrap text-xs text-muted">
                    {formatDate(p.date)}
                  </span>
                </Link>
              ))}
            </ShowMore>
          </Collapsible>
        </div>

        {/* Column 2 (middle) */}
        <div className="flex flex-col gap-2">
          <Collapsible
            title="🧰 Tools"
            preview={
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <ToolIcon name="Claude Code" />
                  <span>Claude</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ToolIcon name="Obsidian" />
                  <span>Obsidian</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ToolIcon name="VS Code" />
                  <span>VS</span>
                </span>
              </div>
            }
          >
            <div className="space-y-3">
              {toolGroups.map((g) => (
                <div key={g.category}>
                  <h3 className="px-2 text-sm font-medium">{g.category}</h3>
                  <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {g.tools.map((t) => (
                      <a
                        key={t.name}
                        href={t.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 rounded-lg px-2 py-1 transition-colors hover:bg-chip"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                          <ToolIcon name={t.name} />
                        </span>
                        <span className="text-sm font-medium">{t.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>

          <div className="glare-card relative overflow-hidden rounded-xl border border-border bg-surface px-4 py-3 shadow-sm backdrop-blur-xl">
            <p className="text-sm font-medium">🕒 Local Time</p>
            <div className="mt-3">
              <Clock />
            </div>
          </div>

          <Collapsible
            title="🌱 Open Source"
            minHeight={95}
            preview={
              <div className="flex flex-wrap gap-2">
                {contributions.map((c) => (
                  <span
                    key={c.org}
                    className="rounded-full bg-chip px-2.5 py-1 font-mono text-[13px] text-muted"
                  >
                    {c.org}
                  </span>
                ))}
              </div>
            }
          >
            <div className="space-y-2">
              {contributions.map((c) => (
                <a
                  key={c.org}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-border p-2.5 transition-colors hover:bg-chip"
                >
                  <h3 className="text-sm font-medium">{c.org}</h3>
                  <p className="mt-0.5 text-xs leading-snug text-muted">
                    {c.description}
                  </p>
                </a>
              ))}
            </div>
          </Collapsible>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2">
          <Collapsible title="🎓 Education" preview="B.Sc Computer Engineering">
            <div className="space-y-4">
              {education.map((ed) => (
                <div key={ed.school}>
                  <h3 className="font-medium">{ed.degree}</h3>
                  <p className="text-sm text-muted">{ed.school}</p>
                  <p className="text-sm text-muted">{ed.date}</p>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="💼 Experience" preview="System Developer @ ibreezglobal">
            <ShowMore limit={2}>
              {experience.map((e) => (
                <div key={e.org} className="rounded-lg border border-border p-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium">
                      {e.title} <span className="text-muted">· {e.org}</span>
                    </h3>
                    <span className="whitespace-nowrap text-xs text-muted">
                      {e.date}
                    </span>
                  </div>
                </div>
              ))}
            </ShowMore>
          </Collapsible>

          <Collapsible
            title="🚀 Projects"
            preview={
              <div className="space-y-2">
                {projects.slice(0, 2).map((p) => (
                  <ProjectBox key={p.title} p={p} />
                ))}
              </div>
            }
          >
            <ShowMore limit={3}>
              {projects.map((p) => (
                <ProjectBox key={p.title} p={p} />
              ))}
            </ShowMore>
          </Collapsible>
        </div>
      </div>

        <footer className="mt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </footer>
      </div>
    </div>
  );
}
