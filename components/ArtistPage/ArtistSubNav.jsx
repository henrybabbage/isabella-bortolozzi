
import Link from 'next/link'

import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { cn } from '@/utils/cn'

import LoadingCounter from '../Common/Loading/LoadingCounter'

export default function ArtistSubNav({ artist, isLoading, }) {
    const inViewSection = useActiveSectionStore((state) => state.inViewSection)
    const setInViewSection = useActiveSectionStore((state) => state.setInViewSection)

	if (!artist) return null

	return (
		<aside className="fixed top-0 grid w-screen grid-cols-12 px-4 sm:px-6 z-100">
			<div className="absolute col-span-3 col-start-1 flex h-[4rem] pt-6 w-full items-baseline bg-background"></div>
			<div className="absolute col-span-9 col-start-4 flex h-[4rem] pt-6 w-full items-baseline space-x-12 bg-background">
				<h1 className="text-secondary">
					{artist.name}
				</h1>
				<nav className="flex space-x-4">
                    <Link
                        className={cn(
                            'z-100 w-fit cursor-pointer transition hover:text-primary',
                            isLoading ? 'hidden' : 'block',
                            inViewSection === 'works' ? 'text-primary' : 'text-secondary'
                        )}
                        href={'#works'}
                        onClick={() => {
                            setInViewSection('works')
                        }}
                        scroll={false}
                    >
                        {'Works'}
                    </Link>
					<div className={cn(isLoading ? 'block' : 'hidden')}>
						<LoadingCounter totalImages={artist.imageGallery?.length} />
					</div>
					<Link
                        className={cn(
                            'z-100 w-fit cursor-pointer transition',
                            isLoading ? 'hidden' : 'block',
                            inViewSection === 'exhibitions' ? 'text-primary' : 'text-secondary'
                        )}
                        href={'#exhibitions'}
                        onClick={() => {
                            setInViewSection('exhibitions')
                        }}
                        scroll={false}
                    >
                        {'Exhibitions'}
                    </Link>
					<Link
                        className={cn(
                            'z-100 w-fit cursor-pointer transition',
                            isLoading ? 'hidden' : 'block',
                            inViewSection === 'biography' ? 'text-primary' : 'text-secondary'
                        )}
                        href={'#biography'}
                        onClick={() => {
                            setInViewSection('biography')
                        }}
                        scroll={false}
                    >
                        {'Biography'}
                    </Link>
				</nav>
			</div>
		</aside>
	)
}
