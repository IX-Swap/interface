// @flow
import type { PayloadState } from './types'

export const initialState: PayloadState = {
  pair: '',
  side: '',
  type: 'LIMIT',
  price: 0,
  amount: 0
}
