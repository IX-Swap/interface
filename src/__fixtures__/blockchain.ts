import { BlockchainSettings } from 'types/blockchain'

export const blockchainSettings: BlockchainSettings = {
  decimal: 5,
  networks: [
    {
      name: 'Test Network',
      balance: '20.3451',
      symbol: 'XXX',
      walletAddress: 'Wallet Address'
    },
    {
      name: 'Test MainNet',
      symbol: 'XXX',
      ownerAddress: 'Owner Address MainNet',
      balance: '100.3451',
      reserveBalance: '14.1233',
      reserveAddress: 'Reserve Address MainNet'
    }
  ],
  metaDataFields: [
    ['Name 1', 'Description 1', 'Value 1'],
    ['Name 2', 'Description 2', 'Value 2']
  ]
}
