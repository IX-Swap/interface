/** * @jest-environment jsdom-sixteen */
import React from 'react'
import { waitFor, cleanup } from 'test-utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { useSetup2fa } from 'v2/app/pages/security/pages/setup2fa/hooks/useSetup2fa'
import { ServicesProvider } from 'v2/services/useServices'
import apiService from 'v2/services/api'
import { useSetup2faStore } from '../../context'
import { TwoFaData } from 'v2/app/pages/security/pages/setup2fa/types'
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
      const post = jest.fn().mockResolvedValueOnce({
        data
      })

      renderHook(() => useSetup2fa(), {
        wrapper: (
          { children } // TODO: extract to a separate WrapperComponent for re-usability
        ) => (
          <ServicesProvider
            value={{
              apiService: {
                ...apiService,
                post
              }
            }}
          >
            {children}
          </ServicesProvider>
        )
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
      const post = jest.fn().mockReturnValueOnce(unsuccessfulResponse)

      renderHook(() => useSetup2fa(), {
        wrapper: ({ children }) => (
          <ServicesProvider
            value={{
              apiService: {
                ...apiService,
                post
              }
            }}
          >
            {children}
          </ServicesProvider>
        )
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
