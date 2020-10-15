import { useCurrentLocationData } from 'v2/hooks/location/useCurrentLocationData'
import { AuthorizerCategory } from 'v2/types/app'

export const useAuthorizerCategory = () => {
  const { feature } = useCurrentLocationData()

  return (feature as unknown) as AuthorizerCategory
}
