import { useRouter } from 'next/router'

import { useNavOpenStore } from '@/stores/useNavOpenStore'

import GlobalSheet from '../Common/Drawers/GlobalSheet'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()

  const isNavOpened = useNavOpenStore(({ isNavOpened }) => isNavOpened)

  return (
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
  )
}
