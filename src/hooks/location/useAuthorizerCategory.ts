import { useCurrentLocationData } from 'hooks/location/useCurrentLocationData'
import { AuthorizerCategory } from 'types/app'

export const useAuthorizerCategory = () => {
  const { feature } = useCurrentLocationData()

  return feature as unknown as AuthorizerCategory
}
