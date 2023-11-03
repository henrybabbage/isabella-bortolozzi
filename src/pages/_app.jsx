import '@/styles/global.css'

import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { lazy, useEffect, useRef } from 'react'
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

export default function App({ Component, pageProps }) {
	const { draftMode, token } = pageProps
	
	useFoucFix()

	const router = useRouter()

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
		// allow for page taking longer to longer
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
				--font-family-sans: ${sans.style.fontFamily} --font-family-serif:
					${serif.style.fontFamily} --font-family-mono:
					${mono.style.fontFamily};
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
