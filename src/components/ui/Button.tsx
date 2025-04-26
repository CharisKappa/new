'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        // Light Theme
        'primary-light': 'bg-white text-black border border-white/20 hover:border-white hover:opacity-80 transition-all',
        'primary-light-inverted': 'bg-black text-white border border-black/20 hover:border-black hover:opacity-80 transition-all',
        'secondary-light': 'border border-input/20 bg-background hover:bg-accent hover:text-accent-foreground hover:border-input text-black transition-all',
        'secondary-light-inverted': 'bg-transparent text-white border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all',
        
        // Dark Theme
        'primary-dark': 'bg-white text-black border border-white/20 hover:border-white hover:opacity-80 transition-all',
        'primary-dark-inverted': 'bg-black text-white border border-black/20 hover:border-black hover:opacity-80 transition-all',
        'secondary-dark': 'border border-input/20 bg-background hover:bg-accent hover:text-accent-foreground hover:border-input text-white transition-all',
        'secondary-dark-inverted': 'bg-transparent text-black border border-black/20 hover:bg-black hover:text-white hover:border-black transition-all',
        
        // Keep existing variants for compatibility
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input/20 bg-background hover:bg-accent hover:text-accent-foreground hover:border-input transition-all',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'border-[1px] border-solid border-white/20 dark:border-black/20 text-foreground hover:bg-white/5 hover:border-white/40 dark:hover:bg-black/10 dark:hover:border-black/40 transition-colors',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary-light',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants } 