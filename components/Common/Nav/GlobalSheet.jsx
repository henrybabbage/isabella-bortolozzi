import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import useTransitionContext from '@/context/TransitionContext'
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
  const router = useRouter()
  const containerRef = useRef()
  const pagesMenuRef = useRef(null)
  const artistsMenuRef = useRef(null)
  const { navigationRef } = useTransitionContext()

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
      gsap.set('.menu-link-item-holder', { y: 75 })
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          duration: 0.5,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu-link-item-holder', {
          y: 0,
          // duration: 0.1,
          stagger: 0.02,
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
      <header
        ref={navigationRef}
        // style={{ opacity: 0 }}
        className={cn(
          isFixed ? 'fixed' : 'absolute',
          'menu-bar z-400 top-0 left-0 p-4 w-fit',
        )}
      >
        <button
          type="button"
          className="menu-open cursor-pointer"
          onClick={toggleMenu}
        >
          <h2 className="text-primary hover:text-secondary">Menu</h2>
        </button>
      </header>

      <header
        // style={{ opacity: 0 }}
        className={cn(
          isFixed ? 'fixed' : 'absolute',
          'menu-bar z-400  top-0 right-0 p-4 w-fit',
        )}
      >
        <div className="menu-open cursor-pointer">
          <Link href="/">
            <h2 className="text-primary hover:text-secondary">Bortolozzi</h2>
          </Link>
        </div>
      </header>

      <div
        className={cn(
          isNavOpen ? 'block' : 'hidden',
          'menu-overlay z-500 fixed top-0 left-0 w-screen h-[75vh] p-4 bg-background flex [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)]',
        )}
      >
        <div className="menu-overlay-bar z-300 fixed top-0 left-0 w-screen p-4 grid grid-cols-12">
          <button
            type="button"
            className="cursor-pointer col-start-1 col-span-1 p-0 m-0 place-self-start"
            onClick={toggleMenu}
          >
            <p className="text-primary hover:text-secondary">Close</p>
          </button>
          <div className="menu-open col-span-2 col-start-2 p-0 m-0 place-self-start">
            <p className="text-primary">Artists</p>
          </div>
          <Link
            href="/"
            className="menu-open w-full hover:bg-background col-span-1 col-start-12 flex cursor-pointer justify-end place-self-end"
          >
            <h2>Bortolozzi</h2>
          </Link>
        </div>

        <nav
          className={cn(
            isNavOpen ? 'block' : 'hidden',
            'menu-copy grid grid-cols-12 w-full pt-4 bg-highlight',
          )}
        >
          <div
            ref={pagesMenuRef}
            className="menu-links col-span-1 col-start-1 flex flex-col space-y-[2px] pt-4 z-500"
          >
            {menu.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="menu-link-item hover:bg-background cursor-pointer w-full [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div
                  className="menu-link-item-holder relative"
                  onClick={toggleMenu}
                >
                  <h3 className="menu-link text-primary z-500">{link.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div
            ref={artistsMenuRef}
            className="col-span-11 col-start-2 flex flex-col space-y-[2px] pt-4"
          >
            {artists.map((artist, index) => (
              <Link
                key={index}
                href={`/${artist.slug}`}
                className="menu-link-item hover:bg-background cursor-pointer w-full [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div
                  className="menu-link-item-holder relative"
                  onClick={toggleMenu}
                >
                  <h3 className="menu-link text-primary z-500">
                    {artist.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
