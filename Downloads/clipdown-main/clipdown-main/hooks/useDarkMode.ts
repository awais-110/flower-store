'use client';

import { useEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("videosnap-theme");
    if (stored) {
      const frame = window.requestAnimationFrame(() => setDarkMode(stored === "dark"));
      return () => window.cancelAnimationFrame(frame);
    }
    return undefined;
  }, []);

  useEffect(() => {
    window.localStorage.setItem("videosnap-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return { darkMode, setDarkMode };
}
