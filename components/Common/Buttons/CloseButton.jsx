import { Cross1Icon } from '@radix-ui/react-icons'
import { forwardRef, useState } from 'react'

const CloseButton = forwardRef(function CloseButton(
  { didPressButton },
  ref,
) {
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    const iconColor = isHovered ? '#BFBFBF' : '#222222'
    return (
        <button
            ref={ref}
            type="button"
            aria-label="Close the open dialog"
            onClick={didPressButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="animate-fade-in animation-delay-[4000ms] w-6 h-6 flex justify-center items-center relative"
        >
            <Cross1Icon color={iconColor} className="absolute w-full h-full" />
        </button>
    )
})

export default CloseButton
