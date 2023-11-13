import { useState } from "react"
import { useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"

import PlusButton from "../Buttons/PlusButton"
import { CustomPortableText } from "../Text/CustomPortableText"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./Sheet"

export default function GlobalDrawer({ content, index, didClickPrevious, didClickNext }) {
    const [isOpen, setIsOpen] = useState(false)
    const [pressReleaseSelected, setPressReleaseSelected] = useState(false)

    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
	const desktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })

	const togglePressRelease = () => {
		setPressReleaseSelected((pressReleaseSelected) => !pressReleaseSelected)
	}

    const handleDrawerOpen = () => {
        setIsOpen(true)
    }

    const inViewImage = content.imageGallery[index]
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <SheetTrigger asChild>
                <PlusButton didPressButton={handleDrawerOpen} />
            </SheetTrigger>
            <SheetContent side='right' onCloseAutoFocus={(event) => event.preventDefault()} className="z-[999] h-full flex flex-col justify-between">
                <div className='w-full h-full flex flex-col justify-end'>
                    {inViewImage && <CustomPortableText value={inViewImage.details} />}
                </div>
                <SheetFooter className="h-fit w-full">
                    <div className="inline-flex space-x-3">
                        <button onClick={didClickPrevious} className="cursor-pointer">
                            <h3 className="pointer-events-auto text-secondary transition hover:text-primary">
                                Prev
                            </h3>
                        </button>
                        <span className="text-primary">|</span>
                        <button onClick={didClickNext} className="cursor-pointer">
                            <h3 className="pointer-events-auto text-secondary transition hover:text-primary">
                                Next
                            </h3>
                        </button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
