"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Density = "compact" | "comfortable" | "spacious";

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  primary: string;
  setPrimary: (c: string) => void;
  density: Density;
  setDensity: (d: Density) => void;
  animations: boolean;
  setAnimations: (v: boolean) => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

const PRESETS = ["#01875f", "#1a73e8", "#9334e6", "#d93025", "#f9ab00", "#202124"];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [primary, setPrimaryState] = useState("#01875f");
  const [density, setDensityState] = useState<Density>("comfortable");
  const [animations, setAnimationsState] = useState(true);

  useEffect(() => {
    const t = (localStorage.getItem("os_theme") as Theme) || "light";
    const p = localStorage.getItem("os_primary") || "#01875f";
    const d = (localStorage.getItem("os_density") as Density) || "comfortable";
    const a = localStorage.getItem("os_animations") !== "false";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(t);
    setPrimaryState(p);
    setDensityState(d);
    setAnimationsState(a);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--primary-dark", primary);
    localStorage.setItem("os_theme", theme);
    localStorage.setItem("os_primary", primary);
    localStorage.setItem("os_density", density);
    localStorage.setItem("os_animations", String(animations));
  }, [theme, primary, density, animations]);

  const value: ThemeCtx = {
    theme,
    setTheme: setThemeState,
    primary,
    setPrimary: setPrimaryState,
    density,
    setDensity: setDensityState,
    animations,
    setAnimations: setAnimationsState,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const COLOR_PRESETS = PRESETS;
