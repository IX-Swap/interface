//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'authorizerDsWithdrawsList'
)

export default {
  AuthorizerDSWithdrawListProvider: Provider,
  useAuhorizerDSWithdrawListState: useState,
  useAuhorizerDSWithdrawListDispatch: useDispatch,
  AUTHORIZER_DS_WITHDRAW_LIST_STATUS: statusList
}
