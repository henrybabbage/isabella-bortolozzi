import SvgBortolozziLogo from "@/public/components/BortolozziLogo";

export default function MobileFooter({ gallery, featuredExhibition, override }) {
    const dominantColor = featuredExhibition.mainImage.asset.metadata.palette.dominant.background
	return (
		<div className="flex w-screen h-screen flex-col justify-end md:hidden">
			<div className="flex flex-col space-y-7 p-6">
				<div className="flex flex-col">
					<a href={gallery.footer.googleMaps || 'https://www.google.com/maps/'} target="_blank" rel="noreferrer" className="font-serif">
						{gallery.footer.address}
					</a>
					<p className="whitespace-nowrap font-serif">{gallery?.footer?.openingHours}</p>
				</div>
				<div className="flex flex-col">
					<a href={gallery.footer.googleMaps || 'https://www.google.com/maps/'} target="_blank" rel="noreferrer" className="font-serif">
						{gallery.footer.additionalAddress}
					</a>
					<p className="whitespace-nowrap font-serif">{gallery?.footer?.visitation}</p>
				</div>
				<div className="flex flex-col">
					<p className="font-serif">{gallery?.footer?.phoneNumber}</p>
					<p className="font-serif">{gallery?.footer?.email}</p>
				</div>
				<div className="flex flex-col pb-9">
					<div className="flex">
						<a href="https://www.facebook.com/GalerieIsabellaBortolozzi/" target="_blank" rel="noreferrer" className="font-serif">
							Facebook
						</a>
						<span className="mx-1">|</span>
						<a href="https://www.instagram.com/isabellabortolozzi/" target="_blank" rel="noreferrer" className="font-serif">
							Instagram
						</a>
					</div>
				</div>
			</div>
			<div className="relative bottom-4 h-16 w-full p-4">
                <div className="h-auto w-full">
                    <SvgBortolozziLogo
                        fill={override?.overrideColor === true ? override?.logoColor.value : dominantColor}
                        height="100%"
                        width="100%"
                    />
                </div>
			</div>
		</div>
	)
}
