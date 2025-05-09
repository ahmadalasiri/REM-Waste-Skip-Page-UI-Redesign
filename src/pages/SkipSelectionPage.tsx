import { useState, useEffect } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { SkipCard } from "../components/SkipCard";
import { useSkips } from "../hooks/useSkips";
import type { StepProps } from "../types";

export const SkipSelectionPage = () => {
  // In a real app, these would come from route params or context
  const postcode = "NR32";
  const area = "Lowestoft";
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference, otherwise default to light mode
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Progress Bar */}
      <ProgressBar steps={steps} />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-10">
        {/* Top actions bar with dark mode toggle */}
        <div className="flex justify-between items-center mb-6">
          {/* Location Info */}
          <div
            className={`flex items-center text-sm bg-opacity-80 px-4 py-2 rounded-full transition-colors duration-300 ${
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
            onClick={() => setDarkMode((prev: boolean) => !prev)}
            className={`p-2 rounded-full transition-colors duration-300 ${
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
        <div className="text-center mb-10">
          <h1
            className={`text-3xl md:text-4xl font-extrabold mb-3 tracking-tight transition-colors duration-300 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Choose Your Skip Size
          </h1>
          <p
            className={`max-w-2xl mx-auto transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Select the skip size that best suits your needs. All our skips
            include a {skips && skips[0]?.hire_period_days} day hire period and
            free delivery.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={`rounded-lg p-4 mb-6 transition-colors duration-300 ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Navigation Buttons */}
        <div
          className={`mt-10 flex justify-between transition-colors duration-300 ${
            darkMode
              ? "border-t border-gray-700 pt-6"
              : "border-t border-gray-200 pt-6"
          }`}
        >
          <button
            onClick={handleBack}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-300 ${
              darkMode
                ? "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
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
    </div>
  );
};
