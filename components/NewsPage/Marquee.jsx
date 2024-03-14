import { NewsCarousel } from './NewsCarousel'

const OPTIONS = {
  dragFree: true,
  loop: true,
}

export default function Marquee({ items }) {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <div className="pt-16 h-full w-full">
        <NewsCarousel slides={items} options={OPTIONS} />
      </div>
    </div>
  )
}
