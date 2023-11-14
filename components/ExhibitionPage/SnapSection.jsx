import AspectImage from "../Common/Media/AspectImage";
import FullBleedImage from "../Common/Media/FullBleedImage";

export default function SnapSection({ exhibition }) {
    return (
        <section className="relative flex flex-col w-screen items-center">
            {exhibition &&
                exhibition?.imageGallery &&
                exhibition?.imageGallery
                    ?.slice(1)
                    .map((image, idx) =>
                        image?.fullbleed ? (
                            <FullBleedImage
                                reference={(element) => scrollToSections.current.add(element)}
                                key={idx}
                                image={image}
                                alt={image.alt}
                                priority={false}
                            />
                        ) : (
                            <AspectImage
                                reference={(element) => scrollToSections.current.add(element)}
                                image={image}
                                alt={image.alt}
                                priority={false}
                                fill={true}
                                mode="contain"
                                sizes="100vw"
                                key={idx}
                            />
                        )
            )}
        </section>
    )
}
