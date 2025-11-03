import { useId } from 'react'

export function Section({ title, children }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="relative overflow-hidden rounded-3xl border border-orange-200/50 bg-white p-8 shadow-[0_22px_65px_-50px_rgba(249,115,22,0.35)] sm:p-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.22),_transparent_55%)] opacity-75" />
      <div className="relative z-10">
        <h2
          id={id}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200"
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
