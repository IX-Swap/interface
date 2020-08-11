//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'authorizerWithdrawsList'
)

export default {
  AuthorizerWithdrawListProvider: Provider,
  useAuhorizerWithdrawListState: useState,
  useAuhorizerWithdrawListDispatch: useDispatch,
  AUTHORIZER_WITHDRAW_LIST_STATUS: statusList
}
