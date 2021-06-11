import { MutationResult, QueryStatus } from 'react-query'
import { UsePaginatedQueryData, UseQueryData } from 'hooks/useParsedData'

export interface GenerateMutationResultArgs {
  data?: any
  message?: string
  statusText?: string
  status?: number
  error?: any
  queryStatus?: QueryStatus
  isLoading?: boolean
}

export const generateMutationResult = ({
  data = {},
  message = '',
  statusText = 'OK',
  status = 200,
  error = undefined,
  queryStatus = QueryStatus.Success,
  isLoading = false
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
  isLoading,
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

export interface GenerateInfinityQueryResultArgs {
  map?: any
  list?: any[]
  raw?: any[]
  error?: any
  isLoading?: boolean
  queryStatus?: QueryStatus
  noData?: boolean
}

export const generateInfiniteQueryResult = ({
  map = {},
  list = [],
  raw = [],
  error = undefined,
  isLoading = false,
  queryStatus = QueryStatus.Success
}: GenerateInfinityQueryResultArgs): UsePaginatedQueryData<any> =>
  ({
    data: { list, raw, map },
    status: queryStatus,
    isError: false,
    isIdle: false,
    isLoading: queryStatus === QueryStatus.Loading || isLoading,
    isSuccess: queryStatus === QueryStatus.Success,
    isFetched: false,
    isFetching: false,
    isFetchingMore: undefined,
    canFetchMore: false,
    fetchMore: jest.fn(),
    clear: jest.fn(),
    failureCount: 0,
    isStale: false,
    refetch: jest.fn(),
    updatedAt: 0,
    isFetchedAfterMount: false,
    isInitialData: false,
    isPreviousData: false,
    remove: jest.fn(),
    error
  } as any)

export interface GenerateQueryResultArgs {
  data?: any
  error?: any
  isLoading?: any
  queryStatus?: QueryStatus
}

export const generateQueryResult = ({
  data = undefined,
  error = undefined,
  isLoading = false,
  queryStatus = QueryStatus.Success
}: GenerateQueryResultArgs): UseQueryData<any> =>
  ({
    data,
    error,
    failureCount: 0,
    isError: false,
    isFetching: false,
    isIdle: false,
    isLoading,
    isStale: false,
    isSuccess: queryStatus === QueryStatus.Success,
    refetch: jest.fn(),
    canFetchMore: false,
    isFetched: false,
    clear: jest.fn(),
    fetchMore: jest.fn(),
    updatedAt: 0,
    isFetchingMore: undefined,
    status: queryStatus,
    isPreviousData: false,
    isInitialData: false,
    isFetchedAfterMount: false,
    remove: jest.fn()
  } as any)
