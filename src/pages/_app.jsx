import '@/styles/global.css'

import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import Head from 'next/head'
import { lazy } from 'react'
import { HydrationProvider } from 'react-hydration-provider'

import useFoucFix from '@/utils/useFoucFix'

const PreviewProvider = lazy(() => import('@/components/PreviewProvider'))

const mono = IBM_Plex_Mono({
  variable: '--font-family-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const serif = PT_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({
  Component,
  pageProps,
}) {
    useFoucFix()
    const { draftMode, token } = pageProps
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
                        --font-family-sans: ${sans.style.fontFamily};
                        --font-family-serif: ${serif.style.fontFamily};
                        --font-family-mono: ${mono.style.fontFamily};
                    }
                    `}
                </style>
                {draftMode ? (
                    <PreviewProvider token={token}>
                    <Component {...pageProps} />
                    </PreviewProvider>
                ) : (
                    <Component {...pageProps} />
                )}
            </HydrationProvider>
        </>
    )
}
