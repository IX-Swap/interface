import { DSOTableColumn } from 'types/dso'
import { UpdateCustomFieldArgs, CustomField } from 'types/user'

export const updateDSOTableColumnsArgs: UpdateCustomFieldArgs = {
  columns: {
    tokenName: true,
    completionDate: true,
    distributionFrequency: false,
    favorite: true,
    insight: false,
    minimumInvestment: false,
    pricePerUnit: false,
    totalFundraisingAmount: false,
    interestRate: true
  },
  customFields: {}
}

export const defaultDSOColumns: Record<DSOTableColumn, boolean> = {
  tokenName: true,
  completionDate: true,
  distributionFrequency: true,
  favorite: true,
  insight: true,
  minimumInvestment: true,
  pricePerUnit: true,
  totalFundraisingAmount: true,
  interestRate: true
}

export const customField: CustomField = {
  columns: defaultDSOColumns,
  feature: 'offerings',
  service: 'invest',
  customFields: {}
}
