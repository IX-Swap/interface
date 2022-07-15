export const textDev = {
  dsoName: 'fullDSOflow',
  secondaryName: 'Tether',
  USER_NAME_ADMIN_TESTING: 'Xanthus Bass',
  USER_FOR_DISABLING: 'app/admin/users/61e1696047ade252462cf361/view',
  ETH_ADDRESS: '0x78140B507Ca3CCA6A2174d8eb5A642F36EBc4051',
  ETH_NET_NAME: 'Ethereum TestNet',
  ETH_ADDRESS_SHORT: '0x78...4051',
  NFT_DSO_NAME: 'NFTAQATEST',
  NFT_CONTRACT_ADDRESS: '0x2887d4bD236D7C3825Bab5C29AFa4E1417b26647',
  dsoForCommitment: 'AQAcommitTEST',

  requests: {
    IXPS_SGD_PAIR: 'app/otc-market/market/61a71463ad10390e378804e3',
    USERS_LIST: 'auth/users/list',
    TOKEN_SGD_PAIR: 'app/otc-market/market/6199cb8776a32f14ad0de861',
    ROLES_SET: 'auth/users/61e167f447ade252462cf19e/roles',
    search: 'exchange/markets/list',
    bankAccount: 'app/accounts/bank-accounts',
    cashWithdrawal: 'app/accounts/cash-withdrawals',
    identityIndividualsList: 'identity/individuals/list',
    individualsRejectedList: 'app/authorizer/individuals?authorizationStatus=Rejected',
    identityCorporatesList: 'identity/corporates/list',
    orderExchange: 'exchange/orders',
    dsoList: 'issuance/dso/list',
    commitments: 'issuance/commitments/list',
    blockchainAddresses: 'accounts/withdrawal-addresses/list',
    proposedFundraisingDetails: 'identity/issuance-detail/list',
    listing: 'exchange/listing/list',
    virtualAccounts: 'virtual-accounts/list',
    withdrawalsVirtualAccount: 'virtual-accounts/withdrawals/60d41b15695e8c352f46a5d6/622f361ed2d8a30e183e0947'
  },

  commitmentsView: [
    'Company Name',
    'Issued By',
    'Issued Date',
    'Digital Security',
    'Price Per Unit',
    'Total Amount',
    'Number Of Units'
  ],
  docs: {
    pathToFile: '__tests__/lib/documents/test-img.jpg',
    pdfFilePath: '__tests__/lib/documents/pdfTest.pdf',
    docBenefitsAddressName: 'pdfTest.pdf',
    docBenefitsIdentifyName: 'pdfTest.pdf',
    uploaded: ['625fcb4c6589dc0d889a8517', '625fcb4eb364cd0d8c9118c4', '625fcb4f6589dc0d889a851a']
  },
  errors: {
    tokenSymbol: 'Token symbol is already registered, please choose a different symbol',
    investorStatus: 'Please choose at least one option under "Investor Status Declaration" section',
    otpIsRequired: 'Opt-In Requirement is required'
  },
  notification: {
    resetPassword: 'Password reset has been successful',
    submitIdentity: 'Thank you for your application!',
    custodyAddress: 'You have been assigned with the blockchain address'
  }
}
