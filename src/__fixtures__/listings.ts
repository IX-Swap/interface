import { ListingView } from 'types/listing'
import { corporate, individual } from '__fixtures__/identity'
import { network } from '__fixtures__/network'

export const listing: ListingView = {
  _id: '60b4707afb81376f8cc80a17',
  exchange: {
    markets: []
  },
  decimals: '0',
  minimumTradeUnits: 0,
  maximumTradeUnits: 100,
  raisedAmount: 641,
  documents: [],
  status: 'Submitted',
  promoted: false,
  disabled: false,
  deleted: false,
  createdBy: '5fc0982ef02bc219055a0b9e',
  user: '5fc0982ef02bc219055a0b9e',
  corporate: corporate,
  logo: '60949af34f2c42754b78b679',
  banner: '60949af34f2c42754b78b679',
  tokenName: 'Lesch, Kertzmann and Little',
  tokenSymbol: 'IHWQ',
  launchDate: '2022-04-06T06:57:19.000Z',
  completionDate: '2022-05-17T05:54:32.000Z',
  network: network,
  capitalStructure: 'Hybrid',
  investmentPeriod: 48,
  dividendYield: 0.05,
  interestRate: 0.05,
  grossIRR: 0.1,
  investmentStructure:
    'Aut aut natus qui quibusdam sit quaerat. Assumenda exercitationem illo. Repellendus hic quam. Voluptate placeat consequatur quis. Quo cum et voluptatem ad rerum vel exercitationem aut. Iste porro aut ut a voluptates sunt ut.',
  distributionFrequency: 'Not Applicable',
  leverage: 100,
  equityMultiple: 1.2,
  markets: [
    {
      _id: '60b4707afb81376f8cc80a18',
      currency: '5fd7199deb87068672a27018'
    }
  ],
  team: [
    {
      _id: '60b4707afb81376f8cc80a19',
      name: 'Hadley Larson',
      position: 'CEO',
      about:
        'Distinctio est voluptatem dicta. Ducimus quis perspiciatis optio ad id sed. Beatae et ratione quaerat dolor consequuntur. Ipsam eos voluptatem nihil. Facere ut nobis aperiam.',
      photo: '000000000000000000000001'
    },
    {
      _id: '60b4707afb81376f8cc80a1a',
      name: 'Else Koss',
      position: 'CTO',
      about:
        'Et ea magnam libero recusandae. Est omnis in soluta eos. Dolorem voluptas et. Nulla modi esse illo itaque mollitia. Nulla at ad iusto aut dolor atque omnis deserunt veniam. Et pariatur non maiores id iste et aperiam.',
      photo: '000000000000000000000001'
    },
    {
      _id: '60b4707afb81376f8cc80a1b',
      name: 'Tanya Stracke',
      position: 'CFO',
      about:
        'Voluptates et aut non ex quod ut magnam ut. Itaque inventore ut ea. Exercitationem veritatis adipisci et qui et. Assumenda nam rerum est quas sed soluta fugiat. Est et et a ut incidunt nemo nihil et.',
      photo: '000000000000000000000001'
    }
  ],
  marketType: 'Exchange',
  authorizations: [],
  createdAt: '2021-05-31T05:13:30.997Z',
  updatedAt: '2021-05-31T05:14:01.508Z',
  authorizationDocuments: [],
  identity: {
    corporates: [corporate],
    individual: individual
  }
}
