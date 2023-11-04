import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import CloseButton from '@/components/Common/Buttons/CloseButton'
import { sanityClient } from '@/lib/sanity.client'
import { artistsQuery } from '@/lib/sanity.queries'
import { cn } from '@/utils/cn'

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
			className={cn(
                isFixed ? 'fixed' : 'absolute',
                isOpen ? 'h-full w-full bg-background/95 transition' : 'bg-transparent',
                'z-700')}>
			{isDesktopOrLaptop && (
				<Link
					href="/"
					className="relative z-1000 inline-block cursor-pointer p-6"
					onClick={closeHeaderMenu}
					onMouseEnter={openHeaderMenu}
				>
					<h1 className="heading text-secondary transition hover:text-primary">
						Isabella Bortolozzi
					</h1>
				</Link>
			)}
			{isOpen && (
				<nav className="absolute top-0 z-100 h-[calc((100vw/4))] w-full">
					<div className="z-200 grid h-full w-full grid-cols-12 px-6" onMouseLeave={closeHeaderMenu}>
						<div className="col-span-3 col-start-1 pt-6 sm:pl-6">
							<div className="flex cursor-pointer flex-col space-y-9 pt-12 sm:space-y-0">
								{menu.map((item, index) => {
									return (
										<Link
											key={index}
											href={item.path}
											className={cn(isPathName(item.path) ? 'hover:text-secondary' : 'text-primary',
                                            'cursor-pointer text-left transition')}
											onClick={closeHeaderMenu}
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
										className={cn(
                                            isPathName(artist.slug) ? 'hover:text-secondary' : 'text-primary',
                                            'mr-1 inline-flex shrink-0 cursor-pointer transition')}
										onClick={closeHeaderMenu}
									>
										{index != artists.length - 1 ? artist.name + ',' : artist.name}
									</Link>
								)
							})}
						</div>
						<div className="absolute right-6 top-6 z-100 hidden cursor-pointer sm:block">
							<CloseButton didPressButton={closeHeaderMenu} />
						</div>
					</div>
				</nav>
			)}
		</header>
	)
}
