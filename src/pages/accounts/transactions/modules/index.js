//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'transactionsList'
)

export default {
  TransactionsListProvider: Provider,
  useTransactionsListState: useState,
  useTransactionsListDispatch: useDispatch,
  TRANSACTIONS_LIST_STATUS: statusList
}
