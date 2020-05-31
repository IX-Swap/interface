export const postOrderActions = {
  GET_POST_ORDER_REQUEST: 'GET_POST_ORDER_REQUEST',
  GET_POST_ORDER_SUCCESS: 'GET_POST_ORDER_SUCCESS',
  GET_POST_ORDER_FAILURE: 'GET_POST_ORDER_FAILURE',
};

export type PostOrderInitState = {
  data: [],
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
  