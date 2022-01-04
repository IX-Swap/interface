import socketService from 'services/socket'

describe('socketService', () => {
  afterEach(async () => {
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
