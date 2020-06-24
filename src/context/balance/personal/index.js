// @flow
import { generateModule } from 'context/base/withPagination'
import type { Balance } from '../types'

const { Provider, useState, useDispatch, statusList } = generateModule<Balance>(
  'personalBalanceList'
)

export default {
  PersonalBalancesListProvider: Provider,
  usePersonalBalancesListState: useState,
  usePersonalBalancesListDispatch: useDispatch,
  PERSONAL_BALANCE_LIST_STATUS: statusList
}
