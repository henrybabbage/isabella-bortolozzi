/**
 * Remove the hash from an URL.
 *
 * @param {string} url The URL.
 * @return {string} The URL without the hash.
 */
export function removeHash(url) {
    const urlBase = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
    const urlObj = new URL(url, urlBase)
    if (urlObj.origin !== urlBase) {
        urlObj.hash = ''
        return urlObj.toString()
    }
    return `${urlObj.pathname}${urlObj.search}`
}
