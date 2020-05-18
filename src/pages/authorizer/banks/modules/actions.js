// @flow
import actionGenerator from 'context/base/withPagination/actions';
import type { Bank } from 'pages/accounts/bank/modules/types';
import { putRequest } from 'services/httpRequests';

const { getter: getBankAccounts, ...pageMethods } = actionGenerator(
  'authorizerBanksList',
  `/accounts/banks/list/`,
  {}
);

const toggleBankStatus = async (bank: Bank, newStatus: string) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject';
  const url = `/accounts/banks/${bank._id}/${action}`;
  const response = await putRequest(url);

  return response.status === 200;
};

export default {
  toggleBankStatus,
  getBankAccounts,
  ...pageMethods,
};
