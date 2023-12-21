import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { formatDateWithoutYear, getYear } from 'utils/dateHelpers'

import DynamicLink from '@/components/Primitives/DynamicLink'
import { useActiveItemStore } from '@/context/useActiveItemStore'
import { useActiveYearStore } from '@/context/useActiveYearStore'
import { cn } from '@/utils/cn'

import StandardImage from '../Media/StandardImage'
import { CustomPortableText } from '../Text/CustomPortableText'

export default function TableItem({ exhibition }) {
    const router = useRouter()

    const { _id: id, year } = exhibition

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
		<DynamicLink link={exhibition} prefetch={true} scroll={false}>
			<div
				ref={ref}
				className={cn(
					'group relative flex flex-col sm:grid h-[40rem] sm:h-[22vw] sm:max-h-[22vw] cursor-pointer sm:grid-flow-dense sm:grid-cols-9 content-start sm:border-t pt-1 sm:pt-0 sm:border-solid sm:border-border sm:pb-6 text-left font-serif',
					inView ? 'text-primary' : 'text-secondary'
				)}
			>
                <div className="sm:hidden h-[22rem] max-h-full w-full overflow-hidden pb-6">
                    <StandardImage
                        key={exhibition._id}
                        image={exhibition.mainImage ?? ''}
                    />
                </div>
				<div className="sm:col-span-5 sm:col-start-1 flex flex-col h-fit sm:h-auto">
					<div className="flex w-full flex-col pt-6 sm:pt-3">
						{exhibition.title && <h1 className="uppercase">{exhibition.title}</h1>}
						{exhibition.subtitle && <h2 className="">{exhibition.subtitle}</h2>}
                        {router.pathname.startsWith('/news') && exhibition.heading && <CustomPortableText value={exhibition.heading} paragraphClasses={cn("", inView ? 'text-primary' : 'text-secondary')} />}
                        {router.pathname.startsWith('/news') && exhibition.text && <CustomPortableText value={exhibition.text} paragraphClasses={cn("uppercase", inView ? 'text-primary' : 'text-secondary')} />}
					</div>
					<div className="sm:col-span-5 sm:col-start-1 pt-4 sm:pt-0">
						<h2 className="pl-8">{artistList}</h2>
					</div>
				</div>
				<div className="sm:col-span-2 sm:col-start-6 flex flex-col pt-3 h-fit sm:h-auto">
					{!router.pathname.startsWith('/exhibitions') && (
                        <h3 className="pr-6">
                            {exhibition.venue && exhibition.venue.name && (
                                <span>
                                    {exhibition.venue.city || exhibition.venue.country
                                        ? exhibition.venue.name + ', '
                                        : exhibition.venue.name}
                                </span>
                            )}
                            {exhibition.venue && exhibition.venue.city && (
                                <span>
                                    {exhibition.venue.country ? exhibition.venue.city + ', ' : exhibition.venue.city}
                                </span>
                            )}
                            {exhibition.venue && exhibition.venue.country && (
                                <span>{exhibition.venue.country}</span>
                            )}
                        </h3>
                    )}
				</div>
				<div className="sm:col-span-2 sm:col-start-8 flex justify-end pt-3 h-fit sm:h-auto">
					<div className="flex w-full sm:w-auto justify-between sm:justify-normal">
						{exhibition.startDate && exhibition.endDate && (
							<h3 className="">
								{formatDateWithoutYear(exhibition.startDate)}—
								{formatDateWithoutYear(exhibition.endDate)}
							</h3>
						)}
						{exhibition.endDate && <h3 className="pl-6">{getYear(exhibition.endDate)}</h3>}
					</div>
				</div>
			</div>
		</DynamicLink>
	)
}
