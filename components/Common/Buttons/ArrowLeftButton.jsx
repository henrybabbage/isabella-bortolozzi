import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function ArrowLeftButton({ didPressButton }) {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const iconColor = isHovered ? '#BFBFBF' : '#222222'
  return (
    <button
      type="button"
      aria-label="Click the left arrow to go to the previous item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={didPressButton}
      className="w-7 h-7 flex justify-center items-center relative"
    >
      <ArrowLeftIcon
        color={iconColor}
        className="absolute w-full h-full mix-blend-difference"
      />
    </button>
  )
}
