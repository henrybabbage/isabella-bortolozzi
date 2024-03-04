import TableItem from '../Common/Table/TableItem'

export default function ExhibitionsTable() {
  return (
    <div
      onMouseLeave={() => {}}
      className="grid w-full grid-cols-12 items-start px-4"
    >
      <div className="scrollbar-hide col-start-1 col-span-12 h-fit w-full">
        <ol className="">
          {items.map((item, index) => (
            <li id={index} key={item._key} onMouseEnter={() => {}} className="">
              <TableItem
                exhibition={exhibitions[index]}
                index={index}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
