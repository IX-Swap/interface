// @flow
import actionGenerator from 'context/base/withPagination/actions';

import { postRequest } from 'services/httpRequests';

import { marketListActions } from './types';

async function postMarkets(dispatch: Function, payload: { skip: number, limit: number }) {
  try {
    dispatch({ type: marketListActions.GET_MARKET_LIST_REQUEST });

    const uri = `/exchange/markets/list`;
    const result = await postRequest(uri, payload);
    const response = await result.json();

    if (result.status === 200) {
      dispatch({ 
        type: marketListActions.GET_MARKET_LIST_SUCCESS,
        data: response.data,
      });
      return response.data;
    } else {
      dispatch({ type: marketListActions.GET_MARKET_LIST_FAILURE });
    }

    throw new Error(response.message);
  } catch (err) {
      dispatch({ 
        ...err,
        type: marketListActions.GET_MARKET_LIST_FAILURE
      });
      throw new Error(err);
  }
}

const { getter: getMarketList, ...pageMethods } = actionGenerator(
  'marketList',
  `/exchange/markets/list`,
  {}
);

export default {
    postMarkets,
    getMarketList,
    ...pageMethods,
};
