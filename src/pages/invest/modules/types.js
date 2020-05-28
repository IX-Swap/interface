// @flow
import type { Dso } from 'context/dso/types';
import type { Commitment } from 'context/commitment/types';

export const actions = {
  SET_SELECTED_DSO: 'SET_SELECTED_DSO',
  CLEAR_SELECTED_DSO: 'CLEAR_SELECTED_DSO',
  SET_SELECTED_COMMITMENT: 'SET_SELECTED_COMMITMENT',
  CLEAR_SELECTED_COMMITMENT: 'CLEAR_SELECTED_COMMITMENT',
  TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE',
};

export type InvestState = {
  // selected
  dso: Dso | null,
  editMode: boolean,
  commitment: Commitment | null,
};
