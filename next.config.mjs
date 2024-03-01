/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default config
