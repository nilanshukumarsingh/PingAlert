import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Zap, Plus } from "lucide-react"

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient()

  const { mutate: insertQuickstartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickstartCategories.$post()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
    },
  })

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      {/* Illustration Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-brand-400/10 blur-2xl rounded-full w-20 h-20" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/20 rounded-full flex items-center justify-center border border-brand-200/50 dark:border-brand-800/50">
          <Zap className="w-10 h-10 text-brand-600 dark:text-brand-400" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-3 text-center">
        No event categories yet
      </h1>

      {/* Subheading */}
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Create your first monitoring category to start tracking events and receiving real-time alerts
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {/* Quickstart Button */}
        <Button
          onClick={() => insertQuickstartCategories()}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>{isPending ? "Creating..." : "Quickstart Setup"}</span>
        </Button>

        {/* Create Custom Button */}
        <CreateEventCategoryModal containerClassName="">
          <Button
            variant="outline"
            className="inline-flex items-center gap-2 px-6 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom</span>
          </Button>
        </CreateEventCategoryModal>
      </div>

      {/* Info Box */}
      <div className="mt-12 max-w-md w-full p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <span className="font-semibold">💡 Tip:</span> Use Quickstart to get sample categories, or create your own to match your infrastructure.
        </p>
      </div>
    </div>
  )
}
