// @flow
import { generateModule } from 'context/base/withPagination'
import type { Withdraw } from './types'

const {
  Provider,
  useState,
  useDispatch,
  statusList
} = generateModule<Withdraw>('authorizerWithdrawsList')

export default {
  AuthorizerWithdrawListProvider: Provider,
  useAuhorizerWithdrawListState: useState,
  useAuhorizerWithdrawListDispatch: useDispatch,
  AUTHORIZER_WITHDRAW_LIST_STATUS: statusList
}
