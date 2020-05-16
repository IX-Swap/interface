// @flow
import actionGenerator from 'context/base/withPagination/actions';

const { getter: getBankAccounts, ...pageMethods } = actionGenerator(
  'bankList',
  '/accounts/banks/list',
  {}
);

export default {
  getBankAccounts,
  ...pageMethods,
};
