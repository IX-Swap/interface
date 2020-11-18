import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useMakeCommitment } from 'v2/app/pages/invest/hooks/useMakeCommitment'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { MakeInvestmentArgs } from 'v2/types/commitment'
import { commitment, dso } from '__fixtures__/authorizer'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

jest.mock('v2/app/pages/invest/routers/offeringsRouter')

const useOfferingsRouterMock = useOfferingsRouter as jest.Mock<
  Partial<ReturnType<typeof useOfferingsRouter>>
>

describe('useMakeCommitment', () => {
  const makeInvestmentArgs: MakeInvestmentArgs = {
    dso: dso._id,
    signedSubscriptionDocument: commitment.signedSubscriptionDocument._id,
    currency: '1000',
    walletAddress: commitment.walletAddress,
    numberOfUnits: 1,
    otp: '123456'
  }

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: false })

    useOfferingsRouterMock.mockReturnValue({
      replace: jest.fn(),
      params: { dsoId: dso._id }
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
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
          const [mutate] = result.current
          void mutate(makeInvestmentArgs)

          expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'Success', 'success')
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
          const [mutate] = result.current
          void mutate(makeInvestmentArgs)

          expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            unsuccessfulResponse.message,
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
