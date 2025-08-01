import React from "react";
import DifferentialDiagnosis from './DifferentialDiagnosis';
import RecommendedActions from './RecommendedActions';
import RedFlags from './RedFlags';
import FollowUpCare from './FollowUpCare';

const ResultDisplay = ({ result, onReset }) => {
  if (!result) return null;

  const { 
    differentialDiagnosis, 
    recommendedActions, 
    redFlags, 
    followUp, 
    riskLevel, 
    urgency,
    additionalTests,
    lifestyle,
    disclaimer 
  } = result;

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

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "immediate":
        return "bg-red-100 text-red-800 border-red-200";
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "routine":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
          {/* Risk Level and Urgency Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {riskLevel && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Risk Assessment
                  </h4>
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-lg font-bold border-2 ${getRiskLevelColor(riskLevel)}`}>
                    {riskLevel}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      {riskLevel?.toLowerCase() === "low" && "Minimal concern indicated"}
                      {riskLevel?.toLowerCase() === "medium" && "Moderate attention recommended"}
                      {riskLevel?.toLowerCase() === "high" && "Immediate consultation advised"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {urgency && (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Urgency Level
                  </h4>
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-lg font-bold border-2 ${getUrgencyColor(urgency)}`}>
                    {urgency}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      {urgency?.toLowerCase() === "immediate" && "Seek emergency care now"}
                      {urgency?.toLowerCase() === "urgent" && "Schedule appointment within 24-48 hours"}
                      {urgency?.toLowerCase() === "routine" && "Standard follow-up care"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Structured Medical Sections */}
          <div className="space-y-8">
            {/* Red Flags - Always show first if present */}
            <RedFlags redFlags={redFlags} />
            
            {/* Differential Diagnosis */}
            <DifferentialDiagnosis diagnoses={differentialDiagnosis} />
            
            {/* Recommended Actions */}
            <RecommendedActions actions={recommendedActions} />
            
            {/* Follow-up Care */}
            <FollowUpCare 
              followUp={followUp} 
              additionalTests={additionalTests} 
              lifestyle={lifestyle} 
            />
          </div>

          {/* Medical Disclaimer */}
          {disclaimer && (
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-amber-900 mb-2">
                    Important Medical Disclaimer
                  </h4>
                  <p className="text-amber-800 leading-relaxed">
                    {disclaimer}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
