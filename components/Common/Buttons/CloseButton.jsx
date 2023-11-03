import { Cross1Icon } from '@radix-ui/react-icons'

export default function CloseButton({ didPressButton }) {
    return (
        <button type="button" onClick={didPressButton} className="z-[999] w-6 h-6 flex justify-center items-center relative">
            <Cross1Icon color="#222222" className="absolute w-full h-full mix-blend-difference" />
        </button>
    )
}
