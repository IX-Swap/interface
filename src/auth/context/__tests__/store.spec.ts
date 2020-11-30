import { UserStore } from '../store'

describe('UserStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should have correct default values', () => {
    const store = new UserStore()

    expect(store.activeTab).toBe(0)
  })

  describe('setActiveTab', () => {
    it('should set an active tab equal to provided payload', () => {
      const store = new UserStore()

      store.setActiveTab(1)
      expect(store.activeTab).toBe(1)

      store.setActiveTab(2)
      expect(store.activeTab).toBe(2)
    })
  })
})
