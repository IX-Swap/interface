import { Asset } from './asset'

interface BankAddress {
  line1?: string
  line2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

export interface Bank {
  _id: string
  status: string
  deleted: boolean
  bankName: string
  bankAccountNumber: string
  accountHolderName: string
  swiftCode: string
  authorized: boolean
  createdAt: string
  address?: BankAddress
  asset: Asset
}
