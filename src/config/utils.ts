export const getSocketTransports = (value: string | undefined) =>
  value !== undefined ? value.split(',') : ['websocket']

export const getEnvironment = (value: string | undefined) =>
  value?.split('.')?.[1] ?? 'dev'

export const getAPIUrl = (value: string | undefined) => {
  if (value === undefined) {
    throw new Error('API url is not defined')
  }

  return value
}

export const getPercentageValue = (value: number) => {
  return value * 100
}

export const stringTruncate = (
  value: string,
  length: number,
  ellipsis: boolean | undefined = true
) => {
  return `${value.substring(0, length)}${
    ellipsis && value.length > length ? '...' : ''
  }`
}
