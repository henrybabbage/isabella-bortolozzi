import { SchemaTypeDefinition } from 'sanity'

import artist from './documents/artist'
import artwork from './documents/artwork'
import exhibition from './documents/exhibition'
import news from './documents/news'
import post from './documents/post'
import venue from './documents/venue'
import viewingRoom from './documents/viewingRoom'
import blockContent from './objects/blockContent'
import caption from './objects/caption'
import exhibitionRecord from './objects/exhibitionRecord'
import imageGallery from './objects/imageGallery'
import link from './objects/link'
import mailchimp from './objects/mailchimp'
import mainImage from './objects/mainImage'
import newsletter from './objects/newsletter'
import simpleBlockContent from './objects/simpleBlockContent'
import colophon from './singletons/colophon'
import contact from './singletons/contact'
import home from './singletons/home'
import imprint from './singletons/imprint'
import seo from './singletons/seo'

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
        venue,
        news,
        viewingRoom,
        seo,
        imprint,
        home,
        colophon,
        contact,
        newsletter,
        mailchimp,
    ],
}