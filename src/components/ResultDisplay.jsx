import React from "react";

const ResultDisplay = ({ result, onReset }) => {
  if (!result) return null;

  const { diagnosis, confidence, recommendations, riskLevel } = result;

  const getRiskLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      {/* Results Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Analysis Complete
                </h2>
                <p className="text-green-100">AI-powered medical assessment</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
            >
              New Analysis
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Content continues below */}

          {/* Primary Diagnosis */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
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
                AI Medical Analysis
              </h3>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {diagnosis || result.rawGPTResponse || "No analysis provided"}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {confidence && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Analysis Type
                  </h4>
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  {typeof confidence === "number" ? (
                    <>
                      <p
                        className={`text-4xl font-bold ${getConfidenceColor(
                          confidence
                        )}`}
                      >
                        {confidence}
                      </p>
                      <span className="text-2xl font-medium text-gray-600 mb-1">
                        %
                      </span>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-blue-600">
                      {confidence}
                    </p>
                  )}
                </div>
                {typeof confidence === "number" && (
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        confidence >= 80
                          ? "bg-green-500"
                          : confidence >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}

            {riskLevel && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Risk Assessment
                  </h4>
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-lg font-bold border-2 ${getRiskLevelColor(
                      riskLevel
                    )}`}
                  >
                    {riskLevel}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      {riskLevel?.toLowerCase() === "low" &&
                        "Minimal concern indicated"}
                      {riskLevel?.toLowerCase() === "medium" &&
                        "Moderate attention recommended"}
                      {riskLevel?.toLowerCase() === "high" &&
                        "Immediate consultation advised"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-amber-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Personalized Recommendations
                </h3>
                <div className="space-y-4">
                  {recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-amber-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">
                          {recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-red-900 mb-2">
                  Important Medical Disclaimer
                </h4>
                <p className="text-red-800 leading-relaxed">
                  This AI analysis is for{" "}
                  <strong>educational purposes only</strong> and should not
                  replace professional medical advice. Always consult with
                  qualified healthcare professionals for proper diagnosis and
                  treatment. If you have concerning symptoms, seek immediate
                  medical attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
