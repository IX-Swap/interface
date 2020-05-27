// @flow
import type { Dso } from 'context/dso/types';

export const actions = {
  SET_SELECTED_DSO: 'SET_SELECTED_DSO',
  CLEAR_SELECTED_DSO: 'CLEAR_SELECTED_DSO',
};

export type InvestState = {
  // selected
  dso: Dso | null,
};
