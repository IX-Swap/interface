import AsyncStore from 'v2/stores/async-store'
import { GenericStatus } from 'v2/types/status'

describe('AsyncStore', () => {
  describe('isLoading', () => {
    it('has default value of false', () => {
      const store = new AsyncStore()

      expect(store.isLoading).toBe(false)
    })

    it('returns true if store.status is busy', () => {
      const store = new AsyncStore()

      store.status = GenericStatus.Busy

      expect(store.status).toBe(GenericStatus.Busy)
      expect(store.isLoading).toBe(true)
    })
  })
})
