import { useState } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { SkipCard } from "../components/SkipCard";
import { useSkips } from "../hooks/useSkips";
import type { StepProps } from "../types";

export const SkipSelectionPage = () => {
  // In a real app, these would come from route params or context
  const postcode = "NR32";
  const area = "Lowestoft";
  const [sortBy, setSortBy] = useState<"size" | "price">("size");

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

  // Sort skips based on selected criteria
  const sortedSkips = skips
    ? [...skips].sort((a, b) => {
        if (sortBy === "size") {
          return a.size - b.size;
        } else {
          const priceA = a.price_before_vat * (1 + a.vat / 100);
          const priceB = b.price_before_vat * (1 + b.vat / 100);
          return priceA - priceB;
        }
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <ProgressBar steps={steps} />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-10">
        {/* Location Info */}
        <div className="mb-6 flex items-center justify-center md:justify-start">
          <div className="flex items-center text-sm bg-blue-50 px-4 py-2 rounded-full text-blue-600">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Delivering to:{" "}
            <span className="font-semibold ml-1">
              {postcode}, {area}
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the skip size that best suits your needs. All our skips
            include a {skips && skips[0]?.hire_period_days} day hire period and
            free delivery.
          </p>
        </div>

        {/* Sort options */}
        {!loading && skips && skips.length > 0 && (
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setSortBy("size")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  sortBy === "size"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Sort by Size
              </button>
              <button
                type="button"
                onClick={() => setSortBy("price")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  sortBy === "price"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Sort by Price
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-t-amber-400 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading skip options...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
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
              <div className="ml-4">
                <h3 className="text-lg font-medium text-red-800">
                  There was a problem loading skips
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                  className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-sm font-medium transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && skips && skips.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No skips available
            </h3>
            <p className="text-gray-600 max-w-sm mx-auto mb-6">
              We couldn't find any skips available for this location. Please try
              a different postcode.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Change Location
            </button>
          </div>
        )}

        {/* Skip Grid */}
        {!loading && sortedSkips && sortedSkips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip === skip.id}
                onSelect={selectSkip}
              />
            ))}
          </div>
        )}

        {/* Skip selection summary */}
        {selectedSkip && (
          <div className="mt-10 mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <svg
                  className="h-6 w-6 text-amber-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  You've selected a skip! Ready to continue to the next step.
                </span>
              </div>
              <button
                onClick={handleContinue}
                className="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-gray-800 shadow-sm"
              >
                Continue
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-700"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Back to Waste Type
          </button>

          {!selectedSkip && (
            <button
              onClick={handleContinue}
              disabled={!selectedSkip}
              className="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Please select a skip
            </button>
          )}
        </div>

        {/* Help Information */}
        <div className="mt-16 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">
            Need Help Choosing?
          </h2>
          <p className="mb-4 text-gray-600">
            Not sure which skip size is right for your project? Here's a quick
            guide:
          </p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong>4-6 Yards:</strong> Small garden/home clearance, small
                DIY projects
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong>8-10 Yards:</strong> Medium renovations, larger garden
                projects, kitchen/bathroom refits
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong>12+ Yards:</strong> Major building work, site
                clearances, commercial projects
              </span>
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Contact us for more help
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer with company info */}
      <footer className="bg-white border-t border-gray-200 mt-10 py-8">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">© 2025 REM Waste. All rights reserved.</p>
            <p>
              Professional skip hire services in Lowestoft and surrounding
              areas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
