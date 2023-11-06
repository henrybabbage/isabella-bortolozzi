import { useRouter } from 'next/router'
import React from 'react'

import NumberCounter from './NumberCounter'

export default function LoadingCounter({ totalImages }) {
    const router = useRouter()
    return (
        <>
            {totalImages ? (
                <p className="z-10 flex whitespace-pre">
                    <span>{router.pathname.startsWith('/exhibitions') ? 'Loading image ' : 'Loading work '}</span>
                        <NumberCounter n={totalImages} />
                    <span>{` of ${totalImages}`}</span>
                </p>
            ) : (
                <p className="z-10 flex whitespace-pre">
                    {router.pathname.startsWith('/exhibitions') ? 'Loading images...' : 'Loading works...'}.
                </p>
            )}
        </>
    )
}