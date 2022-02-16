import * as yup from 'yup'
import { ChangePasswordFormValues } from 'app/pages/security/pages/changePassword/types'

export const changePasswordFormValuesSchema = yup
  .object()
  .shape<ChangePasswordFormValues>({
    oldPassword: yup.string().required('This field is required'),
    newPassword: yup
      .string()
      .notOneOf(
        [yup.ref('oldPassword', undefined)],
        'New Password should not be old password'
      )
      .required('This field is required'),
    confirmPassword: yup
      .string()
      .required('This field is required')
      .oneOf([yup.ref('newPassword', undefined)], 'Passwords must match')
  })
