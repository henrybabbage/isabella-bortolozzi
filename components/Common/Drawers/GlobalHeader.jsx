import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { sanityClient } from '@/lib/sanity.client'
import { artistsQuery } from '@/lib/sanity.queries'
import { cn } from '@/utils/cn'

import CloseButton from '../Buttons/CloseButton'

export default function GlobalHeader({ isFixed = true }) {
	const [artists, setArtists] = useState([])
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()
	const { pathname } = useRouter()

	useEffect(() => {
		const initialiseArtists = async () => {
			const getGalleryArtists = async () => {
				const galleryArtists = await sanityClient.fetch(artistsQuery)
				return !galleryArtists.length ? [] : galleryArtists
			}
			const currentArtists = await getGalleryArtists()
			const noDuplicates = [...new Set(currentArtists)]
			setArtists(noDuplicates)
		}
		initialiseArtists()
	}, [])

	const menu = [
		{ title: 'News', path: '/news' },
		{ title: 'Exhibitions', path: '/exhibitions' },
		{ title: 'Viewing Rooms', path: '/viewing-rooms' },
		{ title: 'Imprint', path: '/imprint' },
	]

	const closeHeaderMenu = (event) => {
		event.stopPropagation()
		setIsOpen(false)
	}

	const openHeaderMenu = (event) => {
		event.stopPropagation()
		setIsOpen(true)
	}

	useEffect(() => {
		setIsOpen(false)
	}, [pathname, router.query.slug])

    useEffect(() => {
        isOpen
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto')
    }, [isOpen])

	return (
		<header
			onClick={closeHeaderMenu}
			className={cn(
                isFixed ? 'fixed' : 'absolute',
                isOpen ? 'h-screen w-screen bg-background/95' : 'bg-transparent',
                'z-500 transition-colors')}
        >
            <Link
                href="/"
                className="absolute w-fit whitespace-nowrap px-6 pt-6 z-500"
                onClick={closeHeaderMenu}
                onMouseEnter={openHeaderMenu}
                aria-label='Click to return to home page or hover to view nav'
            >
                <h1 className="text-primary transition-colors hover:text-secondary cursor-pointer">
                    Isabella Bortolozzi
                </h1>
            </Link>
            <nav aria-label='Website menu nav' className={cn(
                isOpen ? 'block' : 'hidden',
                'absolute top-0 h-[calc((100vw/4))] w-screen')} onMouseLeave={closeHeaderMenu}>
                <div className="grid h-full w-full grid-cols-12 px-6">
                    <div className="col-span-3 col-start-1 pt-[5.25rem] pl-6">
                        <div className="flex cursor-pointer flex-col space-y-0">
                            {menu.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className='hover:text-secondary text-primary cursor-pointer text-left transition'
                                        onClick={closeHeaderMenu}
                                        aria-label='Main page links'
                                    >
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-span-6 col-start-4 pt-6 text-left">
                        {artists.map((artist, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={`/${artist.slug}`}
                                    className='hover:text-secondary text-primary mr-1 inline-flex shrink-0 cursor-pointer transition'
                                    onClick={closeHeaderMenu}
                                    aria-label='Artist page links'
                                >
                                    {index != artists.length - 1 ? artist.name + ',' : artist.name}
                                </Link>
                            )
                        })}
                    </div>
                    <div className="col-span-3 col-start-10">
                        <div className="right-6 top-6 absolute h-fit">
                            <CloseButton didPressButton={closeHeaderMenu} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
