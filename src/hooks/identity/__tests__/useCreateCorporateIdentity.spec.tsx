import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useCreateCorporateIdentity } from 'hooks/identity/useCreateCorporateIdentity'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { createIndividualArgs } from '__fixtures__/identity'
// import * as identitiesRouter from 'app/pages/identity/router'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useCreateCorporateIdentity', () => {
  // const renderRoutes = jest.fn(() => <div />)

  beforeEach(() => {
    // jest.spyOn(identitiesRouter, 'useIdentitiesRouter').mockReturnValue({
    //   params: {},
    //   replace: jest.fn(),
    //   push: jest.fn(),
    //   query: new URLSearchParams(),
    //   current: {
    //     path: '',
    //     label: ''
    //   },
    //   paths: identitiesRouter.IdentityRoute,
    //   renderRoutes,
    //   routes: []
    // })
  })

  afterEach(async () => {
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
          void mutate(createIndividualArgs)

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
          void mutate(createIndividualArgs)

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
