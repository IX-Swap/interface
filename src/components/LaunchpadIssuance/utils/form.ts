export const isSubmitDisabled = (errors: any, touched: any) => {
  const hasErrors = Object.keys(errors).length > 0
  const notTouched = !Object.keys(touched).length
  return notTouched || hasErrors
}

export const isDraftDisabled = (errors: any, touched: any) => {
  const hasError = Object.entries(touched).some(([fieldName, value]: any) => {
    if (Array.isArray(value)) {
      return value.some((arrayItem, index) =>
        Object.keys(arrayItem).some((arrayItemKey) => Boolean(errors[fieldName][index][arrayItemKey]))
      )
    }
    if (typeof value === 'object') {
      return Object.keys(value).some((objectItemKey) => Boolean(errors[fieldName][objectItemKey]))
    }
    return Boolean(errors[fieldName])
  })
  return hasError
}
