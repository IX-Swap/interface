import { act } from '@testing-library/react-hooks'
import { useDeployToken } from 'app/pages/issuance/hooks/useDeployToken'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'

describe('useDeployToken', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct initial data', async () => {
    await act(async () => {
      const socketService = {
        socket: {
          hasListeners: jest.fn(),
          on: jest.fn(),
          emit: jest.fn(),
          off: jest.fn()
        }
      }

      const { result } = renderHookWithServiceProvider(
        () => useDeployToken('123456'),
        { socketService }
      )

      await waitFor(
        () => {
          expect(result.current.isInitializing).toEqual(true)
          expect(result.current.isDeploying).toEqual(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct data when deploying', async () => {
    await act(async () => {
      const socketService = {
        socket: {
          hasListeners: jest.fn(),
          on: jest.fn(),
          emit: jest.fn(),
          off: jest.fn()
        }
      }

      const { result } = renderHookWithServiceProvider(
        () => useDeployToken('123456'),
        { socketService }
      )

      await waitFor(
        () => {
          void result.current.deploy()
          expect(result.current.isDeploying).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct data when deployed success', async () => {
    await act(async () => {
      const socketService = {
        socket: {
          hasListeners: jest.fn(),
          on: jest.fn(
            (uri: string, callback: (message: { message: string }) => void) => {
              const success = { message: 'Success' }
              callback(success)
            }
          ),
          emit: jest.fn(),
          off: jest.fn()
        }
      }

      const { result } = renderHookWithServiceProvider(
        () => useDeployToken('123456'),
        { socketService }
      )

      await waitFor(
        () => {
          void result.current.deploy()
          expect(result.current.isInitializing).toEqual(false)
          expect(result.current.isDeploying).toEqual(false)
          expect(result.current.isDeployed).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns correct data when deployed error', async () => {
    await act(async () => {
      const socketService = {
        socket: {
          hasListeners: jest.fn(),
          on: jest.fn(
            (uri: string, callback: (message: { message: string }) => void) => {
              const error = { message: 'Error' }
              callback(error)
            }
          ),
          emit: jest.fn(),
          off: jest.fn()
        }
      }

      const { result } = renderHookWithServiceProvider(
        () => useDeployToken('123456'),
        { socketService }
      )

      await waitFor(
        () => {
          void result.current.deploy()
          expect(result.current.isInitializing).toEqual(false)
          expect(result.current.isDeploying).toEqual(false)
          expect(result.current.isDeployed).toEqual(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls remove listener when hasListener is true', async () => {
    await act(async () => {
      const socketService = {
        socket: {
          hasListeners: jest.fn(() => true),
          on: jest.fn(),
          emit: jest.fn(),
          off: jest.fn(),
          removeEventListener: jest.fn()
        }
      }

      const { result } = renderHookWithServiceProvider(
        () => useDeployToken('123456'),
        { socketService }
      )

      await waitFor(
        () => {
          void result.current.deploy()
          expect(socketService.socket.removeEventListener).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls on and emit when deployed is called', async () => {
    await act(async () => {
      const socketService = {
        socket: {
          hasListeners: jest.fn(),
          on: jest.fn(),
          emit: jest.fn(),
          off: jest.fn(),
          removeEventListener: jest.fn()
        }
      }

      const { result } = renderHookWithServiceProvider(
        () => useDeployToken('123456'),
        { socketService }
      )

      await waitFor(
        () => {
          void result.current.deploy()
          expect(socketService.socket.on).toHaveBeenCalled()
          expect(socketService.socket.emit).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
