import CustomPortableText from '@/components/Common/Text/CustomPortableText'

export default function ExhibitionList({ year, exhibition }) {
	return (
		<li className="flex">
			{year && <p className="date mr-5">{year}</p>}
            <CustomPortableText value={exhibition} />
		</li>
	)
}
