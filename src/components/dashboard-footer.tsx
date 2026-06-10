"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Activity, HelpCircle, Shield, LifeBuoy } from "lucide-react"
import { motion } from "framer-motion"

export const DashboardFooter = () => {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: "Docs", href: "/dashboard", icon: HelpCircle },
    { label: "API Reference", href: "/dashboard/api-key", icon: Shield },
    { label: "Support", href: "mailto:support@pingalert.com", icon: LifeBuoy },
  ]

  const socials = [
    { name: "Twitter", href: "https://x.com/nilanshukumar81", icon: Twitter },
    { name: "GitHub", href: "https://github.com/nilanshukumarsingh/PingAlert", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/nilanshukumarsingh/", icon: Linkedin },
  ]

  return (
    <footer className="w-full mt-auto border-t border-gray-200/60 dark:border-zinc-850/80 bg-white/60 dark:bg-[#0c0c0e]/30 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <Link href="/" className="font-bold text-sm hover:opacity-80 transition-opacity">
              <span className="text-gray-950 dark:text-white">Ping</span>
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">Alert</span>
            </Link>
            <span className="hidden sm:inline text-gray-350 dark:text-zinc-700">|</span>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              &copy; {currentYear} PingAlert. All rights reserved.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1.5 text-xs text-gray-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
              >
                <link.icon className="size-3.5 text-gray-450 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side: Operational Status & Social Icons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Status Pill */}
            <div className="flex items-center gap-2 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Activity className="size-3.5" />
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:border-brand-200 dark:hover:border-brand-900/30 text-gray-500 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 shadow-xs transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
