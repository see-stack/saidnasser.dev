"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Oslo",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Oslo",
  });

  return (
    <div className="rounded-lg bg-background py-4 text-center">
      <p className="text-sm text-muted opacity-60">{date}</p>
      <p className="mt-1 text-[28px] font-medium tracking-[0.1em]">{time}</p>
    </div>
  );
}
