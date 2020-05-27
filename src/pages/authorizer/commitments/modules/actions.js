// @flow
import actionGenerator from 'context/base/withPagination/actions';
import type { Commitment } from 'context/commitment/types';
import { putRequest } from 'services/httpRequests';

const { getter: getCommitments, ...pageMethods } = actionGenerator(
  'authorizerCommitmentList',
  `/issuance/commitments/list`,
  {}
);

const toggleCommitmentStatus = async (
  commitment: Commitment,
  newStatus: string
) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject';
  const url = `/identity/corporates/${commitment._id}/${action}`;
  const response = await putRequest(url);

  return response.status === 200;
};

export default {
  toggleCommitmentStatus,
  getCommitments,
  ...pageMethods,
};
