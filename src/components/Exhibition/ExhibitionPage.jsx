import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"

import { cn } from '@/utils/cn'

import CloseButton from '../Buttons/CloseButton'

export default function ExhibitionPage({exhibition}) {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    return (
        <div className={cn('h-screen w-screen scrollbar-hide', isLoading && '!overflow-hidden')}>
            <div className="absolute top-6 right-4 mix-blend-difference sm:right-6">
                <Link
                    scroll={false}
                    href={{
                        pathname: '/' + router.query.backNavigation,
                        query: { useStoredScrollPosition: true },
                    }}
                >
                    <CloseButton didPressButton={() => {}} />
                </Link>
            </div>
        </div>
    )
}
