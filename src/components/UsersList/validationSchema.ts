import { object, string } from 'yup'

import { isValidAddress } from 'utils'

export const validationSchema = object().shape({
  ethAddress: string()
    .required('Field is required')
    .test('isValidAddress', 'Invalid address', (value = '') => !!isValidAddress(value)),
  username: string().required('Field is required'),
  role: string().required('Field is required'),
})
