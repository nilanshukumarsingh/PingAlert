"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
import { Button, buttonVariants } from "@/components/ui/button"
import { client } from "@/lib/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format, formatDistanceToNow } from "date-fns"
import { ArrowRight, BarChart2, Clock, Database, Trash2, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DashboardEmptyState } from "./dashboard-empty-state"
import { Modal } from "@/components/ui/model"
import { motion } from "framer-motion"

export const DashboardPageContent = () => {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: async (name: string) => {
        await client.category.deleteCategory.$post({ name })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
        setDeletingCategory(null)
      },
    }
  )

  if (isEventCategoriesLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-6 max-w-7xl">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/60 dark:to-gray-900/30 rounded-xl border border-gray-200/50 dark:border-gray-800/50 group-hover:border-gray-300/50 dark:group-hover:border-gray-700/50 transition-colors duration-300" />

              {/* Card Content */}
              <div className="relative p-6 rounded-xl backdrop-blur-sm">
                {/* Header with Icon and Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Icon/Emoji */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-shadow"
                      style={{
                        background: category.color
                          ? `linear-gradient(135deg, ${category.color}20, ${category.color}08)`
                          : undefined,
                      }}
                    >
                      <span className="text-2xl leading-none">
                        {category.emoji || "📂"}
                      </span>
                    </div>

                    {/* Category Name and Date */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-950 dark:text-white truncate">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created {format(category.createdAt, "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label={`Delete ${category.name} category`}
                    onClick={() => setDeletingCategory(category.name)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  {/* Last Ping */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <Clock className="size-3.5 text-brand-500" />
                      <span>Last Ping</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {category.lastPing
                        ? formatDistanceToNow(category.lastPing, { addSuffix: true })
                        : "Never"}
                    </p>
                  </div>

                  {/* Unique Fields */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <Database className="size-3.5 text-brand-500" />
                      <span>Fields</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {category.uniqueFieldCount || 0}
                    </p>
                  </div>

                  {/* Events This Month */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <Zap className="size-3.5 text-brand-500" />
                      <span>Events</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {category.eventsCount || 0}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-start">
                  <Link
                    href={`/dashboard/category/${category.name}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className:
                        "inline-flex items-center gap-2 text-sm bg-gradient-to-r from-brand-500/10 to-brand-400/5 hover:from-brand-500/20 hover:to-brand-400/10 text-brand-700 dark:text-brand-400 border-brand-200/50 dark:border-brand-800/50 hover:border-brand-300 dark:hover:border-brand-700 transition-all",
                    })}
                  >
                    View Details
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
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
    </>
  )
}
