import { useCallback, useEffect } from 'react'

// modifier: 'ctrlKey'
export function useKeyPress(callback, keyCodes, modifier) {
   const handler = useCallback(
      (event) => {
         if (keyCodes.includes(event.code)) {
            if (modifier && !event[modifier]) return
            callback()
         }
      },
      [callback, keyCodes, modifier]
   )

   useEffect(() => {
      window.addEventListener('keydown', handler)
      return () => {
         window.removeEventListener('keydown', handler)
      }
   }, [handler])
}
