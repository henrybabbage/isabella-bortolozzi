import { CustomPortableText } from "../Common/Text/CustomPortableText";

export default function ExhibitionList({ exhibition, year }) {
    return (
        <li className="flex">
            {year && <p className="tabular-nums mr-5">{year}</p>}
            <CustomPortableText value={exhibition} />
        </li>
    )
}