/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useCreateCorporateIdentity } from 'v2/hooks/identity/useCreateCorporateIdentity'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import {
  unCheckedDeclarations,
  createCorporateArgs
} from '__fixtures__/identity'
import * as identitiesRouter from 'v2/app/pages/identity/router'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useCreateCorporateIdentity', () => {
  const renderRoutes = jest.fn(() => <div />)

  beforeEach(() => {
    jest.spyOn(identitiesRouter, 'useIdentitiesRouter').mockReturnValue({
      params: {},
      replace: jest.fn(),
      push: jest.fn(),
      query: new URLSearchParams(),
      current: {
        path: '',
        label: ''
      },
      paths: identitiesRouter.IdentityRoute,
      renderRoutes,
      routes: []
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateCorporateIdentity(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(createCorporateArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            successfulResponse.message,
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message if all declarations are not checked', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateCorporateIdentity(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({
            ...createCorporateArgs,
            declarations: unCheckedDeclarations
          })

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'All declaration fields are required',
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))

    await act(async () => {
      const post = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateCorporateIdentity(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(createCorporateArgs)

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
