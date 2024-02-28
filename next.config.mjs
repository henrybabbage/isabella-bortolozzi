/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
}

export default config
