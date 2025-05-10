import { useTheme } from "../context/ThemeContext";

export const SkipCardSkeleton = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`relative flex flex-col overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-md h-[380px] sm:h-[420px]`}
      aria-hidden="true"
    >
      {/* Image placeholder with shimmer effect */}
      <div className="relative pb-[60%] sm:pb-[75%] bg-gradient-to-r from-blue-50/60 via-white/80 to-blue-50/60 dark:from-blue-900/10 dark:via-gray-800/30 dark:to-blue-900/10 overflow-hidden">
        <div className="absolute inset-0 shimmer-effect"></div>
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          {/* Title placeholder */}
          <div className="h-6 bg-gradient-to-r from-blue-100/70 to-blue-50/60 dark:from-blue-800/20 dark:to-blue-700/10 w-24 rounded overflow-hidden">
            <div className="h-full w-full shimmer-effect"></div>
          </div>
          
          {/* Price placeholder */}
          <div className="h-8 bg-gradient-to-r from-green-100/70 to-green-50/60 dark:from-green-800/20 dark:to-green-700/10 w-16 rounded overflow-hidden">
            <div className="h-full w-full shimmer-effect"></div>
          </div>
        </div>
        
        {/* Days Hire placeholder */}
        <div className="h-4 mt-2 bg-gradient-to-r from-blue-50/60 to-white/70 dark:from-blue-900/5 dark:to-gray-700/20 w-20 rounded overflow-hidden">
          <div className="h-full w-full shimmer-effect"></div>
        </div>
        
        {/* Status badges placeholder */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-8 bg-gradient-to-r from-emerald-100/70 to-emerald-50/60 dark:from-emerald-800/20 dark:to-emerald-700/10 rounded-full w-full overflow-hidden">
            <div className="h-full w-full shimmer-effect"></div>
          </div>
          <div className="h-8 bg-gradient-to-r from-amber-100/70 to-amber-50/60 dark:from-amber-800/20 dark:to-amber-700/10 rounded-full w-full overflow-hidden">
            <div className="h-full w-full shimmer-effect"></div>
          </div>
        </div>
        
        {/* Button placeholder */}
        <div className="mt-auto pt-4">
          <div className="h-10 bg-gradient-to-r from-blue-200/70 via-blue-100/60 to-blue-200/70 dark:from-blue-700/30 dark:via-blue-800/20 dark:to-blue-700/30 w-full rounded-md overflow-hidden">
            <div className="h-full w-full shimmer-effect"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
