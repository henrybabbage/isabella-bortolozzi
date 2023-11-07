import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import SvgBortolozziLogo from '@/public/components/BortolozziLogo'

export default function Footer({ gallery, featuredExhibition, override }) {
	const [submitting, setSubmitting] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)
	const [email, setEmail] = useState(null)
	const [formData, setFormData] = useState()

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		console.log('Submitted: ', data)
		setSubmitting(true)
		let response
		setFormData(data)
		try {
			const response = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			console.log(await response.json())
			setEmail('')
			setSubmitting(false)
			setSuccess(true)
		} catch (err) {
			setFormData(err)
			setError(true)
		}
	}

    const dominantColor = featuredExhibition.mainImage.asset.metadata.palette.dominant.background

	return (
		<div className="relative flex h-screen w-screen flex-col justify-end p-6">
			<div className="mb-6 flex w-full justify-between">
				<h3 className="">{gallery?.footer?.phoneNumber}</h3>
				<h3 className="">{gallery?.footer?.email}</h3>
				<h3 className="">{gallery?.footer?.newsletterHeading}</h3>
				<form onSubmit={handleSubmit(onSubmit)} className="flex">
					<label htmlFor="email" className="">
						{gallery?.footer?.newsletterPrompt}
					</label>
					<input
						className="w-full border-b outline-none"
						type="text"
						{...register('email', {
							required: 'This field is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Invalid email address',
							},
						})}
					/>
					<button
						type="submit"
						className="flex flex-col justify-start text-primary transition hover:text-secondary"
					>
						Submit
					</button>
					{errors?.email && (
						<p role="alert" className="py-4 text-primary">
							{errors.email.message}
						</p>
					)}
					{success && (
						<div className=" py-4 text-primary">
							{gallery?.footer?.newsletterSuccessMessage ? (
								<p>{gallery?.footer?.newsletterSuccessMessage}</p>
							) : (
								<p>You have been subscribed.</p>
							)}
						</div>
					)}
					{error && (
						<div className=" py-4 text-primary">
							{gallery?.footer?.newsletterErrorMessage ? (
								<p>{gallery?.footer?.newsletterErrorMessage}</p>
							) : (
								<p>An error occurred.</p>
							)}
						</div>
					)}
				</form>
				<Link href="/imprint" className="cursor-pointer">
					<h3 className=" text-primary transition hover:text-secondary">Imprint</h3>
				</Link>
				<a href={gallery?.footer?.instagram} target="_blank" rel="noreferrer" className="cursor-pointer">
					<h3 className=" text-primary transition hover:text-secondary">Instagram</h3>
				</a>
			</div>
			<div className="h-auto w-full">
				<SvgBortolozziLogo
					fill={override?.overrideColor === true ? override?.logoColor.value : dominantColor}
					height="100%"
					width="100%"
				/>
			</div>
		</div>
	)
}