import { Cross1Icon } from '@radix-ui/react-icons'
import { forwardRef } from 'react'

const CloseButton = forwardRef(function CloseButton({ didPressButton }, ref={ref}) {
    return (
        <button type="button" onClick={didPressButton} className="animate-fade-in animation-delay-[4000ms] w-6 h-6 flex justify-center items-center relative">
            <Cross1Icon color="#222222" className="absolute w-full h-full" />
        </button>
    )
})

export default CloseButton
