import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useActiveSectionStore } from '@/stores/useActiveSectionStore'

export function useSectionInView(sectionName, threshold = 0.1) {
  const { ref, inView } = useInView({
    threshold,
  })

  const setInViewSection = useActiveSectionStore(
    (state) => state.setInViewSection,
  )

  useEffect(() => {
    if (inView) {
      setInViewSection(sectionName)
    }
  }, [inView, setInViewSection, sectionName])

  return {
    ref,
  }
}
