// @flow
import { generateModule } from 'context/base/withPagination';
import type { Transaction } from './types';

const {
  Provider,
  useState,
  useDispatch,
  statusList,
} = generateModule<Transaction>('transactionsList');

export default {
  TransactionsListProvider: Provider,
  useTransactionsListState: useState,
  useTransactionsListDispatch: useDispatch,
  TRANSACTIONS_LIST_STATUS: statusList,
};
