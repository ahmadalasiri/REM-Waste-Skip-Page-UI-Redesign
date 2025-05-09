import { ProgressBar } from "../components/ProgressBar";
import { SkipCard } from "../components/SkipCard";
import { useSkips } from "../hooks/useSkips";
import type { StepProps } from "../types";

export const SkipSelectionPage = () => {
  // In a real app, these would come from route params or context
  const postcode = "NR32";
  const area = "Lowestoft";

  const { skips, loading, error, selectedSkip, selectSkip } = useSkips(
    postcode,
    area
  );

  // For demo purposes, using static steps with the current one being "Select Skip"
  const steps: StepProps[] = [
    { step: "Postcode", status: "completed" },
    { step: "Waste Type", status: "completed" },
    { step: "Select Skip", status: "current" },
    { step: "Permit Check", status: "pending" },
    { step: "Choose Date", status: "pending" },
    { step: "Payment", status: "pending" },
  ];

  const handleContinue = () => {
    // In a real app, this would navigate to the next step
    alert(`Selected skip ID: ${selectedSkip}`);
  };

  const handleBack = () => {
    // In a real app, this would navigate to the previous step
    alert("Going back to Waste Type step");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto">
          <ProgressBar steps={steps} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-600 mt-2">
            Select the skip size that best suits your needs
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading skips: {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && skips && skips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No skips available for this location. Please try a different
              postcode.
            </p>
          </div>
        )}

        {/* Skip Grid */}
        {!loading && skips && skips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip === skip.id}
                onSelect={selectSkip}
              />
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className={`px-6 py-2 rounded-md text-white transition-colors
              ${
                selectedSkip
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
