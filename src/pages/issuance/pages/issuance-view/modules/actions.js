// @flow
import { putRequest, getRequest } from 'services/httpRequests';
import type { Document } from 'context/dso/types';
import localStore from 'services/storageHelper';
// TODO: Move to another place for reusability
export const downloadFile = async (dsoId: string, document: Document) => {
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

export const saveIssuance = async (id: string, payload: any) => {
  const uri = `/issuance/dso/${localStore.getUserId()}/${id}`;

  try {
    const res = await putRequest(uri, payload);

    if (res.status !== 200) return undefined;

    const { data } = await res.json();

    return data;
  } catch (e) {
    return undefined;
  }
};
