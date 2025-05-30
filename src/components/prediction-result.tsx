"use client"

import { CheckCircle, Target } from "lucide-react"

interface PredictionResultProps {
  prediction: number | null
  confidence: number | null
}

export default function PredictionResult({ prediction, confidence }: PredictionResultProps) {
  if (prediction === null) {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Target className="h-10 w-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Ready to Predict</h3>
        <p className="text-gray-500 max-w-xs mx-auto">
          Draw a digit or upload an image, then click the predict button to see AI magic in action
        </p>
      </div>
    )
  }

  const confidencePercentage = confidence ? Math.round(confidence * 100) : 0
  const isHighConfidence = confidencePercentage >= 85

  return (
    <div className="w-full text-center">
      {/* Main Prediction Display */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl"></div>
        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="text-[140px] font-black leading-none bg-gradient-to-br from-black to-gray-600 bg-clip-text text-transparent">
            {prediction}
          </div>
          <div className="flex items-center justify-center mt-4 space-x-2">
            {isHighConfidence && <CheckCircle className="h-5 w-5 text-green-600" />}
            <p className="text-gray-600 font-medium">Predicted Digit</p>
          </div>
        </div>
      </div>

      {/* Confidence Meter */}
      <div className="w-full max-w-sm mx-auto">
        <div className="flex justify-between text-sm mb-3">
          <span className="font-medium text-gray-700">Confidence Level</span>
          <span className={`font-bold ${isHighConfidence ? "text-green-600" : "text-gray-600"}`}>
            {confidencePercentage}%
          </span>
        </div>

        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                isHighConfidence
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : "bg-gradient-to-r from-gray-600 to-black"
              }`}
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <p className={`text-sm font-medium ${isHighConfidence ? "text-green-700" : "text-gray-600"}`}>
            {isHighConfidence ? "✨ High confidence prediction!" : "⚡ Prediction complete"}
          </p>
        </div>
      </div>
    </div>
  )
}
