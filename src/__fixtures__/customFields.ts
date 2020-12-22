import { DSOTableColumn } from 'types/dso'
import { UpdateCustomFieldArgs, CustomField } from 'types/user'

export const updateDSOTableColumnsArgs: UpdateCustomFieldArgs = {
  columns: {
    tokenName: true,
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
  tokenName: true,
  distributionFrequency: true,
  favorite: true,
  insight: true,
  minimumInvestment: true,
  pricePerUnit: true,
  totalFundraisingAmount: true
}

export const customField: CustomField = {
  columns: defaultDSOColumns,
  feature: 'offerings',
  service: 'invest',
  customFields: {}
}
