import * as yup from 'yup'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { BlockchainWallet } from 'config/blockchain'
import { validationMessages } from 'validation/shared'

export const waFormValidationSchema = yup
  .object()
  .shape<WithdrawalAddressFormValues>({
    network: yup.string().required(validationMessages.required),
    wallet: yup.string<BlockchainWallet>(),
    memo: yup.string(),
    label: yup.string().required(validationMessages.required),
    address: yup.string().required(validationMessages.required),
    agree: yup
      .boolean()
      .test('consent', 'You must agree to these terms', value => value === true)
      .required('You must agree to these terms')
  })
