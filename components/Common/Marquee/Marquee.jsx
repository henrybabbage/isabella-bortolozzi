import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { gsap } from '@/lib/gsap'
import { horizontalLoop } from '@/lib/gsap/horizontalLoop'

import Card from './Card'

export default function Marquee({ items }) {
  const containerRef = useRef()

  // TODO Delay start by setting paused to false after an interval
  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.card')
      const horizontalLoopConfig = {
        draggable: true,
        paused: false,
        repeat: '-1',
        paddingRight: '32px',
      }
      horizontalLoop(cards, horizontalLoopConfig)
    },
    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className="h-[100svh] w-screen flex flex-col pt-16 overflow-x-auto px-6"
    >
      <div className="h-full flex gap-8">
        {items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
