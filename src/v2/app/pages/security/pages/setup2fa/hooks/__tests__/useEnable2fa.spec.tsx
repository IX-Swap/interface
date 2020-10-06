/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import apiService from 'v2/services/api'
import { snackbarService } from 'uno-material-ui'
import { ServicesProvider } from 'v2/services/useServices'
import { useEnable2fa } from 'v2/app/pages/security/pages/setup2fa/hooks/useEnable2fa'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { useLogout } from 'v2/auth/hooks/useLogout'
import { enable2faArgs } from '__fixtures__/security'

jest.mock('v2/auth/hooks/useLogout')

const useLogoutMock = (useLogout as Function) as jest.Mock<
  Partial<ReturnType<typeof useLogout>>
>

describe('useEnable2fa', () => {
  const logout = jest.fn()

  beforeEach(() => {
    useLogoutMock.mockReturnValue(logout)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const { result } = renderHook(() => useEnable2fa(), {
        // TODO: extract to a separate WrapperComponent for re-usability
        wrapper: ({ children }) => (
          <ServicesProvider
            value={
              {
                apiService: { ...apiService, post },
                snackbarService: { ...snackbarService, showSnackbar }
              } as any
            }
          >
            {children}
          </ServicesProvider>
        )
      })
      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(enable2faArgs)

          expect(logout).toHaveBeenCalledTimes(1)
          // expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Google Authenticator Setup Success! You will be redirected to Login page.',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const post = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const { result } = renderHook(() => useEnable2fa(), {
        // TODO: extract to a separate WrapperComponent for re-usability
        wrapper: ({ children }) => (
          <ServicesProvider
            value={
              {
                apiService: { ...apiService, post },
                snackbarService: { ...snackbarService, showSnackbar }
              } as any
            }
          >
            {children}
          </ServicesProvider>
        )
      })
      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(enable2faArgs)

          expect(logout).toHaveBeenCalledTimes(0)
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
