import { useRouter } from 'next/router'

import useTransitionContext from '@/context/TransitionContext'

import TransitionLayout from '../Animation/TransitionLayout'
import BackButton from '../Common/Buttons/BackButton'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function ExhibitionLayout({ children }) {
  const router = useRouter()
  const { layoutRef } = useTransitionContext()
  return (
    <TransitionLayout>
      <SmoothScroll>
        <div ref={layoutRef} id="exhibition" className="overscroll-none">
          <div className="fixed top-6 right-6 z-50">
            <BackButton backPathname={router.pathname.split('/')[1]} />
          </div>
          <ReferenceGrid />
          {children}
        </div>
      </SmoothScroll>
    </TransitionLayout>
  )
}
