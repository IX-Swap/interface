// @flow
import actionGenerator from 'context/base/withPagination/actions';
import type { Commitment } from 'context/commitment/types';
import { snackbarService } from 'uno-material-ui';
import { putRequest, getRequest } from 'services/httpRequests';

const { getter: getCommitments, ...pageMethods } = actionGenerator(
  'authorizerCommitmentList',
  `/issuance/commitments/list`,
  {}
);

export const toggleCommitmentStatus = async (
  commitment: Commitment,
  newStatus: string
) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject';
  const url = `/issuance/commitments/${commitment._id}/${action}`;
  const response = await putRequest(url);

  return response.status === 200;
};

export const downloadFile = async (documentId: string) => {
  try {
    const uri = `/issuance/dso/dataroom/subscription/raw/${documentId}`;
    const result = await getRequest(uri);

    if (result.status === 200) {
      result.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
      return;
    }

    snackbarService.showSnackbar('Download failed', 'error');
  } catch (err) {
    snackbarService.showSnackbar('Download failed', 'error');
  }
};

export default {
  toggleCommitmentStatus,
  getCommitments,
  ...pageMethods,
};
