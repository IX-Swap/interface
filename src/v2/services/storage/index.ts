const storageService = {
  get<T>(key: string): T | undefined {
    const data = localStorage.getItem(key)

    if (data !== null && data !== undefined) {
      return JSON.parse(data)
    }
  },

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    localStorage.removeItem(key)
  }
}

export default storageService
