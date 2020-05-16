// @flow
import { generateModule } from 'context/base/withPagination';
import type { Bank } from './types';

const { Provider, useState, useDispatch, statusList } = generateModule<Bank>(
  'bankList'
);

export default {
  BanksListProvider: Provider,
  useBanksListState: useState,
  useBanksListDispatch: useDispatch,
  BANK_LIST_STATUS: statusList,
};
