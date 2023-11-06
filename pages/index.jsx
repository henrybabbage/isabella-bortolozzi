import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { useLiveQuery } from 'next-sanity/preview'

import { getHome } from '@/lib/sanity.fetch'
import { homeQuery } from '@/lib/sanity.queries'

export default function IndexPage(props) {
  const [home] = useLiveQuery(props.home, homeQuery)
  return (
        <></>
    )
}

export const getStaticProps = async ({ draftMode = false }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const home = await getHome(client)
  
    return {
        props: {
            draftMode,
            token: draftMode ? readToken : '',
            home,
        },
    }
}
