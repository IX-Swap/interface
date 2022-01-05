import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useParsedDataHook from 'hooks/useParsedData'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { user } from '__fixtures__/user'
import { dso } from '__fixtures__/authorizer'
import { issuanceURL } from 'config/apiURL'
import { paginationArgs } from 'config/defaults'

describe('useDSOsByUserId', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
    jest
      .spyOn(useParsedDataHook, 'useParsedData')
      .mockImplementation(parsedDataFn)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce({ data: [dso] })
      const apiObj = { post: postFn }

      const { result } = renderHookWithServiceProvider(
        () => useDSOsByUserId(),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(postFn).toHaveBeenCalledWith(
            issuanceURL.dso.getByUserId(user._id),
            { ...paginationArgs }
          )
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: [dso] }],
            '_id'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns data with correct response from api with current status', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce({ data: [dso] })
      const apiObj = { post: postFn }

      const { result } = renderHookWithServiceProvider(
        () => useDSOsByUserId('Draft,Approved,Submitted,Rejected'),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(postFn).toHaveBeenCalledWith(
            issuanceURL.dso.getByUserId(user._id),
            { ...paginationArgs, status: 'Draft,Approved,Submitted,Rejected' }
          )
          expect(parsedDataFn).toHaveBeenNthCalledWith(
            2,
            [{ data: [dso] }],
            '_id'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
