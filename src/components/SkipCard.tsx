import type { Skip } from "../types";

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
  // Calculate price including VAT
  const price = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  // Use the provided URL as fallback image
  const fallbackImageUrl =
    "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";

  return (
    <div
      onClick={() => onSelect(skip.id)}
      className={`relative flex flex-col overflow-hidden ${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } rounded-xl shadow-md transition-all duration-300 cursor-pointer
        ${
          isSelected
            ? "ring-2 ring-blue-700 transform scale-[1.02] shadow-lg shadow-blue-50"
            : "hover:shadow-lg hover:scale-[1.01]"
        }`}
    >
      <div className="relative pb-[75%] bg-gray-100">
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
        <h3
          className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {skip.size} Yard Skip
        </h3>
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-700"
          } text-sm mb-1`}
        >
          {skip.size <= 6
            ? `${skip.size - 1}-${skip.size}`
            : `${skip.size - 2}-${skip.size}`}{" "}
          Yards Capacity
        </p>

        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-700"
          } text-sm mb-4`}
        >
          {skip.hire_period_days} Days Hire
        </p>

        {skip.allowed_on_road ? (
          <div
            className={`bg-emerald-50 ${
              darkMode ? "text-emerald-300" : "text-emerald-700"
            } text-sm py-2 px-4 rounded-full mb-3 font-medium text-center`}
          >
            Road Placement OK
          </div>
        ) : (
          <div
            className={`bg-amber-50 ${
              darkMode ? "text-amber-300" : "text-amber-700"
            } text-sm py-2 px-4 rounded-full mb-3 font-medium text-center`}
          >
            Not for Road Placement
          </div>
        )}

        {skip.allows_heavy_waste ? (
          <div
            className={`bg-emerald-50 ${
              darkMode ? "text-emerald-300" : "text-emerald-700"
            } text-sm font-medium py-2 px-4 rounded-full mb-3 text-center`}
          >
            Heavy Waste Allowed
          </div>
        ) : (
          <div
            className={`bg-amber-50 ${
              darkMode ? "text-amber-300" : "text-amber-700"
            } text-sm py-2 px-4 rounded-full mb-3 font-medium text-center`}
          >
            Heavy Waste Not Permitted
          </div>
        )}

        <div className="mt-auto">
          <p
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            £{price}
          </p>

          <div
            className={`w-full mt-4 py-3 px-4 rounded-md text-center font-medium transition-all
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
          </div>
        </div>
      </div>
    </div>
  );
};
