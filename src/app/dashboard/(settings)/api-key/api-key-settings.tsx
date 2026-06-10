"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { useState } from "react"
import { copyToClipboard } from "@/utils"

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const copyApiKey = async () => {
    const success = await copyToClipboard(apiKey)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  return (
    <Card className="max-w-xl w-full">
      <div>
        <Label className="dark:text-zinc-700">Your API Key</Label>
        <div className="mt-1 relative">
          <Input className="dark:text-zinc-950 pr-24" type={showApiKey ? "text" : "password"} value={apiKey} readOnly />
          <div className="absolute space-x-1 inset-y-0 right-0 flex items-center pr-1">
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-1 w-12 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:outline-none dark:bg-zinc-50 dark:focus:ring-2 dark:focus:ring-brand-500 text-zinc-900"
            >
              {showApiKey ? "Hide" : "Show"}
            </Button>
            <Button
              variant="outline"
              onClick={copyApiKey}
              className="p-1 w-10 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:outline-none dark:bg-zinc-50 dark:focus:ring-2 dark:focus:ring-brand-500"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-brand-900" />
              ) : (
                <ClipboardIcon className="size-4 text-brand-900" />
              )}
            </Button>
          </div>
        </div>

        <p className="mt-2 text-sm/6 text-gray-600">
          Keep your key secret and do not share it with others.
        </p>
      </div>
    </Card>
  )
}
