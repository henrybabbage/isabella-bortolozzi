import { useRouter } from 'next/router'
import { Client } from 'react-hydration-provider'

import { useNavOpenStore } from '@/stores/useNavOpenStore'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import GlobalNav from '../Common/Drawers/GlobalNav'
import MobileHeader from '../Mobile/MobileHeader'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()

  const isNavOpened = useNavOpenStore(({ isNavOpened }) => isNavOpened)

  return (
    <div id="root" className="-z-0 overscroll-none">
      <SmoothScroll>
        <Client>
          <Desktop>
            {!router.pathname.startsWith('/studio') &&
            !router.pathname.startsWith('/exhibitions/') &&
            !router.pathname.startsWith('/viewing-rooms/') ? (
              <GlobalNav isFixed={true} />
            ) : null}
          </Desktop>
          <TabletAndBelow>
            {!router.pathname.startsWith('/studio') &&
            !router.pathname.startsWith('/exhibitions/') &&
            !router.pathname.startsWith('/viewing-rooms/') ? (
              <MobileHeader isFixed={true} />
            ) : null}
          </TabletAndBelow>
          <ReferenceGrid />
        </Client>
        {children}
      </SmoothScroll>
    </div>
  )
}
