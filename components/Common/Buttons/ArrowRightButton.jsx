import { ArrowRightIcon } from '@radix-ui/react-icons'

export default function ArrowRightButton() {
    return (
        <button type="button" onClick={() => {}} className="w-6 h-6 flex justify-center items-center relative">
            <ArrowRightIcon color="#222222" className="absolute w-full h-full" />
        </button>
    )
}
