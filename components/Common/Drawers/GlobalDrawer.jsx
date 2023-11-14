import { useRouter } from "next/router"
import { useState } from "react"
import { useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"

import PlusButton from "../Buttons/PlusButton"
import { CustomPortableText } from "../Text/CustomPortableText"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./Sheet"

export default function GlobalDrawer({ content, pressRelease, index, didClickPrevious, didClickNext }) {
    const [isOpen, setIsOpen] = useState(false)
    const [pressReleaseSelected, setPressReleaseSelected] = useState(false)

    const router = useRouter()

    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
	const desktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })

	const togglePressRelease = (event) => {
		setPressReleaseSelected((pressReleaseSelected) => !pressReleaseSelected)
        event.stopPropagation()
	}

    const handleDrawerOpen = (event) => {
        setIsOpen(true)
        event.stopPropagation()
    }

    const inViewImage = content.imageGallery[index]

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false} onInteractOutside={(event) => event.preventDefault()}>
            <SheetTrigger asChild>
                <PlusButton didPressButton={handleDrawerOpen} />
            </SheetTrigger>
            <SheetContent side='right' onCloseAutoFocus={(event) => event.preventDefault()} className="z-[999] h-full max-h-full flex flex-col justify-between">
                <div className='w-full h-full overflow-scroll scrollbar-hide'>
                    <div className="flex flex-col justify-end">
                        {!pressReleaseSelected && inViewImage && <CustomPortableText value={inViewImage.details} />}
                    </div>
                    <div className="pointer-events-auto flex flex-col justify-start">
                        {pressReleaseSelected && pressRelease && <CustomPortableText value={pressRelease} />}
                    </div>
                </div>
                <SheetFooter className="h-fit w-full flex flex-col bg-background">
                    <div className="w-full justify-start flex flex-col">
                        <div className='inline-flex gap-2.5'>
                            <button type="button" aria-label='Scroll to previous section' onClick={didClickPrevious}>
                                <h3 className="pointer-events-auto text-secondary transition hover:text-primary">
                                    Prev
                                </h3>
                            </button>
                            <span className="text-primary">|</span>
                            <button type="button" aria-label='Scroll to next section' onClick={didClickNext}>
                                <h3 className="pointer-events-auto text-secondary transition hover:text-primary">
                                    Next
                                </h3>
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        {router.pathname.startsWith('/exhibitions') && (
                            <button type="button" onClick={togglePressRelease}>
                                <h3 className="text-secondary transition hover:text-primary">
                                    {pressReleaseSelected ? 'Caption' : 'Press Release'}
                                </h3>
                            </button>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
