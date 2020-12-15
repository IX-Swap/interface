import { useEffect } from 'react'

export const useBeforeUnload = (callback: () => any) => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      callback()
    })
  }, []) // eslint-disable-line
}
