import { useId } from 'react'

export function Section({ title, children }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
    >
      <div>
        <h2
          id={id}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700"
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
