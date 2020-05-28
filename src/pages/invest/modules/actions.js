// @flow
import { postRequest } from 'services/httpRequests';
import localStore from 'services/storageHelper';
import type { Dso } from 'context/dso/types';
import type { Commitment } from 'context/commitment/types';
import { actions } from './types';

export const setSelectedDso = (dispatch: Function, dso: Dso) => {
  dispatch({ type: actions.SET_SELECTED_DSO, payload: dso });
};

export const setSelectedCommitment = (
  dispatch: Function,
  commitment: Commitment
) => {
  dispatch({ type: actions.SET_SELECTED_COMMITMENT, payload: commitment });
};

export const toggleEditMode = (dispatch: Function, value?: boolean) => {
  dispatch({ type: actions.TOGGLE_EDIT_MODE, payload: value });
};

// not using context
export const fetchAccountBalanceByAsset = async (asset: string) => {
  const userId = localStore.getUserId();
  const url = `/accounts/balance/${userId}/${asset}`;

  const response = await postRequest(url, { skip: 0, limit: 50 });
  const result = await response.json();

  if (response.status === 200) {
    return result.data[0].documents[0];
  }

  throw new Error(result.message);
};

// not using context
export const addCommitment = async ({
  dso,
  signedSubscriptionDocument,
  currency,
  walletAddress,
  numberOfUnits,
  otp,
}: {
  dso: string,
  signedSubscriptionDocument: string,
  currency: string,
  walletAddress: string,
  numberOfUnits: number,
  otp: string,
}) => {
  const userId = localStore.getUserId();
  const url = `/issuance/commitments/${userId}`;

  const response = await postRequest(url, {
    dso,
    signedSubscriptionDocument,
    currency,
    walletAddress,
    numberOfUnits,
    otp,
  });
  const result = await response.json();

  if (response.status === 200) {
    return result.data;
  }

  throw new Error(result.message);
};
