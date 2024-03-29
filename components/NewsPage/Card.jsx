import DynamicLink from '@/components/Primitives/DynamicLink'
import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'

import StandardImage from '../Common/Media/StandardImage'
import { CustomPortableText } from '../Common/Text/CustomPortableText'

export default function Card({ item }) {
  const {
    mainImage,
    title,
    heading,
    subtitle,
    artists,
    text,
    startDate,
    endDate,
    venue,
  } = item ?? {}

  // format list of artist names for this row item
  const artistNames = artists?.map((a) => a.name)
  const artistList = artistNames?.join(', ')

  return (
    <DynamicLink link={item} scroll={false}>
      <div className="card w-full h-full overflow-hidden flex flex-col gap-4 group text-secondary cursor-pointer">
        <div className="h-[550px] w-[550px] relative">
          <StandardImage
            image={mainImage}
            fill={true}
            mode="cover"
            classNames="aspect-square"
          />
        </div>
        <div className="flex flex-col">
          {title && <h1 className="group-hover:text-primary">{title}</h1>}
          {subtitle && <h2 className="group-hover:text-primary">{subtitle}</h2>}
          {heading && (
            <CustomPortableText
              value={heading}
              classNames="text-secondary group-hover:text-primary"
            />
          )}
          {text && (
            <CustomPortableText
              value={text}
              classNames="!uppercase text-secondary group-hover:text-primary"
            />
          )}
          {artistList && (
            <h2 className="pl-8 group-hover:text-primary">{artistList}</h2>
          )}
        </div>
        <div className="flex flex-col group-hover:text-primary">
          {venue && (
            <h3 className="">
              {venue && venue.name && (
                <span>
                  {venue.city || venue.country ? venue.name + ', ' : venue.name}
                </span>
              )}
              {venue && venue.city && (
                <span>{venue.country ? venue.city + ', ' : venue.city}</span>
              )}
              {venue && venue.country && <span>{venue.country}</span>}
            </h3>
          )}
        </div>
        <div className="flex group-hover:text-primary">
          {startDate && endDate && (
            <h3 className="">
              {formatDateWithoutYear(startDate)}—
              {formatDateWithoutYear(endDate)}
            </h3>
          )}
          {endDate && <h3 className="ml-1">{getYear(endDate)}</h3>}
        </div>
      </div>
    </DynamicLink>
  )
}
