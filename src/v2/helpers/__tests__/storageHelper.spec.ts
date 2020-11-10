import storageHelper from '../storageHelper'
import { userKey, userValue } from '__fixtures__/storage'

describe('storageHelper', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('getUserId', () => {
    it('should retrieve item from localStorage', () => {
      storageHelper.set(userValue)
      const item = storageHelper.getUserId()

      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem).toHaveBeenCalledWith(userKey)
      expect(item).toEqual(userValue._id)
    })
  })
})
