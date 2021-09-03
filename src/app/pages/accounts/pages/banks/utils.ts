import { Bank } from 'types/bank'

export const getBankFormDefaultValues = (bank: Bank | undefined) => {
  return bank === undefined
    ? {}
    : {
        ...bank,
        asset: bank.currency._id
      }
}
