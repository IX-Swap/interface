import { createTypedForm } from 'v2/components/form/createTypedForm'

export const useTypedForm = <FormType extends Record<string, any>>() => {
  return createTypedForm<FormType>()()
}
