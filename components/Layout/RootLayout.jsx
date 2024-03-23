import { useRouter } from 'next/router'

import { useNavOpenStore } from '@/stores/useNavOpenStore'

import GlobalSheet from '../Common/Drawers/GlobalSheet'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()

  const isNavOpened = useNavOpenStore(({ isNavOpened }) => isNavOpened)

  return (
    <div id="root" className="-z-0 overscroll-none">
      <SmoothScroll>
        {!router.pathname.startsWith('/studio') &&
        !router.pathname.startsWith('/exhibitions/') &&
        !router.pathname.startsWith('/viewing-rooms/') ? (
          <GlobalSheet isFixed={true} />
        ) : null}
        {children}
      </SmoothScroll>
    </div>
  )
}
