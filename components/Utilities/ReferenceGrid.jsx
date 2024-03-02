import { useEffect, useState } from 'react'

import { useKeyPress } from '@/utils/useKeyPress'

// CTRL-G to display reference grid
export default function ReferenceGrid() {
  const env = process.env.NODE_ENV

  const columns = Array(24).fill(null)

  const [displayReferenceGrid, setDisplayReferenceGrid] = useState(false)

  useKeyPress(
    () => setDisplayReferenceGrid((state) => !state),
    ['KeyG'],
    'ctrlKey',
  )

  // Add an outline to all elements when grid is active
  useEffect(() => {
    if (env === 'production') return
    const allElements = document.querySelectorAll('*')

    if (displayReferenceGrid) {
      allElements.forEach((element) =>
        element.classList.add(
          'outline-1',
          'outline',
          'outline-[rgba(3,108,219,0.4)]',
        ),
      )
    } else {
      allElements.forEach((element) =>
        element.classList.remove(
          'outline-1',
          'outline',
          'outline-[rgba(3,108,219,0.4)]',
        ),
      )
    }
  }, [displayReferenceGrid, env])

  return env !== 'production' && displayReferenceGrid ? (
    <div className="fixed z-100 w-screen h-screen pl-4 pr-4 grid grid-cols-[repeat(12,1fr)] gap-x-0 pointer-events-none left-0 top-0">
      {columns.map((_, index) => {
        return (
          <div
            key={'col-' + index}
            className="h-full w-full bg-[rgba(255,0,0,0.1)]"
          />
        )
      })}
    </div>
  ) : null
}
