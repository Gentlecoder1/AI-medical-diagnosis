import React from "react";

const FollowUpCare = ({ followUp, additionalTests, lifestyle }) => {
  const hasContent =
    (followUp && followUp.length > 0) ||
    (additionalTests && additionalTests.length > 0) ||
    (lifestyle && lifestyle.length > 0);

  if (!hasContent) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-6 h-6 text-purple-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0l-2 9a2 2 0 002 2h8a2 2 0 002-2l-2-9m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v1"
          />
        </svg>
        Follow-up Care Plan
      </h3>

      <div className="space-y-6">
        {/* Follow-up Instructions */}
        {followUp && followUp.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-purple-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Monitoring & Care
            </h4>
            <div className="space-y-2">
              {followUp.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-purple-200"
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 text-sm flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Tests */}
        {additionalTests && additionalTests.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
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
              Recommended Tests
            </h4>
            <div className="space-y-2">
              {additionalTests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="text-blue-800 text-sm">{test}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lifestyle Recommendations */}
        {lifestyle && lifestyle.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <svg
                className="w-5 h-5 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Lifestyle Recommendations
            </h4>
            <div className="space-y-2">
              {lifestyle.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <p className="text-green-800 text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpCare;
