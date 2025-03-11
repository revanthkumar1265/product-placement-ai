"use client"

import type React from "react"

import { useState } from "react"
import { Download, ZoomIn } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface ResultsGalleryProps {
  results: string[]
}

export default function ResultsGallery({ results }: ResultsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `product-placement-${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No results yet</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Upload product images, select backgrounds, and click "Generate Placements" to see your results here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Generated Results ({results.length})</h3>
        <Button
          variant="outline"
          onClick={() => {
            results.forEach((result, index) => {
              downloadImage(result, index)
            })
          }}
        >
          Download All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((result, index) => (
          <Card key={index} className="overflow-hidden group relative">
            <div className="aspect-video relative">
              <Image src={result || "/placeholder.svg"} alt={`Result ${index + 1}`} fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="secondary" className="h-9 px-3" onClick={() => setSelectedImage(result)}>
                <ZoomIn className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" variant="secondary" className="h-9 px-3" onClick={() => downloadImage(result, index)}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video w-full">
              <Image src={selectedImage || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => selectedImage && downloadImage(selectedImage, 0)} className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper component for empty state
function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

