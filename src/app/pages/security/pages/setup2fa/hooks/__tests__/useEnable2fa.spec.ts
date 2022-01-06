import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useEnable2fa } from 'app/pages/security/pages/setup2fa/hooks/useEnable2fa'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { enable2faArgs } from '__fixtures__/security'
import * as useSetup2faStore from 'app/pages/security/pages/setup2fa/context'

describe('useEnable2fa', () => {
  const nextPage = jest.fn()

  beforeEach(() => {
    const objResponse = { nextPage }

    jest
      .spyOn(useSetup2faStore, 'useSetup2faStore')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls nextPage when enable 2FA is successful', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useEnable2fa(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(enable2faArgs)

          expect(nextPage).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const post = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useEnable2fa(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(enable2faArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            unsuccessfulResponse.toString(),
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
