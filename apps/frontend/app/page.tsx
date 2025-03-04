import { Button } from "@/components/ui/button";
import { Appbar } from "@/components/Appbar";
import { Prompt } from "@/components/Prompt";
import Image from "next/image";
import { TemplateButtons } from "@/components/TemplateButtons";

export default function Home() {
  return (
    <div className= "p-4">
      <Appbar />
      <div className="max-w-2xl mx-auto pt-32">
        <div className="text-2xl font-bold text-center">
          What do you want to build?
        </div>
        <div className="text-sm text-muted-foreground text-center p-2">
          Prompt, click generate, and we'll build it.
        </div>
        <div className="pt-4">
          <Prompt />
        </div>
        <div className="max-w-2xl mx-auto pt-4">
          <TemplateButtons />
        </div>
      </div>
    </div>
  )
}