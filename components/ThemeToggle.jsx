"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Check current theme
    const checkTheme = () => {
      if (typeof window === "undefined") return false;
      
      try {
        const stored = localStorage.getItem("theme");
        if (stored === "dark") return true;
        if (stored === "light") return false;
      } catch (e) {
        console.error("Error reading theme:", e);
      }

      // Fallback to document class
      return document.documentElement.classList.contains("dark");
    };

    const dark = checkTheme();
    
    // Ensure dark class is applied if needed
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Update state after DOM manipulation
    requestAnimationFrame(() => {
      setIsDark(dark);
      setMounted(true);
    });
  }, []);

  const handleToggle = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    
    setIsDark((prev) => {
      const newDark = !prev;
      
      // Update localStorage
      try {
        localStorage.setItem("theme", newDark ? "dark" : "light");
      } catch (error) {
        console.error("Failed to save theme:", error);
      }
      
      // Update HTML class immediately
      const htmlEl = document.documentElement;
      if (newDark) {
        htmlEl.classList.add("dark");
      } else {
        htmlEl.classList.remove("dark");
      }
      
      return newDark;
    });
  }, []);

  // Attach direct event listener as fallback
  useEffect(() => {
    if (!mounted || !buttonRef.current) return;

    const button = buttonRef.current;
    
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleToggle(e);
    };

    button.addEventListener("click", handleClick, true);
    
    return () => {
      button.removeEventListener("click", handleClick, true);
    };
  }, [mounted, handleToggle]);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-slate-600 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300"
        aria-label="Toggle theme"
        disabled
      >
        <MdLightMode className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      style={{ pointerEvents: "auto", cursor: "pointer", position: "relative", zIndex: 1000 }}
      className="relative z-100 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-100 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <MdLightMode className="h-5 w-5 pointer-events-none" />
      ) : (
        <MdDarkMode color="#fb6913"  className="h-5 w-5 pointer-events-none" />
      )}
    </button>
  );
}

