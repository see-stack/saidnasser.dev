"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { profile } from "@/lib/data";

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

export default function Navbar() {
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

  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
      <nav className="flex items-center gap-4">
        <Link href="/" className="text-sm font-medium hover:text-accent">
          Home
        </Link>
        <Link href="/blog" className="text-sm font-medium hover:text-accent">
          Posts
        </Link>
      </nav>

      <div className="flex items-center gap-1">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-chip hover:text-accent"
        >
          <Icon>
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </Icon>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-chip hover:text-accent"
        >
          <Icon>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v2a6 6 0 0 1 2-2z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </Icon>
        </a>
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-chip hover:text-accent"
        >
          <Icon>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </Icon>
        </a>

        <span className="mx-1 h-5 w-px bg-border" />

        <button
          onClick={() => window.print()}
          aria-label="Resume"
          className="no-print rounded-lg p-1.5 text-muted transition-colors hover:bg-chip hover:text-accent"
        >
          <Icon>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </Icon>
        </button>

        <button
          onClick={toggle}
          aria-label="Theme"
          className="no-print rounded-lg p-1.5 text-muted transition-colors hover:bg-chip hover:text-accent"
        >
          {dark ? (
            <Icon>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </Icon>
          ) : (
            <Icon>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </Icon>
          )}
        </button>
      </div>
    </header>
  );
}
