import * as yup from 'yup'
import { WithdrawalAddressFormValues } from 'v2/types/withdrawalAddress'

export const waFormValidationSchema = yup
  .object()
  .shape<WithdrawalAddressFormValues>({
    network: yup.string().required('Required'),
    memo: yup.string().required('Required'),
    label: yup.string().required('Required'),
    address: yup.string().required('Required'),
    agree: yup
      .boolean()
      .test('consent', 'You must agree to these terms', value => value === true)
      .required('You must agree to these terms')
  })
