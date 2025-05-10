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
          ? darkMode
            ? "bg-emerald-900/30 text-emerald-200 border border-emerald-600/50"
            : "bg-emerald-50 text-emerald-700"
          : darkMode
          ? "bg-amber-900/30 text-amber-200 border border-amber-600/50"
          : "bg-amber-50 text-amber-700"
      } text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4 rounded-full font-medium text-center flex-grow`}
      role="status"
      aria-label={`${children} (${status})`}
    >
      <span aria-hidden="true">{children}</span>
    </div>
  );
};
