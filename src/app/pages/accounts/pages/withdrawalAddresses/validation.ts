import * as yup from 'yup'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { BlockchainWallet } from 'config/blockchain'

export const waFormValidationSchema = yup
  .object()
  .shape<WithdrawalAddressFormValues>({
    network: yup.string().required('This field is required'),
    wallet: yup.string<BlockchainWallet>(),
    memo: yup.string(),
    label: yup.string().required('This field is required'),
    address: yup.string().required('This field is required'),
    agree: yup
      .boolean()
      .test('consent', 'You must agree to these terms', value => value === true)
      .required('You must agree to these terms')
  })
