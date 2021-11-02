import { BlockchainSettings } from 'types/blockchain'

export const blockchainSettings: BlockchainSettings = {
  decimal: 5,
  networks: [
    {
      name: 'Test Network',
      balance: '20.3451',
      symbol: 'XXX',
      walletAddress: '1209282161'
    },
    {
      name: 'Test MainNet',
      symbol: 'XXX',
      ownerAddress: '32134413213',
      balance: '100.3451',
      reserveBalance: '14.1233',
      reserveAddress: '99832671623'
    }
  ],
  metaDataFields: [
    ['Name 1', 'Description 1', 'Value 1'],
    ['Name 2', 'Description 2', 'Value 2']
  ]
}
