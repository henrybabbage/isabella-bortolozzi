import { CustomPortableText } from "../Common/Text/CustomPortableText";

export default function ExhibitionList({ exhibition, year }) {
    return (
        <li className="flex">
            {year && <p className="mr-5">{year}</p>}
            <CustomPortableText value={exhibition} />
        </li>
    )
}