import '@/styles/global.css'

import { useAsPathWithoutHash } from '@madeinhaus/nextjs-page-transition'
import localFont from 'next/font/local'
import Head from 'next/head'
import { lazy, useState } from 'react'
import { HydrationProvider } from 'react-hydration-provider'

import Loader from '@/components/Animation/Loader'
import RootLayout from '@/components/Layout/RootLayout'
import { TransitionContextProvider } from '@/context/TransitionContext'
import useScrollRestoration from '@/hooks/useScrollRestoration'

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
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  const { draftMode, token } = pageProps
  const key = useAsPathWithoutHash()
  
  useScrollRestoration()

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
        {/* {isLoading && (
          <Loader setIsLoading={setIsLoading} setIsReady={setIsReady} />
        )} */}
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
