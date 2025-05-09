import type { StepProps } from "../types";

interface ProgressBarProps {
  steps: StepProps[];
}

export const ProgressBar = ({ steps }: ProgressBarProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
        {steps.map((step, index) => (
          <div key={step.step} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full
                ${
                  step.status === "completed"
                    ? "bg-blue-600 text-white"
                    : step.status === "current"
                    ? "bg-white border-2 border-blue-600 text-blue-600"
                    : "bg-white border border-gray-300 text-gray-400"
                }`}
            >
              {step.status === "completed" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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

            {/* Step Label */}
            <span
              className={`hidden md:inline-block text-xs ml-1
                ${
                  step.status === "completed"
                    ? "text-blue-600 font-medium"
                    : step.status === "current"
                    ? "text-blue-600 font-medium"
                    : "text-gray-400"
                }`}
            >
              {step.step}
            </span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-4 md:w-10 h-0.5 mx-1 md:mx-2
                  ${
                    step.status === "completed" ? "bg-blue-600" : "bg-gray-300"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
