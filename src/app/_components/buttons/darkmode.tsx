"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconDark, IconLight } from "~/app/_assets/icons";

export default function Darkmode() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <button
      onClick={() => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
      }}
    >
      {theme === "light" ? <IconLight /> : <IconDark />}
    </button>
  );
}
