import storageService from '../index'
import { userKey, userValue, userValueString } from '__fixtures__/storage'

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('set', () => {
    it('should set item to localStorage', () => {
      const stringifiedValue = userValueString

      storageService.set(userKey, userValue)

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        userKey,
        stringifiedValue
      )
      expect(Object.keys(localStorage.__STORE__).length).toBe(1)
      expect(localStorage.__STORE__[userKey]).toBe(stringifiedValue)
    })
  })

  describe('get', () => {
    it('should retrieve item from localStorage', () => {
      storageService.set(userKey, userValue)
      const item = storageService.get(userKey)

      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem).toHaveBeenCalledWith(userKey)
      expect(item).toEqual(userValue)
    })

    it('should return undefined if there is no item in the storage', () => {
      const item = storageService.get(userKey)

      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem).toHaveBeenCalledWith(userKey)
      expect(item).toBeUndefined()
    })
  })

  describe('remove', () => {
    it('should remove item from localStorage', () => {
      localStorage.__STORE__[userKey] = userValueString

      storageService.remove(userKey)

      expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
      expect(localStorage.removeItem).toHaveBeenCalledWith(userKey)
      expect(Object.keys(localStorage.__STORE__).length).toBe(0)
    })
  })
})
