import { useEffect } from 'react'

export const useUnmountCallback = (callback: () => any) => {
  useEffect(() => callback, []) // eslint-disable-line
}
