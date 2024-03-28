import { useRouter } from 'next/router'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import TransitionLayout from '../Animation/TransitionLayout'
import GlobalSheet from '../Common/Nav/GlobalSheet'
import MobileHeader from '../Mobile/HeaderMobile'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()
  return (
    <TransitionLayout>
      <SmoothScroll>
        <Client>
          <div id="root">
            <Desktop>
              {!router.pathname.startsWith('/studio') &&
              !router.pathname.startsWith('/exhibitions/') &&
              !router.pathname.startsWith('/viewing-rooms/') ? (
                <GlobalSheet isFixed={true} />
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
            {children}
          </div>
        </Client>
      </SmoothScroll>
    </TransitionLayout>
  )
}
