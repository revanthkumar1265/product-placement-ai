"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface UploadSectionProps {
  productImages: File[]
  setProductImages: (files: File[]) => void
}

export default function UploadSection({ productImages, setProductImages }: UploadSectionProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter for image files
      const imageFiles = acceptedFiles.filter(
        (file) => file.type.startsWith("image/") || file.name.toLowerCase().endsWith(".gif"),
      )

      setProductImages((prev) => [...prev, ...imageFiles])
    },
    [setProductImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    maxSize: 20971520, // 20MB to accommodate larger files
  })

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index))
  }

  const isAnimated = (file: File) => {
    return file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif")
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Drag & drop product images</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Upload product images that you want to place in lifestyle backgrounds. Supports PNG, JPG, JPEG, WebP, and
            GIF (max 20MB).
          </p>
          <Button variant="secondary" className="mt-2">
            Select Files
          </Button>
        </div>
      </div>

      {productImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Uploaded Images ({productImages.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {productImages.map((file, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <div className="aspect-square relative">
                  <Image
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    unoptimized={isAnimated(file)} // Required for GIFs to animate
                  />
                  {isAnimated(file) && (
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-tl-md">
                      GIF
                    </div>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
                <div className="p-2 text-xs truncate text-center">{file.name}</div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

