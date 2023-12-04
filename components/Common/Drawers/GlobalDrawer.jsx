import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { cn } from "@/utils/cn"

import CloseButton from "../Buttons/CloseButton"
import PlusButton from "../Buttons/PlusButton"
import { CustomPortableText } from "../Text/CustomPortableText"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./Sheet"

export default function GlobalDrawer({ content, pressRelease, index, email = 'info@bortolozzi.com', didClickPrevious, didClickNext }) {
    const [isOpen, setIsOpen] = useState(false)
    const [pressReleaseSelected, setPressReleaseSelected] = useState(false)

    const router = useRouter()

	const togglePressRelease = (event) => {
		setPressReleaseSelected((pressReleaseSelected) => !pressReleaseSelected)
        event.stopPropagation()
	}

    const handleDrawerOpen = (event) => {
        setIsOpen(!isOpen)
        event.stopPropagation()
    }

    useEffect(() => {
        isOpen
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto')

        // only scroll to top on the artist pages to center the carousel 
        if (router.query.slug && isOpen) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }

    }, [isOpen, router.query.slug])

	const inViewImage = content?.imageGallery?.[index]

    const hydrated = useHydrated()
	const desktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })

    if(!content) return null

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false} onInteractOutside={(event) => event.preventDefault()}>
            <SheetTrigger asChild>
                <PlusButton didPressButton={handleDrawerOpen} />
            </SheetTrigger>
            <SheetContent side={desktopOrLaptop ? 'right' : 'bottom'} onCloseAutoFocus={(event) => event.preventDefault()} className="z-[999] h-2/4 sm:h-full sm:max-h-full flex flex-col justify-between">
                <SheetHeader className="p-0 m-0 w-full">
                    <SheetClose asChild>
                        <div className="m-0 p-0 relative flex justify-end">
                            <CloseButton didPressButton={handleDrawerOpen} />
                        </div>
                    </SheetClose>
                </SheetHeader>
                <div className='w-full h-full flex flex-col justify-end overflow-scroll scrollbar-hide'>
                    <div className={cn(
                        "flex flex-col",
                        !pressReleaseSelected ? 'block' : 'hidden'
                    )}>
                        {inViewImage && <CustomPortableText value={inViewImage.details} />}
                    </div>
                    <div className={cn(
                        "pointer-events-auto flex flex-col h-full justify-start",
                        pressReleaseSelected ? 'block' : 'hidden'
                    )}>
                        <CustomPortableText value={pressRelease} />
                    </div>
                </div>
                <SheetFooter className="h-auto w-full flex flex-col bg-background gap-4">
                    {router.pathname.startsWith('/viewing-rooms') && (
                        <div className="w-full h-fit">
                            <button type="button" aria-label="Enquire with the gallery via email" className="group flex h-12 w-full items-center justify-center border-secondary hover:border-primary border-solid border rounded-[2px] bg-none transition">
                                <a
                                    className="small-caps text-center pointer-events-auto transition group-hover:text-primary text-secondary"
                                    href={`mailto:${email}?subject=Enquiry`}
                                >
                                    {'Enquire'}
                                </a>
                            </button>
                        </div>
                    )}
                    <div className="w-full justify-start flex">
                        <div className='inline-flex gap-2.5'>
                            <button type="button" aria-label='Scroll to previous section' onClick={didClickPrevious}>
                                <h3 className="small-caps pointer-events-auto text-secondary transition hover:text-primary">
                                    {'Prev'}
                                </h3>
                            </button>
                            <span className="text-primary">|</span>
                            <button type="button" aria-label='Scroll to next section' onClick={didClickNext}>
                                <h3 className="small-caps pointer-events-auto text-secondary transition hover:text-primary">
                                    {'Next'}
                                </h3>
                            </button>
                        </div>
                        <div className='w-full flex justify-end'>
                            {pressRelease ? (
                                <button type="button" aria-label="Toggle to view the caption or the press release" onClick={togglePressRelease}>
                                    <h3 className="small-caps text-secondary transition hover:text-primary">
                                        {pressReleaseSelected ? 'Caption' : 'Press Release'}
                                    </h3>
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
