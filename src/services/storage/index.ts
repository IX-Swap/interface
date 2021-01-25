const storageService = {
  get<T>(key: string, fallbackValue?: T): T | undefined {
    const data = localStorage.getItem(key)

    if (data !== null && data !== undefined) {
      return JSON.parse(data)
    }

    return fallbackValue
  },

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    localStorage.removeItem(key)
  }
}

export default storageService
