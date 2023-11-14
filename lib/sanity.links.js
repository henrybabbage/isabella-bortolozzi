export function resolveHref(
  documentType,
  slug,
) {
  switch (documentType) {
    case 'home':
      return '/'
    case 'artist':
      return slug ? `/${slug}` : undefined
    case 'exhibition':
      return slug ? `/exhibitions/${slug}` : undefined
    case 'viewingRoom':
      return slug ? `/viewing-rooms/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
