"use client";

import { Children, useState, type ReactNode } from "react";

export default function ShowMore({
  limit,
  children,
}: {
  limit: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);
  const visible = open ? items : items.slice(0, limit);
  const hidden = items.length - limit;

  return (
    <div className="space-y-2">
      {visible}
      {hidden > 0 && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-sm text-accent hover:underline"
        >
          {open ? "Show less" : `View ${hidden} more`}
        </button>
      )}
    </div>
  );
}
