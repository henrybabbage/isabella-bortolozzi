import Card from './Card'

export default function Marquee({ items }) {
  console.log(items)
  return (
    <div className="h-[100svh] w-screen flex gap-8 overflow-x-auto">
      {items.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  )
}
