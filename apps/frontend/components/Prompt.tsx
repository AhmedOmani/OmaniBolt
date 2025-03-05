"use client"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Send } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Token } from "@clerk/nextjs/server"
import { BACKEND_URL } from "../config"
export function Prompt() {
    const [prompt , setPrompt] = useState("");
    const { getToken } = useAuth();
    return (
        <div>
            <Textarea placeholder="Enter your prompt here" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <div className="flex justify-end pt-2">
                <Button onClick={async () => {
                    const token = await getToken();
                    const response = await axios.post(`${BACKEND_URL}/project` , {
                        prompt: prompt,
                    } , {
                        headers: {
                            "authorization" : `Bearer ${token}`
                        }
                    });
                    console.log(response.data)
                }}>
                    <Send />
                </Button>
            </div>
        </div>
    )
}