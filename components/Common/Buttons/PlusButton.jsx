import { PlusIcon } from '@radix-ui/react-icons'

export default function PlusButton({ didPressButton }) {
    return (
        <button type="button" onClick={didPressButton} className="z-[999] relative w-8 h-8 flex justify-center items-center">
            <PlusIcon color="#222222" className="absolute w-full h-full mix-blend-difference" />
        </button>
    )
}
