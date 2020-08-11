import storageService from '../index'
import { userKey, userValue, userValueString } from '__fixtures__/storage'

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should set item to localStorage', () => {
    const key = userKey
    const value = userValue
    const stringifiedValue = userValueString

    storageService.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, stringifiedValue)
    expect(Object.keys(localStorage.__STORE__).length).toBe(1)
    expect(localStorage.__STORE__[key]).toBe(stringifiedValue)
  })

  it('should get item from localStorage', () => {
    const key = userKey
    const value = userValue

    storageService.set(key, value)
    const item = storageService.get(key)

    expect(localStorage.getItem).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
    expect(item).toEqual(value)
  })

  it('should remove item from localStorage', () => {
    const key = userKey
    const value = userValue
    localStorage.__STORE__[key] = userValueString

    storageService.remove(key)

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
    expect(Object.keys(localStorage.__STORE__).length).toBe(0)
  })
})
