import * as yup from 'yup'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { addressValidator } from 'validation/validators'

export const waFormValidationSchema = yup
  .object()
  .shape<WithdrawalAddressFormValues>({
    network: yup.string().required('Required'),
    memo: yup.string(),
    label: yup.string().required('Required'),
    address: yup
      .string()
      .test('address validity', 'Enter Valid Address', addressValidator)
      .required('Required'),
    agree: yup
      .boolean()
      .test('consent', 'You must agree to these terms', value => value === true)
      .required('You must agree to these terms')
  })
