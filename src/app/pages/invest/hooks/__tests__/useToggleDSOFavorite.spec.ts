import { act } from '@testing-library/react-hooks'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'
import { successfulResponse } from '__fixtures__/api'
import { dso } from '__fixtures__/authorizer'
import { issuanceURL } from 'config/apiURL'
import * as ReactQuery from 'react-query'

describe('useToggleDSOFavorite', () => {
  const qc = ReactQuery.queryCache
  const getQueriesMock = jest.fn().mockReturnValue(['dso-list'])

  qc.getQueries = getQueriesMock
  qc.setQueryData = jest.fn()
  qc.invalidateQueries = jest.fn()

  const deleteFn = jest.fn().mockResolvedValue(successfulResponse)
  const putFn = jest.fn().mockResolvedValue(successfulResponse)
  const showSnackbar = jest.fn()

  const apiObj = { delete: deleteFn, put: putFn }
  const snackbarObj = { showSnackbar }

  beforeEach(() => {
    jest.spyOn(ReactQuery, 'useQueryCache').mockReturnValue(qc)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls delete endpoint when isFav = true', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useToggleDSOFavorite(dso, []),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(() => {
        const [mutate] = result.current
        void mutate(true)

        expect(deleteFn).toHaveBeenNthCalledWith(
          1,
          issuanceURL.dso.favorite(dso._id),
          {}
        )

        expect(showSnackbar).toHaveBeenNthCalledWith(1, 'Success', 'success')
      })
    })
  })

  it('calls put endpoint when isFav = false', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useToggleDSOFavorite(dso, []),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(() => {
        const [mutate] = result.current
        void mutate(false)

        expect(putFn).toHaveBeenNthCalledWith(
          1,
          issuanceURL.dso.favorite(dso._id),
          {}
        )

        expect(showSnackbar).toHaveBeenNthCalledWith(1, 'Success', 'success')
      })
    })
  })
})
