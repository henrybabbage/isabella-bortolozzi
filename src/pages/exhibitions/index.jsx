import React from 'react'
import { Client } from 'react-hydration-provider'

import { TableView } from '@/components/Common/TableView'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function Exhibitions({exhibitions}) {
  return (
    <main className="h-screen w-screen">
        <Client>
            <Desktop>
                <section>
                    <TableView exhibitions={exhibitions} />
                </section>
            </Desktop>
            <TabletAndBelow>
                <section></section>
            </TabletAndBelow>
        </Client>
    </main>
  )
}
