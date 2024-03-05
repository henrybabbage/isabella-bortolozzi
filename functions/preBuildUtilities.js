const fs = require('fs')
const axios = require('axios').default

const PROJECT_ID = 'yy07oxit'
const DATASET = 'production'
const API_VERSION = 'v2024-01-09'

const ARTISTS_QUERY = `*[_type == "artist" && galleryArtist == true] | order(orderRank)
    {
        name,
        "slug": slug.current,
    }
`

module.exports.preBuildDevelopment = async () => {
  console.log('Loading the development content!')
  const API = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${ARTISTS_QUERY}`
  const response = await axios.get(API)
  const data = response.data.result.menuItems
  fs.writeFileSync('./data/menu.json', JSON.stringify(data))
}

module.exports.preBuildProduction = async () => {
  console.log('Loading the production content!')
  const API = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${ARTISTS_QUERY}`
  const response = await axios.get(API)
  const data = response.data.result.menuItems
  fs.writeFileSync('./data/menu.json', JSON.stringify(data))
}

// "prebuild": "node functions/preBuildProd.js",
// "predev": "node functions/preBuildDev.js",
