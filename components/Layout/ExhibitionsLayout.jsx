import { useRouter } from 'next/router'

import GlobalSheet from '../Common/Drawers/GlobalSheet'
import ReferenceGrid from '../Utilities/ReferenceGrid'

export default function ExhibitionsLayout({ children }) {
  const router = useRouter()
  return (
    <div id="exhibitions" className="overscroll-none">
      {!router.pathname.startsWith('/studio') &&
      !router.pathname.startsWith('/exhibitions/') &&
      !router.pathname.startsWith('/viewing-rooms/') ? (
        <GlobalSheet isFixed={true} />
      ) : null}
      <ReferenceGrid />
      {children}
    </div>
  )
}
