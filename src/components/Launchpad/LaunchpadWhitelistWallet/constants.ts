import { WhiteListType } from 'services/types'

export const initialValues = {
  walletAddress: '',
  fullName: '',
}
export const placeholders = {
  walletAddress: '0x7C527e86fA464370BdFE8d1BEB5EF4C5E0081bf0',
  fullName: 'John Doe',
}
export const tabs = [
  { name: 'Manually Whitelisted Wallets', id: 0, type: WhiteListType.MANUAL },
  { name: 'All Whitelisted Wallets', id: 1, type: WhiteListType.ALL },
]
