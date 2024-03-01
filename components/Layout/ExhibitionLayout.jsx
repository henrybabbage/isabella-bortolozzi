import { useRouter } from 'next/router'
import { Client } from 'react-hydration-provider'

import BackButton from '../Common/Buttons/BackButton'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function ExhibitionLayout({ children }) {
  const router = useRouter()
  return (
    <div id="exhibition" className="scrollbar-hide overscroll-none">
      {/* <SmoothScroll> */}
        <Client>
          <div className="fixed top-6 right-6 z-50">
            <BackButton backPathname={router.pathname.split('/')[1]} />
          </div>
          <ReferenceGrid />
        </Client>
        {children}
      {/* </SmoothScroll> */}
    </div>
  )
}
