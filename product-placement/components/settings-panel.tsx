"use client"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PlacementSettings } from "@/lib/types"

interface SettingsPanelProps {
  settings: PlacementSettings
  setSettings: (settings: PlacementSettings) => void
}

export default function SettingsPanel({ settings, setSettings }: SettingsPanelProps) {
  const updateSettings = <K extends keyof PlacementSettings>(key: K, value: PlacementSettings[K]) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Placement Settings</CardTitle>
          <CardDescription>Configure how products are placed in background images</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="scale">Product Scale</Label>
              <span className="text-sm text-muted-foreground">{Math.round(settings.scale * 100)}%</span>
            </div>
            <Slider
              id="scale"
              min={0.1}
              max={1}
              step={0.05}
              value={[settings.scale]}
              onValueChange={(value) => updateSettings("scale", value[0])}
            />
            <p className="text-xs text-muted-foreground">Adjust the size of the product relative to the background</p>
          </div>

          <div className="space-y-2">
            <Label>Position</Label>
            <RadioGroup
              value={settings.position}
              onValueChange={(value) => updateSettings("position", value as any)}
              className="grid grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="top-left" id="top-left" />
                <Label htmlFor="top-left">Top Left</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="top" id="top" />
                <Label htmlFor="top">Top</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="top-right" id="top-right" />
                <Label htmlFor="top-right">Top Right</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id="left" />
                <Label htmlFor="left">Left</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="center" id="center" />
                <Label htmlFor="center">Center</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id="right" />
                <Label htmlFor="right">Right</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bottom-left" id="bottom-left" />
                <Label htmlFor="bottom-left">Bottom Left</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bottom" id="bottom" />
                <Label htmlFor="bottom">Bottom</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bottom-right" id="bottom-right" />
                <Label htmlFor="bottom-right">Bottom Right</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Fine-tune the AI generation process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="preserve-details">Preserve Product Details</Label>
              <p className="text-xs text-muted-foreground">Ensure product details remain clear and visible</p>
            </div>
            <Switch
              id="preserve-details"
              checked={settings.preserveDetails}
              onCheckedChange={(checked) => updateSettings("preserveDetails", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enhance-lighting">Enhance Lighting</Label>
              <p className="text-xs text-muted-foreground">Adjust product lighting to match the background scene</p>
            </div>
            <Switch
              id="enhance-lighting"
              checked={settings.enhanceLighting}
              onCheckedChange={(checked) => updateSettings("enhanceLighting", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality-preset">Quality Preset</Label>
            <Select
              value={settings.qualityPreset || "standard"}
              onValueChange={(value) => updateSettings("qualityPreset", value as any)}
            >
              <SelectTrigger id="quality-preset">
                <SelectValue placeholder="Select quality preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft - Faster generation</SelectItem>
                <SelectItem value="standard">Standard - Balanced quality</SelectItem>
                <SelectItem value="high">High - Best quality (slower)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Higher quality settings produce better results but take longer to generate
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

