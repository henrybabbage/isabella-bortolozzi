import { useState } from 'react'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {
    const [selectedItem, setSelectedItem] = useState()

    console.log({exhibitions})
	if (!exhibitions) return null

	return (
		<div className="grid w-full grid-cols-12 items-start px-6">
			<div className="sticky top-0 col-span-3 col-start-1 flex h-screen w-full items-center">
				<div className="relative h-[22.5vw] w-[22.5vw] bg-whitesmoke-400 p-6">
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
							<li key={exhibition._id}>
								<TableItem id={exhibition._id} exhibition={exhibition} />
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}
