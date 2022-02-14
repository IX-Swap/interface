import { FinancialReport } from 'types/financitalReport'
import { dso } from '__fixtures__/authorizer'

export const sampleFinancialReport: FinancialReport = {
  _id: '61fcb42223f48709b125fac5',
  reportDocuments: [
    {
      _id: '61fcb42023f48709b125fabf',
      user: '5fc0982ef02bc219055a0b9e',
      title: 'Documents ',
      type: 'Documents ',
      originalFileName: 'Subscription.pdf',
      createdAt: '2022-02-04T05:05:36.032Z',
      updatedAt: '2022-02-04T05:05:36.032Z'
    },
    {
      _id: '61fcb42023f48709b125fac1',
      user: '5fc0982ef02bc219055a0b9e',
      title: 'Documents ',
      type: 'Documents ',
      originalFileName: 'Supporting.pdf',
      createdAt: '2022-02-04T05:05:36.092Z',
      updatedAt: '2022-02-04T05:05:36.092Z'
    }
  ],
  dso: dso,
  nav: 1,
  dateFrom: '2022-02-28T05:05:00.000Z',
  dateTo: '2022-02-28T05:05:00.000Z',
  createdAt: '2022-02-04T05:05:38.440Z'
}
