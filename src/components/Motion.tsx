// @ts-nocheck
import { useRef } from 'react'

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({ children, className, delay = 0, as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  return (
    <Component
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

export function PageTransition({ children, pageKey }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key={pageKey}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduceMotion) return null

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 origin-left bg-slate-950"
      style={{ scaleX }}
    />
  )
}

export function ParallaxLayer({ children, className, offset = 80 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollCard({ children, className, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
// @ts-nocheck
// @ts-nocheck
