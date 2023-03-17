import { WhiteListType } from 'services/types'

export const initialValues = {
  walletAddress: '',
  fullName: '',
}
export const placeholders = {
  walletAddress: 'Enter your Wallet address',
  fullName: 'Your Full Name',
}
export const tabs = [
  { name: 'Manually Whitelisted Wallets', id: 0, type: WhiteListType.MANUAL },
  { name: 'All Whitelisted Wallets', id: 1, type: WhiteListType.ALL },
]
