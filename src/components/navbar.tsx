import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"
import { ModeToggle } from "./mode-toggle"

export const Navbar = async () => {
  const user = await currentUser()

  return (
    <nav className="sticky z-50 top-0 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-dark-background/80 backdrop-blur-xl transition-all">
      <MaxWidthWrapper>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 font-bold text-lg hover:opacity-80 transition-opacity">
            <span className="text-gray-950 dark:text-white">Ping</span>
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">Alert</span>
          </Link>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {user ? (
              <>
                {/* Dashboard Link */}
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg",
                  })}
                >
                  Dashboard
                </Link>

                {/* Divider */}
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1" />

                {/* Sign Out */}
                <SignOutButton>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                  >
                    Sign out
                  </Button>
                </SignOutButton>

                {/* Theme Toggle */}
                <div className="ml-2 pl-1 border-l border-gray-200 dark:border-gray-800">
                  <ModeToggle />
                </div>
              </>
            ) : (
              <>
                {/* Pricing Link */}
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg",
                  })}
                >
                  Pricing
                </Link>

                {/* Sign In */}
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg",
                  })}
                >
                  Sign in
                </Link>

                {/* Sign Up CTA */}
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    className: "ml-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all",
                  })}
                >
                  Get Started
                  <ArrowRight className="ml-1.5 size-3.5" />
                </Link>

                {/* Theme Toggle */}
                <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                  <ModeToggle />
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
