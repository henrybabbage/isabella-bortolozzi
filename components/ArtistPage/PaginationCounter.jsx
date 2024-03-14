import { forwardRef } from 'react'

const PaginationCounter = forwardRef(function PaginationCounter(
  { currentIndex, totalSlides, isLoading },
  ref,
) {
  if (isLoading) return <></>

  return (
    <div className="absolute left-6 bottom-6 h-8 flex flex-col justify-end">
      <h3 className="inline-flex gap-2.5 w-auto justify-start">
        <span className="w-5 text-center">{currentIndex + 1}</span>
        <span className="w-2 text-center">{'|'}</span>
        <span className="w-5 text-center">{totalSlides}</span>
      </h3>
    </div>
  )
})

export default PaginationCounter
