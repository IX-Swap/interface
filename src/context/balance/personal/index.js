//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'personalBalanceList'
)

export default {
  PersonalBalancesListProvider: Provider,
  usePersonalBalancesListState: useState,
  usePersonalBalancesListDispatch: useDispatch,
  PERSONAL_BALANCE_LIST_STATUS: statusList
}
