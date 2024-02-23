import DynamicLink from '@/components/Primitives/DynamicLink'
import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'

import StandardImage from '../Media/StandardImage'
import { CustomPortableText } from '../Text/CustomPortableText'

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
    <DynamicLink link={item} prefetch={true} scroll={false}>
      <div className="h-[800px] w-[800px] flex flex-col gap-4 group text-secondary">
        <StandardImage image={mainImage} fill={true} mode="cover" />
        <div className="flex flex-col">
          {title && (
            <h1 className="uppercase group-hover:text-primary">{title}</h1>
          )}
          {subtitle && <h2 className="group-hover:text-primary">{subtitle}</h2>}
          {heading && (
            <CustomPortableText
              value={heading}
              paragraphClasses="text-secondary group-hover:text-primary"
            />
          )}
          {text && (
            <CustomPortableText
              value={text}
              paragraphClasses="text-secondary group-hover:text-primary"
            />
          )}
          {artistList && <h2 className="pl-8 group-hover:text-primary">{artistList}</h2>}
        </div>
        <div className="flex flex-col pt-3 group-hover:text-primary">
          {venue && (
            <h3 className="pr-0">
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
          {endDate && <h3 className="pl-6">{getYear(endDate)}</h3>}
        </div>
      </div>
    </DynamicLink>
  )
}
