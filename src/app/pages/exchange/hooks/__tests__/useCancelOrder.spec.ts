import { act } from '@testing-library/react-hooks'
import {
  useCancelOrder,
  CancelOrderArgs
} from 'app/pages/exchange/hooks/useCancelOrder'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { user } from '__fixtures__/user'
import { exchange as exchangeApiUrls } from 'config/apiURL'
import { OrderSide } from 'types/order'

describe('useCancelOrder', () => {
  const args: CancelOrderArgs = {
    pair: 'EUR/SGD',
    side: OrderSide.BID,
    type: 'Limit',
    price: 100,
    amount: 10
  }

  const orderId = '123456'

  beforeEach(() => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes api correctly ', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useCancelOrder(orderId),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(args)

          expect(apiFn).toBeCalledWith(
            exchangeApiUrls.cancelOrder(user._id, orderId),
            args
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
