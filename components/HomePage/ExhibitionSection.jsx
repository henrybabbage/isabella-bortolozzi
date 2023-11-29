/* eslint-disable @next/next/no-img-element */

export default function ExhibitionSection({ exhibition }) {
    return (
        <div
			className="relative flex h-[100dvh] w-full cursor-pointer snap-start bg-cover bg-top bg-no-repeat"
			style={{
				backgroundImage: `url(${exhibition ? exhibition?.mainImage?.asset?.url : null})`,
			}}
		>
			<img fetchpriority="high" src={exhibition?.mainImage?.asset?.url} alt={exhibition?.title ?? ''} style={{ display: 'none' }} />
		</div>
    )
}
