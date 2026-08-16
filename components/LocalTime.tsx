"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Oslo",
        }),
      );
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}
