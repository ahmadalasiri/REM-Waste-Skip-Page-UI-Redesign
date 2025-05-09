import type { StepProps } from "../types";

interface ProgressBarProps {
  steps: StepProps[];
}

export const ProgressBar = ({ steps }: ProgressBarProps) => {
  return (
    <div className="w-full py-6 bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center">
              <div className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm transition-all duration-300
                    ${
                      step.status === "completed"
                        ? "bg-[#ffb81c] text-white"
                        : step.status === "current"
                        ? "bg-white border-2 border-[#ffb81c] text-gray-800"
                        : "bg-white border border-gray-300 text-gray-400"
                    }`}
                >
                  {step.status === "completed" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Connector Line - Only visible on md and above */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-16 lg:w-32 h-1 mx-1 bg-gray-200 relative">
                    <div
                      className={`absolute left-0 top-0 h-full bg-[#ffb81c] transition-all duration-500 ease-in-out
                        ${step.status === "completed" ? "w-full" : "w-0"}`}
                    />
                  </div>
                )}
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center
                  ${
                    step.status === "completed"
                      ? "text-gray-800"
                      : step.status === "current"
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
              >
                {step.step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
