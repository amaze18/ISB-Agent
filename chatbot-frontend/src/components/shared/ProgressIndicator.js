const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full flex-1 transition-all duration-300 ${
            index < currentStep
              ? "bg-[#9610FF]"
              : index === currentStep
              ? "bg-[#9610FF] animate-pulse"
              : "bg-gray-200"
          }`}
        />
      ))}
      <span className="text-sm text-gray-500 ml-2">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
  );
};

export default ProgressIndicator;
