// @flow
import { actions } from './types';
import type { InvestState } from './types';

export const investReducer = (
  state: InvestState,
  { type, payload }: { type: string, payload: any }
) => {
  switch (type) {
    case actions.SET_SELECTED_DSO:
      return {
        ...state,
        dso: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
