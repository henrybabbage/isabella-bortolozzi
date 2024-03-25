import '@/styles/global.css'

import { useAsPathWithoutHash } from '@madeinhaus/nextjs-page-transition'
import localFont from 'next/font/local'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { lazy, useEffect, useRef } from 'react'
import { HydrationProvider } from 'react-hydration-provider'

import RootLayout from '@/components/Layout/RootLayout'
import { TransitionContextProvider } from '@/context/TransitionContext'

const PreviewProvider = lazy(() =>
  import('@/components/Previews/PreviewProvider'),
)

const serif = localFont({
  src: [
    {
      path: '../public/fonts/Marist/Marist_Regular.woff2',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../public/fonts/Marist/Marist_Regular_Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
})

const mono = localFont({
  src: [
    {
      path: '../public/fonts/QuadrantTextMono/Quadrant_Text_Mono.woff2',
      weight: '400',
      style: 'regular',
    },
  ],
  variable: '--font-mono',
})

export default function App({ Component, pageProps }) {
  const { draftMode, token } = pageProps

  const router = useRouter()
  const key = useAsPathWithoutHash()

  const scrollCache = useRef({})
  const activeRestorePath = useRef()

  useEffect(() => {
    if (history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual'
    }
    const getCurrentPath = () => location.pathname + location.search
    router.beforePopState(() => {
      activeRestorePath.current = getCurrentPath()
      return true
    })
    const onComplete = () => {
      const scrollPath = activeRestorePath.current
      if (!scrollPath || !(scrollPath in scrollCache.current)) {
        window.scrollTo(0, 0)
        return
      }

      activeRestorePath.current = undefined
      const [scrollX, scrollY] = scrollCache.current[scrollPath]
      window.scrollTo(scrollX, scrollY)
      // allow for page taking longer to load
      const delays = [10, 20, 40, 80, 160]
      const checkAndScroll = () => {
        if (
          (window.scrollX === scrollX && window.scrollY === scrollY) ||
          scrollPath !== getCurrentPath()
        ) {
          return
        }
        window.scrollTo(scrollX, scrollY)
        const delay = delays.shift()
        if (delay) {
          setTimeout(checkAndScroll, delay)
        }
      }
      setTimeout(checkAndScroll, delays.shift())
    }
    const onScroll = () => {
      scrollCache.current[getCurrentPath()] = [window.scrollX, window.scrollY]
    }
    router.events.on('routeChangeComplete', onComplete)
    window.addEventListener('scroll', onScroll)
    return () => {
      router.events.off('routeChangeComplete', onComplete)
      window.removeEventListener('scroll', onScroll)
    }
  }, [router])

  // Use the layout defined at the page level, if available
  const Layout =
    Component.layout || (({ children }) => <RootLayout>{children}</RootLayout>)

  return (
    <>
      <Head>
        <title>Galerie Isabella Bortolozzi</title>
        <meta name="description" content="Galerie Isabella Bortolozzi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="data:," />
      </Head>
      <HydrationProvider>
        <style jsx global>
          {`
            :root {
              --font-serif: ${serif.style.fontFamily};
              --font-mono: ${mono.style.fontFamily};
            }
          `}
        </style>
        {draftMode ? (
          <PreviewProvider token={token}>
            <Layout>
              <Component {...pageProps} key={key} />
            </Layout>
          </PreviewProvider>
        ) : (
          <TransitionContextProvider>
            <Layout>
              <Component {...pageProps} key={key} />
            </Layout>
          </TransitionContextProvider>
        )}
      </HydrationProvider>
    </>
  )
}
