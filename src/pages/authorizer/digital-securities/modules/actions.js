// @flow
import actionGenerator from 'context/base/withPagination/actions';
import { putRequest } from 'services/httpRequests';
import type { Dso } from 'context/dso/types';

const { getter: getWithdraws, ...pageMethods } = actionGenerator(
  'authorizerDsoList',
  `/issuance/dso/list`,
  {}
);

const toggleWithdrawStatus = async (dso: Dso, newStatus: string) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject';
  const url = `/issuance/dso/${dso._id}/${action}`;
  const response = await putRequest(url);

  return response.status === 200;
};

export default {
  toggleWithdrawStatus,
  getWithdraws,
  ...pageMethods,
};
