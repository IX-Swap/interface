import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from 'react'
import { InternalRouteBase } from 'types/util'

export interface BreadcrumbsState {
  crumbs: InternalRouteBase[]
  push: (crumb: InternalRouteBase) => void
  remove: (crumb: InternalRouteBase) => void
  reset: () => void
  rename: (crumbname: string, index?: number | undefined) => void
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

  const remove = (crumb: InternalRouteBase) => {
    setData(data => {
      return data.filter(({ path }) => path !== crumb.path)
    })
  }

  const rename = (crumbname: string, index?: number | undefined) => {
    if (data.length > 0) {
      const tempData = data
      const targetIndex = index === undefined ? data.length - 1 : index
      tempData[targetIndex] = {
        label: crumbname,
        path: data[targetIndex].path
      }
      console.log('data[targetIndex]', tempData[targetIndex])
    }
    // setData([...tempData])
  }

  return (
    <BreadcrumbsContext.Provider
      value={{ crumbs: data, push, remove, reset: replace, rename }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  )
}
