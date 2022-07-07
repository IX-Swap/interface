const time6 = Date.now().toString().slice(-6)
import { baseCreds, setENV } from '../helpers/creds'

export const sendMoneyToEmail = {
  email: 'some@gmail.com',
  amount: 1000000,
  currency: 'USD'
}

export const bankAccount = {
  bankName: 'Teegan Ward',
  accountHolderName: 'Hayley Solis',
  asset: '5fd7199deb87068672a27015',
  bankAccountNumber: time6,
  swiftCode: 'Aut perspiciatis op',
  address: {
    line1: '99 Rocky Clarendon Road',
    line2: 'In ad voluptates est',
    city: 'Lorem ut qui accusam',
    state: 'Sint tempor sed odio',
    country: 'Ukraine',
    postalCode: '10000'
  }
}

export const sellOrder = {
  pair: '6199cb8776a32f14ad0de861', // 61e51b1421b1911c3f5ed1c6
  side: 'ASK',
  type: 'LIMIT',
  price: 10,
  amount: 15
}

export const buyOrder = {
  pair: '6199cb8776a32f14ad0de861',
  side: 'BID',
  type: 'LIMIT',
  price: 10,
  amount: 15
}

export const cashWithdrawal = {
  bankAccountId: '6184e40e3899410e58bbe152',
  amount: 1,
  otp: '111111'
}
export const rejectedFunds = { skip: 0, limit: 5, fundStatus: 'Rejected' }
export const rejectedApi = { skip: 0, limit: 5, status: 'Rejected' }

export const approvedApi = { skip: 0, limit: 5, status: 'Approved' }

export const blockchainAddresses = {
  wallet: 'METAMASK',
  network: '5f88035d7ae447ee9274d4fa',
  address: '0xe1741Dad00AC56f19B3A5D5B3f34Ad800a649594',
  label: 'q',
  memo: 'q'
}
let dso, commitment
if (baseCreds.URL.includes('dev')) {
  commitment = {
    numberOfUnits: 20,
    otp: '123456',
    withdrawalAddress: '623b12cb20881232eb9532e3',
    signedSubscriptionDocument: '623b173320881232eb95363d',
    dso: '6299b10910267105170482ab',
    currency: '5fd7199deb87068672a27016'
  }
  dso = {
    logo: '623aeea5256f6c7bfa540827',
    capitalStructure: 'Fund - Feeder/Sub-Fund',
    network: '5f88035d7ae447ee9274d4fa',
    tokenName: 'fullDSOflow',
    tokenSymbol: time6,
    uniqueIdentifierCode: 'myDSOcore123',
    corporate: '622f3b77d2d8a30e183e0b9d',
    issuerName: 'autoTEST',
    currency: '5fd7199deb87068672a27015',
    launchDate: '2022-05-24T09:56:10.000Z',
    completionDate: '2023-03-30T08:56:14.000Z',
    pricePerUnit: 100,
    totalFundraisingAmount: 4000000,
    minimumInvestment: 10,
    investmentPeriod: 1,
    dividendYield: 0.1,
    interestRate: 0.1,
    grossIRR: 0.1,
    investmentStructure: 'general',
    distributionFrequency: 'Quarterly',
    leverage: 0.1,
    equityMultiple: 0.1,
    introduction: '<p>Zx</p>\n',
    businessModel: '<p>Zx</p>\n',
    useOfProceeds: '<p>Zx</p>\n',
    fundraisingMilestone: '<p>ZxZ</p>\n',
    team: [{ photo: '623aeee2256f6c7bfa540840', name: 'Zx', position: 'zx', about: '<p>ZcxZ</p>\n' }],
    subscriptionDocument: '62b96761baf9ee3a6bd80478',
    videos: [],
    faqs: [{ question: 'Zx', answer: 'ZxZxZ' }],
    documents: ['623aeef4256f6c7bfa54085d']
  }
} else {
  commitment = {
    numberOfUnits: 10,
    otp: '123456',
    withdrawalAddress: '6184dfe93899410e58bbe013',
    signedSubscriptionDocument: '61c092975813110e7f72a6af',
    dso: '6185361bf251660e58fd5ed0',
    currency: '5fa95e07231c63088311b178'
  }

  dso = {
    logo: '61c056d9cfca8d0e6d030ab7',
    capitalStructure: 'Fund - Feeder/Sub-Fund',
    network: '5fc0c4a67ae447ee92a3d5b2',
    tokenName: 'Cucumber',
    tokenSymbol: time6,
    uniqueIdentifierCode: 'S123123123123',
    corporate: '61b8afc070e8d60e612d90c0',
    issuerName: 'Cnameqwe',
    currency: '5fa95e07231c63088311b178',
    launchDate: '2022-07-18T21:00:00.000Z',
    completionDate: '2025-12-31T10:11:00.000Z',
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
      { question: 'question1', answer: 'answer1' },
      { question: 'question2', answer: 'answer2' },
      { question: 'question3', answer: 'answer3' }
    ],
    documents: ['61c0573ecfca8d0e6d030aca']
  }
}

export { dso, commitment }
