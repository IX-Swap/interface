import { object, string } from 'yup'

import { isValidAddress } from 'utils'

export const schema = object().shape({
  walletAddress: string()
    .required('Field is required')
    .test('isValidAddress', 'Invalid address', (value = '') => !!isValidAddress(value)),
  fullName: string().required('Field is required').max(100, 'Max length is 100 chars'),
})
