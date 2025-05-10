import { ProgressBar } from "../components/ProgressBar";
import { SkipCard } from "../components/SkipCard";
import { SkipCardSkeleton } from "../components/SkipCardSkeleton";
import { useSkips } from "../hooks/useSkips";
import { useTheme } from "../context/ThemeContext";
import type { StepProps } from "../types";

export const SkipSelectionPage = () => {
  // In a real app, these would come from route params or context
  const postcode = "NR32";
  const area = "Lowestoft";
  const { darkMode, toggleDarkMode } = useTheme();

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

  // Get selected skip details for the mobile summary bar
  const selectedSkipDetails = skips?.find((skip) => skip.id === selectedSkip);

  return (
    <div
      className={`min-h-screen pb-24 sm:pb-20 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Progress Bar */}
      <ProgressBar steps={steps} />

      <div className="container px-3 sm:px-4 lg:px-8 mx-auto max-w-7xl py-6 sm:py-10">
        {/* Top actions bar with dark mode toggle */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
          {/* Location Info */}
          <div
            className={`flex items-center text-xs sm:text-sm bg-opacity-80 px-3 sm:px-4 py-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-blue-900 text-blue-100"
                : "bg-blue-50 text-blue-600"
            }`}
          >
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

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`self-end sm:self-auto p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight transition-colors duration-300 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Choose Your Skip Size
          </h1>
          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Select the skip size that best suits your needs.
          </p>
        </div>

        {/* Loading State - Skeleton UI */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkipCardSkeleton key={item} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={`rounded-lg p-3 sm:p-4 mb-6 transition-colors duration-300 text-sm sm:text-base ${
              darkMode ? "bg-red-900 text-red-100" : "bg-red-50 text-red-800"
            }`}
          >
            <p>
              Sorry, we couldn't load available skips. Please try again later.
            </p>
          </div>
        )}

        {/* Skip Cards */}
        {!loading && !error && skips && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip === skip.id}
                onSelect={() => selectSkip(skip.id)}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Navigation Buttons - Now sticky */}
      <div
        className={`hidden sm:flex justify-between items-center fixed bottom-0 left-0 right-0 py-4 px-6 shadow-lg z-10 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800/95 border-t border-gray-700 backdrop-blur-sm"
            : "bg-white/95 border-t border-gray-200 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto max-w-7xl flex justify-between items-center px-4 lg:px-8">
          <button
            onClick={handleBack}
            className={`px-6 py-3 text-sm font-medium rounded-lg border transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Back
          </button>

          {/* Selection status in middle */}
          <div className="flex-1 text-center mx-4">
            {selectedSkip && selectedSkipDetails ? (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center">
                  <span
                    className={`font-semibold mr-1 ${
                      darkMode ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    {selectedSkipDetails.size} Yard Skip
                  </span>
                  <span
                    className={`text-sm font-medium ml-1.5 ${
                      darkMode ? "text-green-300" : "text-green-600"
                    }`}
                  >
                    £
                    {Math.round(
                      selectedSkipDetails.price_before_vat *
                        (1 + selectedSkipDetails.vat / 100)
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Select a skip size to continue
              </div>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className={`px-8 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              !selectedSkip
                ? darkMode
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                : darkMode
                ? "bg-green-700 text-white hover:bg-green-800"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Continue to Permit Check
          </button>
        </div>
      </div>

      {/* Fixed Mobile Navigation Bar */}
      <div
        className={`sm:hidden fixed bottom-0 left-0 right-0 ${
          darkMode
            ? "bg-gray-800 border-t border-gray-700"
            : "bg-white border-t border-gray-200"
        } shadow-lg transition-colors duration-300`}
      >
        {selectedSkip && selectedSkipDetails ? (
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`font-bold mr-2 ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {selectedSkipDetails.size}yd
                </span>
                <span
                  className={`text-xs mr-1 ${
                    darkMode ? "text-green-300" : "text-green-600"
                  }`}
                >
                  £
                  {Math.round(
                    selectedSkipDetails.price_before_vat *
                      (1 + selectedSkipDetails.vat / 100)
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBack}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600"
                      : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg ${
                    darkMode
                      ? "bg-green-700 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-gray-50 text-gray-700 border-gray-300"
                }`}
              >
                Back
              </button>
              <span className="text-sm">Select a skip to continue</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
