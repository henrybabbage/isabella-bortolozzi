import SvgBortolozziLogo from '@/public/components/BortolozziLogo'

export default function FooterMobile({
  gallery,
  featuredExhibition,
  override,
}) {
  const dominantColor =
    featuredExhibition.mainImage.asset.metadata.palette.dominant.background
  return (
    <div className="flex w-screen h-[100svh] sm:h-screen flex-col justify-end md:hidden">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col">
          <a
            href={gallery.footer.googleMaps || 'https://www.google.com/maps/'}
            target="_blank"
            rel="noreferrer"
            className="font-mono"
          >
            {gallery.footer.address}
          </a>
          <p className="whitespace-nowrap font-mono">
            {gallery?.footer?.openingHours}
          </p>
        </div>
        <div className="flex flex-col">
          <a
            href={gallery.footer.googleMaps || 'https://www.google.com/maps/'}
            target="_blank"
            rel="noreferrer"
            className="font-mono"
          >
            {gallery.footer.additionalAddress}
          </a>
          <p className="whitespace-nowrap font-mono">
            {gallery?.footer?.visitation}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-mono">{gallery?.footer?.phoneNumber}</p>
          <p className="font-mono">{gallery?.footer?.email}</p>
        </div>
        <div className="flex flex-col pb-6">
          <div className="flex">
            <a
              href="https://www.facebook.com/GalerieIsabellaBortolozzi/"
              target="_blank"
              rel="noreferrer"
              className="font-mono"
            >
              Facebook
            </a>
            <span className="mx-1">|</span>
            <a
              href="https://www.instagram.com/isabellabortolozzi/"
              target="_blank"
              rel="noreferrer"
              className="font-mono"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="relative bottom-4 h-auto w-full p-4">
        <div className="h-auto w-full">
          <SvgBortolozziLogo
            fill={
              override?.overrideColor === true
                ? override?.logoColor.value
                : dominantColor
            }
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  )
}
