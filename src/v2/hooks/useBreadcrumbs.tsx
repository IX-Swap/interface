import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from 'react'
import { InternalRouteBase } from 'v2/types/util'

export interface BreadcrumbsState {
  crumbs: InternalRouteBase[]
  push: (crumb: InternalRouteBase) => void
  reset: () => void
}

export const BreadcrumbsContext = createContext<BreadcrumbsState | null>(null)

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext)

  if (context === null) {
    throw new Error('useBreadcrumbs must be used inside of BreadcrumbsProvider')
  }

  return context
}

export const BreadcrumbsProvider = ({ children }: PropsWithChildren<any>) => {
  const [data, setData] = useState<BreadcrumbsState['crumbs']>([])
  const push = (crumb: InternalRouteBase) => {
    setData(prevData => {
      const crumbIdx = prevData.findIndex(({ path }) => crumb.path === path)

      if (crumbIdx !== -1) {
        return prevData
      }

      return [...prevData, crumb]
    })
  }

  const replace = () => {
    setData([])
  }

  return (
    <BreadcrumbsContext.Provider value={{ crumbs: data, push, reset: replace }}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}
