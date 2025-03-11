"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ImageDown, Settings, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import UploadSection from "@/components/upload-section"
import BackgroundGallery from "@/components/background-gallery"
import ResultsGallery from "@/components/results-gallery"
import SettingsPanel from "@/components/settings-panel"
import HelpSection from "@/components/help-section"
import type { PlacementSettings } from "@/lib/types"

export default function Home() {
  const [productImages, setProductImages] = useState<File[]>([])
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([])
  const [results, setResults] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [settings, setSettings] = useState<PlacementSettings>({
    scale: 0.5,
    position: "center",
    preserveDetails: true,
    enhanceLighting: true,
    qualityPreset: "standard",
  })

  const handleProcess = async () => {
    if (productImages.length === 0 || selectedBackgrounds.length === 0) {
      return
    }

    setIsProcessing(true)

    try {
      // Convert images to base64 for processing
      const imagePromises = productImages.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })
      })

      const base64Images = await Promise.all(imagePromises)

      // Process each product with each background
      const processPromises = []

      for (const productImage of base64Images) {
        for (const background of selectedBackgrounds) {
          processPromises.push(
            fetch("/api/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productImage,
                backgroundImage: background,
                settings,
              }),
            }).then((res) => res.json()),
          )
        }
      }

      const processedResults = await Promise.all(processPromises)
      setResults(processedResults.map((r) => r.resultImage))
    } catch (error) {
      console.error("Error processing images:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Image Placement Tool</h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Upload product images and place them into lifestyle backgrounds using AI
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload size={16} />
            <span>Upload</span>
          </TabsTrigger>
          <TabsTrigger value="backgrounds" className="flex items-center gap-2">
            <ImageIcon size={16} />
            <span>Backgrounds</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <ImageDown size={16} />
            <span>Results</span>
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpIcon size={16} />
            <span>Help</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <UploadSection productImages={productImages} setProductImages={setProductImages} />
        </TabsContent>

        <TabsContent value="backgrounds">
          <BackgroundGallery
            selectedBackgrounds={selectedBackgrounds}
            setSelectedBackgrounds={setSelectedBackgrounds}
          />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel settings={settings} setSettings={setSettings} />
        </TabsContent>

        <TabsContent value="results">
          <ResultsGallery results={results} />
        </TabsContent>
        <TabsContent value="help">
          <HelpSection />
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleProcess}
          disabled={productImages.length === 0 || selectedBackgrounds.length === 0 || isProcessing}
          className="gap-2"
        >
          {isProcessing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              <ImageDown size={16} />
              Generate Placements
            </>
          )}
        </Button>
      </div>
    </main>
  )
}

function HelpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

