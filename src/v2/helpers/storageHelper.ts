import User from '../types/user'

const set = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

const get = (): any => {
  const storedCredentials = localStorage.getItem('user')
  return storedCredentials !== null ? JSON.parse(storedCredentials) : {}
}

const remove = (): void => {
  localStorage.removeItem('user')
  localStorage.removeItem('visitedUrl')
}

const getAccessToken = (): string => get().accessToken

const getUserId = (): string => get()._id

const store = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

const retrieve = (key: string, def: any): any => {
  const stored = localStorage.getItem(key)

  if (stored === null) return def

  return JSON.parse(stored)
}

const generateRandom = (length: number, chars: string): string => {
  let mask = ''
  if (chars.includes('a')) mask += 'abcdefghijklmnopqrstuvwxyz'
  if (chars.includes('A')) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (chars.includes('#')) mask += '0123456789'
  if (chars.includes('!')) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
  let result = ''
  for (let i = length; i > 0; i -= 1) {
    result += mask[Math.round(Math.random() * (mask.length - 1))]
  }

  return result
}

export default {
  set,
  get,
  remove,
  getAccessToken,
  getUserId,
  generateRandom,
  store,
  retrieve
}
