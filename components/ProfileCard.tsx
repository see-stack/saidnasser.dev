"use client";

import Image from "next/image";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { profile } from "@/lib/data";
import LocalTime from "./LocalTime";

function Icon({
  children,
  className = "h-5 w-5 shrink-0",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const socials = [
  {
    name: "GitHub",
    href: profile.github,
    external: true,
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  {
    name: "LinkedIn",
    href: profile.linkedin,
    external: true,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v2a6 6 0 0 1 2-2z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: "Email",
    href: `mailto:${profile.email}`,
    external: false,
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
];

export default function ProfileCard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  const glareRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = glareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glare-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glare-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={glareRef}
      onMouseMove={handleMouseMove}
      className="glare-card relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-lg"
    >
      <div className="glare-overlay" aria-hidden="true" />
      <div className="flex w-full items-center gap-3 px-4 py-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center gap-4 text-left"
        >
          <Image
            src="/said-nasser.jpg"
            alt={profile.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0">
            <span className="block font-semibold">{profile.name}</span>
            <span className="block text-sm text-muted">{profile.role}</span>
          </div>
        </button>

        <div className="flex shrink-0 flex-col items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noreferrer" : undefined}
              aria-label={s.name}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-chip hover:text-accent"
            >
              <Icon className="h-4 w-4">{s.icon}</Icon>
            </a>
          ))}
        </div>
      </div>

      <div
        className="collapsible-body grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-5">
            <p className="text-sm leading-relaxed text-muted">
              {profile.summary}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2 text-muted">
                <Icon className="h-4 w-4">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </Icon>
                {profile.location} · <LocalTime />
              </p>
              <p className="flex items-center gap-2 text-muted">
                <Icon className="h-4 w-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </Icon>
                {profile.email}
              </p>
            </div>

            <a
              href="/cv.pdf"
              download="Said-Nasser-CV.pdf"
              className="no-print mt-5 block w-full rounded-full bg-accent py-2.5 text-center font-semibold text-background transition-opacity hover:opacity-90"
            >
              Download CV
            </a>

            <div className="mt-4 flex items-center justify-between text-sm text-muted">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Available
              </span>
              <button
                onClick={toggle}
                className="no-print rounded-full border border-border px-2 py-0.5 text-xs transition-colors hover:border-accent hover:text-accent"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
