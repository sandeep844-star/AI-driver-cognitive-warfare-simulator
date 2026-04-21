'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import AnimatedBackground from './AnimatedBackground'

const OrbScene = dynamic(() => import('./OrbScene'), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-3xl border bg-white/[0.03] dark:border-white/10 border-slate-200" />,
})

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b dark:border-white/8 border-slate-200">
      <div className="absolute inset-0 opacity-60">
        <AnimatedBackground />
      </div>

      <div className="page-shell relative z-10 grid min-h-[calc(100vh-4rem)] items-center py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex rounded-full border px-4 py-2 text-xs tracking-[0.22em] uppercase
            dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400
            border-slate-200 bg-slate-100 text-slate-500">
            Cognitive warfare simulator
          </div>

          {/* Headline */}
          <h1 className="max-w-xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: 'var(--color-foreground)' }}>
            Simulate, analyze, and understand influence.
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg
            dark:text-slate-400 text-slate-600">
            A premium control surface for generating narratives, simulating propagation,
            and evaluating influence with structured outputs.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/generate" className="button-primary text-center">
              Generate narrative
            </Link>
            <Link href="/analyze" className="button-ghost text-center">
              Run analysis
            </Link>
          </div>

          {/* Feature cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['LLM', 'Ollama generation'],
              ['ABM', 'Propagation simulation'],
              ['XAI', 'Feature attribution'],
            ].map(([title, copy]) => (
              <div key={title} className="surface px-4 py-4">
                <div className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  {title}
                </div>
                <div className="mt-1 text-sm dark:text-slate-400 text-slate-500">
                  {copy}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orb */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative mt-12 h-[420px] lg:mt-0"
        >
          <div className="surface-strong absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-subtle-grid bg-grid opacity-25" />
            <OrbScene />
          </div>
        </motion.div>
      </div>
    </section>
  )
}