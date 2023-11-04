import React from 'react'
import { Client } from 'react-hydration-provider'

import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import Header from '../Common/Drawers/Header'

export default function RootLayout({children}) {
    return (
        <div className="min-h-screen w-full -z-0">
            <Client>
				<TabletAndBelow></TabletAndBelow>
				<Desktop>
					<Header isFixed={true} />
				</Desktop>
			</Client>
            {children}
        </div>
    )
}
