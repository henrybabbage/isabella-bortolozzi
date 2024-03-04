import { CustomPortableText } from '../Common/Text/CustomPortableText'

export default function CarouselCaption({ content, currentIndex }) {
  const inViewImage = content?.imageGallery?.[currentIndex]
  if (!content) return null
  return (
    <div className="absolute left-24 bottom-6">
      {inViewImage && <CustomPortableText value={inViewImage.details} />}
    </div>
  )
}
