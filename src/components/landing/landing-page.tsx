"use client"

import { Check, Star, ArrowRight, Globe, Zap, ShieldCheck, TrendingUp, Zap as Lightning, Bell } from "lucide-react"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import Image from "next/image"
import { Icons } from "@/components/icons"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DemoDashboard } from "@/components/landing/demo-dashboard"
import { AnimatedText } from "@/components/ui/animated-text"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const featureChipVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

export const LandingPage = () => {
    return (
      <>
        {/* Gradient Background Accent */}
        <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 blur-3xl opacity-20 w-96 h-96 bg-brand-500 rounded-full" />
          <div className="absolute bottom-20 left-0 -z-10 blur-3xl opacity-10 w-96 h-96 bg-blue-500 rounded-full" />
        </div>

        {/* Hero Section */}
        <section className="relative py-32 sm:py-48 bg-white dark:bg-dark-background overflow-hidden">
          <MaxWidthWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                className="flex flex-col gap-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Feature Badge */}
                <motion.div 
                  className="inline-flex w-fit items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800/50 rounded-full"
                  variants={itemVariants}
                >
                  <span className="flex h-2 w-2 rounded-full bg-brand-500" />
                  <span className="text-xs font-medium text-brand-700 dark:text-brand-400">Now with 99.9% uptime SLA</span>
                </motion.div>

                <motion.h1 
                  className="text-6xl md:text-7xl font-bold tracking-tight leading-tight text-gray-950 dark:text-gray-50"
                  variants={itemVariants}
                >
                  Uptime monitoring{" "}
                  <AnimatedText 
                    words={["that works", "that matters", "you trust"]} 
                    className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent"
                  />
                </motion.h1>

                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg"
                  variants={itemVariants}
                >
                  Stop guessing if your site is down. Get instant alerts across Discord, email, and more. Real-time monitoring that scales with your business.
                </motion.p>
  
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={containerVariants}
                  custom={1}
                >
                  {[
                    { icon: TrendingUp, text: "99.9% uptime SLA" },
                    { icon: Bell, text: "Instant alerts" },
                    { icon: Globe, text: "130+ global nodes" },
                    { icon: Zap, text: "30-second checks" },
                  ].map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                      variants={featureChipVariants}
                    >
                      <feature.icon className="w-5 h-5 text-brand-600 shrink-0" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
  
                <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
                  <Link href="/sign-up" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      Get Started Free
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </Link>
                  <Link href="/pricing" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                      View Pricing
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
  
              <motion.div 
                className="relative flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                {/* Floating orb background */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-400/30 to-transparent rounded-full" />
                </div>

                <div className="relative w-full max-w-2xl">
                  {/* Card container with glassmorphism */}
                  <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 shadow-2xl p-4 sm:p-6 lg:p-8">
                    <DemoDashboard />
                  </div>

                  {/* Floating stats badges */}
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800 w-40"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">All Systems</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">99.98% uptime</p>
                  </motion.div>

                  <motion.div 
                    className="absolute -top-6 -right-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800 w-40"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Response Time</span>
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">142ms avg</p>
                  </motion.div>
                </div>

                <p className="mt-12 text-center text-sm font-medium text-gray-600 dark:text-gray-400 max-w-lg">
                  Beautiful, real-time monitoring dashboard that gives you complete visibility into your digital infrastructure.
                </p>
              </motion.div>
            </div>
          </MaxWidthWrapper>
        </section>
  
        {/* Testimonials Section - Enhanced */}
        <section className="bg-white dark:bg-dark-background py-24">
          <MaxWidthWrapper>
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white mb-6">
                Trusted by industry leaders
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Companies worldwide rely on PingAlert to keep their infrastructure running smoothly
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[
                {
                  quote: "PingAlert reduced our incident response time by 60%. We now know about issues before customers do.",
                  author: "Sarah Jenkins",
                  role: "CTO, TechFlow Solutions",
                  initials: "SJ",
                },
                {
                  quote: "The real-time alerts are a game-changer. Discord integration makes it seamless for our team.",
                  author: "Michael Chen",
                  role: "Operations Lead, CloudScale",
                  initials: "MC",
                },
                {
                  quote: "Finally, a monitoring solution that's actually easy to set up and doesn't require a PhD to use.",
                  author: "Emma Rodriguez",
                  role: "DevOps Engineer, StartupXYZ",
                  initials: "ER",
                },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="p-8 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  whileHover={{ translateY: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center gap-3 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="w-10 h-10 bg-brand-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </MaxWidthWrapper>
        </section>

        {/* CTA Section - Premium */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-dark-background py-24 border-t border-gray-200 dark:border-gray-800">
          <MaxWidthWrapper>
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-950 dark:text-white mb-6">
                Ready to monitor your infrastructure?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Join thousands of teams using PingAlert to stay ahead of downtime. Start free today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg">
                    Get Started Now
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href="/pricing" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800">
                    View Plans
                  </Button>
                </Link>
              </div>
            </motion.div>
          </MaxWidthWrapper>
        </section>
      </>
    )
  }

