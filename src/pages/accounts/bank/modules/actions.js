// @flow
import { postRequest } from 'services/httpRequests';

import { bankListActions } from './types';

export async function getBankAccounts(
  dispatch: Function,
  payload: {
    ref: { current: boolean, ... },
    skip?: number,
    limit?: number,
    ...
  }
) {
  const { ref, ...data } = payload || { ref: {} };

  try {
    dispatch({ type: bankListActions.BANK_LIST_GET_REQUEST });
    const uri = '/accounts/banks/list';
    const result = await postRequest(uri, {
      skip: 0,
      limit: 50,
      ...data,
    });

    if (!ref.current) return null;

    if (result.status === 200) {
      const response = await result.json();
      let dPayload = { total: 0, banks: [] };

      if (response.data.length) {
        const { limit, count, skip, documents } = response.data[0];
        dPayload = {
          page: Math.floor(skip / limit) + 1,
          total: count,
          assets: documents,
        };
      }

      dispatch({
        type: bankListActions.BANK_LIST_GET_SUCCESS,
        payload: dPayload,
      });
    } else {
      dispatch({
        type: bankListActions.BANK_LIST_GET_FAILURE,
        payload: result.message,
      });
    }
  } catch (err) {
    dispatch({ type: bankListActions.BANK_LIST_GET_FAILURE });
  }
}
