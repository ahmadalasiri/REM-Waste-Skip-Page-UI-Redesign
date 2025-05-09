import type { Skip } from "../types";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  // Calculate price including VAT
  const price = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  // Use the provided URL as fallback image
  const fallbackImageUrl =
    "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";

  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-white rounded-xl shadow-md transition-all duration-300
        ${
          isSelected
            ? "ring-2 ring-blue-600 transform scale-[1.02] shadow-lg shadow-blue-100"
            : "hover:shadow-lg"
        }`}
    >
      {/* Skip Image with proper fill */}
      <div className="relative pb-[75%] bg-gray-200">
        <img
          src={`/skips/${skip.size}yard.png`}
          alt={`${skip.size} Yard Skip`}
          className="absolute inset-0 w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = fallbackImageUrl;
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">
          {skip.size} Yard Skip
        </h3>
        <p className="text-gray-600 text-sm mb-1">
          {skip.size <= 6
            ? `${skip.size - 1}-${skip.size}`
            : `${skip.size - 2}-${skip.size}`}{" "}
          Yards Capacity
        </p>

        {/* Days information moved to body */}
        <p className="text-gray-600 text-sm mb-4">
          {skip.hire_period_days} Days Hire
        </p>

        {skip.allowed_on_road ? (
          <div className="bg-green-100 text-green-800 text-sm py-2 px-4 rounded-full mb-3 font-medium text-center">
            Road Placement OK
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-800 text-sm py-2 px-4 rounded-full mb-3 font-medium text-center">
            Not for Road Placement
          </div>
        )}

        {skip.allows_heavy_waste && (
          <div className="bg-green-100 text-green-800 text-sm font-medium py-2 px-4 rounded-full mb-3 text-center">
            Heavy Waste Allowed
          </div>
        )}

        <div className="mt-auto">
          <p className="text-3xl font-bold text-gray-800">£{price}</p>

          <button
            onClick={() => onSelect(skip.id)}
            className={`w-full mt-4 py-3 px-4 rounded-md text-center font-medium transition-all
              ${
                isSelected
                  ? "bg-gray-900 text-white flex items-center justify-center"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
          >
            {isSelected ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
          </button>
        </div>
      </div>
    </div>
  );
};
