import { useFormContext } from 'react-hook-form'
import { getErrorFromControl } from 'v2/helpers/forms'

export const useFormError = (name: string) => {
  const { control } = useFormContext()
  const error = getErrorFromControl(name, control)

  return {
    hasError: error !== undefined,
    error
  }
}
