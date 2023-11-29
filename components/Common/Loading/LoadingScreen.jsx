import { cn } from "@/utils/cn"
import { formatDatesWithoutYears, getYear } from "@/utils/dateHelpers"

import LoadingCounter from "./LoadingCounter"

export default function LoadingScreen({ exhibition, isLoading }) {
    if(!exhibition) return null
    return (
        <div className={cn(isLoading? 'opacity-100' : 'opacity-0', "pointer-events-none scrollbar-hide fixed top-0 left-0 z-1000 h-screen max-h-screen w-screen !overflow-hidden bg-background animate-fade-in")}>
			<div className="invisible relative h-[calc(50vh-13vw+24px)] w-full" />
			<section className="flex h-full w-full flex-col">
				<div className="hidden w-full grid-cols-12 px-6 sm:grid">
					<span className="border-t border-solid border-inactive-200 lg:col-span-12 lg:col-start-1"></span>
				</div>
				<div className="flex w-full flex-col px-4 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:px-6 lg:pt-[12px]">
					<div className="lg:col-span-2 lg:col-start-1">
						<LoadingCounter totalImages={exhibition.totalImages} />
					</div>
					<div className="flex-wrap pt-6 pr-6 lg:col-span-5 lg:col-start-4 lg:pt-0">
						{exhibition.title && <h1 className="uppercase">{exhibition.title}</h1>}
						<div className="pl-6">
							{exhibition.artists &&
								exhibition.artists.map((artist, i) => (
									<h2 key={i} className="mr-1 inline-flex shrink-0">
										{i !== exhibition.artists.length - 1 && exhibition.artists.length !== 1
											? artist.name + ','
											: artist.name}
									</h2>
								))}
						</div>
					</div>
					<div className="flex justify-start pt-6 lg:col-span-2 lg:col-start-9 lg:pt-0">
						{exhibition.venue && exhibition.venue.name ? (
							<div className="inline-block max-w-full">
								<h2 className="">
									<span>
										{exhibition.venue.city
											? exhibition.venue.name + ', '
											: exhibition.venue.name}
									</span>
									<span>
										{exhibition.venue.country
											? exhibition.venue.city + ', '
											: exhibition.venue.city}
									</span>
									<span>{exhibition.venue.country}</span>
								</h2>
							</div>
						) : (
							<div className="flex flex-col lg:inline-flex lg:flex-wrap">
								<p className="">Isabella Bortolozzi,</p>
								<p className="">Berlin, Germany</p>
							</div>
						)}
					</div>
					<div className="col-span-2 flex justify-between pt-6 lg:col-start-11 lg:justify-end lg:pt-0">
						{exhibition.startDate &&
							exhibition.endDate &&
							formatDatesWithoutYears({
								startDate: exhibition.startDate,
								endDate: exhibition.endDate,
							})}
						<p className="ml-6">{getYear(exhibition.endDate)}</p>
					</div>
				</div>
			</section>
		</div>
    )
}
