import {
  CustodyAccountsListItem,
  CustodyDetails,
  CustodiansCount
} from 'types/custodyAccount'

export const custodyAccountMock = {
  _id: '6090ede8da777221e21eb2f9',
  accountName: 'HexSafe',
  accountId: 1,
  wallet: {
    wallet_name: 'Zerokey',
    asset_tickers: ['ETH', 'BTC', 'USDT']
  },
  user: '605d3c24fef70845f9be4cf1',
  createdAt: '2021-04-22T05:25:12.647Z',
  updatedAt: '2021-04-27T04:21:39.140Z'
}

export const custodyManagementItems = [
  {
    assigned: '3 mins ago',
    status: 'Closed',
    investor: 'Delphine Stark',
    custodian: 'InvestaX',
    walletAddress: '0xFd...51eb',
    accountID: '323456789014'
  },
  {
    assigned: '2 mins ago',
    status: 'Active',
    investor: 'Jovany Dooley',
    custodian: 'HEX',
    walletAddress: '0xFd...17e3',
    accountID: '323456789014'
  }
]

export const fakeCustodyAccountsListItem: CustodyAccountsListItem = {
  _id: '1',
  status: 'Approved',
  name: 'Gleb',
  userId: '334344',
  walletAddress: '34434',
  accountId: 32442,
  active: true,
  assignedAt: '2021-04-27T04:21:39.140Z',
  type: 'hex'
}

export const fakeCustodyDetails: CustodyDetails = {
  wallets: [
    {
      asset_tickers: ['test1', 'test2'],
      wallet_name: 'wallet name'
    }
  ],
  account_id: 2,
  account_name: 'account name',
  user: {
    name: 'name'
  }
}

export const fakeCustodiansCount: CustodiansCount = {
  hexCount: 5,
  investaxCount: 96,
  hexPercent: '4.95',
  investaxPercent: '95.05'
}
