import { forwardRef } from "react"

const PaginationCounter = forwardRef(function PaginationCounter({ isLoading }, ref) {
    const currentSlide = ref?.current?.splide.index
    const slideCount = ref?.current?.splide.length

    if(isLoading || !ref) return <></>

    return (
      <div className="absolute left-6 bottom-6">
        <h3 className="inline-flex gap-2.5 w-auto justify-start">
          <span className='w-5 text-center'>{currentSlide + 1}</span>
          <span className='w-2 text-center'>{'|'}</span>
          <span className='w-5 text-center'>{slideCount}</span>
        </h3>
      </div>
    )
})
  
  
export default PaginationCounter
