"use client"

import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Check, Copy } from "lucide-react"
import { copyToClipboard } from "@/utils"

export const EmptyCategoryState = ({
  categoryName,
}: {
  categoryName: string
}) => {
  const router = useRouter()
  const [origin, setOrigin] = useState("http://localhost:3000")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      const res = await client.category.pollCategory.$get({
        name: categoryName,
      })

      return await res.json()
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000
    },
  })

  const hasEvents = data?.hasEvents

  useEffect(() => {
    if (hasEvents) router.refresh()
  }, [hasEvents, router])

  const codeSnippet = `await fetch('${origin}/api/v1/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`

  const handleCopy = async () => {
    const success = await copyToClipboard(codeSnippet)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card
      contentClassName="max-w-2xl w-full flex flex-col items-center p-6"
      className="flex-1 flex items-center justify-center bg-white dark:bg-zinc-900/50 border border-gray-205 dark:border-zinc-800"
    >
      <h2 className="text-xl/8 font-bold text-center tracking-tight text-gray-950 dark:text-white">
        Create your first {categoryName} event
      </h2>
      <p className="text-sm/6 text-gray-650 dark:text-zinc-400 mb-8 max-w-md text-center text-pretty">
        Get started by sending a request to our tracking API:
      </p>

      <div className="w-full max-w-3xl bg-white dark:bg-zinc-950 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
        <div className="bg-gray-800 dark:bg-zinc-900 px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 dark:text-zinc-400 text-xs font-mono">your-first-event.js</span>
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-semibold bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded"
              title="Copy code snippet"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          customStyle={{
            borderRadius: "0px",
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="mt-8 flex flex-col items-center space-x-2">
        <div className="flex gap-2 items-center">
          <div className="size-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 dark:text-zinc-450">
            Listening to incoming events...
          </span>
        </div>

        <p className="text-sm/6 text-gray-600 dark:text-zinc-400 mt-2">
          Need help? Check out our{" "}
          <a
            href="https://github.com/nilanshukumarsingh/PingAlert#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
          >
            documentation
          </a>{" "}
          or{" "}
          <a
            href="mailto:support@pingalert.com"
            className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
          >
            contact support
          </a>
          .
        </p>
      </div>
    </Card>
  )
}
