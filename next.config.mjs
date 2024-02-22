/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: false,
    images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
}

export default config
