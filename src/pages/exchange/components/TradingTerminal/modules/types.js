export const marketListActions = {
  GET_MARKET_LIST_REQUEST: 'GET_MARKET_LIST_REQUEST',
  GET_MARKET_LIST_SUCCESS: 'GET_MARKET_LIST_SUCCESS',
  GET_MARKET_LIST_FAILURE: 'GET_MARKET_LIST_FAILURE',

  SUBSCRIBE_MARKET_TRADE_REQUEST: 'SUBSCRIBE_MARKET_TRADE_REQUEST',
  SUBSCRIBE_MARKET_TRADE_SUCCESS: 'SUBSCRIBE_MARKET_TRADE_SUCCESS'
}

export type Documents = {
  _id: string,
  listing: {},
  name: string,
  quote: {},
};

export type TradeMarketState = {
  amunt: number,
  count: number,
  price: number,
  total: number,
};

export type MarketList = {
  count: number,
  documents: Documents[],
  limit: number,
  skip: number,
}

export type MarketListState = {
  data: MarketList[],
  isLoading: boolean,
  message?: string,
  error?: string,
};
