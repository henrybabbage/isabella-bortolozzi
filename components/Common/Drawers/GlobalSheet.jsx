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
          duration: 0.3,
          stagger: 0.025,
          ease: 'power4.out',
          delay: -0.1,
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

  useEffect(() => {
    isNavOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [isNavOpen])

  return (
    <div className="menu-container" ref={containerRef}>
      {/* menu-trigger */}
      <header
        className={cn(
          isFixed ? 'fixed' : 'absolute',
          'z-400 top-0 left-0 p-4 w-fit',
        )}
      >
        <button className="cursor-pointer" onClick={toggleMenu}>
          <p className="text-primary hover:text-secondary">Menu</p>
        </button>
      </header>

      <header
        className={cn(
          isFixed ? 'fixed' : 'absolute',
          'z-400  top-0 right-0 p-4 w-fit',
        )}
      >
        <div className="cursor-pointer">
          <Link href="/">Bortolozzi</Link>
        </div>
      </header>

      {/* menu-overlay */}
      <div className="z-500 fixed top-0 left-0 w-screen h-[75vh] p-4 bg-background flex [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)]">
        {/* menu-overlay-bar */}
        <div className="z-300 fixed top-0 left-0 w-screen p-4 grid grid-cols-12">
          <div
            className="cursor-pointer col-start-1 col-span-1"
            onClick={toggleMenu}
          >
            <p className="text-primary hover:text-secondary">Close</p>
          </div>
          <div className="cursor-pointer col-span-2 col-start-2">
            <p className="text-primary hover:text-secondary">Artists</p>
          </div>
          <div className="col-span-1 col-start-12 place-self-end">
            <Link href="/">Bortolozzi</Link>
          </div>
        </div>

        {/* menu-links  */}
        <nav className="grid grid-cols-12 w-full pt-4 bg-highlight">
          {/* menu-links-pages  */}
          <div
            ref={pagesMenuRef}
            className="col-span-1 col-start-1 flex flex-col pt-4"
          >
            {menu.map((link, index) => (
              <div
                key={index}
                className="w-max [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div className="relative" onClick={toggleMenu}>
                  <Link
                    className="text-primary hover:text-secondary text-xs"
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
                className="w-max [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div className="relative" onClick={toggleMenu}>
                  <Link
                    key={index}
                    href={`/${artist.slug}`}
                    className="text-primary hover:text-secondary text-xs"
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
