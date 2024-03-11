import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { gsap } from '@/lib/gsap'

const menu = [
  { title: 'Current', path: '/current' },
  { title: 'Archive', path: '/exhibitions' },
  { title: 'News', path: '/news' },
  { title: 'Contact', path: '/contact' },
]

export default function GlobalSheet({ isFixed = true }) {
  const container = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tl = useRef()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useGSAP(
    () => {
      gsap.set('.menu-link-item-holder', { y: 75 })
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          duration: 1.25,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu-link-item-holder', {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          delay: -0.75,
        })
    },
    { scope: container },
  )

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isMenuOpen])

  return (
    <div className="menu-container" ref={container}>
      {/* menu-bar */}
      <div className="menu-bar z-[300] fixed top-[0] left-[0] w-screen p-[2em] flex justify-between items-center">
        <div className="menu-open cursor-pointer" onClick={toggleMenu}>
          <p className="text-primary hover:text-secondary">Menu</p>
        </div>
        <div className="menu-logo">
          <Link href="/">Bortolozzi</Link>
        </div>
      </div>

      {/* menu-overlay */}
      <div className="menu-overlay z-[500] fixed top-[0] left-[0] w-screen h-[80vh] p-[2em] bg-[#FCFBF6] flex [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)]">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar z-[300] fixed top-[0] left-[0] w-screen p-[2em] flex justify-between items-center">
          <div className="cursor-pointer" onClick={toggleMenu}>
            <p className="text-primary hover:text-secondary">Close</p>
          </div>
          <div className="menu-logo">
            <Link href="/">Bortolozzi</Link>
          </div>
        </div>

        {/* menu-copy  */}
        <div className="menu-copy flex flex-col pt-4">
          <div className="menu-links">
            {menu.map((link, index) => (
              <div
                key={index}
                className="menu-link-item w-max [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
              >
                <div
                  className="menu-link-item-holder relative"
                  onClick={toggleMenu}
                >
                  <Link
                    className="menu-link text-primary text-[80px] tracking-[-0.02em] leading-[85%]"
                    href={link.path}
                  >
                    {link.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
