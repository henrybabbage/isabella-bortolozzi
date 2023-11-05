import React from 'react'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import GlobalHeader from '../Common/Drawers/GlobalHeader'

export default function RootLayout({children}) {
    return (
        <div className="min-h-screen w-full -z-0">
            <Client>
				<TabletAndBelow></TabletAndBelow>
				<Desktop>
					<GlobalHeader isFixed={true} />
				</Desktop>
			</Client>
            {children}
        </div>
    )
}
