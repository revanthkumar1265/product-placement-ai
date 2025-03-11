import { type NextRequest, NextResponse } from "next/server"
import { generateImage } from "ai"
import { fal } from "@ai-sdk/fal"

export async function POST(req: NextRequest) {
  try {
    const { productImage, backgroundImage, settings } = await req.json()

    if (!productImage || !backgroundImage) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Create a prompt based on the settings
    const prompt = createPrompt(backgroundImage, settings)

    // Generate the image using the AI SDK
    const result = await generateImage({
      model: fal("fal-ai/stable-diffusion-3.5-large"),
      prompt,
      width: 1024,
      height: 768,
      // Use the product image as a reference
      images: [productImage],
      // Add additional parameters for better quality
      parameters: {
        guidance_scale: 7.5,
        num_inference_steps: 30,
        strength: 0.75,
      },
    })

    return NextResponse.json({ resultImage: result.url })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}

function createPrompt(backgroundImage: string, settings: any) {
  const { position, preserveDetails, enhanceLighting, scale } = settings

  let positionText = ""
  switch (position) {
    case "top-left":
      positionText = "in the top left corner of"
      break
    case "top":
      positionText = "at the top of"
      break
    case "top-right":
      positionText = "in the top right corner of"
      break
    case "left":
      positionText = "on the left side of"
      break
    case "center":
      positionText = "in the center of"
      break
    case "right":
      positionText = "on the right side of"
      break
    case "bottom-left":
      positionText = "in the bottom left corner of"
      break
    case "bottom":
      positionText = "at the bottom of"
      break
    case "bottom-right":
      positionText = "in the bottom right corner of"
      break
    default:
      positionText = "in"
      break
  }

  // Scale text based on the scale setting
  const scaleText =
    scale < 0.3
      ? "Make the product small in relation to the scene"
      : scale > 0.7
        ? "Make the product large and prominent in the scene"
        : "Size the product appropriately for the scene"

  const detailsText = preserveDetails
    ? "Ensure all product details, textures, and colors are clearly visible and preserved exactly as in the original product image."
    : ""

  const lightingText = enhanceLighting
    ? "Adjust the lighting and shadows of the product to match the scene naturally, ensuring consistent lighting direction and intensity."
    : ""

  return `Place the product image ${positionText} the background scene. ${scaleText}.
    Make it look realistic and naturally integrated into the environment with proper perspective and scale.
    ${detailsText} ${lightingText}
    The final image should look like a professional product photography in a lifestyle setting,
    as if the product was actually there when the photo was taken.
    Maintain the original product's appearance, colors, and details.`
}

