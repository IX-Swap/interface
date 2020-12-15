export default interface User {
  _id: string
  roles: string
  email: string
  name: string
  verified: boolean
  accountType: string
  totpConfirmed: boolean
  accessToken: string
}
