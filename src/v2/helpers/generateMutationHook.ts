import { MutateConfig, MutationConfig } from 'react-query/types/core/types'
import { MutationFunction, useMutation } from 'react-query'
import { useSnackbar } from 'v2/hooks/useSnackbar'
import { AxiosError, AxiosResponse } from 'axios'
import { APIResponse } from 'v2/services/api/types'

export interface GenerateMutationHookReturnValue<
  TResult,
  TError,
  TVariables,
  TSnapshot
> {
  mutate: (
    variables: TVariables,
    config?: MutateConfig<TResult, unknown, TVariables>
  ) => Promise<TResult | undefined>
}

export const generateMutationHook = <
  TResult,
  TVariables,
  TError extends AxiosError
>(
  fn: MutationFunction<AxiosResponse<APIResponse<TResult>>, TVariables>
) => (
  config?: MutationConfig<
    AxiosResponse<APIResponse<TResult>>,
    TError,
    TVariables
  >
): GenerateMutationHookReturnValue<
  AxiosResponse<APIResponse<TResult>>,
  TError,
  TVariables,
  unknown
> => {
  const { onError, onSuccess, ...restConfig } = config ?? {}
  const snackbar = useSnackbar()
  const [mutate] = useMutation<
    AxiosResponse<APIResponse<TResult>>,
    TError,
    TVariables
  >(fn, {
    ...restConfig,
    onSuccess: (data, variables) => {
      typeof onSuccess === 'function' && onSuccess(data, variables)
      // eslint-disable-next-line no-void
      void snackbar.showSnackbar(data.data.message, 'success')
    },
    onError: (error, variables, snapshotValue) => {
      if (error.response !== undefined) {
        typeof onError === 'function' &&
          onError(error, variables, snapshotValue)
        // eslint-disable-next-line no-void
        void snackbar.showSnackbar(error.response.data.message, 'error')
      }
    }
  })

  return {
    mutate
  }
}
