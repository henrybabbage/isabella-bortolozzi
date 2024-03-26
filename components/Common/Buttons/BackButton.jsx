import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { forwardRef, useEffect, useState } from 'react'

import { cn } from '@/utils/cn'

const BackButton = forwardRef(function BackButton(props, ref) {
    const [pageReady, setpageReady] = useState(false)
    useEffect(() => {
		setTimeout(() => {
			setpageReady(true)
		}, 1000)
	}, [])
    const { backPathname } = props
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
            className={cn(pageReady ? "opacity-100" : "opacity-0", "transition w-6 h-6 flex justify-center items-center relative")}
        >
            <Cross1Icon color={iconColor} className="absolute w-full h-full" />
        </button>
    )
})

export default BackButton
