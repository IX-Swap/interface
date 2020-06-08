// @flow
import { postRequest } from 'services/httpRequests';

import { snackbarService } from 'uno-material-ui';
import { postOrderActions, OrderState } from './types';

async function postOrder(dispatch: Function, payload: OrderState) {
  try {
    dispatch({ type: postOrderActions.GET_POST_ORDER_REQUEST });

    const uri = `/exchange/orders`;
    const result = await postRequest(uri, payload);
    const response = await result.json();

    if (result.status === 200) {
      return response;
    }

    throw new Error(response.message);
  } catch (err) {
    console.log(err.toString());
    dispatch({
      ...err,
      type: postOrderActions.GET_POST_ORDER_FAILURE,
    });
    snackbarService.showSnackbar(err.toString(), 'error');
  }
}

export default {
  postOrder,
};
