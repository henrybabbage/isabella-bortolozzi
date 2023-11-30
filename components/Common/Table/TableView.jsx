import { useEffect, useRef } from 'react'

import { useSelectedYearStore } from '@/context/useSelectedYearStore'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {

    const tableContentRef = useRef()

    const selectedYearIndex = useSelectedYearStore((state) => state.selectedYearIndex)
    console.log({ selectedYearIndex })

    useEffect(() => {
        if(selectedYearIndex) {
            tableContentRef.current.children[selectedYearIndex].scrollIntoView({
                behavior: 'smooth', 
                block: 'start'
            })
        }
    }, [selectedYearIndex])

	if (!exhibitions) return null

	return (
		<div className="grid w-full grid-cols-12 items-start px-6">
			<div className="hidden sm:visible sm:flex sticky top-0 col-span-3 col-start-1 h-screen w-full items-center">
				<div className="relative h-[22vw] w-[22vw] bg-background">
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
			<div className="sm:col-span-9 sm:col-start-4 col-start-1 col-span-12 w-full py-[calc(50vh-11vw)]">
				<ul ref={tableContentRef}>
					{exhibitions &&
						exhibitions.map((exhibition) => (
							<li key={exhibition._id} id={exhibition.year} className='scroll-mt-[calc(50vh-11vw)]'>
								<TableItem id={exhibition._id} year={exhibition.year} exhibition={exhibition} />
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}
