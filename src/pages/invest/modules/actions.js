// @flow
import type { Dso } from 'context/dso/types';
import { actions } from './types';

export const setSelectedDso = (dispatch: Function, dso: Dso) => {
  dispatch({ type: actions.SET_SELECTED_DSO, payload: dso });
};
