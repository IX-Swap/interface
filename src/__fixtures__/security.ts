import { ChangePasswordFormValues } from 'app/pages/security/pages/changePassword/types'
import { user } from './user'
import {
  Enable2faFormValues,
  Remove2faFormValues
} from 'app/pages/security/types'

export const changePasswordArgs: ChangePasswordFormValues = {
  oldPassword: 'abc',
  newPassword: 'abcdef',
  confirmPassword: 'abcdef'
}

export const enable2faArgs: Enable2faFormValues = {
  otp: '543210'
}

export const remove2faArgs: Remove2faFormValues = {
  otp: '543210',
  emailCode: '543210'
}

export const securityURLs = {
  setup2Fa: `/auth/2fa/setup/${user._id}`,
  enable2Fa: `/auth/2fa/setup/${user._id}/confirm/${enable2faArgs.otp}`,
  changePassword: `/auth/password/change/${user._id}`
}

export const fakeTwoFaData = {
  image:
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  key: 'test-store-key',
  encoded: 'test-store-key-encoded'
}
