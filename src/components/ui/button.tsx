// @ts-nocheck
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-slate-950 text-white shadow-sm shadow-slate-950/10 hover:bg-slate-800',
        outline:
          'border border-slate-200 bg-white/80 text-slate-900 shadow-sm shadow-slate-950/5 backdrop-blur hover:border-slate-300 hover:bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Button({ className, variant, asChild = false, ...props }) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
// @ts-nocheck
// @ts-nocheck
