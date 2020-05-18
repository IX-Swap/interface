// @flow
import { generateModule } from 'context/base/withPagination';
import type { Bank } from 'pages/accounts/bank/modules/types';

const { Provider, useState, useDispatch, statusList } = generateModule<Bank>(
  'authorizerBanksList'
);

export default {
  AuthorizerBanksListProvider: Provider,
  useAuhorizerBanksListState: useState,
  useAuhorizerBanksListDispatch: useDispatch,
  AUTHORIZER_BANK_LIST_STATUS: statusList,
};
