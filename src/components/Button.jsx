import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 font-semibold text-slate-900 shadow-[0_22px_46px_-24px_rgba(249,115,22,0.85)] transition-all duration-300 hover:from-orange-400 hover:via-orange-300 hover:to-amber-200 hover:shadow-[0_30px_60px_-28px_rgba(249,115,22,0.6)] active:opacity-95',
  secondary:
    'border border-orange-200/60 bg-white text-orange-600 shadow-[0_18px_45px_-30px_rgba(248,113,113,0.55)] transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 active:text-orange-600',
  ghost:
    'border border-orange-300/60 bg-transparent text-orange-300 hover:bg-orange-500/10 hover:text-white',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'inline-flex h-11 items-center gap-2 justify-center rounded-full px-5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:transition-none',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
