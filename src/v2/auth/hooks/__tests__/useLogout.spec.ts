/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useLogout } from 'v2/auth/hooks/useLogout'

describe('useLogout', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('invokes storageService.remove & socketService.disconnect with correct data', async () => {
    await act(async () => {
      const storageService = { remove: jest.fn() }
      const socketService = { disconnect: jest.fn() }
      const { result } = renderHookWithServiceProvider(() => useLogout(), {
        storageService,
        socketService
      })

      await waitFor(
        () => {
          const mutate = result.current
          void mutate()
          expect(storageService.remove).toHaveBeenCalled()

          expect(storageService.remove).toHaveBeenNthCalledWith(1, 'user')
          expect(storageService.remove).toHaveBeenNthCalledWith(2, 'visitedUrl')
          expect(storageService.remove).toHaveBeenNthCalledWith(
            3,
            'notificationFilter'
          )
          expect(socketService.disconnect).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
