// @flow
import { getRequest, postRequest } from 'services/httpRequests';
import storageHelper from 'services/storageHelper';

import type { Dso } from 'context/dso/types';

import { actions } from './types';

export const setSelectedDso = (dispatch: Function, dso: Dso) => {
  dispatch({ type: actions.SET_SELECTED_DSO, payload: dso });
};

export const getDso = async (userId: string, id: string): Promise<?Dso> => {
  try {
    const url = `/issuance/dso/${userId}/${id}`;
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
