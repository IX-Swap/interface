import { useLocation } from 'react-router-dom'
import { getCurrentLocationData } from 'hooks/location/utils'
import { safeGeneratePath } from 'helpers/router'

export const useCurrentLocationData = () => {
  const { pathname, state } = useLocation()

  return getCurrentLocationData(safeGeneratePath(pathname, state))
}
