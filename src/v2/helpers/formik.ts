import { FormikProps } from 'formik'

export function isSubmitDisabled ({ isSubmitting, isValid, dirty }: Partial<FormikProps<any>>) {
  return isSubmitting || !dirty || !isValid
}
