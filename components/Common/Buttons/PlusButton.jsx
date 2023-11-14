import { PlusIcon } from '@radix-ui/react-icons'
import { forwardRef, useState } from 'react'

const PlusButton = forwardRef(function PlusButton({ didPressButton }, ref) {
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    const iconColor = isHovered ? '#BFBFBF' : '#222222'
    return (
        <button ref={ref} type="button" aria-label='View extra information related to the current image' onClick={didPressButton} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="animate-fade-in animation-delay-[4000ms] relative w-8 h-8 flex justify-center items-center">
            <PlusIcon color={iconColor} className="absolute w-full h-full" />
        </button>
    )
})

export default PlusButton
