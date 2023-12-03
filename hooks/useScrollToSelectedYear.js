import { useEffect } from 'react'

export function useScrollToSelectedYear(selectedYearIndex, tableContentRef) {
    useEffect(() => {
        if (!tableContentRef.current) return

        if (selectedYearIndex === null || selectedYearIndex === undefined) return

        const selectedYearTarget = tableContentRef.current.children[selectedYearIndex]

        if (!selectedYearTarget) return

        selectedYearTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }, [selectedYearIndex, tableContentRef])
}
