import type { ReactNode } from "react";

interface StatusBadgeProps {
  isPositive: boolean;
  darkMode?: boolean;
  children: ReactNode;
}

export const StatusBadge = ({
  isPositive,
  darkMode = false,
  children,
}: StatusBadgeProps) => {
  // Determine status for screen readers
  const status = isPositive ? "positive" : "restriction";

  return (
    <div
      className={`${
        isPositive
          ? `bg-emerald-50 ${
              darkMode ? "text-emerald-300" : "text-emerald-700"
            }`
          : `bg-amber-50 ${darkMode ? "text-amber-300" : "text-amber-700"}`
      } text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4 rounded-full font-medium text-center flex-grow`}
      role="status"
      aria-label={`${children} (${status})`}
    >
      <span aria-hidden="true">{children}</span>
    </div>
  );
};
