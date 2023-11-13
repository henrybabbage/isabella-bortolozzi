import { useEffect } from 'react'

import { useActiveItemStore } from '@/context/useActiveItemStore'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {

    const inViewItem = useActiveItemStore((state) => state.inViewItem)

    useEffect(() => {
        if (inViewItem) {
            console.log(inViewItem)
        }
    }, [inViewItem])

	if (!exhibitions) return null

	return (
		<div className="grid w-full grid-cols-12 items-start px-6">
			<div className="sticky top-0 col-span-3 col-start-1 flex h-screen w-full items-center">
				<div className="relative h-[22.5vw] w-[22.5vw] bg-background p-6">
					{exhibitions &&
						exhibitions.map((exhibition) => (
							<TableImage
								key={exhibition._id}
								id={exhibition._id}
								currentImage={exhibition.mainImage ?? ''}
							/>
						))}
				</div>
			</div>
			<div className="col-span-9 col-start-4 w-full py-[24vh]">
				<ul>
					{exhibitions &&
						exhibitions.map((exhibition) => (
							<li key={exhibition._id} id={exhibition.year} className='scroll-mt-[calc(-13vh+12px)]'>
								<TableItem id={exhibition._id} year={exhibition.year} exhibition={exhibition} />
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}
