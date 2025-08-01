import React from "react";

const DifferentialDiagnosis = ({ diagnoses }) => {
  if (!diagnoses || diagnoses.length === 0) return null;

  const getLikelihoodColor = (likelihood) => {
    switch (likelihood?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-6 h-6 text-blue-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Differential Diagnosis
      </h3>
      <div className="space-y-3">
        {diagnoses.map((diagnosis, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">
                {diagnosis.condition}
              </h4>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getLikelihoodColor(
                  diagnosis.likelihood
                )}`}
              >
                {diagnosis.likelihood}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{diagnosis.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifferentialDiagnosis;
