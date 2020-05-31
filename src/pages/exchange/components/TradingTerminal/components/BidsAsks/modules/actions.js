// @flow
import { postRequest } from 'services/httpRequests';

import { postOrderActions, OrderState} from './types';

async function postOrder(dispatch: Function, payload: OrderState) {
  try {
    dispatch({ type: postOrderActions.GET_POST_ORDER_REQUEST });

    const uri = `/exchange/orders`;
    const result = await postRequest(uri, payload);
    const response = await result.json();

    if (result.status === 200) {
      console.log('response', response);
      // dispatch({ 
      //   type: postOrderActions.GET_POST_ORDER_SUCCESS,
      //   data: response.data,
      // });
      // return response.data;
    } else {
      // dispatch({ type: postOrderActions.GET_POST_ORDER_FAILURE });
    }

    throw new Error(response.message);
  } catch (err) {
      // dispatch({ 
      //   ...err,
      //   type: postOrderActions.GET_POST_ORDER_FAILURE
      // });
      // throw new Error(err);
  }
}

export default {
  postOrder,
};
