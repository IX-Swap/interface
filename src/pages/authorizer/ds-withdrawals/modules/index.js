// @flow
import { generateModule } from 'context/base/withPagination';
import type { DSWithdrawal } from './types';

const {
  Provider,
  useState,
  useDispatch,
  statusList,
} = generateModule<DSWithdrawal>('authorizerDsWithdrawsList');

export default {
  AuthorizerDSWithdrawListProvider: Provider,
  useAuhorizerDSWithdrawListState: useState,
  useAuhorizerDSWithdrawListDispatch: useDispatch,
  AUTHORIZER_DS_WITHDRAW_LIST_STATUS: statusList,
};
