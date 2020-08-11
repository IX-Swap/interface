//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'authorizerDepositsList'
)

export default {
  AuthorizerDepositListProvider: Provider,
  useAuhorizerDepositListState: useState,
  useAuhorizerDepositListDispatch: useDispatch,
  AUTHORIZER_DEPOSIT_LIST_STATUS: statusList
}
