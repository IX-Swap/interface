import * as yup from 'yup'
import { ChangePasswordFormValues } from 'v2/app/pages/security/pages/changePassword/types'

export const changePasswordFormValuesSchema = yup
  .object()
  .shape<ChangePasswordFormValues>({
    oldPassword: yup.string().required('Required'),
    newPassword: yup
      .string()
      .notOneOf(
        [yup.ref('oldPassword', undefined)],
        'New Password should not be old password'
      )
      .required('Required'),
    confirmPassword: yup
      .string()
      .required('Required')
      .oneOf([yup.ref('newPassword', undefined)], 'Passwords must match')
  })
