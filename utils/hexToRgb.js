// https://github.com/boxdox/hex2rgb/blob/7fc1a945ebad67060420326417a8731b69753686/app.js

function checkHex(hex) {
  const hexRegex = /^[#]*([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
  if (hexRegex.test(hex)) {
    return true
  }
}

function checkRgb(rgb) {
  const rgbRegex =
    /([R][G][B][A]?[(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9]{1})|(1\.0)|(1)))?[)])/i
  if (rgbRegex.test(rgb)) {
    return true
  }
}

function hexToRgb(hex) {
  let x = []
  hex = hex.replace('#', '')
  if (hex.length != 6) {
    hex = modifyHex(hex)
  }
  x.push(parseInt(hex.slice(0, 2), 16))
  x.push(parseInt(hex.slice(2, 4), 16))
  x.push(parseInt(hex.slice(4, 6), 16))
  return 'rgb(' + x.toString() + ')'
}

function rgbToHex(rgb) {
  let y = rgb.match(/\d+/g).map(function (x) {
    return parseInt(x).toString(16).padStart(2, '0')
  })
  return y.join('').toUpperCase()
}

// Finding contrast ratio to change text color. See: https://stackoverflow.com/a/11868398/10796932
function getContrastYIQ(hexcolor) {
  if (checkHex(hexcolor)) {
    hexcolor = hexcolor.replace('#', '')
  } else {
    hexcolor = rgbToHex(hexcolor)
  }
  const r = parseInt(hexcolor.substr(0, 2), 16)
  const g = parseInt(hexcolor.substr(2, 2), 16)
  const b = parseInt(hexcolor.substr(4, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}
