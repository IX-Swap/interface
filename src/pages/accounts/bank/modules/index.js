// @flow
import { generateModule } from 'context/base/withPagination';
import type { Bank } from './types';
import reducer from './reducers';

const { Provider, useState, useDispatch, statusList } = generateModule<Bank>(
  'bankList',
  reducer
);

export default {
  BanksListProvider: Provider,
  useBanksListState: useState,
  useBanksListDispatch: useDispatch,
  BANK_LIST_STATUS: statusList,
};
