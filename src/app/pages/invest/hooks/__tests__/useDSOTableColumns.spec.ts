import {} from 'test-utils'
import { act, renderHook } from '@testing-library/react-hooks'
import { useDSOTableColumns } from 'app/pages/invest/hooks/useDSOTableColumns'
import { columns } from 'app/pages/invest/components/DSOTable/columns'
import * as useUpdateCustomFieldHook from 'hooks/customFields/useUpdateCustomField'
import { waitFor } from '@testing-library/react'

jest.mock('hooks/customFields/useUpdateCustomField')

describe('useDSOTableColumns', () => {
  const mockUpdateCustomField = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useUpdateCustomFieldHook, 'useUpdateCustomField')
      .mockReturnValue([mockUpdateCustomField] as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('sets all columns correctly on initial render', async () => {
    await act(async () => {
      const { result } = renderHook(() => useDSOTableColumns())
      await waitFor(() => {
        expect(result.current.columns).toEqual(columns)
      })
    })
  })

  it('calls update hook when deselectColumn method is called', async () => {
    await act(async () => {
      const { result } = renderHook(() => useDSOTableColumns())
      await waitFor(() => {
        void result.current.deselectColumn('favorite')
        void expect(mockUpdateCustomField).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('calls update hook when selectColumn method is called', async () => {
    await act(async () => {
      const { result } = renderHook(() => useDSOTableColumns())
      await waitFor(() => {
        void result.current.selectColumn('favorite')
        void expect(mockUpdateCustomField).toHaveBeenCalledTimes(1)
      })
    })
  })
})
