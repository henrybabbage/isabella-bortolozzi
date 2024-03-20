import { useEffect } from 'react'

import { useActiveItemStore } from '@/stores/useActiveItemStore'

import ExhibitionTableItem from './ExhibitionTableItem'

export default function ExhibitionTable({ exhibitions }) {
  // zustand store
  const setCurrentlyHoveredItem = useActiveItemStore(
    (state) => state.setCurrentlyHoveredItem,
  )

  useEffect(() => {
    setCurrentlyHoveredItem(null)
  }, [setCurrentlyHoveredItem])

  return (
    <div
      onMouseLeave={() => {
        setCurrentlyHoveredItem(null)
      }}
      className="grid w-full h-full grid-cols-12 items-start px-4"
    >
      <div className="scrollbar-hide col-start-1 col-span-12 h-fit w-full">
        <ol className="relative">
          {exhibitions.map((exhibition, index) => (
            <li
              id={index}
              key={exhibition._key}
              onMouseEnter={() => {
                setCurrentlyHoveredItem(index)
              }}
              className="relative cursor-pointer"
            >
              <ExhibitionTableItem exhibition={exhibition} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
