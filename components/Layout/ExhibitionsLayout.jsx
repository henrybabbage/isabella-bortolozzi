import { useRouter } from 'next/router'

import useTransitionContext from '@/context/TransitionContext'

import TransitionLayout from '../Animation/TransitionLayout'
import GlobalSheet from '../Common/Nav/GlobalSheet'
import ReferenceGrid from '../Utilities/ReferenceGrid'

export default function ExhibitionsLayout({ children }) {
  const router = useRouter()
  const { layoutRef } = useTransitionContext()
  return (
    <TransitionLayout>
      <div ref={layoutRef} id="exhibitions" className="overscroll-none">
        {!router.pathname.startsWith('/studio') &&
        !router.pathname.startsWith('/exhibitions/') &&
        !router.pathname.startsWith('/viewing-rooms/') ? (
          <GlobalSheet isFixed={true} />
        ) : null}
        <ReferenceGrid />
        {children}
      </div>
    </TransitionLayout>
  )
}
