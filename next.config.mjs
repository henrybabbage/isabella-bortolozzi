/** @type {import('next').NextConfig} */
const config = {
    experimental: {
        scrollRestoration: true,
    },
    reactStrictMode: true,
    images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
}

export default config
