import React from "react";

const RecommendedActions = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-6 h-6 text-green-600 mr-2"
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
        Recommended Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-green-200"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            <p className="text-gray-800 flex-1">{action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActions;
