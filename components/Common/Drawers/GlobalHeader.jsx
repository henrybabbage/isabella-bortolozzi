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

  useEffect(() => {
    isNavOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [isNavOpen])

  return (
    <header
      onMouseLeave={closeHeaderMenu}
      className={cn(isFixed ? 'fixed' : 'absolute', 'z-500 w-full px-4')}
    >
      <div className="grid-cols-12 grid">
        <div className="col-span-1 w-full col-start-1 pt-2 sticky top-0">
          <button
            className="pt-2 z-500 w-full"
            onClick={() => {
              setIsNavOpen(!isNavOpen)
            }}
            aria-label="Click to view navigation menu"
          >
            <h1 className="text-primary w-full flex items-start hover:text-secondary">
              Menu
            </h1>
          </button>
        </div>
        <div
          className={cn(
            isNavOpen ? 'visible' : 'invisible',
            'col-span-1 col-start-2 w-full pt-2 sticky top-0 bg-background',
          )}
        >
          <h1 className="text-primary pt-2">Artists</h1>
        </div>
      </div>
      {/* Fix this overlapping page content when hidden */}
      <nav
        className={cn(
          isNavOpen ? 'visible' : 'invisible',
          'grid grid-cols-12 bg-highlight mt-2',
        )}
      >
        <div className="col-span-1 col-start-1">
          <div className="flex flex-col">
            {menu.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.path}
                  className="hover:bg-background text-primary cursor-pointer text-left"
                  onClick={closeHeaderMenu}
                  aria-label="Main page links"
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="col-span-4 col-start-2">
          <div className="flex flex-col">
            {artists.map((artist, index) => {
              return (
                <Link
                  key={index}
                  href={`/${artist.slug}`}
                  className="hover:bg-background text-primary cursor-pointer"
                  onClick={closeHeaderMenu}
                  aria-label="Artist page links"
                >
                  {artist.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
