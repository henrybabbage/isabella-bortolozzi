import { cn } from "@/utils/cn"

export default function ArtistDrawer({ setDrawerIsOpen, didClickPrevious, didClickNext, tabletOrMobile, currentImage }) {

	const closeDrawer = (event) => {
		event.stopPropagation()
		setDrawerIsOpen(false)
	}
    
    return (
        <section
			className={cn(tabletOrMobile ? 'static' : 'relative', 'pointer-events-auto z-100 flex h-full w-full flex-col place-content-end bg-background p-6')}
		>
            <div></div>
            <div className="inline-flex space-x-2">
                <button onClick={didClickPrevious} className="cursor-pointer z-500">
                    <h3 className="pointer-events-auto text-secondary transition hover:text-primary">
                        Prev
                    </h3>
                </button>
                <span className="text-secondary">|</span>
                <button onClick={didClickNext} className="cursor-pointer z-500">
                    <h3 className="pointer-events-auto text-secondary transition hover:text-primary">
                        Next
                    </h3>
                </button>
            </div>
        </section>
    )
}
