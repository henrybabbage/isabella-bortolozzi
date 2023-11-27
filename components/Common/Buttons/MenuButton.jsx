import { Cross as Hamburger } from 'hamburger-react'
import { useState } from 'react'

export default function MenuButton({ isOpen, setIsOpen }) {
    const [isActive, setIsActive] = useState(false)
    const handleClick = () => setIsActive(!isActive)
    const iconColor = isActive ? '#BFBFBF' : '#222222'
	return (
		<div
            className="fixed z-[999] top-0 right-0 my-3 cursor-pointer px-3 md:hidden"
            onClick={handleClick}
        >
			<Hamburger
				label="Show menu"
				hideOutline={true}
				size={20}
				duration={0.2}
				color={iconColor}
				direction="left"
				toggled={isOpen}
				toggle={setIsOpen}
			/>
		</div>
	)
}
