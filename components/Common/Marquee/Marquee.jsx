import Card from './Card'

export default function Marquee({ items }) {
  return (
    <div className="h-[100svh] w-screen flex flex-col pt-16 overflow-x-auto">
      <div className="h-full flex gap-8">
        {items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
