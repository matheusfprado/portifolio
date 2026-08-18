import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-slate-950 font-semibold text-white shadow-sm shadow-slate-950/10 transition-colors duration-200 hover:bg-slate-800 active:bg-slate-900',
  secondary:
    'border border-slate-200 bg-white/80 text-slate-700 shadow-sm shadow-slate-950/5 backdrop-blur transition-colors duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-950',
  ghost:
    'border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-900 hover:text-white',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:transition-none',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
