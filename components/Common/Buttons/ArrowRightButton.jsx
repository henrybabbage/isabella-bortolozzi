import { ArrowRightIcon } from '@radix-ui/react-icons'

export default function ArrowRightButton({ nextSlide }) {
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    const iconColor = isHovered ? '#BFBFBF' : '#222222'
    return (
        <button
            type="button"
            onClick={nextSlide}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-7 h-7 flex justify-center items-center relative"
        >
            <ArrowRightIcon color={iconColor} className="absolute w-full h-full" />
        </button>
    )
}
