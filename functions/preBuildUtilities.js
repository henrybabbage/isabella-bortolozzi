const fs = require('fs')
const axios = require('axios').default

const PROJECT_ID = 'yy07oxit'
const DATASET = 'production'
const API_VERSION = 'v2024-01-09'

const ARTISTS_QUERY = `*[_type == "artist"]{name,"slug":slug.current}`

module.exports.preBuildDevelopment = async () => {
  console.log('Loading the development content!')
  const QUERY = encodeURI(
    `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${ARTISTS_QUERY}`,
  )
  // const galleryArtist = encodeURI(`$galleryArtist="galleryArtist"`)
  // const bool = encodeURI(`$bool=true`)
  // const API = `${QUERY}&${galleryArtist}&${bool}`
  const response = await axios.get(QUERY)
  const data = response.data.result
  console.log(data)
  fs.writeFileSync('./data/nav.json', JSON.stringify(data))
}

module.exports.preBuildProduction = async () => {
  console.log('Loading the production content!')
}
