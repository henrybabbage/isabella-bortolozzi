import { useRouter } from 'next/router'

import { useNavOpenStore } from '@/stores/useNavOpenStore'

import TransitionLayout from '../Animation/TransitionLayout'
import GlobalSheet from '../Common/Nav/GlobalSheet'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()

  const isNavOpened = useNavOpenStore(({ isNavOpened }) => isNavOpened)

  return (
    <TransitionLayout>
      <div id="root" className="overscroll-none">
        <SmoothScroll>
          {!router.pathname.startsWith('/studio') &&
          !router.pathname.startsWith('/exhibitions/') &&
          !router.pathname.startsWith('/viewing-rooms/') ? (
            <GlobalSheet isFixed={true} />
          ) : null}
          <ReferenceGrid />
          {children}
        </SmoothScroll>
      </div>
    </TransitionLayout>
  )
}
