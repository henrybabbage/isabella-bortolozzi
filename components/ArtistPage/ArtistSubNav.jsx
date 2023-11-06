import React from 'react'

import { cn } from '@/utils/cn'

import LoadingCounter from '../Common/Loading/LoadingCounter'

export default function ArtistSubNav({ artist, isLoading, }) {
	if (!artist) return null
	return (
		<aside className="fixed top-0 z-700 grid w-screen grid-cols-12 bg-background px-4 sm:px-6">
			<div className="absolute z-500 col-span-3 col-start-1 flex h-[4.5rem] pt-6 w-full items-baseline bg-background"></div>
			<div className="absolute z-500 col-span-9 col-start-4 flex h-[4.5rem] pt-6 w-full items-baseline space-x-12 bg-background">
				<h1 className="z-700 text-secondary-200">
					{artist.name}
				</h1>
				<nav className="flex space-x-4">
					<button
						type="button"
						className={cn(
							'z-200 w-fit cursor-pointer transition-opacity duration-300 ease-in-out',
							isLoading ? 'hidden' : 'block',
						)}
					>
						<a className={cn('transition hover:text-black')}>
							{'Works'}
						</a>
					</button>
					<div className={cn(isLoading ? 'block' : 'hidden')}>
						<LoadingCounter totalImages={artist.imageGallery?.length} />
					</div>
					<button
						type="button"
						className={cn(
							isLoading ? 'hidden' : 'block',
							'z-200 w-fit cursor-pointer transition-opacity duration-300 ease-in-out',
						)}
					>
						<a className={cn('transition hover:text-black')}>
							{'Exhibitions'}
						</a>
					</button>
					<button
						type="button"
						className={cn(
							'z-200 w-fit cursor-pointer transition-opacity duration-300 ease-in-out',
							isLoading ? 'hidden' : 'block',
						)}
					>
						<a className={cn('transition hover:text-black')}>
							{'Biography'}
						</a>
					</button>
				</nav>
			</div>
		</aside>
	)
}
