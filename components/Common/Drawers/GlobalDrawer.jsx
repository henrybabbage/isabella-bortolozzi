import { useState } from "react"
import { useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"

import PlusButton from "../Buttons/PlusButton"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./Sheet"

export default function GlobalDrawer({ content, didClickPrevious, didClickNext }) {
    const [isOpen, setIsOpen] = useState(false)
    const [pressReleaseSelected, setPressReleaseSelected] = useState(false)

    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
	const desktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })

	const togglePressRelease = () => {
		setPressReleaseSelected((pressReleaseSelected) => !pressReleaseSelected)
	}
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <SheetTrigger asChild>
                <PlusButton didPressButton={()=>{}} />
            </SheetTrigger>
            <SheetContent side='right' onCloseAutoFocus={(event) => event.preventDefault()}>
                <SheetFooter>
                    <div className="inline-flex space-x-3">
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
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
