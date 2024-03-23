import { useRouter } from 'next/router'

import GlobalSheet from '../Common/Drawers/GlobalSheet'

export default function RootLayout({ children }) {
  const router = useRouter()
  return (
    <div id="exhibitions" className="-z-0 overscroll-none">
      {!router.pathname.startsWith('/studio') &&
      !router.pathname.startsWith('/exhibitions/') &&
      !router.pathname.startsWith('/viewing-rooms/') ? (
        <GlobalSheet isFixed={true} />
      ) : null}
      {children}
    </div>
  )
}
