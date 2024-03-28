import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import SvgBortolozziLogo from '@/public/components/BortolozziLogo'
import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'

import GlobalSheet from '../Common/Nav/GlobalSheet'

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

  const dominantColor =
    featuredExhibition?.mainImage?.asset?.metadata?.palette?.dominant
      ?.background

  const getLogoFillColor = (override, dominantColor) => {
    if (override?.overrideColor === true) {
      return override?.logoColor?.value
    }

    if (dominantColor) {
      return dominantColor
    }

    return '#222222'
  }

  const { title, artists, slug, startDate, endDate } = featuredExhibition || {}
  const artistNames = artists?.map((a) => a.name)
  const artistList = artistNames?.join(', ')

  return (
    <div className="relative flex h-screen w-screen flex-col justify-between px-4 pt-4 pb-4 bg-background">
      <GlobalSheet isFixed={false} />
      <div className="sticky top-0 w-full grid grid-cols-12">
        <div className="col-start-6 col-span-4 text-left">
          <Link href={`/exhibitions/${slug}`}>
            <h3 className="text-primary">{title}</h3>
            <h3 className="text-primary">{artistList}</h3>
          </Link>
        </div>
        <div className="col-start-11 col-span-2 text-left justify-end flex">
          <Link href={`/exhibitions/${slug}`} className="flex space-x-6">
            {startDate && endDate && (
              <h3 className="text-primary">
                {formatDateWithoutYear(startDate)}—
                {formatDateWithoutYear(endDate)}
              </h3>
            )}
            {endDate && <h3 className="text-primary">{getYear(endDate)}</h3>}
          </Link>
        </div>
      </div>
      <div className="flex h-full flex-col justify-end">
        <div className="h-auto w-full">
          <SvgBortolozziLogo
            fill={getLogoFillColor(override, dominantColor)}
            height="100%"
            width="100%"
          />
        </div>
        <div className="hidden mt-6 lg:flex w-full justify-between h-12 items-start">
          <div className="w-auto flex gap-4 md:gap-6">
            <h3 className="h-fit whitespace-nowrap">
              {gallery?.footer?.phoneNumber}
            </h3>
            <h3 className="h-fit whitespace-nowrap">
              {gallery?.footer?.email}
            </h3>
          </div>
          <div className="w-auto flex gap-4 md:gap-6 px-2 md:px-4">
            <h3 className="h-fit whitespace-nowrap md:visible">
              {gallery?.footer?.newsletterHeading}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-auto"
            >
              <div className="flex">
                <label htmlFor="email" className="h-fit">
                  {gallery?.footer?.newsletterPrompt}
                </label>
                <input
                  placeholder="Email address"
                  className="placeholder:text-secondary h-fit flex flex-col w-full border-b border-primary outline-none"
                  type="text"
                  name="email"
                  {...register('email', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address.',
                    },
                  })}
                />
                <button
                  type="submit"
                  className="h-fit flex flex-col justify-start uppercase hover:text-primary transition text-secondary"
                >
                  Submit
                </button>
              </div>

              <div className="flex gap-2">
                {errors.email && (
                  <p role="alert" className="h-fit text-primary">
                    {errors.email.message}
                  </p>
                )}
                {success && (
                  <div className="h-fit text-primary">
                    {gallery.footer.newsletterSuccessMessage ? (
                      <p>{gallery.footer.newsletterSuccessMessage}</p>
                    ) : (
                      <p>You have been subscribed.</p>
                    )}
                  </div>
                )}
                {error && (
                  <div className="h-fit text-primary">
                    {gallery.footer.newsletterErrorMessage ? (
                      <p>{gallery.footer.newsletterErrorMessage}</p>
                    ) : (
                      <p>An error occurred.</p>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="w-auto flex gap-4 md:gap-6">
            <Link href="/imprint" className="cursor-pointer">
              <h3 className="text-primary transition hover:text-secondary">
                Imprint
              </h3>
            </Link>
            <a
              href={gallery?.footer?.instagram}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer"
            >
              <h3 className="text-primary transition hover:text-secondary">
                Instagram
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
