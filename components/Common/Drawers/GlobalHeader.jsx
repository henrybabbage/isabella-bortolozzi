import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { sanityClient } from '@/sanity/lib/sanity.client'
import { artistsQuery } from '@/sanity/lib/sanity.queries'
import { useNavOpenStore } from '@/stores/useNavOpenStore'
import { cn } from '@/utils/cn'

export default function GlobalHeader({ isFixed = true }) {
  const [artists, setArtists] = useState([])
  const [isNavOpen, setIsNavOpen] = useNavOpenStore(
    ({ isNavOpen, setIsNavOpen }) => [isNavOpen, setIsNavOpen],
  )

  const router = useRouter()
  const { pathname } = useRouter()

  useEffect(() => {
    const initialiseArtists = async () => {
      const getGalleryArtists = async () => {
        const galleryArtists = await sanityClient.fetch(artistsQuery)
        return !galleryArtists.length ? [] : galleryArtists
      }
      const currentArtists = await getGalleryArtists()
      const noDuplicates = [...new Set(currentArtists)]
      setArtists(noDuplicates)
    }
    initialiseArtists()
  }, [])

  const menu = [
    { title: 'Current', path: '/current' },
    { title: 'Archive', path: '/exhibitions' },
    { title: 'News', path: '/news' },
    { title: 'Contact', path: '/contact' },
  ]

  const closeHeaderMenu = (event) => {
    event.stopPropagation()
    setIsNavOpen(false)
  }

  //   useEffect(() => {
  //     isNavOpen
  //       ? (document.body.style.overflow = 'hidden')
  //       : (document.body.style.overflow = 'auto')
  //   }, [isNavOpen])

  return (
    <header
      //   onClick={closeHeaderMenu}
      className={cn(
        isFixed ? 'fixed' : 'absolute',
        isNavOpen ? 'h-[36rem] w-screen bg-background/95' : 'bg-transparent',
        'z-500',
      )}
    >
      <div className="sticky top-0 grid-cols-12 grid w-full">
        <div className="col-span-1 col-start-1 pt-2">
          <button
            className="sticky w-fit top-0 px-4 pt-2 z-500"
            onClick={() => {
              setIsNavOpen(!isNavOpen)
            }}
            aria-label="Click to view navigation menu"
          >
            <h1 className="text-primary hover:text-secondary">Menu</h1>
          </button>
        </div>
        <div
          className={cn(
            isNavOpen ? 'block' : 'hidden',
            'col-span-1 col-start-2 pt-2',
          )}
        >
          <h1 className="text-primary sticky top-0 px-4 pt-2">Artists</h1>
        </div>
      </div>
      <nav
        aria-label="Website menu nav"
        className={cn(
          isNavOpen ? 'block' : 'hidden',
          'sticky top-0 h-full w-full',
        )}
        // onMouseLeave={closeHeaderMenu}
      >
        <div className="grid h-full w-full grid-cols-12 px-4">
          <div className="col-span-1 col-start-1 pt-2">
            <div className="flex flex-col pt-2">
              {menu.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="hover:text-secondary text-primary cursor-pointer text-left"
                    // onClick={closeHeaderMenu}
                    aria-label="Main page links"
                  >
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="col-span-2 col-start-2 pt-2">
            <div className="pt-2 flex flex-col">
              {artists.map((artist, index) => {
                return (
                  <Link
                    key={index}
                    href={`/${artist.slug}`}
                    className="hover:text-secondary text-primary cursor-pointer"
                    // onClick={closeHeaderMenu}
                    aria-label="Artist page links"
                  >
                    {artist.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
