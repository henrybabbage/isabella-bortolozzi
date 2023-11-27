import { useRouter } from 'next/router'
import React from 'react'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import GlobalHeader from '../Common/Drawers/GlobalHeader'
import MobileHeader from '../Mobile/MobileHeader'

export default function RootLayout({children}) {
    const router = useRouter()
    if (router.pathname.startsWith('/studio')) return null
    return (
        <div className="min-h-screen w-full -z-0">
            <Client>
				<Desktop>
					<GlobalHeader isFixed={true} />
				</Desktop>
				<TabletAndBelow>
                    <MobileHeader isFixed={true} />
                </TabletAndBelow>
			</Client>
            {children}
        </div>
    )
}
