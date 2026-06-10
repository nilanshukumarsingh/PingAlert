"use client"

import { ReactNode } from "react"
import { Button } from "./ui/button"
import { ArrowLeft, X } from "lucide-react"
import { Heading } from "./heading"
import { useRouter } from "next/navigation"
import { cn } from "@/utils"
import { DashboardFooter } from "./dashboard-footer"

interface DashboardPageProps {
  title: string
  children?: ReactNode
  hideBackButton?: boolean
  cta?: ReactNode
}

export const DashboardPage = ({
  title,
  children,
  cta,
  hideBackButton,
}: DashboardPageProps) => {
  const router = useRouter()

  return (
    <section className="flex-1 h-full w-full flex flex-col bg-gray-50 dark:bg-dark-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center border-b border-gray-200 dark:border-zinc-850/80 bg-white dark:bg-[#0c0c0e]/50 backdrop-blur-md">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 flex-1">
            {!hideBackButton && (
              <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="text-gray-550 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300 p-2 h-8 w-8"
                aria-label="Go back"
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              {title}
            </h1>
          </div>
          {cta ? (
            <div className="w-full sm:w-auto">
              {cta}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {children}
        </div>
        <DashboardFooter />
      </div>
    </section>
  )
}

