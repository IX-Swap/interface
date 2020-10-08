/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import apiService from 'v2/services/api'
import { snackbarService } from 'uno-material-ui'
import { ServicesProvider } from 'v2/services/useServices'
import { useReject } from '../useReject'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { AuthorizerActionArgs } from '../types'

describe('useReject', () => {
  const props: AuthorizerActionArgs = { uri: '/', id: 'testId' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const putFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const { result } = renderHook(() => useReject(props), {
        // TODO: extract to a separate WrapperComponent for re-usability
        wrapper: ({ children }) => (
          <ServicesProvider
            value={
              {
                apiService: { ...apiService, put: putFn },
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
          void mutate()

          expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const putFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const { result } = renderHook(() => useReject(props), {
        // TODO: extract to a separate WrapperComponent for re-usability
        wrapper: ({ children }) => (
          <ServicesProvider
            value={
              {
                apiService: { ...apiService, put: putFn },
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
          void mutate()

          expect(showSnackbar).toHaveBeenCalledTimes(1)
          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
