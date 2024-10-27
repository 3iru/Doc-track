"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3">
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-black rounded-sm animate-spin`}
            style={{
              animationDuration: "3s",
              animationDirection: index % 2 === 0 ? "normal" : "reverse",
              animationTimingFunction: "ease-in-out",
              boxShadow:
                "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
