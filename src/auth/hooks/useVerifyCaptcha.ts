import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export const useVerifyCaptcha = (
  errorCallback?: () => void,
  successCallback?: () => void
) => {
  const { apiService, snackbarService } = useServices()

  const verifyCaptchaToken = async (token: string) => {
    const uri = '/auth/verify-captcha'
    return await apiService.post(uri, {
      token
    })
  }
  return useMutation(verifyCaptchaToken, {
    onSuccess: () => {
      successCallback?.()
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(
        error.message ?? 'Something went wrong',
        'error'
      )
      errorCallback?.()
    }
  })
}
