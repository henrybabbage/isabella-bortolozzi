import { PlusIcon } from '@radix-ui/react-icons'

export default function PlusButton({ didPressButton }) {
    return (
        <button type="button" onClick={didPressButton} className="w-6 h-6 flex justify-center items-center">
            <PlusIcon color="#222222" className="w-full h-full mix-blend-difference" />
        </button>
    )
}
