import { act } from '@testing-library/react-hooks'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'
import { createOrderArgument } from '__fixtures__/orders'
import { transformedOTCOrderArgs } from '__fixtures__/otcOrders'
import { useCreateOTCOrder } from '../useCreateOTCOrder'

describe('useCreateOTCOrder', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls api and snackbarService.showSnackbar with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateOTCOrder(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ args: createOrderArgument, account: '5435435' })

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            `/otc/order`,
            transformedOTCOrderArgs
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Order Placed',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
