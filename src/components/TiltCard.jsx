import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { useCallback } from 'react'

export function TiltCard({
  className,
  children,
  intensity = 16,
  innerClassName,
  overlay = true,
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [intensity, -intensity]),
    { stiffness: 160, damping: 18, mass: 0.6 }
  )
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-intensity, intensity]),
    { stiffness: 160, damping: 18, mass: 0.6 }
  )

  const resetTilt = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const handleMouseMove = useCallback(
    (event) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      const offsetX = event.clientX - bounds.left
      const offsetY = event.clientY - bounds.top
      const normalizedX = offsetX / bounds.width - 0.5
      const normalizedY = offsetY / bounds.height - 0.5

      x.set(normalizedX)
      y.set(normalizedY)
    },
    [x, y]
  )

  return (
    <motion.div
      className={clsx(
        'group relative rounded-3xl border border-orange-200/50 bg-white p-[1px] shadow-[0_22px_55px_-35px_rgba(249,115,22,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgba(249,115,22,0.45)]',
        className
      )}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div
        className={clsx(
          'relative h-full rounded-full bg-white p-6 text-slate-900',
          innerClassName
        )}
      >
        {overlay && (
          <div className="pointer-events-none absolute inset-0  bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_45%),_radial-gradient(circle_at_bottom_right,_rgba(254,215,170,0.18),_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  )
}
