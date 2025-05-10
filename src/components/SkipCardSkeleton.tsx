import { useTheme } from "../context/ThemeContext";

export const SkipCardSkeleton = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`relative flex flex-col overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-md animate-pulse h-[380px] sm:h-[420px]`}
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="relative pb-[60%] sm:pb-[75%] bg-gray-300 dark:bg-gray-700"></div>

      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          {/* Title placeholder */}
          <div className="h-6 bg-gray-300 dark:bg-gray-700 w-24 rounded"></div>
          {/* Price placeholder */}
          <div className="h-8 bg-gray-300 dark:bg-gray-700 w-16 rounded"></div>
        </div>

        {/* Days Hire placeholder */}
        <div className="h-4 mt-2 bg-gray-300 dark:bg-gray-700 w-20 rounded"></div>

        {/* Status badges placeholder */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-full"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-full"></div>
        </div>

        {/* Button placeholder */}
        <div className="mt-auto pt-4">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 w-full rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
