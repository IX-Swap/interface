import { TableColumn } from 'types/util'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'

export const mockColumns: Array<TableColumn<
  DigitalSecurityOffering,
  DSOTableColumn
>> = [
  {
    key: 'favorite',
    label: 'favorite'
  },
  {
    key: 'corporate',
    label: 'corporate'
  },
  {
    key: 'insight',
    label: 'insight'
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
  }
]

export const mockDefaultColumns: Record<DSOTableColumn, boolean> = {
  favorite: true,
  corporate: true,
  insight: true,
  pricePerUnit: true,
  totalFundraisingAmount: true,
  minimumInvestment: true,
  distributionFrequency: true
}
