// @flow
import { generateModule } from 'context/base/withPagination'
import type { Deposit } from './types'

const { Provider, useState, useDispatch, statusList } = generateModule<Deposit>(
  'authorizerDepositsList'
)

export default {
  AuthorizerDepositListProvider: Provider,
  useAuhorizerDepositListState: useState,
  useAuhorizerDepositListDispatch: useDispatch,
  AUTHORIZER_DEPOSIT_LIST_STATUS: statusList
}
