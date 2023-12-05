/* eslint-disable @next/next/no-img-element */

export default function ExhibitionSection({ exhibition }) {
    if (!exhibition) return null
    return (
        <div
			className="relative flex h-[100svh] sm:h-screen w-full cursor-pointer snap-start bg-cover bg-top bg-no-repeat"
			style={{
				backgroundImage: `url(${exhibition ? exhibition?.mainImage?.asset?.url : null})`,
			}}
		>
			<img fetchpriority="high" src={exhibition?.mainImage?.asset?.url} alt={exhibition?.title ?? ''} style={{ display: 'none' }} sizes="100vw" />
		</div>
    )
}
