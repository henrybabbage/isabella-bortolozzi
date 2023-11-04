import { useRouter } from "next/router"
import { useState } from "react"

import { cn } from "@/utils/cn"

export default function ArtworkDrawer({ setDrawerIsOpen, didClickPrevious, didClickNext, isTabletOrMobile }) {
    const [pressReleaseSelected, setPressReleaseSelected] = useState(false)
    
    const router = useRouter()

	const togglePressRelease = () => {
		setPressReleaseSelected((pressReleaseSelected) => !pressReleaseSelected)
	}

	const closeDrawer = (event) => {
		event.stopPropagation()
		setDrawerIsOpen(false)
	}

    return (
        <section
			className={cn(isTabletOrMobile ? 'static' : 'relative', 'pointer-events-auto z-100 flex h-full w-full flex-col place-content-end bg-background p-6 sm:w-full')}
		>
            <div></div>
            <div className="inline-flex space-x-[10px]">
                <button onClick={didClickPrevious} className="cursor-pointer">
                    <h3 className="pointer-events-auto z-[999] text-secondary transition hover:text-primary">
                        Prev
                    </h3>
                </button>
                <span className="text-secondary">|</span>
                <button onClick={didClickNext} className="cursor-pointer">
                    <h3 className="pointer-events-auto z-[999] text-secondary transition hover:text-primary">
                        Next
                    </h3>
                </button>
            </div>
        </section>
    )
}
