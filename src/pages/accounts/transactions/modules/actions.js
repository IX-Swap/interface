// @flow
import actionGenerator from 'context/base/withPagination/actions';
import storage from 'services/storageHelper';

const { getter: getTransactionsList, ...pageMethods } = actionGenerator(
  'transactionsList',
  `/accounts/statement/${storage.getUserId()}`,
  {}
);

export default {
  getTransactionsList,
  ...pageMethods,
};
