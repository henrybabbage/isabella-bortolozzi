import { useLiveQuery } from 'next-sanity/preview'

import Card from '@/components/Card'
import Container from '@/components/Container'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getPosts } from '@/lib/sanity.fetch'
import { postsQuery } from '@/lib/sanity.queries'

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(props) {
  const [posts] = useLiveQuery(props.posts, postsQuery)
  return (
    <Container>
      <section>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : null}
      </section>
    </Container>
  )
}
