'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/30 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary: white bg in dark, dark bg in light — always high contrast
        default: [
          'dark:border-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100',
          'border-slate-300 bg-slate-900 text-white hover:bg-slate-800',
          'hover:scale-[1.02]',
        ].join(' '),

        // Secondary: dark surface in dark mode, light surface in light mode
        secondary: [
          'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
          'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200',
          'hover:scale-[1.02]',
        ].join(' '),

        // Outline: subtle border, adapts fg color
        outline: [
          'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-white/5',
          'border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100',
          'hover:scale-[1.02]',
        ].join(' '),

        // Subtle: ghost-like
        subtle: [
          'border-transparent',
          'dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10',
          'bg-slate-100 text-slate-700 hover:bg-slate-200',
          'hover:scale-[1.02]',
        ].join(' '),
      },
      size: {
        default: 'h-11',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }