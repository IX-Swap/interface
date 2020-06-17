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

    case actions.SET_SELECTED_COMMITMENT:
      return {
        ...state,
        commitment: payload,
        editMode: false,
      };

    case actions.TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: payload !== undefined ? payload : !state.editMode,
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
