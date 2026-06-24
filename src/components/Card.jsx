import Link from 'next/link'
import clsx from 'clsx'

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
  return (
    <div
      className={clsx(
        'group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md',
        className
      )}
    >
      <div className="flex h-full flex-col text-slate-700">{children}</div>
    </div>
  )
}

Card.Link = function CardLink({ children, className, ...props }) {
  return (
    <Link
      {...props}
      className={clsx(
        'relative z-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600 transition hover:text-blue-800',
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
        'text-xl font-semibold leading-tight text-slate-900',
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
        'text-xl font-semibold leading-tight text-slate-900',
        className
      )}
    >
      <Link
        href={href}
        className="relative z-10 transition hover:text-blue-600"
      >
        {children}
      </Link>
    </Component>
  )
}

Card.Description = function CardDescription({ children, className }) {
  return (
    <p
      className={clsx('mt-4 text-sm leading-relaxed text-slate-600', className)}
    >
      {children}
    </p>
  )
}

Card.Skills = function CardSkills({ children, className }) {
  return (
    <p
      className={clsx(
        'mt-4 text-xs uppercase tracking-[0.35em] text-blue-600',
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
        'mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-600 transition group-hover:text-blue-800',
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
        'flex items-center text-xs uppercase tracking-[0.4em] text-blue-600',
        className
      )}
      {...props}
    >
      {decorate && (
        <span
          aria-hidden="true"
          className="mr-3 inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"
        />
      )}
      {children}
    </Component>
  )
}
