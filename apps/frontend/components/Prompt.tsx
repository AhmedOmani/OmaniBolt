import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Send } from "lucide-react"

export function Prompt() {
    return (
        <div>
            <Textarea/>
            <div className="flex justify-end">
                <Button>
                    <Send />
                </Button>
            </div>
        </div>
    )
}