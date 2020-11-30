import { InternalRouteProps } from '../../../types/util'

export const getRoutesByType = (routes: InternalRouteProps[]) => {
  return routes.reduce<{
    landing?: InternalRouteProps
    nested: InternalRouteProps[]
    generic: InternalRouteProps[]
  }>(
    (acc, cur) => {
      if (cur.root === true) {
        return {
          ...acc,
          landing: cur
        }
      } else if (cur.generic === undefined) {
        return {
          ...acc,
          nested: [...acc.nested, cur]
        }
      } else {
        return {
          ...acc,
          generic: [...acc.generic, cur]
        }
      }
    },
    { nested: [], generic: [], landing: undefined }
  )
}
