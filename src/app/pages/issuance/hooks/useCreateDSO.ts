import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
<<<<<<< Updated upstream
import { DSORequestArgsStep1 } from 'types/dso'
=======
<<<<<<< HEAD
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
=======
import { DSORequestArgsStep1 } from 'types/dso'
>>>>>>> 440082842 (DSO Step 1 integration)
>>>>>>> Stashed changes
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'

export const useCreateDSO = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const url = issuanceURL.dso.create(getIdFromObj(user))
<<<<<<< Updated upstream
  // const createDSO = async (args = {}) => {
  //   return await apiService.post(url, args)
  // }
  const createDSO = async (args: DSORequestArgsStep1) => {
    return await apiService.post(url, args)
=======
<<<<<<< HEAD
  const createDSO = async (args: DSORequestArgs) => {
    return await apiService.post<DigitalSecurityOffering>(url, args)
=======
  const createDSO = async (args: DSORequestArgsStep1) => {
    return await apiService.post(url, args)
>>>>>>> 440082842 (DSO Step 1 integration)
>>>>>>> Stashed changes
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      if (error.message === 'Invalid DSO') {
      } else {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
