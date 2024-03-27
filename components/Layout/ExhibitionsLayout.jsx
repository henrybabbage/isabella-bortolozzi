import { useRouter } from 'next/router'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import TransitionLayout from '../Animation/TransitionLayout'
import GlobalSheet from '../Common/Nav/GlobalSheet'
import MobileHeader from '../Mobile/MobileHeader'
import ReferenceGrid from '../Utilities/ReferenceGrid'

export default function ExhibitionsLayout({ children }) {
  const router = useRouter()

  return (
    <TransitionLayout>
      <Client>
        <div id="exhibitions" className="overscroll-none">
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
    </TransitionLayout>
  )
}
