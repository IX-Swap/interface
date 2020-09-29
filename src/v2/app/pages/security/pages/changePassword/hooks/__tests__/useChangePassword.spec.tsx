import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import apiService from 'v2/services/api'
import { snackbarService } from 'uno-material-ui'
import { ServicesProvider } from 'v2/services/useServices'
import * as SecurityRouter from 'v2/app/pages/security/routes'
import { useChangePassword } from 'v2/app/pages/security/pages/changePassword/hooks/useChangePassword'
import { generateRouter } from '__fixtures__/useRouter'
import { changePasswordArgs } from '__fixtures__/security'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'

describe('useChangePassword', () => {
  beforeEach(() => {
    jest
      .spyOn(SecurityRouter, 'useSecurityRouter')
      .mockReturnValue(generateRouter({}))
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const { result } = renderHook(() => useChangePassword(), {
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
          void mutate(changePasswordArgs)

          // expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Successfully changed password',
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

      const { result } = renderHook(() => useChangePassword(), {
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
          void mutate(changePasswordArgs)

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
