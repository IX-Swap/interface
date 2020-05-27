// @flow
import type { MarketListState } from './types';

export const initialState: MarketListState = {
  data: [],
  isLoading: false,
  message: '',
  error: '',
};
