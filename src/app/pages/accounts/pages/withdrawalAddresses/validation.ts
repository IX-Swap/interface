import * as yup from 'yup'
import {
  BlockchainAddressVariant,
  WithdrawalAddressFormValues
} from 'types/withdrawalAddress'
import { BlockchainWallet } from 'config/blockchain'

export const waFormValidationSchema = yup
  .object()
  .shape<WithdrawalAddressFormValues>({
    variant: yup.string<BlockchainAddressVariant>().strip(true),
    network: yup.string().required('Required'),
    wallet: yup.string<BlockchainWallet>(),
    memo: yup.string(),
    label: yup.string().required('Required'),
    address: yup.string().required('Required'),
    agree: yup
      .boolean()
      .test('consent', 'You must agree to these terms', value => value === true)
      .required('You must agree to these terms')
  })
