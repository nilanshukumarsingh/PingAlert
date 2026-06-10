"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
import { Button, buttonVariants } from "@/components/ui/button"
import { client } from "@/lib/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format, formatDistanceToNow } from "date-fns"
import { 
  ArrowRight, 
  BarChart2, 
  Clock, 
  Database, 
  Trash2, 
  Zap, 
  AlertTriangle, 
  Check, 
  Copy, 
  Terminal, 
  Activity,
  Code,
  Pencil
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { DashboardEmptyState } from "./dashboard-empty-state"
import { Modal } from "@/components/ui/model"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { copyToClipboard } from "@/utils"
import { EditEventCategoryModal } from "@/components/edit-event-category-modal"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface DashboardPageContentProps {
  apiKey: string
  discordId: string | null
}

type TabType = "curl" | "javascript" | "python"

export const DashboardPageContent = ({ apiKey, discordId }: DashboardPageContentProps) => {
  const { user: clerkUser } = useUser()
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<any | null>(null)
  const [copiedCategoryId, setCopiedCategoryId] = useState<string | null>(null)
  const [activeCodeTab, setActiveCodeTab] = useState<TabType>("curl")
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [origin, setOrigin] = useState("https://pingalert.com")

  const queryClient = useQueryClient()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get()
      return await res.json()
    },
  })

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
    mutationFn: async (name: string) => {
      await client.category.deleteCategory.$post({ name })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      queryClient.invalidateQueries({ queryKey: ["usage"] })
      setDeletingCategory(null)
    },
  })

  if (isEventCategoriesLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-64 w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />
  }

  // Helpers
  const formatColor = (colorNum: number) => {
    return `#${colorNum.toString(16).padStart(6, "0")}`
  }

  const copyApiKey = async () => {
    const success = await copyToClipboard(apiKey)
    if (success) {
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    }
  }

  const copyCategoryCurl = async (catName: string, catId: string) => {
    const curlCommand = `curl -X POST ${origin}/api/v1/events \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "category": "${catName}",
    "fields": {
      "status": "success",
      "severity": "info"
    },
    "description": "Triggered manually from PingAlert dashboard"
  }'`
    const success = await copyToClipboard(curlCommand)
    if (success) {
      setCopiedCategoryId(catId)
      setTimeout(() => setCopiedCategoryId(null), 2000)
    }
  }

  // Quota percentage calculations
  const quotaPercentage = usageData ? (usageData.eventsUsed / usageData.eventsLimit) * 100 : 0
  const totalEvents = categories.reduce((sum, cat) => sum + (cat.eventsCount || 0), 0)

  // Integration snippets
  const getCodeSnippet = (tab: TabType) => {
    const testCategory = categories[0]?.name || "category_name"
    switch (tab) {
      case "curl":
        return `curl -X POST ${origin}/api/v1/events \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "category": "${testCategory}",
    "fields": {
      "status": "success",
      "message": "Hello from code!"
    },
    "description": "PingAlert Integration Test"
  }'`
      case "javascript":
        return `fetch("${origin}/api/v1/events", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    category: "${testCategory}",
    fields: {
      status: "success",
      message: "Hello from code!"
    },
    description: "PingAlert Integration Test"
  })
})`
      case "python":
        return `import requests

url = "${origin}/api/v1/events"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "category": "${testCategory}",
    "fields": {
        "status": "success",
        "message": "Hello from code!"
    },
    "description": "PingAlert Integration Test"
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())`
    }
  }

  const handleCopyCode = async () => {
    const success = await copyToClipboard(getCodeSnippet(activeCodeTab))
    if (success) {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  return (
    <>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Discord Setup Warning */}
        {!discordId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 dark:border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200">Discord connection required</h4>
                <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5">
                  Set your Discord ID in settings to receive instant push alerts when webhooks are triggered.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/account-settings"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "text-xs font-semibold text-amber-800 dark:text-amber-200 border-amber-500/20 dark:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-900 dark:hover:bg-amber-500/20",
              })}
            >
              Configure Discord &rarr;
            </Link>
          </motion.div>
        )}

        {/* Personalized Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
          <div className="flex items-center gap-4">
            {clerkUser?.imageUrl ? (
              <img
                src={clerkUser.imageUrl}
                alt="Profile Avatar"
                className="size-14 rounded-full border-2 border-brand-500/20 shadow-sm"
              />
            ) : (
              <div className="size-14 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 border border-brand-500/30 flex items-center justify-center font-bold text-brand-600">
                {(clerkUser?.firstName || "D").charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white flex items-center gap-2">
                Welcome back, {clerkUser?.firstName || "Developer"}!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Active and listening for events
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Usage Quota Card */}
          <div className="relative overflow-hidden bg-white dark:bg-zinc-900/50 border border-gray-200/80 dark:border-zinc-800/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Activity className="size-20 text-brand-500" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Events Quota</span>
              <span className="text-[10px] bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-full font-extrabold uppercase">
                {usageData?.eventsLimit === 100 ? "FREE PLAN" : "PRO PLAN"}
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-gray-950 dark:text-white">
                {usageData?.eventsUsed.toLocaleString() || 0}
              </span>
              <span className="text-sm font-semibold text-gray-500 dark:text-zinc-450">
                / {usageData?.eventsLimit.toLocaleString() || 100}
              </span>
            </div>
            <div className="mt-4 w-full bg-gray-100 dark:bg-zinc-800 h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-500 to-brand-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-3 font-medium">
              Resets on {usageData?.resetDate ? format(new Date(usageData.resetDate), "MMM d, yyyy") : "next billing period"}
            </p>
          </div>

          {/* Categories Summary */}
          <div className="relative overflow-hidden bg-white dark:bg-zinc-900/50 border border-gray-200/80 dark:border-zinc-800/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Database className="size-20 text-brand-500" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Event Categories</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                {categories.length} Active
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-gray-950 dark:text-white">
                {categories.length}
              </span>
              <span className="text-sm font-semibold text-gray-500 dark:text-zinc-450">
                / {usageData?.categoriesLimit || 10} categories
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-4 overflow-hidden h-7">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-sm inline-flex items-center justify-center size-7 rounded-full bg-gray-50 dark:bg-zinc-800 border border-gray-150 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform cursor-default"
                  title={`${cat.name} events`}
                  style={{
                    borderLeftColor: formatColor(cat.color),
                    borderLeftWidth: "2px",
                  }}
                >
                  {cat.emoji || "📂"}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-2 font-medium">
              Create categories to isolate app domains.
            </p>
          </div>

          {/* Quick Integration Keys */}
          <div className="relative overflow-hidden bg-white dark:bg-zinc-900/50 border border-gray-200/80 dark:border-zinc-800/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Terminal className="size-20 text-brand-500" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Authentication</span>
              <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${discordId ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                <span className={`size-1.5 rounded-full ${discordId ? "bg-emerald-500" : "bg-amber-500"}`} />
                {discordId ? "Discord linked" : "Discord missing"}
              </span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-950/40 rounded-lg p-2.5 mt-3 border border-gray-200/50 dark:border-zinc-805/50">
              <code className="text-xs font-mono text-gray-700 dark:text-zinc-300 truncate max-w-[150px]">
                {showApiKey ? apiKey : "••••••••••••••••••••••••••••••••"}
              </code>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  {showApiKey ? "Hide" : "Show"}
                </button>
                <button
                  onClick={copyApiKey}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-450"
                  title="Copy API Key"
                >
                  {copiedKey ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-2 font-medium">
              Passed via Authorization Bearer token header.
            </p>
          </div>
        </div>

        {/* Interactive Event Chart Section */}
        <div className="bg-white dark:bg-zinc-900/50 border border-gray-200/80 dark:border-zinc-800/80 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-gray-950 dark:text-white">Event Distribution</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Proportion of event counts across your active categories
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <BarChart2 className="size-4 text-brand-500" />
              <span>{totalEvents.toLocaleString()} Total Pings</span>
            </div>
          </div>

          {totalEvents > 0 ? (
            <div className="space-y-6">
              {/* Segmented Progress Bar */}
              <div className="h-4 w-full rounded-full flex overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-inner">
                {categories.map((cat) => {
                  const percentage = totalEvents > 0 ? ((cat.eventsCount || 0) / totalEvents) * 100 : 0
                  if (percentage === 0) return null
                  const hexColor = formatColor(cat.color)
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full relative group cursor-pointer"
                      style={{ backgroundColor: hexColor }}
                      title={`${cat.emoji || "📂"} ${cat.name}: ${cat.eventsCount} events (${percentage.toFixed(1)}%)`}
                    />
                  )
                })}
              </div>

              {/* Statistics Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {categories.map((cat) => {
                  const percentage = totalEvents > 0 ? ((cat.eventsCount || 0) / totalEvents) * 100 : 0
                  const hexColor = formatColor(cat.color)
                  return (
                    <div
                      key={cat.id}
                      className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg shrink-0">{cat.emoji || "📂"}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate capitalize">
                            {cat.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: hexColor }} />
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                              {percentage.toFixed(1)}% of total
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-gray-950 dark:text-white">
                          {cat.eventsCount || 0}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 block">
                          pings
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="size-12 bg-gray-50 dark:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 mb-3">
                <Activity className="size-5 animate-pulse" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">No active event data</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mt-1">
                You haven't sent any events yet. Check the developer integration guide below to trigger your first ping!
              </p>
            </div>
          )}
        </div>

        {/* Categories Section Heading */}
        <div className="flex justify-between items-center pt-4">
          <div>
            <h3 className="text-lg font-bold text-gray-950 dark:text-white">Categories</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your event monitors and copy customized cURL scripts
            </p>
          </div>
        </div>

        {/* Categories List Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const hexColor = formatColor(category.color)
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-xl border border-gray-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-300"
                style={{
                  borderTop: `4px solid ${hexColor}`,
                }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 12px 30px -10px ${hexColor}30, 0 4px 12px -5px ${hexColor}15`,
                  borderColor: `${hexColor}40`,
                }}
              >
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="size-11 rounded-xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${hexColor}20, ${hexColor}08)`,
                        border: `1px solid ${hexColor}30`,
                      }}
                    >
                      <span className="text-xl leading-none">{category.emoji || "📂"}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-gray-900 dark:text-white truncate capitalize">
                        {category.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Created {format(new Date(category.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/20 rounded-lg transition-colors shrink-0"
                      aria-label={`Edit ${category.name} category`}
                      onClick={() => setEditingCategory(category)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors shrink-0"
                      aria-label={`Delete ${category.name} category`}
                      onClick={() => setDeletingCategory(category.name)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-3 gap-3 my-5 py-4 border-y border-gray-100 dark:border-gray-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      <Clock className="size-3 text-brand-500" />
                      <span>Last Ping</span>
                    </div>
                    <p className="text-xs font-bold text-gray-950 dark:text-white truncate">
                      {category.lastPing
                        ? formatDistanceToNow(new Date(category.lastPing), { addSuffix: true })
                        : "Never"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      <Database className="size-3 text-brand-500" />
                      <span>Fields</span>
                    </div>
                    <p className="text-xs font-bold text-gray-950 dark:text-white">
                      {category.uniqueFieldCount || 0}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      <Zap className="size-3 text-brand-500" />
                      <span>Events</span>
                    </div>
                    <p className="text-xs font-bold text-gray-950 dark:text-white">
                      {category.eventsCount || 0}
                    </p>
                  </div>
                </div>

                {/* Actions footer */}
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/dashboard/category/${category.name}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "flex-1 text-xs bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-950 dark:hover:text-white text-gray-700 dark:text-gray-300 font-semibold transition-all rounded-lg",
                    })}
                  >
                    <span>View Events</span>
                    <ArrowRight className="size-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2.5 h-9 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-500/10 rounded-lg shrink-0 border border-transparent hover:border-brand-500/20"
                    onClick={() => copyCategoryCurl(category.name, category.id)}
                  >
                    {copiedCategoryId === category.id ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <Check className="size-3.5" />
                        Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Copy className="size-3.5" />
                        cURL
                      </span>
                    )}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Integration Developer Portal (Extra Feature) */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Code className="size-5 text-brand-500" />
                <h3 className="text-base font-bold text-gray-950 dark:text-white">Developer Integration Portal</h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Send HTTPS POST payloads to our events webhook to trigger Discord alerts
              </p>
            </div>
            
            {/* Tabs Trigger */}
            <div className="flex bg-gray-50 dark:bg-gray-850 p-1 rounded-lg border border-gray-200/50 dark:border-gray-700/50 self-start sm:self-auto">
              {(["curl", "javascript", "python"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase transition-all ${
                    activeCodeTab === tab
                      ? "bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full bg-zinc-950 rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
            {/* Terminal Header */}
            <div className="bg-zinc-900/90 px-4 py-3 flex justify-between items-center border-b border-zinc-800/80">
              <div className="flex space-x-2">
                <div className="size-3 rounded-full bg-[#ff5f56]" />
                <div className="size-3 rounded-full bg-[#ffbd2e]" />
                <div className="size-3 rounded-full bg-[#27c93f]" />
              </div>

              <span className="text-zinc-400 text-xs font-mono">
                {activeCodeTab === "curl"
                  ? "pingalert.sh"
                  : activeCodeTab === "javascript"
                  ? "pingalert.js"
                  : "pingalert.py"}
              </span>

              <button
                onClick={handleCopyCode}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold bg-zinc-850 hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-md"
                title="Copy Integration Code"
              >
                {copiedCode ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Body */}
            <SyntaxHighlighter
              language={
                activeCodeTab === "curl"
                  ? "bash"
                  : activeCodeTab === "javascript"
                  ? "javascript"
                  : "python"
              }
              style={atomDark}
              customStyle={{
                borderRadius: "0px",
                margin: 0,
                padding: "1.25rem",
                fontSize: "0.825rem",
                lineHeight: "1.6",
                background: "transparent",
              }}
            >
              {getCodeSnippet(activeCodeTab) || ""}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        showModal={!!deletingCategory}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-950 dark:text-white mb-2">
              Delete Category
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                "{deletingCategory}"
              </span>
              ? This action cannot be undone and all associated events will be permanently removed.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeletingCategory(null)}
              className="text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
              disabled={isDeletingCategory}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeletingCategory ? "Deleting..." : "Delete Category"}
            </Button>
          </div>
        </div>
      </Modal>

      <EditEventCategoryModal
        category={editingCategory}
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
      />
    </>
  )
}
