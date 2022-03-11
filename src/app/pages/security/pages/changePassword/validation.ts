import * as yup from 'yup'
import { ChangePasswordFormValues } from 'app/pages/security/pages/changePassword/types'
import { validationMessages } from 'validation/shared'

export const changePasswordFormValuesSchema = yup
  .object()
  .shape<ChangePasswordFormValues>({
    oldPassword: yup.string().required(validationMessages.required),
    newPassword: yup
      .string()
      .notOneOf(
        [yup.ref('oldPassword', undefined)],
        'New Password should not be old password'
      )
      .required(validationMessages.required),
    confirmPassword: yup
      .string()
      .required(validationMessages.required)
      .oneOf([yup.ref('newPassword', undefined)], 'Passwords must match')
  })
