"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function HelpSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to Use This Tool</CardTitle>
        <CardDescription>Learn how to place your product images into lifestyle backgrounds</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Sample Images</AlertTitle>
          <AlertDescription>
            You can use the sample e-commerce product images from the provided WeTransfer link. Download and extract
            them before uploading.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="step1">
            <AccordionTrigger>Step 1: Upload Product Images</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-2">
                Upload your product images using the Upload tab. You can drag and drop multiple files or click to select
                them.
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Supported formats: PNG, JPG, JPEG, WebP, and GIF</li>
                <li>For best results, use images with transparent backgrounds</li>
                <li>Maximum file size: 20MB per image</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step2">
            <AccordionTrigger>Step 2: Select Background Images</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-2">
                Choose one or more background images from the Backgrounds tab. You can use the sample backgrounds or add
                your own custom URLs.
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Click on a background to select/deselect it</li>
                <li>Selected backgrounds will have a highlighted border</li>
                <li>You can add custom backgrounds by providing a URL</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step3">
            <AccordionTrigger>Step 3: Adjust Settings</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-2">
                Configure how your products will be placed in the background images using the Settings tab.
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Scale: Adjust the size of the product relative to the background</li>
                <li>Position: Choose where to place the product in the background</li>
                <li>Preserve Details: Ensure product details remain clear and visible</li>
                <li>Enhance Lighting: Adjust product lighting to match the background</li>
                <li>Quality Preset: Choose between faster generation or better quality</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step4">
            <AccordionTrigger>Step 4: Generate Placements</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-2">
                Click the "Generate Placements" button at the bottom of the page to start the process.
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>The tool will process each product with each selected background</li>
                <li>Processing time varies based on the number of images and quality settings</li>
                <li>Results will appear in the Results tab when complete</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step5">
            <AccordionTrigger>Step 5: View and Download Results</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-2">
                Once processing is complete, you can view and download your results from the Results tab.
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Hover over an image to see preview and download options</li>
                <li>Click "Preview" to see a larger version of the image</li>
                <li>Click "Download" to save an individual image</li>
                <li>Use "Download All" to save all generated images at once</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tips">
            <AccordionTrigger>Tips for Best Results</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Use product images with transparent backgrounds for best integration</li>
                <li>Choose backgrounds that match the product's context and scale</li>
                <li>Adjust the scale setting based on the relative size of your product</li>
                <li>Enable "Preserve Details" for products with important text or fine details</li>
                <li>Use "High" quality preset for final renders and "Draft" for testing</li>
                <li>For animated GIFs, results will be static images showing a frame from the animation</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

