import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileUpload from "./FileUpload";
import LoadingSpinner from "./LoadingSpinner";
import ResultDisplay from "./ResultDisplay";
import { submitDiagnosisData } from "../services/diagnosisApi";

const LumpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // Form field options
  const hardnessOptions = [
    { value: "soft", label: "Soft" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const painSeverityOptions = [
    { value: "none", label: "None" },
    { value: "mild", label: "Mild" },
    { value: "moderate", label: "Moderate" },
    { value: "severe", label: "Severe" },
  ];

  const positionOptions = [
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "nipple_area", label: "Nipple Area" },
  ];

  const durationOptions = [
    { value: "1-3 days", label: "1-3 days" },
    { value: "4-7 days", label: "4-7 days (1 week)" },
    { value: "1-2 weeks", label: "1-2 weeks" },
    { value: "3-4 weeks", label: "3-4 weeks (1 month)" },
    { value: "1-3 months", label: "1-3 months" },
    { value: "3-6 months", label: "3-6 months" },
    { value: "6-12 months", label: "6-12 months" },
    { value: "over 1 year", label: "Over 1 year" },
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Prepare form data including file upload
      const formData = {
        ...data,
        medicalImages:
          data.medicalImages && data.medicalImages.length > 0
            ? data.medicalImages[0]
            : null,
      };

      const response = await submitDiagnosisData(formData);
      // Extract the data from the response for the ResultDisplay component
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        throw new Error(response.error || "Failed to get diagnosis");
      }
    } catch (error) {
      setApiError(
        error.message || "An error occurred while processing your request."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setApiError(null);
  };

  if (result) {
    return <ResultDisplay result={result} onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Form Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">
                AI Analysis Ready
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            Patient Information
          </h2>
          <p className="text-center text-gray-600 max-w-md mx-auto">
            Complete the form below for your personalized AI medical assessment
          </p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              <strong>Error:</strong> {apiError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                register={(name) =>
                  register(name, {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters long",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })
                }
                error={errors.name}
                required
              />

              {/* Age Field */}
              <InputField
                label="Age"
                name="age"
                type="number"
                placeholder="Enter your age"
                register={(name) =>
                  register(name, {
                    required: "Age is required",
                    min: {
                      value: 1,
                      message: "Age must be at least 1 year",
                    },
                    max: {
                      value: 120,
                      message: "Age must be less than 120 years",
                    },
                    valueAsNumber: true,
                  })
                }
                error={errors.age}
                required
              />
            </div>
          </div>

          {/* Symptoms Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Symptom Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hardness of Lump */}
              <SelectField
                label="Hardness of Lump"
                name="hardness"
                options={hardnessOptions}
                placeholder="Select hardness level"
                register={(name) =>
                  register(name, {
                    required: "Please select the hardness of the lump",
                  })
                }
                error={errors.hardness}
                required
              />

              {/* Severity of Pain */}
              <SelectField
                label="Severity of Pain"
                name="painSeverity"
                options={painSeverityOptions}
                placeholder="Select pain severity"
                register={(name) =>
                  register(name, {
                    required: "Please select the severity of pain",
                  })
                }
                error={errors.painSeverity}
                required
              />

              {/* Position of Lump */}
              <SelectField
                label="Position of Lump"
                name="position"
                options={positionOptions}
                placeholder="Select lump position"
                register={(name) =>
                  register(name, {
                    required: "Please select the position of the lump",
                  })
                }
                error={errors.position}
                required
              />

              {/* Duration of Pain */}
              <SelectField
                label="Duration of Pain"
                name="duration"
                options={durationOptions}
                placeholder="Select duration"
                register={(name) =>
                  register(name, {
                    required: "Please select the duration of pain",
                  })
                }
                error={errors.duration}
                required
              />
            </div>
          </div>

          {/* Medical Images Section */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-teal-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Medical Images (Optional)
            </h3>

            <FileUpload
              label="Upload Medical Images"
              name="medicalImages"
              register={(name) =>
                register(name, {
                  validate: {
                    fileSize: (files) => {
                      if (!files || files.length === 0) return true; // Optional field
                      const file = files[0];
                      const maxSize = 10 * 1024 * 1024; // 10MB
                      return (
                        file.size <= maxSize ||
                        "File size must be less than 10MB"
                      );
                    },
                    fileType: (files) => {
                      if (!files || files.length === 0) return true; // Optional field
                      const file = files[0];
                      const allowedTypes = [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "application/pdf",
                      ];
                      return (
                        allowedTypes.includes(file.type) ||
                        "Only JPG, PNG, and PDF files are allowed"
                      );
                    },
                  },
                })
              }
              error={errors.medicalImages}
              accept="image/jpeg,image/jpg,image/png,application/pdf"
            />

            <p className="text-sm text-gray-600 mt-2">
              Upload any relevant medical images, scans, or reports that might
              help with the diagnosis. This field is optional but can improve
              accuracy.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`
              group relative w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform
              ${
                !isValid || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300"
              }
            `}
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <LoadingSpinner size="small" text="" />
                    <span className="ml-3">AI Analyzing Your Symptoms...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 mr-3 group-hover:animate-pulse"
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
                    Get AI Diagnosis
                  </>
                )}
              </div>

              {/* Animated background effect */}
              {!isLoading && isValid && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>

            {/* Progress indicator */}
            {isValid && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center text-sm text-green-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Form completed - Ready for analysis
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LumpForm;
