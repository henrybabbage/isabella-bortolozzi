import { useRouter } from 'next/router'

import useTransitionContext from '@/context/TransitionContext'

import TransitionLayout from '../Animation/TransitionLayout'
import GlobalSheet from '../Common/Nav/GlobalSheet'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function RootLayout({ children }) {
  const router = useRouter()
  const { layoutRef } = useTransitionContext()
  return (
    <TransitionLayout>
      <SmoothScroll>
        <div ref={layoutRef} id="root" className="overscroll-none">
          {!router.pathname.startsWith('/studio') &&
          !router.pathname.startsWith('/exhibitions/') &&
          !router.pathname.startsWith('/viewing-rooms/') ? (
            <GlobalSheet isFixed={true} />
          ) : null}
          <ReferenceGrid />
          {children}
        </div>
      </SmoothScroll>
    </TransitionLayout>
  )
}
