import { DSOTableColumn } from 'types/dso'
import { UpdateCustomFieldArgs, CustomField } from 'types/user'

export const updateDSOTableColumnsArgs: UpdateCustomFieldArgs = {
  columns: {
    corporate: true,
    distributionFrequency: false,
    favorite: true,
    insight: false,
    minimumInvestment: false,
    pricePerUnit: false,
    totalFundraisingAmount: false
  },
  customFields: {}
}

export const defaultDSOColumns: Record<DSOTableColumn, boolean> = {
  corporate: true,
  distributionFrequency: true,
  favorite: true,
  insight: true,
  minimumInvestment: true,
  pricePerUnit: true,
  totalFundraisingAmount: true
}

export const customField: CustomField = {
  _id: '2321312312312312',
  columns: defaultDSOColumns,
  feature: 'offerings',
  service: 'invest',
  user: '2321321312312',
  createdAt: '10-10-2020',
  updatedAt: '10-10-2020'
}
