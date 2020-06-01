import { monitoringActions } from './types';

export function monitoringReducer(state, action) {
  switch (action.type) {
    case monitoringActions.SET_BID_ASK_PAYLOAD:
      return {
        ...state,
        ...action.data,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
