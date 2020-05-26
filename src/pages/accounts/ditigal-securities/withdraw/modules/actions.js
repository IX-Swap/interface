// @flow
import actionGenerator from 'context/base/withPagination/actions';
import storage from 'services/storageHelper';

const {
  getter: getDigitalSecurityWithdrawals,
  ...pageMethods
} = actionGenerator(
  'getDigitalSecurityWithdrawalsList',
  `/accounts/security/withdrawals/list/${storage.getUserId()}`,
  {}
);

export default {
  getDigitalSecurityWithdrawals,
  ...pageMethods,
};
