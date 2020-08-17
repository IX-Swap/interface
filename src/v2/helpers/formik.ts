import { FormikProps } from 'formik'

export function isSubmitDisabled ({
  isSubmitting,
  isValid,
  dirty
}: Partial<FormikProps<any>>): boolean {
  if (isSubmitting === undefined) return false
  if (dirty === undefined) return true
  if (isValid === undefined) return true

  return isSubmitting || !dirty || !isValid
}
