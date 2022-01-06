export const fakeTopInvestor = {
  dsoId: '5fd75731bfa6960b40d7eea1',
  dsoName: 'Access Token',
  investorName: 'aditya test 2',
  amount: 2000000
}
export const fakeTopInvestor2 = {
  dsoId: '5fd75731bfa6960b40d7eea0',
  dsoName: 'Access Token',
  investorName: 'Funder',
  amount: 200
}
export const fakeTopInvestor3 = {
  dsoId: '5fd75731bfa6960b40d7eea2',
  dsoName: 'Access Token',
  investorName: 'FZnder',
  amount: 200
}
export const fakeAssetUnderManagement = {
  dsoId: '5fea2b2490c3b06d1f4374f7',
  dsoName: 'marvel token a',
  amount: 1872000,
  totalAmount: 500000,
  percent: 374.4
}
export const fakeAssetUnderManagement2 = {
  dsoId: '5fea2b2490c3b06d1f4374f8',
  dsoName: 'Fund',
  amount: 187,
  totalAmount: 500000,
  percent: 374.4
}
export const fakeAssetUnderManagement3 = {
  dsoId: '5fea2b2490c3b06d1f4374f9',
  dsoName: 'FZnd',
  amount: 187,
  totalAmount: 500000,
  percent: 374.4
}
export const fakeAssetsUnderManagement = [
  fakeAssetUnderManagement3,
  fakeAssetUnderManagement2,
  fakeAssetUnderManagement
]

export const sortedFakeAssetsUnderManagement = [
  fakeAssetUnderManagement,
  fakeAssetUnderManagement2,
  fakeAssetUnderManagement3
]

export const fakeInvestors = [
  fakeTopInvestor3,
  fakeTopInvestor2,
  fakeTopInvestor
]

export const sortedFakeInvestors = [
  fakeTopInvestor,
  fakeTopInvestor2,
  fakeTopInvestor3
]

export const fakeSubFundStats = {
  totalInvestors: 10,
  topInvestors: [fakeTopInvestor],
  totalDSOs: 2,
  assetsUnderManagement: [fakeAssetUnderManagement],
  pendingAuthorizations: 0
}
