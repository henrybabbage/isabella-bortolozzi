import { Cross1Icon } from '@radix-ui/react-icons'

export default function CloseButton({ didPressButton }) {
    return (
        <button type="button" onClick={didPressButton} className="w-6 h-6 flex justify-center items-center">
            <Cross1Icon color="#222222" className="w-full h-full" />
        </button>
    )
}
