import { isAddress } from '@ethersproject/address'

const passwordPatterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]

export const passwordValidator = (value: string | null | undefined) => {
  if (value !== null && value !== undefined) {
    return passwordPatterns.every(pattern => pattern.test(value))
  }
  return false
}

export const addressValidator = (value: string | null | undefined) => {
  if (value !== null && value !== undefined) {
    return isAddress(value)
  }

  return false
}
