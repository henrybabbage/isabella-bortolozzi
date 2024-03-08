import { useRouter } from 'next/router'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import GlobalNav from '../Common/Drawers/GlobalNav'
import MobileHeader from '../Mobile/MobileHeader'
import ReferenceGrid from '../Utilities/ReferenceGrid'

export default function RootLayout({ children }) {
  const router = useRouter()
  return (
    <div id="exhibitions" className="-z-0 overscroll-none">
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
    </div>
  )
}
