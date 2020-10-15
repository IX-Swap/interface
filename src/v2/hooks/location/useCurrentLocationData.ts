import { useLocation } from 'react-router-dom'
import { getCurrentLocationData } from 'v2/hooks/location/utils'
import { safeGeneratePath } from 'v2/helpers/router'

export const useCurrentLocationData = () => {
  const { pathname, state } = useLocation()

  return getCurrentLocationData(safeGeneratePath(pathname, state))
}
