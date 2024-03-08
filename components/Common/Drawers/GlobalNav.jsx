import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { gsap } from '@/lib/gsap'
import { sanityClient } from '@/sanity/lib/sanity.client'
import { artistsQuery } from '@/sanity/lib/sanity.queries'
import { cn } from '@/utils/cn'

export default function GlobalNav({ isFixed = true }) {
  const [artists, setArtists] = useState([])
  const navRef = useRef()
  const tl = useRef()
  const pagesMenuRef = useRef()
  const artistsMenuRef = useRef()

  useEffect(() => {
    const fetchArtists = async () => {
      const galleryArtists = await sanityClient.fetch(artistsQuery)
      const uniqueArtists = [...new Set(galleryArtists)]
      setArtists(uniqueArtists)
    }

    fetchArtists()
  }, [artists])

  const { contextSafe } = useGSAP(
    () => {
      const menu = gsap.utils.toArray('.menu-item')
      tl.current = gsap
        .timeline()
        .to(navRef.current, {
          height: '80vh',
          background: '#F5F4F0',
          duration: 0.75,
        })
        .from(menu, { y: -8, opacity: 0, stagger: 0.05 })
        .to(menu, { y: 0, opacity: 1, stagger: 0.05, duration: 0.1 })
        .reverse()
    },
    { scope: navRef },
  )

  const toggleNavOpen = contextSafe(() => {
    tl.current.reversed(!tl.current.reversed())
  })

  const menu = [
    { title: 'Current', path: '/current' },
    { title: 'Archive', path: '/exhibitions' },
    { title: 'News', path: '/news' },
    { title: 'Contact', path: '/contact' },
  ]

  return (
    <div
      className={cn(isFixed ? 'fixed' : 'absolute', 'z-500 w-full px-4')}
      ref={navRef}
    >
      <header className="grid-cols-12 grid">
        <div className="col-span-1 w-full col-start-1 pt-2 sticky top-0">
          <button
            onClick={toggleNavOpen}
            className="pt-2 z-500 w-full flex items-start"
            aria-label="View navigation menu"
          >
            <h1 className="text-primary">Menu</h1>
          </button>
        </div>
        <div className="col-span-1 col-start-2 w-full pt-2 sticky top-0">
          <h1 className="text-primary pt-2">Artists</h1>
        </div>
      </header>
      <nav className="grid grid-cols-12 mt-2">
        <div
          ref={pagesMenuRef}
          className="col-span-1 col-start-1 flex flex-col"
        >
          {menu.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.path}
                className="hover:bg-background text-primary cursor-pointer text-left menu-item"
                aria-label="Main pages"
              >
                {item.title}
              </Link>
            )
          })}
        </div>
        <div
          ref={artistsMenuRef}
          className="col-span-4 col-start-2 flex flex-col"
        >
          {artists.map((artist, index) => {
            return (
              <Link
                key={index}
                href={`/${artist.slug}`}
                className="hover:bg-background text-primary text-left cursor-pointer menu-item"
                aria-label="Artist pages"
              >
                {artist.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
