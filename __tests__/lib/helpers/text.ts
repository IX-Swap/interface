export const text = {
  dsoName: 'AQAcommitments',
  secondaryName: 'TestAQA',
  requests: {
    IXPS_SGD_PAIR: 'app/otc-market/market/61a71463ad10390e378804e3',
    USERS_LIST: 'auth/users/list',
    TOKEN_SGD_PAIR: 'app/otc-market/market/61e51b1421b1911c3f5ed1c6',
    search: 'exchange/markets/list',
    bankAccount: 'app/accounts/bank-accounts',
    cashWithdrawal: 'app/accounts/cash-withdrawals',
    identityIndividualsList: 'identity/individuals/list',
    individualsRejectedList:
      'app/authorizer/individuals?authorizationStatus=Rejected',
    identityCorporatesList: 'identity/corporates/list',
    orderExchange: 'exchange/orders',
    dsoList: 'issuance/dso/list',
    commitments: 'issuance/commitments/list',
    blockchainAddresses: 'accounts/withdrawal-addresses/list',
    proposedFundraisingDetails: 'identity/issuance-detail/list',
    listing: 'exchange/listing/list',
    virtualAccounts: 'virtual-accounts/list',
    withdrawalsVirtualAccount:
      'virtual-accounts/withdrawals/60b615b8709ec82df5b98389/61b07a9023d16f0d9e31827a'
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
    docBenefitsAddress: '__tests__/lib/documents/docBenefitsAddress.docx',
    docBenefitsIdentify: '__tests__/lib/documents/docBenefitsIdentify.docx',
    docBenefitsAddressName: 'docBenefitsAddress.docx',
    docBenefitsIdentifyName: 'docBenefitsIdentify.docx'
  },
  errors: {
    tokenSymbol:
      'Token symbol is already registered, please choose a different symbol'
  },
  notification: {
    resetPassword: 'Password reset has been successful',
    submitIdentity: 'Thanks For Submitting Your Identity!',
    custodyAddress: 'You have been assigned with the blockchain address'
  }
}
