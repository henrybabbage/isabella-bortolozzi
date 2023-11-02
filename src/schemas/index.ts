import { SchemaTypeDefinition } from 'sanity'

import artist from './documents/artist'
import artwork from './documents/artwork'
import exhibition from './documents/exhibition'
import post from './documents/post'
import venue from './documents/venue'
import blockContent from './objects/blockContent'
import caption from './objects/caption'
import exhibitionRecord from './objects/exhibitionRecord'
import imageGallery from './objects/imageGallery'
import link from './objects/link'
import mainImage from './objects/mainImage'
import simpleBlockContent from './objects/simpleBlockContent'

export const schemaTypes = [post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
        post,
        blockContent,
        imageGallery,
        artwork,
        caption,
        mainImage,
        artist,
        simpleBlockContent,
        exhibition,
        exhibitionRecord,
        link,
        venue
    ],
}
