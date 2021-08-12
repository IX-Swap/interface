import socketService from 'services/socket'
import { cleanup } from 'test-utils'

describe('socketService', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct socket connection', async () => {
    const onNotif = jest.fn()
    const queryCache = {
      setQueryData: jest.fn(() => null)
    }
    socketService.subscribeToSocket(onNotif, queryCache as any)
    expect(socketService.getConnection()).toBeTruthy()
  })
})
