import { useContext, useRef, useState } from 'react'

import { TransitionContext } from '@/context/TransitionContext'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from '@/lib/gsap'

export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children)
  const { timeline, background } = useContext(TransitionContext)
  const el = useRef()

  useIsomorphicLayoutEffect(() => {
    if (children !== displayChildren) {
      if (timeline.duration() === 0) {
        // there are no outro animations, so immediately transition
        setDisplayChildren(children)
      } else {
        timeline.play().then(() => {
          // outro complete so reset to an empty paused timeline
          timeline.seek(0).pause().clear()
          setDisplayChildren(children)
        })
      }
    }
  }, [children])

  useIsomorphicLayoutEffect(() => {
    gsap.to(el.current, {
      background,
      duration: 1,
    })
  }, [background])

  return <div ref={el}>{displayChildren}</div>
}

// import { useRouter } from 'next/router'
// import { useState } from 'react'

// import { useTransitionContext } from '@/context/TransitionContext'
// import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

// export default function TransitionLayout({ children }) {
//   const router = useRouter()
//   const [currentPage, setCurrentPage] = useState({
//     route: router.asPath,
//     children,
//   })
//   const { timeline } = useTransitionContext()

//   useIsomorphicLayoutEffect(() => {
//     if (currentPage.route !== router.asPath) {
//       if (timeline.duration() === 0) {
//         /* There are no outro animations, so immediately transition */
//         setCurrentPage({
//           route: router.asPath,
//           children,
//         })
//       } else {
//         timeline.play().then(() => {
//           /* outro complete so reset to an empty paused timeline */
//           timeline.pause().clear()
//           setCurrentPage({
//             route: router.asPath,
//             children,
//           })
//         })
//       }
//     }
//   }, [router.asPath])

//   return <div className="!overflow-hidden">{currentPage.children}</div>
// }
