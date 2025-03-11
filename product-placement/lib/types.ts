export interface PlacementSettings {
  scale: number
  position: "top-left" | "top" | "top-right" | "left" | "center" | "right" | "bottom-left" | "bottom" | "bottom-right"
  preserveDetails: boolean
  enhanceLighting: boolean
  qualityPreset?: "draft" | "standard" | "high"
}

