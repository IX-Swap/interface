export const textStaging = {
  dsoName: 'AQAcommitments',
  secondaryName: 'TestAQA',
  USER_NAME_ADMIN_TESTING: 'second Echange',
  USER_FOR_DISABLING: 'app/admin/users/61dbf9f4c9056c0daf9c92ea/view',
  ETH_ADDRESS: '0x5455D6D8ae4263d69b29d1DeD8eCD361b6498446',
  ETH_ADDRESS_SHORT: '0x54...8446',
  ETH_NET_NAME: 'Ethereum Testnet',

  requests: {
    IXPS_SGD_PAIR: 'app/otc-market/market/61a71463ad10390e378804e3',
    USERS_LIST: 'auth/users/list',
    TOKEN_SGD_PAIR: 'app/otc-market/market/61e51b1421b1911c3f5ed1c6',
    ROLES_SET: 'auth/users/61dbfb32c9056c0daf9c943e/roles',
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
    withdrawalsVirtualAccount: 'virtual-accounts/withdrawals/60b615b8709ec82df5b98389/61b07a9023d16f0d9e31827a'
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
    docBenefitsAddress: '__tests__/lib/documents/docBenefitsAddress.docx',
    docBenefitsIdentify: '__tests__/lib/documents/docBenefitsIdentify.docx',
    docBenefitsAddressName: 'pdfTest.pdf',
    docBenefitsIdentifyName: 'pdfTest.pdf',
    uploaded: ['625408bbdf302d0d8cb5b402', '625408b6df302d0d8cb5b3ff', '625408b2df302d0d8cb5b3fc']
  },
  errors: {
    tokenSymbol: 'Token symbol is already registered, please choose a different symbol',
    investorStatus: 'Please choose at least one option under "Investor Status Declaration" section',
    otpIsRequired: 'Opt-In Requirement is required'
  },
  notification: {
    resetPassword: 'Password reset has been successful',
    submitIdentity: 'Thanks For Submitting Your Identity!',
    custodyAddress: 'You have been assigned with the blockchain address'
  }
}
