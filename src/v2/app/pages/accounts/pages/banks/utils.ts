import { BankFormValues } from '../../types'
import { Bank } from '../../../../../types/bank'

export const transformBankFormValuesToArgs = (values: BankFormValues) => {
  return {
    ...values,
    supportingDocuments: values.supportingDocuments.map(d => d.value._id)
  }
}

export const getBankFormDefaultValues = (bank: Bank | undefined) => {
  return bank === undefined
    ? { supportingDocuments: [] }
    : {
        ...bank,
        asset: bank.currency._id,
        supportingDocuments: bank.supportingDocuments.map(d => ({
          value: d
        }))
      }
}
