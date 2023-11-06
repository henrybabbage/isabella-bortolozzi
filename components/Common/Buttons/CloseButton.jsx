import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'

export default function CloseButton() {
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.back()} className="w-6 h-6 flex justify-center items-center relative">
            <Cross1Icon color="#222222" className="absolute w-full h-full" />
        </button>
    )
}
