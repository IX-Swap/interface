import { BankFormValues } from 'v2/app/pages/accounts/types'
import { Bank } from 'v2/types/bank'

export const transformBankFormValuesToArgs = (values: BankFormValues) => {
  return {
    ...values,
    supportingDocuments: values.supportingDocuments
      .map(d => d?.value?._id ?? null)
      .filter(value => value !== null)
  }
}

export const getBankFormDefaultValues = (bank: Bank | undefined) => {
  return bank === undefined
    ? { supportingDocuments: [] }
    : {
        ...bank,
        asset: bank.currency._id,
        supportingDocuments: bank.supportingDocuments.map(document => ({
          value: document
        }))
      }
}
