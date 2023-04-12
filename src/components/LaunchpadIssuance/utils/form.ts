export const isSubmitDisabled = (errors: any, touched: any) => {
  return getVisibleError(errors, touched, false)
}

const getIsDisabled = (message?: string, isDraft?: boolean) => {
  if (message) {
    if (!isDraft) return true
    const includesString = (keys: string[]) => keys.some((key: string) => message.includes(key))
    const invalidKeys = ['valid', 'Valid']
    const requiredKeys = ['required', 'Required', 'enter', 'Enter', 'Add at least']
    return includesString(invalidKeys) || !includesString(requiredKeys)
  }
  return false
}

const getVisibleError = (errors: any, touched: any, isDraft: boolean) => {
  // const notTouched = !Object.keys(touched).length
  // if (notTouched) {
  //   return true
  // }
  const hasVisibleError = Object.entries(touched).some(([fieldName, value]: any) => {
    if (Array.isArray(value)) {
      return value.some((arrayItem, index) => {
        if (!arrayItem) {
          return false
        }
        return Object.keys(arrayItem).some((arrayItemKey) => {
          const error = errors[fieldName] && errors[fieldName][index] && errors[fieldName][index][arrayItemKey]
          return getIsDisabled(error, isDraft)
        })
      })
    }
    if (typeof value === 'object') {
      return Object.keys(value).some((objectItemKey) => {
        const error = errors[fieldName] && errors[fieldName][objectItemKey]
        return getIsDisabled(error, isDraft)
      })
    }

    return value ? getIsDisabled(errors[fieldName], isDraft) : false
  })
  return hasVisibleError
}

export const isDraftDisabled = (errors: any, touched: any) => {
  return getVisibleError(errors, touched, true)
}
