import { TableColumn } from 'types/util'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'

export const mockColumns: Array<
  TableColumn<DigitalSecurityOffering, DSOTableColumn>
> = [
  {
    key: 'favorite',
    label: 'favorite'
  },
  {
    key: 'tokenName',
    label: 'Offer Name'
  },
  {
    key: 'completionDate',
    label: 'Closing Date'
  },
  {
    key: 'pricePerUnit',
    label: 'pricePerUnit'
  },
  {
    key: 'totalFundraisingAmount',
    label: 'totalFundraisingAmount'
  },
  {
    key: 'minimumInvestment',
    label: 'minimumInvestment'
  },
  {
    key: 'distributionFrequency',
    label: 'distributionFrequency'
  },
  {
    key: 'interestRate',
    label: 'Expected Return'
  }
]

export const mockDefaultColumns: Record<DSOTableColumn, boolean> = {
  favorite: true,
  completionDate: true,
  tokenName: true,
  insight: true,
  pricePerUnit: true,
  totalFundraisingAmount: true,
  minimumInvestment: true,
  distributionFrequency: true,
  interestRate: true
}
