import { useAppActions } from 'app/hooks/useAppState'
import { useEffect } from 'react'

export const useSetPageTitle = (title?: string) => {
  const { setPageTitle } = useAppActions()

  useEffect(() => {
    setPageTitle(title)

    return () => {
      setPageTitle(undefined)
    }
  }, [title]) // eslint-disable-line
}
