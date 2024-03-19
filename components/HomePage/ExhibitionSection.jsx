/* eslint-disable @next/next/no-img-element */

import { forwardRef } from 'react'

const ExhibitionSection = forwardRef(function ExhibitionSection(
  { exhibition },
  ref,
) {
  console.log(ref)
  if (!exhibition) return null
  return (
    <div
      ref={ref}
      className="relative h-screen w-full cursor-pointer bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${
          exhibition ? exhibition?.mainImage?.asset?.url : null
        })`,
      }}
    >
      <img
        fetchpriority="high"
        src={exhibition?.mainImage?.asset?.url}
        alt={exhibition?.title ?? ''}
        style={{ display: 'none' }}
        sizes="100vw"
      />
    </div>
  )
})

export default ExhibitionSection
