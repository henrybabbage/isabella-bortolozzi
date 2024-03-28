import {
  CaseIcon,
  CommentIcon,
  DesktopIcon,
  EarthGlobeIcon,
  HomeIcon,
  PinIcon,
  StackCompactIcon,
  TagIcon,
  TrendUpwardIcon,
  UlistIcon,
  UserIcon,
} from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem({ icon: UserIcon })
        .title('Artists')
        .child(
          S.list()
            .title('Artists')
            .items([
              orderableDocumentListDeskItem({
                S,
                context,
                type: 'artist',
                title: 'Gallery Artists',
                id: 'galleryArtists',
                icon: TagIcon,
                filter: `galleryArtist == $galleryArtist`,
                params: {
                  galleryArtist: true,
                },
              }),
              S.listItem()
                .title('Non-Gallery Artists')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('Non-Gallery Artists')
                    .apiVersion('v2023-08-01')
                    .filter('_type == "artist" && galleryArtist != true')
                    .defaultOrdering([{ field: 'name', direction: 'asc' }]),
                ),
            ]),
        ),
      S.listItem({ icon: EarthGlobeIcon })
        .title('Contact')
        .child(S.document().schemaType('contact').documentId('contact')),
      S.listItem({ icon: StackCompactIcon })
        .title('Exhibitions')
        .child(
          S.list()
            .title('Exhibitions')
            .items([
              S.listItem()
                .title('Gallery Exhibitions')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('Gallery Exhibitions')
                    .apiVersion('v2023-08-01')
                    .filter('_type == "exhibition" && location == "gallery"')
                    .defaultOrdering([{ field: 'year', direction: 'desc' }])
                    .menuItems([
                      S.orderingMenuItem({
                        title: 'Year Ascending',
                        by: [{ field: 'year', direction: 'asc' }],
                      }),
                      S.orderingMenuItem({
                        title: 'Year Descending',
                        by: [{ field: 'year', direction: 'desc' }],
                      }),
                    ]),
                ),
              S.listItem()
                .title('External Exhibitions')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('External Exhibitions')
                    .apiVersion('v2023-08-01')
                    .filter('_type == "exhibition" && location == "external"')
                    .defaultOrdering([{ field: 'year', direction: 'desc' }])
                    .menuItems([
                      S.orderingMenuItem({
                        title: 'Year Ascending',
                        by: [{ field: 'year', direction: 'asc' }],
                      }),
                      S.orderingMenuItem({
                        title: 'Year Descending',
                        by: [{ field: 'year', direction: 'desc' }],
                      }),
                    ]),
                ),
              S.listItem()
                .title('All Exhibitions')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('All Exhibitions')
                    .apiVersion('v2023-08-01')
                    .filter('_type == "exhibition"')
                    .defaultOrdering([
                      { field: '_updatedAt', direction: 'desc' },
                    ])
                    .menuItems([
                      ...S.documentTypeList('exhibition').getMenuItems(),
                    ]),
                ),
            ]),
        ),
      S.listItem({ icon: HomeIcon })
        .title('Home Page')
        .child(S.document().schemaType('home').documentId('home')),
      S.listItem({ icon: CommentIcon })
        .title('News')
        .child(S.documentTypeList('news').title('News')),
      S.listItem({ icon: CaseIcon })
        .title('Imprint')
        .child(S.document().schemaType('imprint').documentId('imprint')),
      S.listItem({ icon: TrendUpwardIcon })
        .title('SEO')
        .child(S.document().schemaType('seo').documentId('seo')),
      S.listItem({ icon: UlistIcon })
        .title('Colophon')
        .child(S.document().schemaType('colophon').documentId('Colophon')),
      S.listItem({ icon: PinIcon })
        .title('Venues')
        .schemaType('venue')
        .child(S.documentTypeList('venue')),
      S.listItem({ icon: DesktopIcon })
        .title('Viewing Rooms')
        .schemaType('viewingRoom')
        .child(S.documentTypeList('viewingRoom')),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'artist',
            'artwork',
            'colophon',
            'exhibition',
            'contact',
            'home',
            'imprint',
            'news',
            'page',
            'seo',
            'media.tag',
            'venue',
            'viewingRoom',
            'exhibitionRecord',
          ].includes(listItem.getId()),
      ),
    ])

export default structure
