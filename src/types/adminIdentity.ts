export interface AdminIdentity {
  _id: string
  status: string
  user: {
    _id: string
    verified: boolean
    totpConfirmed: boolean
    accountType: string
    email: string
    name: string
    roles: string
    createdAt: string
    updatedAt: string
    __v: number
    enabled: boolean
  }
  email: string
  createdAt: string
  createdBy: {
    _id: string
    name: string
  }
  name: string
  country: string
  type: 'individual' | 'corporate' | 'issuer'
}
