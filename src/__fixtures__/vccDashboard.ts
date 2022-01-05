export const fakeTopInvestor = {
  dsoId: '5fd75731bfa6960b40d7eea1',
  dsoName: 'Access Token',
  investorName: 'aditya test 2',
  amount: 2000000
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
  dsoName: 'marvel token b',
  amount: 187,
  totalAmount: 500000,
  percent: 374.4
}
export const fakeAssetUnderManagement3 = {
  dsoId: '5fea2b2490c3b06d1f4374f9',
  dsoName: 'marvel token c',
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
export const fakeSubFundStats = {
  totalInvestors: 10,
  topInvestors: [fakeTopInvestor],
  totalDSOs: 2,
  assetsUnderManagement: [fakeAssetUnderManagement],
  pendingAuthorizations: 0
}
