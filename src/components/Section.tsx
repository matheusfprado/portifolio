// @ts-nocheck
import { useId } from 'react'

export function Section({ title, children }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-8 shadow-sm shadow-slate-950/[0.04] backdrop-blur sm:p-10"
    >
      <div>
        <h2
          id={id}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700"
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
// @ts-nocheck
