import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { gsap } from '@/lib/gsap'
import { sanityClient } from '@/sanity/lib/sanity.client'
import { artistsQuery } from '@/sanity/lib/sanity.queries'
import { useNavOpenStore } from '@/stores/useNavOpenStore'
import { cn } from '@/utils/cn'

const menu = [
  { title: 'Current', path: '/current' },
  { title: 'Archive', path: '/exhibitions' },
  { title: 'News', path: '/news' },
  { title: 'Contact', path: '/contact' },
]

export default function GlobalSheet({ isFixed = true }) {
  const [artists, setArtists] = useState([])
  const [isNavOpen, setIsNavOpen] = useNavOpenStore(
    ({ isNavOpen, setIsNavOpen }) => [isNavOpen, setIsNavOpen],
  )

  const containerRef = useRef()
  const pagesMenuRef = useRef(null)
  const artistsMenuRef = useRef(null)

  const tl = useRef()

  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    const fetchArtists = async () => {
      const galleryArtists = await sanityClient.fetch(artistsQuery)
      const uniqueArtists = [...new Set(galleryArtists)]
      setArtists(uniqueArtists)
    }

    fetchArtists()
  }, [])

  useGSAP(
    () => {
      gsap.set('.menu-link-item-container', { y: 75 })
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          duration: 0.75,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu-link-item-container', {
          y: 0,
          duration: 0.5,
          stagger: 0.025,
          ease: 'power4.out',
          delay: -0.75,
        })
    },
    { scope: containerRef, dependencies: [artists], revertOnUpdate: true },
  )

  useEffect(() => {
    if (isNavOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isNavOpen])

  return (
    <div className="menu-container" ref={containerRef}>
      {/* menu-bar */}
      <header
        className={cn(
          isFixed ? 'fixed' : 'absolute',
          'menu-bar z-[300] top-[0] left-[0] w-screen p-4 flex justify-between items-center',
        )}
      >
        <div className="menu-open cursor-pointer" onClick={toggleMenu}>
          <p className="text-primary hover:text-secondary">Menu</p>
        </div>
        <div className="menu-logo">
          <Link href="/">Bortolozzi</Link>
        </div>
      </header>

      {/* menu-overlay */}
      <div className="menu-overlay z-[500] fixed top-[0] left-[0] w-screen h-[75vh] p-4 bg-background flex [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)]">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar z-[300] fixed top-[0] left-[0] w-screen p-4 grid grid-cols-12">
          <div
            className="cursor-pointer col-start-1 col-span-1"
            onClick={toggleMenu}
          >
            <p className="text-primary hover:text-secondary">Close</p>
          </div>
          <div className="menu-open cursor-pointer col-span-2 col-start-2">
            <p className="text-primary hover:text-secondary">Artists</p>
          </div>
          <div className="menu-logo col-span-1 col-start-12 place-self-end">
            <Link href="/">Bortolozzi</Link>
          </div>
        </div>

        {/* menu-links  */}
        <nav className="menu-copy grid grid-cols-12 w-full pt-4 bg-highlight">
          {/* menu-links-pages  */}
          <div
            ref={pagesMenuRef}
            className="menu-links col-span-1 col-start-1 flex flex-col pt-4"
          >
            {menu.map((link, index) => (
              <div
                key={index}
                className="menu-link-item w-max [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div
                  className="menu-link-item-container relative"
                  onClick={toggleMenu}
                >
                  <Link
                    className="menu-link text-primary hover:text-secondary text-xs"
                    aria-label="Main pages"
                    href={link.path}
                  >
                    {link.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* menu-links-artists  */}
          <div
            ref={artistsMenuRef}
            className="col-span-4 col-start-2 flex flex-col pt-4"
          >
            {artists.map((artist, index) => (
              <div
                key={index}
                className="menu-link-item w-max [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div
                  className="menu-link-item-container relative"
                  onClick={toggleMenu}
                >
                  <Link
                    key={index}
                    href={`/${artist.slug}`}
                    className="text-primary hover:text-secondary text-xs menu-item"
                    aria-label="Artist pages"
                  >
                    {artist.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
