import DigitRecognition from "@/components/digital-recognition"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-black">Digit Predictor</h1>
          <p className="text-gray-600 mt-1">Draw or upload a digit for AI prediction</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DigitRecognition />
      </main>
      {/* <footer className="border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Digit Predictor. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  )
}
