// @flow
import { getRequest, postRequest } from 'services/httpRequests';
import storageHelper from 'services/storageHelper';

import type { Dso } from 'context/dso/types';

export const getDso = async (id: string): Promise<?Dso> => {
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

export const deployDso = async (id: string): Promise<?Dso> => {
  try {
    const url = `/x-token/deploy/${storageHelper.getUserId()}/${id}`;
    const res = await postRequest(url);

    if (res.status !== 200) {
      return undefined;
    }

    const { data } = await res.json();

    return data;
  } catch (e) {
    return undefined;
  }
};
