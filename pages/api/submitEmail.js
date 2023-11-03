import { client } from 'lib/sanity.client'

export default async function submitEmail(req, res) {
	const { email } = JSON.parse(req.body)
	try {
		await client.create({
			_type: 'visitorEmail',
			email,
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Could not submit email.", err })
	}
	return res.status(200).json({ message: 'Email submitted.' })
}
