import { IssuanceDataExtract } from 'state/issuance/types'
import { useUserState } from 'state/user/hooks'

export const adminOnlyFields: (keyof IssuanceDataExtract)[] = ['occupation', 'income', 'age']
export const adminOnlyHead = ['Occupation', 'Income', 'Age']

export type ExtractFieldsForm = { [K in keyof IssuanceDataExtract]: boolean }
export type ExtractedFields = (keyof IssuanceDataExtract)[]
const getFields = (isAdmin: boolean) => {
  const extraHeads = isAdmin ? adminOnlyHead : []
  const extraFields = isAdmin ? adminOnlyFields : []
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
    'Investment round',
    'Wish investment amount',
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
    'stage',
    'wishAmount',
  ]
  const initialValues = fields.reduce((acc, current) => ({ ...acc, [current]: true }), {} as ExtractFieldsForm)

  return { header, fields, initialValues }
}

export const useFieldsByRole = () => {
  const { me } = useUserState()
  const isAdmin = me.role === 'admin'
  return { ...getFields(isAdmin), isAdmin }
}
