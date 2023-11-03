import { useActiveItemStore } from '@/context/store'
import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export default function TableItem({ exhibition, id }) {
	const ref = useRef(null)
	const isInView = useInView(ref, { margin: '-50% 0px -50% 0px' })
	const setInViewItem = useActiveItemStore((state) => state.setInViewItem)

	useEffect(() => {
		if (isInView) setInViewItem(id)
	}, [isInView, id, setInViewItem])

	const artistNames = exhibition?.artists?.map((a) => a.name)
	const artistList = artistNames?.join(', ')

	const slug = exhibition?.slug?.current ?? ''

	const router = useRouter()
	const page = router.pathname === '/exhibitions' ? 'exhibitions' : 'viewing-rooms'

	return (
		<Link
            scroll={false}
            // legacyBehavior
			href={{
				pathname: `${page}/[slug]`,
				query: {
					slug: slug,
					backNavigation: page,
				},
			}}
		>
			<div
				ref={ref}
				className={clsx(
					'group relative grid h-[calc(26vw-48px)] max-h-[26vw] cursor-pointer grid-flow-dense grid-cols-9 content-start border-t border-solid border-inactive-200 pb-6 text-left font-serif',
					isInView ? 'text-black-600' : 'text-secondary-200'
				)}
			>
				<div className="col-span-5 col-start-1 flex flex-col">
					<div className="flex w-full flex-col pt-3">
						{exhibition?.title && <h1 className="heading">{exhibition.title}</h1>}
						{exhibition?.subtitle && <h2 className="body">{exhibition.subtitle}</h2>}
					</div>
					<div className="col-span-5 col-start-1">
						<h2 className="body pl-8">{artistList}</h2>
					</div>
				</div>
				<div className="col-span-2 col-start-6 flex flex-col pt-3">
					<h3 className="body pr-6">
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
							<h3 className="body">
								{formatDateWithoutYear(exhibition?.startDate)}—
								{formatDateWithoutYear(exhibition?.endDate)}
							</h3>
						)}
						{exhibition?.endDate && <h3 className="body pl-6">{getYear(exhibition?.endDate)}</h3>}
					</div>
				</div>
			</div>
		</Link>
	)
}
