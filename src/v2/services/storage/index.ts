const storageService = {
  get<T> (key: string): T | undefined {
    const data = localStorage.getItem(key)

    if (data) {
      return JSON.parse(data)
    }
  },

  set (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove (key: string) {
    localStorage.removeItem(key)
  }
}

export default storageService
