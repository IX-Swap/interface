import { act } from '@testing-library/react-hooks'
import * as useCreateDSO from 'app/pages/issuance/hooks/useCreateDSO'
import * as useUpdateDSO from 'app/pages/issuance/hooks/useUpdateDSO'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { createDSOArgs, dso } from '__fixtures__/issuance'
import * as getUpdateDSOPayload from 'app/pages/issuance/utils'
import { useSaveDSO } from '../useSaveDSO'

describe('useSaveDSO', () => {
  const createDSO = jest.fn()
  const updateDSO = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Check if validation and update functions are called', async () => {
    jest
      .spyOn(getUpdateDSOPayload, 'getUpdateDSOPayload')
      .mockImplementation(() => createDSOArgs)
    jest
      .spyOn(useCreateDSO, 'useCreateDSO')
      .mockImplementation(() => [createDSO, { isLoading: false } as any])
    jest
      .spyOn(useUpdateDSO, 'useUpdateDSO')
      .mockImplementation(() => [updateDSO, { isLoading: false } as any])
    await act(async () => {
      const showSnackbar = jest.fn()
      const schema = { validate: jest.fn().mockResolvedValue(true) }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useSaveDSO({ dso, schema: schema as any }),
        {
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        async () => {
          const func = result.current.onSubmit
          await func()
          expect(schema.validate).toBeCalledTimes(1)
          expect(updateDSO).toHaveBeenCalledWith(createDSOArgs)
        },
        { timeout: 100 }
      )
    })
  })
})
