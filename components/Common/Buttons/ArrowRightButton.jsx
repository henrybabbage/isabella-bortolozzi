import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function ArrowRightButton({ nextSlide }) {
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    const iconColor = isHovered ? '#BFBFBF' : '#222222'
    return (
        <button
            type="button"
            aria-label='Click the right arrow to go to the next item'
            onClick={nextSlide}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-7 h-7 flex justify-center items-center relative"
        >
            <ArrowRightIcon color={iconColor} className="absolute w-full h-full mix-blend-difference" />
        </button>
    )
}
