import { useEffect } from 'react'

export function useScrollToTarget(selectedIndex, refsArray) {
  useEffect(() => {
    if (!refsArray.current) return

    if (selectedIndex === null || selectedIndex === undefined) return

    const selectedTarget = refsArray.current.children[selectedIndex]

    if (!selectedTarget) return

    selectedTarget.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [selectedIndex, refsArray])
}
