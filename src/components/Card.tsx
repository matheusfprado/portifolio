// @ts-nocheck
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Card({ className, children }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'group h-full rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-950/[0.04] backdrop-blur transition-colors duration-200 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.08]',
        className
      )}
    >
      <div className="flex h-full flex-col text-slate-700">{children}</div>
    </motion.div>
  )
}

Card.Link = function CardLink({ children, className, ...props }) {
  return (
    <Link
      {...props}
      className={clsx(
        'relative z-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 transition hover:text-blue-900',
        className
      )}
    >
      <span>{children}</span>
      <ChevronRightIcon className="h-4 w-4 stroke-current" />
    </Link>
  )
}

Card.Title = function CardTitle({
  as: Component = 'h3',
  href,
  children,
  className,
}) {
  const title = (
    <Component
      className={clsx(
        'text-xl font-semibold leading-tight text-slate-950',
        className
      )}
    >
      {children}
    </Component>
  )

  if (!href) {
    return title
  }

  return (
    <Component
      className={clsx(
        'text-xl font-semibold leading-tight text-slate-950',
        className
      )}
    >
      <Link
        href={href}
        className="relative z-10 transition hover:text-blue-700"
      >
        {children}
      </Link>
    </Component>
  )
}

Card.Description = function CardDescription({ children, className }) {
  return (
    <p className={clsx('mt-4 text-sm leading-relaxed text-slate-600', className)}>
      {children}
    </p>
  )
}

Card.Skills = function CardSkills({ children, className }) {
  return (
    <p
      className={clsx(
        'mt-4 text-xs uppercase tracking-[0.25em] text-blue-700',
        className
      )}
    >
      {children}
    </p>
  )
}

Card.Cta = function CardCta({ children, className }) {
  return (
    <div
      className={clsx(
        'mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 transition group-hover:text-blue-900',
        className
      )}
    >
      {children}
      <ChevronRightIcon className="h-4 w-4 stroke-current" />
    </div>
  )
}

Card.Eyebrow = function CardEyebrow({
  as: Component = 'p',
  className,
  children,
  decorate = false,
  ...props
}) {
  return (
    <Component
      className={clsx(
        'flex items-center text-xs uppercase tracking-[0.25em] text-blue-700',
        className
      )}
      {...props}
    >
      {decorate && (
        <span
          aria-hidden="true"
          className="mr-3 inline-flex h-1.5 w-1.5 rounded-full bg-blue-600"
        />
      )}
      {children}
    </Component>
  )
}
// @ts-nocheck
// @ts-nocheck
