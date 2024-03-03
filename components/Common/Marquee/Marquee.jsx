import { EmblaCarousel } from '@/components/ArtistPage/EmblaCarousel'

const OPTIONS = {
  dragFree: true,
  containScroll: 'trimSnaps',
  loop: true,
}

export default function Marquee({ items }) {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <div className="pt-16 h-full w-full">
        <EmblaCarousel slides={items} options={OPTIONS} />
      </div>
    </div>
  )
}
