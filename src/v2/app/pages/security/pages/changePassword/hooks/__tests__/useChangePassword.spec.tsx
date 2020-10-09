/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import * as SecurityRouter from 'v2/app/pages/security/router'
import { useChangePassword } from 'v2/app/pages/security/pages/changePassword/hooks/useChangePassword'
import { changePasswordArgs } from '__fixtures__/security'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'

describe('useChangePassword', () => {
  beforeEach(() => {
    jest.spyOn(SecurityRouter, 'useSecurityRouter').mockImplementation(() => ({
      current: { path: '', label: '' },
      paths: SecurityRouter.SecurityRoute,
      renderRoutes: jest.fn(() => <div />),
      routes: [],
      push: jest.fn(),
      replace: jest.fn(),
      query: new URLSearchParams(),
      params: {}
    }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useChangePassword(),
        apiObj,
        snackbarObj
      )

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

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useChangePassword(),
        apiObj,
        snackbarObj
      )

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
