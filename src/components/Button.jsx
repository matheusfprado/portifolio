import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-slate-900 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-slate-700 active:bg-slate-800',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950',
  ghost:
    'border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'inline-flex h-11 items-center gap-2 justify-center rounded-lg px-5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:transition-none',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
