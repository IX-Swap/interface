// @flow
import actionGenerator from 'context/base/withPagination/actions';
import { putRequest, getRequest } from 'services/httpRequests';
import storageHelper from 'services/storageHelper';
import type { Dso, Document } from 'context/dso/types';

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

// TODO: Move to another place for reusability
const downloadFile = async (dsoId: string, document: Document) => {
  const { _id } = document;

  const uri = `/issuance/dso/dataroom/documents/raw/${dsoId}/${_id}`;
  const result = await getRequest(uri);

  if (result.status === 200) {
    result.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  } else {
    throw new Error('Download Failed.');
  }
};

const getDso = async (id: string): Promise<?Dso> => {
  try {
    const url = `/issuance/dso/${storageHelper.getUserId()}/${id}`;
    const res = await getRequest(url);

    if (res.status !== 200) {
      return undefined;
    }

    const { data } = await res.json();

    return data;
  } catch (e) {
    return undefined;
  }
};

export default {
  toggleWithdrawStatus,
  getWithdraws,
  getDso,
  downloadFile,
  ...pageMethods,
};
