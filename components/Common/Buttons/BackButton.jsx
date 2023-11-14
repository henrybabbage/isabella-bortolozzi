import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'

const BackButton = forwardRef(function BackButton(props, ref) {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    const iconColor = isHovered ? '#BFBFBF' : '#222222'
    return (
        <button
            ref={ref}
            type="button"
            aria-label="Back to the previous page"
            onClick={() => router.back()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="animate-fade-in animation-delay-[4000ms] w-6 h-6 flex justify-center items-center relative"
        >
            <Cross1Icon color={iconColor} className="absolute w-full h-full" />
        </button>
    )
})

export default BackButton
