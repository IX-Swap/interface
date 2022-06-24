import { object, string, array } from 'yup'

import { isValidAddress } from 'utils'
import { ROLES } from 'constants/roles'

export const validationSchema = object().shape({
  ethAddress: string()
    .required('Field is required')
    .test('isValidAddress', 'Invalid address', (value = '') => !!isValidAddress(value)),
  username: string().required('Field is required').max(100, 'Max length is 100 chars'),
  role: string().required('Field is required'),
  managerOf: array().test('required', 'Token Manger must have at leatst 1 token', (value, { parent }) => {
    if (parent.role === ROLES.TOKEN_MANAGER) {
      return Boolean(value?.length)
    }
    return true
  }),
})
