import { useRouter } from 'next/router'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import GlobalHeader from '../Common/Drawers/GlobalHeader'
import MobileHeader from '../Mobile/MobileHeader'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()
  return (
    <div id="root" className="-z-0 overscroll-none">
      <SmoothScroll>
        <Client>
          <Desktop>
            {!router.pathname.startsWith('/studio') &&
            !router.pathname.startsWith('/exhibitions/') &&
            !router.pathname.startsWith('/viewing-rooms/') ? (
              <GlobalHeader isFixed={true} />
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
