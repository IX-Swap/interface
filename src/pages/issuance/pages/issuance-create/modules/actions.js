// @flow
import { postRequest, getRequest } from 'services/httpRequests';
import type { Document } from 'context/dso/types';
import localStore from 'services/storageHelper';
import moment from 'moment';

// TODO: Move to another place for reusability
export const downloadFile = async (document: Document) => {
  const { user, _id } = document;

  const uri = `/dataroom/raw/${user}/${_id}`;
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

export const saveIssuance = async (payload: any) => {
  payload.launchDate = moment().format('MM-DD-YYYY');
  payload.currency = '5ecb6b518caa5b3c19d7b328';
  const uri = `/issuance/dso/${localStore.getUserId()}`;

  try {
    const res = await postRequest(uri, payload);

    if (res.status !== 200) return undefined;

    const { data } = await res.json();

    return data;
  } catch (e) {
    return undefined;
  }
};
