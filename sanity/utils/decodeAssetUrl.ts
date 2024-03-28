export const decodeAssetUrl = (id: string) => {
  const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/
  const match = pattern.exec(id)
  if (!match) {
    throw new Error('Invalid asset URL')
  }

  const [assetId, dimensions, format] = match

  const [width, height] = dimensions
    ? dimensions.split('x').map((v) => parseInt(v, 10))
    : []

  return {
    assetId,
    dimensions: { width, height },
    format,
  }
}
