import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'

import StandardImage from '../Common/Media/StandardImage'
import { CustomPortableText } from '../Common/Text/CustomPortableText'
import DynamicLink from '../Primitives/DynamicLink'

export default function NewsSlide({ item }) {
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
    <div className="h-full w-full flex flex-col group text-secondary">
      <div className="relative aspect-square h-full w-full cursor-grab">
        <StandardImage
          image={mainImage}
          fill={true}
          mode="cover"
          sizes="(min-width: 780px) 704px, calc(94.78vw - 16px)"
        />
      </div>
      <DynamicLink link={item} scroll={false}>
        <div className="relative">
          <div className="flex flex-col pt-4">
            {title && <h1 className="group-hover:text-primary">{title}</h1>}
            {subtitle && (
              <h2 className="group-hover:text-primary">{subtitle}</h2>
            )}
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
                    {venue.city || venue.country
                      ? venue.name + ', '
                      : venue.name}
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
    </div>
  )
}
