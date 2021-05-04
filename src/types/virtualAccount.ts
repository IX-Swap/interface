export interface VirtualAccount {
  _id: string
  accountNumber: string
  currency: 'SGD' | 'USD'
  balance: {
    available: string
    onHold: string
    outstanding: string
  }
  createdBy: string
  user: {
    _id: string
    enabled: boolean
    verified: boolean
    totpConfirmed: boolean
    name: string
    email: string
    roles: string
    createdAt: string
    updatedAt: string
  }
  createdAt: string
  assignedAt: string
  updatedAt: string
}
