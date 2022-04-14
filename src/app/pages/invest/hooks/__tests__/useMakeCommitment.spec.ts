import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { MakeInvestmentArgs } from 'types/commitment'
import { commitment, dso } from '__fixtures__/authorizer'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { issuanceURL } from 'config/apiURL'

describe('useMakeCommitment', () => {
  const makeInvestmentArgs: MakeInvestmentArgs = {
    dso: dso._id,
    signedSubscriptionDocument: commitment.signedSubscriptionDocument._id,
    currency: '1000',
    withdrawalAddress: commitment.withdrawalAddress?.address,
    numberOfUnits: 1,
    otp: '123456'
  }

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls api with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMakeCommitment(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current.invest
          void mutate(makeInvestmentArgs)

          expect(postFn).toHaveBeenCalledWith(
            issuanceURL.commitments.invest(user._id),
            makeInvestmentArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMakeCommitment(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current.invest
          void mutate(makeInvestmentArgs)

          expect(showSnackbar).toHaveBeenCalledWith("Success. Please wait for the authorizer's approval", 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMakeCommitment(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current.invest
          void mutate(makeInvestmentArgs)

          expect(showSnackbar).toHaveBeenCalledWith(
            unsuccessfulResponse.message,
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
