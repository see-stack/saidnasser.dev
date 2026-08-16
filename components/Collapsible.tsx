"use client";

import { useState, useRef, type ReactNode } from "react";

export default function Collapsible({
  title,
  preview,
  children,
  defaultOpen = false,
  minHeight,
}: {
  title: string;
  preview?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  minHeight?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
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
      <button
        onClick={() => setOpen((o) => !o)}
        className="block w-full px-4 py-3 text-left"
        style={!open && minHeight ? { minHeight } : undefined}
      >
        <span className="block text-sm font-medium">{title}</span>
        {!open && preview && (
          <div className="mt-2.5 text-sm text-muted">{preview}</div>
        )}
      </button>
      <div
        className="collapsible-body grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
