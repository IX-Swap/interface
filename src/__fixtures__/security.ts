import { ChangePasswordFormValues } from 'v2/app/pages/security/pages/changePassword/types'
import { user } from './user'
import { Enable2faFormValues } from 'v2/app/pages/security/pages/setup2fa/types'

export const changePasswordArgs: ChangePasswordFormValues = {
  oldPassword: 'abc',
  newPassword: 'abcdef',
  confirmPassword: 'abcdef'
}

export const enable2faArgs: Enable2faFormValues = {
  otp: '543210'
}

export const securityURLs = {
  setup2Fa: `/auth/2fa/setup/${user._id}`,
  enable2Fa: `/auth/2fa/setup/${user._id}/confirm/${enable2faArgs.otp}`,
  changePassword: `/auth/password/change/${user._id}`
}
