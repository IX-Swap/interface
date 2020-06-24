// @flow
import { generateModule } from 'context/base/withPagination'
import type { DSWithdrawal } from './types'

const {
  Provider,
  useState,
  useDispatch,
  statusList
} = generateModule<DSWithdrawal>('getDigitalSecurityWithdrawalsList')

export default {
  DSWithdrawalsListProvider: Provider,
  useDSWithdrawalsListState: useState,
  useDSWithdrawalsListDispatch: useDispatch,
  DS_WITHDRAWALS_LIST_STATUS: statusList
}
