import type { Skip } from "../types";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  // Calculate price including VAT
  const price = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  // Set restriction message if skip is not allowed on the road
  const restriction = !skip.allowed_on_road
    ? "Not Allowed On The Road"
    : undefined;

  // Use local placeholder SVG instead of remote URL
  const fallbackImageUrl = "/placeholder.svg";

  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-white rounded-xl shadow-md transition-all duration-300
        ${
          isSelected
            ? "ring-2 ring-amber-400 transform scale-[1.02] shadow-lg shadow-amber-200"
            : "hover:shadow-lg"
        }`}
    >
      {/* Road Placement Badge */}
      <div
        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
          skip.allowed_on_road
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {skip.allowed_on_road ? "Road Placement OK" : "Not for Road Placement"}
      </div>

      {/* Skip Image */}
      <div className="h-48 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
        <img
          src={`/skips/${skip.size}yard.png`}
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-contain transition-transform hover:scale-105"
          onError={(e) => {
            // Use the local placeholder SVG
            e.currentTarget.src = fallbackImageUrl;
          }}
        />
      </div>

      {/* Skip Information */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">
          {skip.size} Yard Skip
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {skip.size <= 6
            ? `${skip.size - 1}-${skip.size}`
            : `${skip.size - 2}-${skip.size}`}{" "}
          Yards Capacity
        </p>

        {/* Skip warnings if needed */}
        {!skip.allowed_on_road && (
          <div className="mb-3 mt-1">
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 py-1.5 px-3 text-xs rounded-r-md flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {restriction}
            </div>
          </div>
        )}

        {skip.allows_heavy_waste && (
          <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
            Heavy Waste Allowed
          </div>
        )}

        <div className="flex items-center mb-3 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {skip.hire_period_days} Days
        </div>

        <div className="mt-auto">
          <p className="text-2xl font-bold text-gray-800">£{price}</p>

          {/* Select Button */}
          <button
            onClick={() => onSelect(skip.id)}
            className={`w-full mt-4 py-2.5 px-4 rounded-md text-center font-medium transition-all
              ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
          >
            {isSelected ? "Selected" : "Select This Skip"}
          </button>
        </div>
      </div>
    </div>
  );
};
