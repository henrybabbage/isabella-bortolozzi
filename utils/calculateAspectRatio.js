export function getRelativeWidth(ratio, currentHeight) {
  ratio = ratio.split(':')
  let widthRatio = ratio[0]
  let heightRatio = ratio[1]
  return (widthRatio * currentHeight) / heightRatio
}

export function getRelativeHeight(ratio, currentWidth) {
  ratio = ratio.split(':')
  let widthRatio = ratio[0]
  let heightRatio = ratio[1]
  return (currentWidth * heightRatio) / widthRatio
}

// For example:
let width = 1600
let height = 900
let getHeight = getRelativeHeight('16:9', width)
let getWeight = getRelativeWidth('16:9', height)

console.log(getHeight)
console.log(getWeight)