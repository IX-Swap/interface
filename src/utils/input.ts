export const textFilter = (value?: string) =>
  value
    ?.split('')
    .filter((x) => /[a-zA-Z0-9 .,!?"'/\[\]+\-#$%&@:;]/.test(x))
    .join('') ?? ''

export const numberFilter = (value?: string) => {
  if (!value) {
    return ''
  }

  const [whole, ...decimals] = value
    .split('')
    .filter((x) => /[0-9.]/.test(x))
    .join('')
    .split('.')

  return whole + (decimals.length > 0 ? `.${decimals.join('')}` : '')
}

export const integerNumberFilter = (value?: string) => {
  if (!value) {
    return ''
  }
  return value
    .split('')
    .filter((x) => /[0-9]/.test(x))
    .join('')
}

export const uppercaseFilter = (value?: string) => {
  if (!value) {
    return ''
  }
  return value?.toLocaleUpperCase()
}
