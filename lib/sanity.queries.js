import groq from 'groq'

export const venue = groq`
    venue->{
        name,
        city,
        country,
    }
`

export const mainImage = groq`
    mainImage{
        alt,
        asset->{
            _id,
            url,
            originalFilename,
            metadata{
                lqip,
                blurHash,
                dimensions{
                    height,
                    width,
                },
                palette{
                    dominant{
                        background,
                        foreground,
                    }
                }
            }
        }
    }
`

export const imageMeta = groq`
    "id": asset._ref,
    "lqip": asset->metadata.lqip,
    "blurhash": asset->metadata.blurhash,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    "height": asset->metadata.dimensions.height,
    "width": asset->metadata.dimensions.width,
    "background": asset->metadata.palette.dominant.background,
    "foreground": asset->metadata.palette.dominant.foreground,
    "originalFilename": asset->originalFilename,
    "url": asset->url,
    alt,
    _key,
    hotspot{ x, y },
    crop{
        bottom,
        left,
        right,
        top,
    }
`

export const imageComplete = groq`
    "id": asset._ref,
    alt,
    asset->{
        _id,
        originalFilename,
        url,
        metadata{
            lqip,
            blurHash,
            dimensions{
                height,
                width,
                aspectRatio,
            },
            palette{
                dominant{
                    background,
                    foreground,
                }
            }
        }
    },
    _key,
    hotspot{ x, y },
    crop{
        bottom,
        left,
        right,
        top,
    },
    fullbleed,
    room,
    details,
    price{
        amount,
        currency,
        isDisplayed,
        VAT,
    },
    enquire{
        href,
    }
`

export const exhibitionCompact = groq`
    _id,
    _type,
    "slug": slug.current,
    type,
    location,
    startDate,
    endDate,
    year,
    artists[]->{name},
    ${venue},
    ${mainImage},
    title,
    subtitle,
`

export const artistsQuery = groq`*[_type == "artist" && galleryArtist == true] | order(orderRank)
    {
        name,
        "slug": slug.current,
    }
`

export const exhibitionsQuery = groq`*[_type == "exhibition" && location == 'gallery' && defined(slug.current)] | order(endDate desc)
    {
        ${exhibitionCompact}
    }
`

export const viewingRoomsQuery = groq`*[_type == "viewingRoom" && defined(slug.current)] | order(_createdAt desc)
    {
        ${exhibitionCompact}
    }
`

export const exhibitionBySlugQuery = groq`*[_type == "exhibition" && slug.current == $slug][0]
    {
        _id,
        _type,
        "slug": slug.current,
        title,
        subtitle,
        startDate,
        endDate,
        year,
        type,
        ${venue},
        artists[]->{
            name,
        },
        body,
        photographerCredit,
        "totalImages": count(imageGallery),
        imageGallery[]{
            ${imageComplete},
        }
    }
`

export const viewingRoomBySlugQuery = groq`*[_type == "viewingRoom" && slug.current == $slug][0]
    {
        _id,
        _type,
        "slug": slug.current,
        ${venue},
        artists[]->{
            name,
        },
        title,
        subtitle,
        startDate,
        endDate,
        year,
        enquire{
            href,
        },
        body[]{
            ...,
            markDefs[]{
                ...,
                _type == "internalLink" => {
                    "slug": @.reference->slug.current,
                }
            }
        },
        photographerCredit,
        "totalImages": count(imageGallery),
        imageGallery[]{
            ${imageComplete},
        }
    }
`

export const artistBySlugQuery = groq`*[_type == "artist" && galleryArtist == true && slug.current == $slug][0]
    {
        _type,
        name,
        artistBio1{
            ...
        },
        artistBio2{
            ...
        },
        "slug": slug.current,
        "totalImages": count(imageGallery),
        imageGallery[]{
            ${imageComplete},
        },
        selectedExhibitions[]->{
            _id,
            _type,
            "slug": slug.current,
            location,
            externalDisplay,
            externalLink,
            title,
            subtitle,
            type,
            year,
            startDate,
            endDate,
            artists[]->{
                name,
            },
            ${mainImage},
            ${venue},
        },
        soloExhibitionHistory[]{
            ...
        },
        groupExhibitionHistory[]{
            ...
        },
    }
`

export const artistSlugsQuery = groq`
*[_type == "artist" && defined(slug.current)][].slug.current
`

export const exhibitionSlugsQuery = groq`
*[_type == "exhibition" && defined(slug.current)][].slug.current
`

export const viewingRoomSlugsQuery = groq`
*[_type == "viewingRoom" && defined(slug.current)][].slug.current
`

export const galleryQuery = groq`*[_type == 'home'][0]
    {
        footer{
            address,
            additionalAddress,
            openingHours,
            visitation,
            googleMaps,
            additionalGoogleMaps,
            phoneNumber,
            email,
            newsletterHeading,
        }
    }
`

export const imprintQuery = groq`*[_type == 'imprint'][0]
    {
        title,
        heading,
        imprint,
        privacyPolicy,
    }
`

export const submissionQuery = groq`*[_type == 'contact'][0]
    {
        viewingRoomForm{
            submitFormPrompt,
            successMessage,
            errorMessage,
        }
    }
`

export const emailQuery = groq`*[_type == 'contact'][0]{email}.email`

export const contactQuery = groq`*[_type == 'contact'][0]
    {
        galleryName,
        email,
        instagram,
        facebook,
        phoneNumber,
        address1,
        address2,
        openingHours1,
        openingHours2,
        visitorInformation,
        newsletter{
            subtitle,
            heading,
            newsletterErrorMessage,
            newsletterSuccessMessage,
        }
    }
`

export const homeQuery = groq`*[_type == 'home'][0]
    {
        banner{
            heading,
            exhibition->{
                _id,
                "slug": slug.current,
                startDate,
                endDate,
                opening,
                title,
                artists[]->{
                    name,
                    "slug": slug.current,
                }
            }
        },
        publicisedExhibitions[]->{
            _id,
            "slug": slug.current,
            startDate,
            endDate,
            opening,
            title,
            ${mainImage},
            body,
            photographerCredit,
            artists[]->{
                name,
            }
        },
        logoControl{
            overrideColor,
            logoColor,
        },
    }
`
