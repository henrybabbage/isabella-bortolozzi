import { CustomPortableText } from '../Common/Text/CustomPortableText'

export default function CarouselCaption({ content, currentIndex }) {
  const inViewImage = content?.imageGallery?.[currentIndex]
  if (!content) return null
  return (
    <div className="absolute left-24 bottom-6 h-8 grid place-content-end pl-1">
      {inViewImage && (
        <CustomPortableText
          value={inViewImage.details}
          classNames="h-fit"
        />
      )}
    </div>
  )
}
