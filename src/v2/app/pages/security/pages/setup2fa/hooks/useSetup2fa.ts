import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useSetup2faStore } from '../context'

export const useSetup2fa = () => {
  const { setup2faService } = useServices()
  const store = useSetup2faStore()

  return useMutation(setup2faService.setup2fa.bind(setup2faService), {
    onSuccess: (e: any) => {
      const { image, key, encoded } = e.data
      store.image = image
      store.key = key
      store.encoded = encoded
    }
  })
}
