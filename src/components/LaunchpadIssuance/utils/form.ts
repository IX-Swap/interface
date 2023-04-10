export const isSubmitDisabled = (errors: any, touched: any) => {
  return getError(errors, touched)
}

const getIsDisabled = (message?: string) => {
  if (message) {
    const includesString = (keys: string[]) => keys.some((key: string) => message.includes(key))
    const invalidKeys = ['valid', 'Valid']
    const requiredKeys = ['required', 'Required', 'enter', 'Enter', 'Add at least']
    return includesString(invalidKeys) || !includesString(requiredKeys)
  }
  return false
}

const getError = (errors: any, touched: any) => {
  const hasError = Object.entries(touched).some(([fieldName, value]: any) => {
    if (Array.isArray(value)) {
      return value.some((arrayItem, index) => {
        if (!arrayItem) {
          return false
        }
        return Object.keys(arrayItem).some((arrayItemKey) => {
          const error = errors[fieldName] && errors[fieldName][index] && errors[fieldName][index][arrayItemKey]
          return getIsDisabled(error)
        })
      })
    }
    if (typeof value === 'object') {
      return Object.keys(value).some((objectItemKey) => {
        const error = errors[fieldName] && errors[fieldName][objectItemKey]
        return getIsDisabled(error)
      })
    }

    return value ? getIsDisabled(errors[fieldName]) : false
  })
  return hasError
}

export const isDraftDisabled = (errors: any, touched: any) => {
  return getError(errors, touched)
}
