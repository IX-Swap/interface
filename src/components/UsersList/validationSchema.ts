import { object, string } from 'yup'

import { isValidAddress } from 'utils'

export const validationSchema = object().shape({
  ethAddress: string()
    .required('Field is required')
    .test('isValidAddress', 'Invalid address', (value = '') => !!isValidAddress(value)),
  username: string().required('Field is required').max(100, 'Max length is 100 chars'),
  role: string().required('Field is required'),
})
