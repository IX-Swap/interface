const sessionService = {
  get<T>(key: string, fallbackValue?: T): T | undefined {
    const data = sessionStorage.getItem(key)

    if (data !== null && data !== undefined) {
      return JSON.parse(data)
    }

    return fallbackValue
  },

  set<T>(key: string, value: T) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    sessionStorage.removeItem(key)
  }
}

export default sessionService
