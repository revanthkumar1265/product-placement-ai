"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface BackgroundGalleryProps {
  selectedBackgrounds: string[]
  setSelectedBackgrounds: (backgrounds: string[]) => void
}

// Sample background images
const SAMPLE_BACKGROUNDS = [
  {
    id: "living-room",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
    name: "Modern Living Room",
  },
  {
    id: "kitchen",
    url: "https://images.unsplash.com/photo-1556911220-bda9f7f37446?q=80&w=1000",
    name: "Bright Kitchen",
  },
  {
    id: "bedroom",
    url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
    name: "Cozy Bedroom",
  },
  {
    id: "office",
    url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
    name: "Home Office",
  },
  {
    id: "dining",
    url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000",
    name: "Dining Area",
  },
  {
    id: "bathroom",
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000",
    name: "Bathroom",
  },
  {
    id: "outdoor",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    name: "Outdoor Patio",
  },
  {
    id: "shelf",
    url: "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=1000",
    name: "Bookshelf",
  },
  {
    id: "table",
    url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000",
    name: "Coffee Table",
  },
]

export default function BackgroundGallery({ selectedBackgrounds, setSelectedBackgrounds }: BackgroundGalleryProps) {
  const [customUrl, setCustomUrl] = useState("")
  const [customName, setCustomName] = useState("")
  const [customBackgrounds, setCustomBackgrounds] = useState<{ id: string; url: string; name: string }[]>([])

  const toggleBackground = (url: string) => {
    if (selectedBackgrounds.includes(url)) {
      setSelectedBackgrounds(selectedBackgrounds.filter((bg) => bg !== url))
    } else {
      setSelectedBackgrounds([...selectedBackgrounds, url])
    }
  }

  const addCustomBackground = () => {
    if (!customUrl) return

    const newBackground = {
      id: `custom-${Date.now()}`,
      url: customUrl,
      name: customName || `Custom ${customBackgrounds.length + 1}`,
    }

    setCustomBackgrounds([...customBackgrounds, newBackground])
    setSelectedBackgrounds([...selectedBackgrounds, customUrl])
    setCustomUrl("")
    setCustomName("")
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Sample Backgrounds</h3>
        <p className="text-sm text-muted-foreground">Select one or more background images to place your products in.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SAMPLE_BACKGROUNDS.map((background) => (
            <Card
              key={background.id}
              className={`relative cursor-pointer overflow-hidden transition-all ${
                selectedBackgrounds.includes(background.url)
                  ? "ring-2 ring-primary"
                  : "hover:ring-1 hover:ring-primary/50"
              }`}
              onClick={() => toggleBackground(background.url)}
            >
              <div className="aspect-video relative">
                <Image src={background.url || "/placeholder.svg"} alt={background.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-medium">{background.name}</h4>
              </div>
              {selectedBackgrounds.includes(background.url) && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {customBackgrounds.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Custom Backgrounds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {customBackgrounds.map((background) => (
              <Card
                key={background.id}
                className={`relative cursor-pointer overflow-hidden transition-all ${
                  selectedBackgrounds.includes(background.url)
                    ? "ring-2 ring-primary"
                    : "hover:ring-1 hover:ring-primary/50"
                }`}
                onClick={() => toggleBackground(background.url)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={background.url || "/placeholder.svg"}
                    alt={background.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium">{background.name}</h4>
                </div>
                {selectedBackgrounds.includes(background.url) && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 border rounded-lg p-4">
        <h3 className="text-lg font-medium">Add Custom Background</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              placeholder="https://example.com/background.jpg"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image-name">Name (optional)</Label>
            <Input
              id="image-name"
              placeholder="Living Room"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>
          <Button onClick={addCustomBackground} disabled={!customUrl}>
            Add Background
          </Button>
        </div>
      </div>
    </div>
  )
}

