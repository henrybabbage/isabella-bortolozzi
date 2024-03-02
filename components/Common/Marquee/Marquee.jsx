import { EmblaCarousel } from '@/components/ArtistPage/EmblaCarousel'

const OPTIONS = {
  dragFree: true,
  containScroll: 'trimSnaps',
  loop: true,
}

export default function Marquee({ items }) {
  return (
    <div className="h-[100svh] max-h-screen w-screen max-w-screen pt-16 overflow-hidden px-6 fixed inset-0">
      <div className="h-full w-full">
        <EmblaCarousel slides={items} options={OPTIONS} />
      </div>
    </div>
  )
}
