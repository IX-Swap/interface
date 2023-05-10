import { IssuanceDataExtract } from 'state/issuance/types'
import { useRole } from 'state/user/hooks'
import { IssuanceReportTab } from './types'

export const adminOnlyFields: (keyof IssuanceDataExtract)[] = ['occupation', 'income', 'age']
export const adminOnlyHead = ['Occupation', 'Income', 'Age']

export type ExtractFieldsForm = { [K in keyof IssuanceDataExtract]: boolean }
export type ExtractedFields = (keyof IssuanceDataExtract)[]
const getFields = (isAdmin: boolean, tab: IssuanceReportTab) => {
  const extraHeads = isAdmin ? adminOnlyHead : []
  const lastHead = tab === IssuanceReportTab.INVESTMENTS ? 'Investment round' : 'Wish investment amount'

  const extraFields = isAdmin ? adminOnlyFields : []
  const lastField = tab === IssuanceReportTab.INVESTMENTS ? 'stage' : 'wishAmount'

  const header = [
    'Name',
    'Company Name',
    'Investment amount',
    'Amount of tokens',
    'Wallet address',
    'Transaction ID',
    'Nationality',
    'Country',
    'Accredited investor',
    'Email',
    ...extraHeads,
    lastHead,
  ]
  const fields: (keyof IssuanceDataExtract)[] = [
    'name',
    'companyName',
    'investmentAmount',
    'tokenAmount',
    'walletAddress',
    'transactionId',
    'nationality',
    'country',
    'accredited',
    'email',
    ...extraFields,
    lastField,
  ]
  const initialValues = fields.reduce((acc, current) => ({ ...acc, [current]: true }), {} as ExtractFieldsForm)

  return { header, fields, initialValues }
}

export const useFieldsByRole = (tab: IssuanceReportTab) => {
  const { isAdmin } = useRole()
  return { ...getFields(isAdmin, tab) }
}
