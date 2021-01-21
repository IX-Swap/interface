import User, { ManagedUser } from 'types/user'

export const user: User = {
  verified: true,
  totpConfirmed: false,
  accountType: 'Unset',
  _id: '5f3152ef2d2dfb4291fccce2',
  email: 'alex@investax.io',
  name: 'Alex Solovev',
  roles: 'admin',
  accessToken: ''
}

export const managedUser: ManagedUser = {
  _id: '5feb0bf09909361a0cb71446',
  enabled: true,
  verified: true,
  totpConfirmed: false,
  email: 'selmer+1@investax.io',
  name: 'Nube Nueno',
  roles: 'user,accredited,issuer,authorizer,admin',
  createdAt: '2020-12-29T10:58:56.683Z',
  updatedAt: '2021-01-20T16:29:59.285Z',
  resetExpiresOn: '2021-01-20T16:37:38.267Z',
  twoFactorAuth: true,
  isResetActive: true
}
