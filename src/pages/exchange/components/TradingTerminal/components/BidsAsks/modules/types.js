export const postOrderActions = {
  GET_POST_ORDER_REQUEST: 'GET_POST_ORDER_REQUEST',
  GET_POST_ORDER_SUCCESS: 'GET_POST_ORDER_SUCCESS',
  GET_POST_ORDER_FAILURE: 'GET_POST_ORDER_FAILURE',
};

export const getMarketsActions = {
  GET_MARKET_LIST_REQUEST: 'GET_MARKET_LIST_REQUEST',
  GET_MARKET_LIST_SUCCESS: 'GET_MARKET_LIST_SUCCESS',
  GET_MARKET_LIST_FAILURE: 'GET_MARKET_LIST_FAILURE',
};

export type PostOrderInitState = {
  data: [],
  markets: [],
  isLoading: boolean,
  message?: string,
  error?: string,
};

export type OrderState = {
  pair: string,
  side: string,
  type: string,
  price: number,
  amount: number,
};
