import { useRouter } from 'next/router'
import React from 'react'

import NumberCounter from './NumberCounter'

export default function LoadingCounter({ totalImages }) {
    const router = useRouter()
    return (
        <>
            {totalImages ? (
                <div className="z-[999] flex space-x-1 w-full">
                    <h3 className="text-primary w-fit">{router.pathname.startsWith('/exhibitions') ? 'Loading image ' : 'Loading work '}</h3>
                    <h3 className="text-primary w-fit"><NumberCounter n={totalImages} />&nbsp;{`of ${totalImages}`}</h3>
                </div>
            ) : (
                <div className="z-[999] flex w-full">
                    <h3 className="text-primary w-fit">
                        {router.pathname.startsWith('/exhibitions') ? 'Loading images...' : 'Loading works...'}
                    </h3>
                </div>
            )}
        </>
    )
}
