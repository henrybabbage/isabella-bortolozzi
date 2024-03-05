const fs = require('fs')
const axios = require('axios').default

const PROJECT_ID = 'yy07oxit'
const DATASET = 'production'
const API_VERSION = 'v2024-01-09'

const ARTISTS_QUERY = `*[_type == "artist" && $galleryArtist == $bool] | order(orderRank)
    {
        name,
        "slug": slug.current,
        galleryArtist,
    }
`

module.exports.preBuildDevelopment = async () => {
  console.log('Loading the development content!')
  const API = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${ARTISTS_QUERY}&$galleryArtist='galleryArtist'&$bool=true`
  const response = await axios.get(API)
  const data = response.data.result
  console.log(data)
  fs.writeFileSync('./data/nav.json', JSON.stringify(data))
}

module.exports.preBuildProduction = async () => {
  console.log('Loading the production content!')
  const API = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${ARTISTS_QUERY}&$galleryArtist='galleryArtist'&$bool=true`
  const response = await axios.get(API)
  const data = response.data.result
  fs.writeFileSync('./data/nav.json', JSON.stringify(data))
}

// "predev": "node functions/preBuildDev.js",
// "prebuild": "node functions/preBuildProd.js",