"use client";

import {
  Check,
  Star,
  ArrowRight,
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  Zap as Lightning,
  Bell,
} from "lucide-react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Image from "next/image";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DemoDashboard } from "@/components/landing/demo-dashboard";
import { AnimatedText } from "@/components/ui/animated-text";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const featureChipVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

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
            <div className="flex flex-col gap-10">
              {/* Feature Badge */}
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800/50 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-brand-500" />
                <span className="text-xs font-medium text-brand-700 dark:text-brand-400">
                  Now with 99.9% uptime SLA
                </span>
              </div>

              <div className="text-6xl md:text-7xl font-bold tracking-tight leading-tight text-gray-950 dark:text-gray-50">
                Uptime monitoring{" "}
                <AnimatedText
                  words={["that works", "that matters", "you trust"]}
                  className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent"
                />
              </div>

              <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                Stop guessing if your site is down. Get instant alerts across
                Discord, email, and more. Real-time monitoring that scales with
                your business.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, text: "99.9% uptime SLA" },
                  { icon: Bell, text: "Instant alerts" },
                  { icon: Globe, text: "130+ global nodes" },
                  { icon: Zap, text: "30-second checks" },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  >
                    <feature.icon className="w-5 h-5 text-brand-600 shrink-0" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href="/pricing" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center">
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
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800 w-40">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      All Systems
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    99.98% uptime
                  </p>
                </div>

                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800 w-40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Response Time
                    </span>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    142ms avg
                  </p>
                </div>
              </div>

              <p className="mt-12 text-center text-sm font-medium text-gray-600 dark:text-gray-400 max-w-lg">
                Beautiful, real-time monitoring dashboard that gives you
                complete visibility into your digital infrastructure.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>


      {/* 1. Customer Success Stories Section */}
      <section className="bg-white dark:bg-dark-background py-24 border-t border-gray-150 dark:border-zinc-800/50">
        <MaxWidthWrapper>
          <div className="rounded-3xl bg-[#f0fdf4]/65 dark:bg-[#0c1f12]/30 border border-[#bbf7d0]/40 dark:border-emerald-950/40 p-8 md:p-12 shadow-sm relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-brand-500/5 blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
              <div className="flex flex-col gap-6 md:gap-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                  Customer Success Stories
                </h2>
                <blockquote className="text-lg md:text-xl font-medium text-gray-800 dark:text-zinc-200 leading-relaxed italic">
                  "Since implementing PingAlert, our incident response time has dropped by 60%. The 24/7 monitoring capabilities allow our team to sleep soundly, knowing we'll be alerted the second anything goes wrong."
                </blockquote>
                <div>
                  <p className="font-bold text-gray-950 dark:text-white text-base">
                    Sarah Jenkins
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 mt-1">
                    CIO, TechFlow Solutions
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm aspect-square bg-[#e2e8f0] dark:bg-zinc-800 rounded-3xl overflow-hidden border border-gray-205 dark:border-zinc-700 shadow-inner flex items-center justify-center p-4">
                  <Image
                    src="/brand-asset-profile-picture.png"
                    alt="Sarah Jenkins CIO avatar"
                    width={320}
                    height={320}
                    className="object-contain max-h-[90%] transform scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* 2. Reliable Uptime Monitoring Section */}
      <section className="bg-white dark:bg-dark-background py-24 border-t border-gray-150 dark:border-zinc-800/50">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Uptime Cities Grid Widget */}
            <div className="relative flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 to-transparent rounded-3xl blur-3xl -z-10" />
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/80 shadow-lg p-6 flex flex-col gap-6">
                
                {/* Cities Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Amsterdam - NL", status: "Operational" },
                    { name: "London - UK", status: "Operational" },
                    { name: "Seattle - US", status: "Operational" },
                    { name: "Singapore - SG", status: "Operational" },
                    { name: "Tokyo - JP", status: "Operational" },
                    { name: "Sydney - AU", status: "Operational" },
                    { name: "Mumbai - IN", status: "Operational" },
                    { name: "Frankfurt - DE", status: "Operational" }
                  ].map((city, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-zinc-300">
                        {city.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-100 dark:bg-zinc-800/80 w-full" />

                {/* Progress bar info */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-500 dark:text-zinc-400">System Status</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">Operational</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-850 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full rounded-full" />
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Text Content */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
                Reliable uptime monitoring for superior user experience
              </h2>
              <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
                Unexpected downtime translates directly to lost revenue and damaged trust. We help you stay online and available.
              </p>
              
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center mt-1 shrink-0">
                    <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-750 dark:text-zinc-300">
                    Multi-region checks from 130+ nodes worldwide
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center mt-1 shrink-0">
                    <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-755 dark:text-zinc-300">
                    Instant alerts via preferred channels (Email, SMS, Discord)
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>

      {/* 3. Deep-Dive Speed Analysis Section */}
      <section className="bg-white dark:bg-dark-background py-24 border-t border-gray-150 dark:border-zinc-800/50">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Text Content */}
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
              <h2 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
                Deep-dive speed analysis for optimization
              </h2>
              <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
                Page load speed is a critical factor for SEO and user retention. Identify bottlenecks before they impact your visitors.
              </p>
              
              <div className="flex flex-col gap-6 mt-2">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-100 dark:border-emerald-800/40 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Latency Detection</h4>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                      Pinpoint exactly which assets or scripts are slowing you down.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-100 dark:border-emerald-800/40 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Globe className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Regional Performance</h4>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                      Compare load times across different continents and networks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Avg Response Time Chart Widget */}
            <div className="relative flex flex-col justify-center order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 to-transparent rounded-3xl blur-3xl -z-10" />
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/80 shadow-lg p-6 flex flex-col gap-6">
                
                {/* Widget Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Avg. Response Time</p>
                    <p className="text-3xl font-extrabold text-gray-950 dark:text-white mt-1">142 ms</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold uppercase">
                    Past 24 Hours
                  </span>
                </div>

                {/* Bar Chart Mock */}
                <div className="flex items-end justify-between h-36 pt-4 border-b border-gray-150 dark:border-zinc-800/80 pb-1">
                  {[35, 60, 40, 75, 50, 65, 55, 45, 30, 85, 48, 60].map((height, idx) => (
                    <div
                      key={idx}
                      className="w-[6.5%] bg-emerald-500 rounded-t transition-all duration-500 hover:bg-emerald-600"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* X-Axis labels */}
                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1 uppercase tracking-wider">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                </div>

              </div>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>

      {/* 4. Critical Transaction Monitoring Section */}
      <section className="bg-white dark:bg-dark-background py-24 border-t border-gray-150 dark:border-zinc-800/50">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Transaction Steps Widget */}
            <div className="relative flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 to-transparent rounded-3xl blur-3xl -z-10" />
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/80 shadow-lg p-6 flex flex-col gap-3">
                {[
                  { step: "1. Land on Homepage", time: "0.4s", status: "success" },
                  { step: "2. Perform Search", time: "0.2s", status: "success" },
                  { step: "3. View Item Details", time: "0.8s", status: "success" },
                  { step: "4. Add Item to Cart", time: "0.5s", status: "success" },
                  { step: "5. Initiate Checkout", time: "1.2s", status: "warning" },
                  { step: "6. Confirm Purchase", time: "0.3s", status: "success" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 hover:bg-gray-100 dark:hover:bg-zinc-800/30 transition-colors">
                    <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-zinc-300">
                      {item.step}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                        {item.time}
                      </span>
                      <span className="relative flex h-2 w-2">
                        {item.status === "success" ? (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </>
                        ) : (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
                Critical Transaction Monitoring
              </h2>
              <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
                Ensure your key business flows—like signups and payments—are working perfectly. Don't let broken logic cost you customers.
              </p>
              
              <div className="flex flex-col gap-6 mt-2">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-100 dark:border-emerald-800/40 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Proactive Issue Detection</h4>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                      Discover functional errors before your users report them.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-100 dark:border-emerald-800/40 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Globe className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Cross-Device Validation</h4>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                      Simulate transactions on various device types to ensure compatibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>

      {/* 5. Start Monitoring / Pricing Section */}
      <section className="bg-[#f8fafc] dark:bg-zinc-900/10 py-24 border-t border-gray-200 dark:border-zinc-800">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-white mb-6">
              Start monitoring with the best tools today!
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            {/* Left: Info Block */}
            <div className="flex flex-col gap-8 items-center text-center lg:items-start lg:text-left">
              <div className="relative">
                <Globe className="size-36 text-emerald-500 animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-16 rounded-full bg-emerald-500/20 blur-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-950 dark:text-white leading-snug">
                  Complete infrastructure visibility in one dashboard.
                </h3>
              </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-gray-205 dark:border-zinc-800 shadow-xl p-8 md:p-10 relative overflow-hidden flex flex-col gap-6">
              {/* Popular Badge */}
              <div className="absolute top-6 right-6">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-extrabold uppercase tracking-wider border border-emerald-500/20">
                  POPULAR
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-gray-950 dark:text-white">Pro Plan</h4>
                <p className="text-4xl font-black text-gray-950 dark:text-white mt-4">
                  $49<span className="text-sm font-semibold text-gray-500 dark:text-zinc-400">/month</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-4 leading-relaxed">
                  Maximize your site's availability and performance with professional tools.
                </p>
              </div>

              <div className="h-px bg-gray-150 dark:bg-zinc-800/85 w-full" />

              <ul className="flex flex-col gap-3">
                {[
                  "Monitor up to 25 websites",
                  "Check intervals: 1 minute",
                  "30+ global monitoring nodes",
                  "Instant alerts (Discord/Slack/Email)"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-500 shrink-0" />
                    <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-zinc-350">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/sign-up" className="w-full mt-4">
                <Button
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl font-bold py-4 rounded-xl"
                >
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Render the global landing footer */}
      <Footer />
    </>
  );
};
