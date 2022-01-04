const time6 = Date.now().toString().slice(-6)
export const bankAccount = {
  bankName: 'Edward Dejesus',
  accountHolderName: 'Kenneth Horton',
  asset: '5fc25b144f97ed7f3444cac2',
  bankAccountNumber: '365',
  swiftCode: 'Dolore enim et dolor',
  address: {
    line1: '490 Second Drive',
    line2: 'Id fugiat laboris vo',
    city: 'Kyiv',
    state: 'Ukraine',
    country: 'Ukraine',
    postalCode: 'Assumenda alias omni'
  }
}

export const cashWithdrawal = {
  bankAccountId: '6184e40e3899410e58bbe152',
  amount: 1,
  otp: '111111'
}
export const rejectedFunds = { skip: 0, limit: 5, fundStatus: 'Rejected' }
export const rejectedApi = { skip: 0, limit: 5, status: 'Rejected' }
// export const rejectedApi = {
//   skip: 0,
//   limit: 25,
//   status: 'Rejected',
//   isAssigned: false
// }
export const approvedApi = { skip: 0, limit: 5, status: 'Approved' }

export const commitment = {
  numberOfUnits: 10,
  otp: '123456',
  withdrawalAddress: '6184dfe93899410e58bbe013',
  signedSubscriptionDocument: '61c092975813110e7f72a6af',
  dso: '6185361bf251660e58fd5ed0',
  currency: '5fa95e07231c63088311b178'
}

export const blockchainAddresses = {
  network: '5f88035d7ae447ee9274d4fa',
  address: '0x5455D6D8ae4263d69b29d1DeD8eCD361b6111123',
  label: 'byAPI',
  memo: 'blockchainAddresses'
}

export const dso = {
  logo: '61c056d9cfca8d0e6d030ab7',
  capitalStructure: 'Fund - Feeder/Sub-Fund',
  network: '5fc0c4a67ae447ee92a3d5b2',
  tokenName: 'Cucumber',
  tokenSymbol: time6,
  uniqueIdentifierCode: 'S123123123123',
  corporate: '61b8afc070e8d60e612d90c0',
  issuerName: 'Cnameqwe',
  currency: '5fa95e07231c63088311b178',
  launchDate: '2025-07-18T21:00:00.000Z',
  completionDate: '2021-12-31T10:11:00.000Z',
  pricePerUnit: 111,
  totalFundraisingAmount: 1111111,
  minimumInvestment: 10,
  investmentPeriod: 1,
  dividendYield: 0.01,
  interestRate: 0.01,
  grossIRR: 0.01,
  investmentStructure: '1',
  distributionFrequency: 'Monthly',
  leverage: 0.01,
  equityMultiple: 0.01,
  introduction: '<p>qweqwe</p>\n',
  businessModel: '<p>qweqweqwe</p>\n',
  useOfProceeds: '<p>qweqwe</p>\n',
  fundraisingMilestone: '<p>qweqweqw</p>\n',
  team: [
    {
      photo: '61c05730cfca8d0e6d030ac0',
      name: 'qweqwe',
      position: 'qweqweqwe',
      about: '<p>qweqweqwe</p>\n'
    }
  ],
  subscriptionDocument: '61c0573acfca8d0e6d030ac5',
  videos: [
    {
      title: 'qweqweq',
      link: 'https://www.youtube.com/watch?v=9_x90IzBMCA&ab_channel=WorldTableTennis'
    }
  ],
  faqs: [
    { question: 'qwe', answer: 'qweq' },
    { question: 'qwe', answer: 'qwe' },
    { question: 'qwe', answer: 'qwe' }
  ],
  documents: ['61c0573ecfca8d0e6d030aca']
}
