import Image from 'next/image'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import logoAdonis from '@/images/logos/adonisjs.svg'
import logoReact from '@/images/logos/react.png'
import logoNext from '@/images/logos/next.svg'
import logoTailwind from '@/images/logos/tailwind.svg'
import logoTypescript from '@/images/logos/typescript.svg'
import logoNodejs from '@/images/logos/nodejs.svg'
import logoJavascript from '@/images/logos/javascript.svg'

const techItems = [
  {
    icon: logoReact,
    alt: 'React',
    initial: { x: -120, y: -80 },
    offset: { x: 26, y: -20 },
    duration: 9,
    delay: 0,
    size: 56,
  },
  {
    icon: logoNext,
    alt: 'Next.js',
    initial: { x: 70, y: -110 },
    offset: { x: -24, y: 26 },
    duration: 10.5,
    delay: 0.5,
    size: 52,
  },
  {
    icon: logoTypescript,
    alt: 'TypeScript',
    initial: { x: -40, y: 40 },
    offset: { x: 24, y: -26 },
    duration: 8,
    delay: 0.8,
    size: 54,
  },
  {
    icon: logoTailwind,
    alt: 'TailwindCSS',
    initial: { x: 110, y: 30 },
    offset: { x: -30, y: 22 },
    duration: 11,
    delay: 0.2,
    size: 52,
  },
  {
    icon: logoNodejs,
    alt: 'Node.js',
    initial: { x: -140, y: 110 },
    offset: { x: 32, y: -24 },
    duration: 10.5,
    delay: 1.2,
    size: 58,
  },
  {
    icon: logoAdonis,
    alt: 'Adonis.js',
    initial: { x: -10, y: 120 },
    offset: { x: 18, y: -30 },
    duration: 9.5,
    delay: 0.6,
    size: 60,
  },
  {
    icon: logoJavascript,
    alt: 'JavaScript',
    initial: { x: 120, y: 110 },
    offset: { x: -26, y: -22 },
    duration: 12,
    delay: 1,
    size: 54,
  },
]

function FloatingBadge({ item }) {
  return (
    <motion.div
      className={clsx(
        'pointer-events-none absolute flex items-center justify-center rounded-3xl border border-orange-200/40 bg-white/90 p-3 shadow-[0_25px_55px_-38px_rgba(249,115,22,0.95)]'
      )}
      initial={{
        x: item.initial.x,
        y: item.initial.y,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: [0.5, 0.95, 0.5],
        x: [
          item.initial.x,
          item.initial.x + item.offset.x,
          item.initial.x,
        ],
        y: [
          item.initial.y,
          item.initial.y + item.offset.y,
          item.initial.y,
        ],
        rotate: [0, 8, -6],
        scale: [0.9, 1.05, 0.92],
      }}
      transition={{
        duration: item.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: item.delay,
      }}
    >
      <Image
        src={item.icon}
        alt={item.alt}
        width={item.size}
        height={item.size}
        className="h-auto w-auto"
      />
    </motion.div>
  )
}

export function FloatingTechCloud() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-[20%]">
        {techItems.map((item) => (
          <FloatingBadge key={item.alt} item={item} />
        ))}
      </div>
    </div>
  )
}
