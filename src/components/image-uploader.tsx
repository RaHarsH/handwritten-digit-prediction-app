"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileImage } from "lucide-react"

interface ImageUploaderProps {
  onImageUpload: (dataUrl: string) => void
  imageData: string | null
}

export default function ImageUploader({ onImageUpload, imageData }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const processFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div
          className={`relative w-[320px] h-[320px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all duration-300 bg-white shadow-lg hover:shadow-xl ${
            dragActive ? "border-black bg-gray-50 scale-105" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

          {imageData ? (
            <div className="w-full h-full flex items-center justify-center p-6 relative">
              <img
                src={imageData || "/placeholder.svg"}
                alt="Uploaded digit"
                className="max-h-full max-w-full object-contain rounded-lg shadow-md"
              />
              <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                Ready to predict
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileImage className="h-8 w-8 text-gray-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Upload className="h-3 w-3 text-white" />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-xs">Drag and drop an image of a handwritten digit here</p>

              <div className="flex flex-col items-center space-y-3">
                <div className="text-xs text-gray-400 uppercase tracking-wider">or</div>
                <Button
                  onClick={triggerFileInput}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
