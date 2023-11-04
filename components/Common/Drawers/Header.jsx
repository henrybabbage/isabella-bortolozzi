import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import CloseButton from '@/components/Common/Buttons/CloseButton'
import { sanityClient } from '@/lib/sanity.client'
import { artistsQuery } from '@/lib/sanity.queries'

export default function Header({ isFixed = true }) {
	const [artists, setArtists] = useState([])
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()
	const { pathname } = useRouter()

	const hydrated = useHydrated()
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { width: 992 })

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

	const isPathName = (path) => {
		return router.pathname === path
	}

	return (
		<header
			onClick={closeHeaderMenu}
			className={`${isFixed ? 'fixed' : 'absolute'} z-700 ${
				isOpen ? 'h-full w-full bg-background/95 transition' : 'bg-transparent'
			}`}
		>
			{isDesktopOrLaptop && (
				<Link
					href="/"
					className="relative z-1000 inline-block cursor-pointer p-6"
					onClick={closeHeaderMenu}
					onMouseEnter={openHeaderMenu}
				>
					<h1 className="heading font-serif text-secondary transition hover:text-primary">
						Isabella Bortolozzi
					</h1>
				</Link>
			)}
			{isOpen && (
				<nav className="absolute top-0 z-100 h-[calc((100vw/4))] w-full">
					<div className="z-200 grid h-full w-full grid-cols-12 px-6" onMouseLeave={closeHeaderMenu}>
						<div className="col-span-3 col-start-1 pt-6 sm:pl-6">
							<div className="nav flex cursor-pointer flex-col space-y-9 pt-12 sm:space-y-0">
								{menu.map((item, index) => {
									return (
										<Link
											key={index}
											href={item.path}
											className={`nav cursor-pointer text-left font-serif transition ${
												isPathName(item.path) ? 'hover:text-secondary' : 'text-primary'
											}`}
											onClick={closeHeaderMenu}
										>
											{item.title}
										</Link>
									)
								})}
							</div>
						</div>
						<div className="nav col-span-6 col-start-4 pt-6 text-left font-serif">
							{artists.map((artist, index) => {
								return (
									<Link
										key={index}
										href={`/${artist.slug}`}
										className={`nav mr-1 inline-flex shrink-0 cursor-pointer transition ${
											isPathName(artist.slug)
												? 'hover:text-secondary'
												: 'text-primary'
										}`}
										onClick={closeHeaderMenu}
									>
										{index != artists.length - 1 ? artist.name + ',' : artist.name}
									</Link>
								)
							})}
						</div>
						<div className="absolute right-6 top-6 z-100 hidden cursor-pointer sm:block">
							<CloseButton size={24} invert={false} strokeWidth={1.5} didPressButton={closeHeaderMenu} />
						</div>
					</div>
				</nav>
			)}
		</header>
	)
}
