import { PlusIcon } from '@radix-ui/react-icons'
import { forwardRef } from 'react'

const PlusButton = forwardRef(function PlusButton({ didPressButton }, ref) {
    return (
        <button ref={ref} type="button" onClick={didPressButton} className="animate-fade-in animation-delay-[4000ms] relative w-8 h-8 flex justify-center items-center">
            <PlusIcon color="#222222" className="absolute w-full h-full" />
        </button>
    )
})

export default PlusButton
