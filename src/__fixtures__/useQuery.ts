import { MutationResult, QueryStatus } from 'react-query'

export interface GenerateMutationResultArgs {
  data?: any
  message?: string
  statusText?: string
  status?: number
  error?: any
  queryStatus?: QueryStatus
}

export const generateMutationResult = ({
  data = {},
  message = '',
  statusText = 'OK',
  status = 200,
  error = undefined,
  queryStatus = QueryStatus.Success
}: GenerateMutationResultArgs) => ({
  error,
  data: {
    data,
    message,
    statusText,
    status,
    config: {},
    headers: {},
    request: {}
  },
  status: queryStatus,
  isError: false,
  isIdle: false,
  isLoading: false,
  isSuccess: false,
  reset: () => null
})

export const mutationHookResult: MutationResult<any> = {
  isLoading: true,
  status: QueryStatus.Success,
  error: null,
  data: undefined,
  isError: false,
  isIdle: false,
  isSuccess: false,
  reset: jest.fn()
}
