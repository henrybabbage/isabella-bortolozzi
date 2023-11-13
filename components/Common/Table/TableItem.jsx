import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { formatDateWithoutYear, getYear } from 'utils/dateHelpers'

import { useActiveItemStore } from '@/context/useActiveItemStore'
import { useActiveYearStore } from '@/context/useActiveYearStore'
import { cn } from '@/utils/cn'

import { CustomPortableText } from '../Text/CustomPortableText'

export default function TableItem({ exhibition, id, year }) {
    const router = useRouter()

	const { ref, inView } = useInView({ rootMargin: '-50% 0px -50% 0px' })
	const setInViewItem = useActiveItemStore((state) => state.setInViewItem)
	const setInViewYear = useActiveYearStore((state) => state.setInViewYear)

	useEffect(() => {
		if (inView) {
            setInViewItem(id)
            setInViewYear(year)
        }
	}, [id, year, inView, setInViewItem, setInViewYear])

	const artistNames = exhibition?.artists?.map((a) => a.name)
	const artistList = artistNames?.join(', ')

	const slug = exhibition?.slug ?? ''

    const getItemPath = (type) => {
		switch (type) {
			case 'exhibition':
				return '/exhibitions'
			case 'viewingRoom':
				return '/viewing-rooms'
			case 'artist':
				return ''
		}
	}

	const page = getItemPath(exhibition._type)

    if (!exhibition) return null

	return (
		<Link
            scroll={false}
			href={{
				pathname: `${page}/[slug]`,
				query: {
					slug: slug,
				},
			}}
		>
			<div
				ref={ref}
				className={cn(
					'group relative grid h-[calc(26vw-48px)] max-h-[26vw] cursor-pointer grid-flow-dense grid-cols-9 content-start border-t border-solid border-inactive-200 pb-6 text-left font-serif',
					inView ? 'text-primary' : 'text-secondary'
				)}
			>
				<div className="col-span-5 col-start-1 flex flex-col">
					<div className="flex w-full flex-col pt-3">
						{exhibition.title && <h1 className="">{exhibition.title}</h1>}
						{exhibition.subtitle && <h2 className="">{exhibition.subtitle}</h2>}
                        {router.pathname.startsWith('/news') && exhibition.heading && <CustomPortableText value={exhibition.heading} paragraphClasses={inView ? 'text-primary' : 'text-secondary'} />}
                        {router.pathname.startsWith('/news') && exhibition.text && <CustomPortableText value={exhibition.text} paragraphClasses={inView ? 'text-primary' : 'text-secondary'} />}
					</div>
					<div className="col-span-5 col-start-1">
						<h2 className="pl-8">{artistList}</h2>
					</div>
				</div>
				<div className="col-span-2 col-start-6 flex flex-col pt-3">
					<h3 className="pr-6">
						{exhibition?.venue && exhibition?.venue?.name && (
							<span>
								{exhibition?.venue?.city || exhibition?.venue?.country
									? exhibition?.venue?.name + ', '
									: exhibition?.venue?.name}
							</span>
						)}
						{exhibition?.venue?.city && (
							<span>
								{exhibition?.venue?.country ? exhibition?.venue?.city + ', ' : exhibition?.venue?.city}
							</span>
						)}
						{exhibition?.venue?.country && <span>{exhibition?.venue?.country}</span>}
					</h3>
				</div>
				<div className="col-span-2 col-start-8 flex justify-end pt-3">
					<div className="flex">
						{exhibition?.startDate && exhibition?.endDate && (
							<h3 className="">
								{formatDateWithoutYear(exhibition?.startDate)}—
								{formatDateWithoutYear(exhibition?.endDate)}
							</h3>
						)}
						{exhibition?.endDate && <h3 className="pl-6">{getYear(exhibition?.endDate)}</h3>}
					</div>
				</div>
			</div>
		</Link>
	)
}
