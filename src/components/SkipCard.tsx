import type { Skip } from "../types";
import { StatusBadge } from "./StatusBadge";
import type { KeyboardEvent } from "react";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
  darkMode?: boolean;
}

export const SkipCard = ({
  skip,
  isSelected,
  onSelect,
  darkMode = false,
}: SkipCardProps) => {
  // Calculate price including Value Added Tax (VAT)
  const price = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  // Use the provided URL as fallback image
  const fallbackImageUrl =
    "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(skip.id);
    }
  };

  // Format features for screen readers
  const features = [
    `${skip.hire_period_days} Days Hire`,
    skip.allowed_on_road ? "Road Placement OK" : "No Road Placement",
    skip.allows_heavy_waste ? "Heavy Waste Allowed" : "No Heavy Waste",
  ].join(", ");

  return (
    <div
      onClick={() => onSelect(skip.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${skip.size} Yard Skip, £${price}, ${features}`}
      className={`relative flex flex-col overflow-hidden ${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } rounded-xl shadow-md transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500
        ${
          isSelected
            ? "ring-2 ring-blue-700 transform scale-[1.02] shadow-lg shadow-blue-50"
            : "hover:shadow-lg hover:scale-[1.01]"
        }`}
    >
      <div className="relative pb-[60%] sm:pb-[75%] bg-gray-100">
        <img
          src={`/skips/${skip.size}yard.png`}
          alt={`${skip.size} Yard Skip`}
          className="absolute inset-0 w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = fallbackImageUrl;
          }}
        />
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-lg sm:text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {skip.size} Yard Skip
            </h3>
          </div>

          <p
            className={`text-2xl sm:text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            £{price}
          </p>
        </div>

        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-700"
          } text-xs sm:text-sm mb-3 sm:mb-4`}
        >
          {skip.hire_period_days} Days Hire
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <StatusBadge isPositive={skip.allowed_on_road} darkMode={darkMode}>
            {skip.allowed_on_road ? "Road Placement OK" : "No Road Placement"}
          </StatusBadge>

          <StatusBadge isPositive={skip.allows_heavy_waste} darkMode={darkMode}>
            {skip.allows_heavy_waste ? "Heavy Waste Allowed" : "No Heavy Waste"}
          </StatusBadge>
        </div>

        <div className="mt-auto">
          <div
            className={`w-full mt-2 sm:mt-4 py-2 sm:py-3 px-3 sm:px-4 rounded-md text-center font-medium transition-all text-sm sm:text-base
              ${
                isSelected
                  ? "bg-blue-700 text-white flex items-center justify-center"
                  : `${
                      darkMode
                        ? "bg-blue-900 text-blue-300 hover:bg-blue-800"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`
              }`}
          >
            {isSelected ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Selected
              </>
            ) : (
              "Select This Skip"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
