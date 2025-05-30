export default function LoadingSkeleton() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Main prediction area skeleton */}
      <div className="mb-8 relative">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="w-40 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="w-24 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Confidence meter skeleton */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between mb-3">
          <div className="w-24 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          <div className="w-12 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner mb-2">
          <div
            className="h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
            style={{ width: "60%" }}
          ></div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-32 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite] mx-auto"></div>
        </div>
      </div>

      {/* Floating dots animation */}
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}
