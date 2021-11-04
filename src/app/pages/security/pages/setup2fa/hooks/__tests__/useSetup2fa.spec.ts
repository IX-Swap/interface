import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useSetup2fa } from 'app/pages/security/pages/setup2fa/hooks/useSetup2fa'
import { useSetup2faStore } from '../../context'
import { TwoFaData } from 'app/pages/security/pages/setup2fa/types'
import { unsuccessfulResponse } from '__fixtures__/api'

jest.mock('../../context')

const useSetup2faStoreMock = useSetup2faStore as jest.Mock<
  Partial<ReturnType<typeof useSetup2faStore>>
>

describe('useSetup2fa', () => {
  const set2faData = jest.fn()

  beforeEach(() => {
    useSetup2faStoreMock.mockReturnValueOnce({
      set2faData
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls useSetup2faStore.set2faData with data from response', async () => {
    await act(async () => {
      const data: TwoFaData = {
        image: 'image',
        key: 'key',
        encoded: 'encoded'
      }
      const post = jest.fn().mockResolvedValueOnce({ data })
      const apiObj = { post }

      renderHookWithServiceProvider(() => useSetup2fa(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(set2faData).toHaveBeenCalledTimes(1)
          expect(set2faData).toHaveBeenCalledWith(data)
        },
        { timeout: 1000 }
      )
    })
  })

  it('it does not call useSetup2faStore.set2faData', async () => {
    await act(async () => {
      const post = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const apiObj = { post }

      renderHookWithServiceProvider(() => useSetup2fa(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(set2faData).toHaveBeenCalledTimes(0)
        },
        { timeout: 1000 }
      )
    })
  })
})
