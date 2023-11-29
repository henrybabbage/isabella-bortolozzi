import { useRouter } from 'next/router'
import React from 'react'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import GlobalHeader from '../Common/Drawers/GlobalHeader'
import MobileHeader from '../Mobile/MobileHeader'

export default function RootLayout({children}) {
    const router = useRouter()
    return (
        <div className="min-h-screen w-full -z-0">
            <Client>
				<Desktop>
					{!router.pathname.startsWith('/studio') ? <GlobalHeader isFixed={true} /> : null}
				</Desktop>
				<TabletAndBelow>
                    {!router.pathname.startsWith('/studio') ? <MobileHeader isFixed={true} /> : null}
                </TabletAndBelow>
			</Client>
            {children}
        </div>
    )
}
