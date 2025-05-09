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

  // Default fallback image URL
  const fallbackImageUrl =
    "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";

  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-white rounded-lg shadow-md transition-all
        ${
          isSelected
            ? "ring-2 ring-blue-600 transform scale-[1.02]"
            : "hover:shadow-lg"
        }`}
    >
      {/* Size Badge */}
      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        {skip.size} Yards
      </div>

      {/* Skip Image */}
      <div className="h-40 overflow-hidden bg-gray-100">
        <img
          src={`/skips/${skip.size}yard.png`}
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Use the provided fallback image URL
            e.currentTarget.src = fallbackImageUrl;
          }}
        />
      </div>

      {/* Skip Information */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800">
          {skip.size} Yard Skip
        </h3>

        {/* Restriction Warning - Moved here to match design */}
        {restriction && (
          <div className="mb-2 mt-1">
            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 py-1 px-2 text-xs flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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

        <p className="text-sm text-gray-500 mb-2">
          {skip.hire_period_days} day hire period
        </p>
        <p className="text-xl font-bold text-blue-600 mt-auto">£{price}</p>
      </div>

      {/* Select Button */}
      <button
        onClick={() => onSelect(skip.id)}
        className={`p-2 m-4 mt-0 rounded-md text-center text-sm font-medium transition-colors
          ${
            isSelected
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
      >
        {isSelected ? "Selected" : "Select This Skip"}
      </button>
    </div>
  );
};
