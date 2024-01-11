import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { sanityClient } from '@/sanity/lib/sanity.client'
import { artistsQuery } from '@/sanity/lib/sanity.queries'
import { cn } from '@/utils/cn'

import MenuButton from '../Common/Buttons/MenuButton'

export default function MobileHeader({ isFixed = true }) {
  const [artists, setArtists] = useState([])
  const [isOpen, setIsOpen] = useState(false)

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
    { title: 'News', path: '/news' },
    { title: 'Exhibitions', path: '/exhibitions' },
    { title: 'Viewing Rooms', path: '/viewing-rooms' },
    { title: 'Imprint', path: '/imprint' },
  ]

  const toggleHeaderMenu = (event) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, router.query.slug])

  return (
    <header
      className={cn(
        isFixed ? 'fixed' : 'absolute',
        isOpen ? 'h-screen w-screen bg-background/95' : 'bg-transparent',
        'z-500 transition-colors',
      )}
    >
      <div className="z-[999]">
        <Link
          href="/"
          className="absolute w-fit whitespace-nowrap px-6 pt-6"
          onClick={toggleHeaderMenu}
          aria-label="Click to return to home page or hover to view nav"
        >
          <h1 className="text-primary transition-colors hover:text-secondary cursor-pointer">
            Isabella Bortolozzi
          </h1>
        </Link>
        <MenuButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
      <nav
        aria-label="Website menu nav"
        className={cn(
          isOpen ? 'block' : 'hidden',
          'absolute top-0 h-[100vh] w-screen',
        )}
      >
        <div className="grid h-full w-full grid-cols-12 pl-6 pr-2">
          <div className="col-span-12 col-start-1 pt-[5.25rem] overflow-y-auto scrollbar-hide">
            <div className="flex cursor-pointer flex-col h-auto space-y-9 pb-6">
              <ArtistsAccordion
                artists={artists}
                toggleHeaderMenu={toggleHeaderMenu}
              />
              {menu.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="hover:text-secondary text-primary cursor-pointer text-left transition"
                    aria-label="Main page links"
                  >
                    {item.title}
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

const ArtistsAccordion = ({ artists, toggleHeaderMenu }) => {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger>
            <h3 className="text-primary font-serif">Artists</h3>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="text-left h-auto flex flex-col pt-9">
            {artists.map((artist, index) => {
              return (
                <Link
                  key={index}
                  onClick={toggleHeaderMenu}
                  href={`/${artist.slug}`}
                  className="hover:text-secondary text-primary font-serif mr-1 inline-flex shrink-0 cursor-pointer transition"
                  aria-label="Artist page links"
                >
                  {index != artists.length - 1
                    ? artist.name + ','
                    : artist.name}
                </Link>
              )
            })}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
