"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { Modal } from "./ui/model"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/utils"
import { Button } from "./ui/button"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
  emoji: z.string().emoji("Invalid emoji").optional(),
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
]

interface CreateEventCategoryModel extends PropsWithChildren {
  containerClassName?: string
}

export const CreateEventCategoryModal = ({
  children,
  containerClassName,
}: CreateEventCategoryModel) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: createEventCategory, isPending } = useMutation({
    mutationFn: async (data: EventCategoryForm) => {
      const res = await client.category.createEventCategory.$post(data)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error((errorData as { message?: string })?.message || "Failed to create category")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      setIsOpen(false)
    },
    onError: (error) => {
      const message = error.message || "Failed to create category"
      
      // Check if it's a limit reached error
      if (message.toLowerCase().includes("limit") || message.toLowerCase().includes("upgrade")) {
        toast.error("Category Limit Reached", {
          description: "You've reached the maximum categories for your plan.",
          action: {
            label: "Upgrade to Pro",
            onClick: () => router.push("/dashboard/upgrade"),
          },
          duration: 5000,
        })
      } else {
        toast.error(message)
      }
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  })

  const color = watch("color")
  const selectedEmoji = watch("emoji")

  const onSubmit = (data: EventCategoryForm) => {
    createEventCategory(data)
  }

  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal
        className="max-w-xl p-8"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              New Event Category
            </h2>
            <p className="text-sm/6 text-gray-600">
              Create a new category to organize your events.
            </p>
          </div>

          <div className="space-y-6">
            {/* Category Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                Category Name
              </Label>
              <Input
                autoFocus
                id="name"
                {...register("name")}
                placeholder="e.g. user-signup, payment-processed"
                className="w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-brand-500"
              />
              {errors.name ? (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            {/* Color Picker */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                Category Color
              </Label>
              <div className="grid grid-cols-5 gap-3">
                {COLOR_OPTIONS.map((premadeColor) => (
                  <button
                    key={premadeColor}
                    type="button"
                    className={cn(
                      "h-12 rounded-lg transition-all transform",
                      color === premadeColor
                        ? "ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-gray-900 dark:ring-white scale-105 shadow-lg"
                        : "hover:scale-105 hover:shadow-md border-2 border-gray-200 dark:border-gray-700"
                    )}
                    style={
                      color === premadeColor 
                        ? { backgroundColor: premadeColor }
                        : { backgroundColor: premadeColor, opacity: 0.7 }
                    }
                    onClick={() => setValue("color", premadeColor)}
                    title={premadeColor}
                  />
                ))}
              </div>
              {errors.color ? (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.color.message}
                </p>
              ) : null}
            </div>

            {/* Emoji Picker */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                Category Icon
              </Label>
              <div className="grid grid-cols-5 gap-3">
                {EMOJI_OPTIONS.map(({ emoji, label }) => (
                  <button
                    key={emoji}
                    type="button"
                    className={cn(
                      "h-12 flex items-center justify-center text-2xl rounded-lg transition-all transform",
                      selectedEmoji === emoji
                        ? "bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/40 dark:to-brand-900/20 ring-2 ring-brand-500 scale-105 shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
                    )}
                    onClick={() => setValue("emoji", emoji)}
                    title={label}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {errors.emoji ? (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.emoji.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              disabled={isPending} 
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              {isPending ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
