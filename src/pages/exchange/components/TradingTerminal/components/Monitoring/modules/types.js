export const monitoringActions = {
  SET_BID_ASK_PAYLOAD: 'SET_BID_ASK_PAYLOAD',
};

export type PayloadState = {
  pair: string,
  side: string, 
  type: string, 
  price: number, 
  amount: number,
}

export type MonitoringInitState = {
  data: PayloadState
};
  