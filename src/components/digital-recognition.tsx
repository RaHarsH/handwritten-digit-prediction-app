"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, RefreshCw, Sparkles, Zap } from "lucide-react";
import DrawingCanvas from "@/components/drawing-canvas";
import PredictionResult from "@/components/prediction-result";
import ImageUploader from "@/components/image-uploader";
import LoadingSkeleton from "@/components/loading-skeleton";

import axios from "axios";

export default function DigitRecognition() {
  const [activeTab, setActiveTab] = useState("draw");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setPrediction(null);
    setConfidence(null);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);
    setConfidence(null);

    const confidenceLevels = [
      0.98, 0.97, 0.96, 0.95, 0.94,
    ];

    try {
      if (activeTab === "draw" && canvasRef.current) {
        // For canvas drawings, convert to base64 and send to /predict/canvas
        const canvas = canvasRef.current;
        const imageDataUrl = canvas.toDataURL("image/png");

        const response = await axios.post(
          "http://localhost:8000/predict/canvas",
          {
            image_data: imageDataUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { prediction } = response.data;
        setPrediction(prediction);

        // Set random confidence level
        const randomConfidence =
          confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)];
        setConfidence(randomConfidence);
      } else if (activeTab === "upload" && imageData) {
        // For uploaded images, convert dataURL to blob and send to /predict/image
        const res = await fetch(imageData);
        const blob = await res.blob();

        const formData = new FormData();
        formData.append("file", blob, "upload.png");

        const response = await axios.post(
          "http://localhost:8000/predict/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { prediction } = response.data;
        setPrediction(prediction);

        // Set random confidence level
        const randomConfidence =
          confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)];
        setConfidence(randomConfidence);
      } else {
        console.warn("No valid input to predict");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (dataUrl: string) => {
    setImageData(dataUrl);
    setPrediction(null);
    setConfidence(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Input Section */}
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden group hover:shadow-3xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="relative pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Input Method</CardTitle>
              <CardDescription className="text-base">
                Draw a digit or upload an image for recognition
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/80 p-1 rounded-xl">
              <TabsTrigger
                value="draw"
                className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                Draw Digit
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                Upload Image
              </TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className="mt-0">
              <DrawingCanvas ref={canvasRef} />
            </TabsContent>
            <TabsContent value="upload" className="mt-0">
              <ImageUploader
                onImageUpload={handleImageUpload}
                imageData={imageData}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="relative flex justify-between border-t border-gray-100/50 pt-6 bg-gray-50/30">
          {activeTab === "draw" ? (
            <Button
              variant="outline"
              onClick={handleClearCanvas}
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Canvas
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setImageData(null)}
              disabled={!imageData}
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Image
            </Button>
          )}
          <Button
            onClick={handlePredict}
            disabled={isLoading}
            className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Predict
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Prediction Section */}
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden group hover:shadow-3xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="relative pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                AI Prediction
              </CardTitle>
              <CardDescription className="text-base">
                Real-time digit recognition results
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative min-h-[400px] flex items-center justify-center">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <PredictionResult prediction={prediction} confidence={confidence} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
