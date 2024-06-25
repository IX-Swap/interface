import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
  isConnected: boolean;
  walletName: string;
}

const initialState: GameState = {
  isConnected: false,
  walletName: '',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletState(state, action) {
      const newState = { ...state, ...action.payload };

      return newState;
    },
    resetWalletState: () => initialState,
  },
});

export const { setWalletState, resetWalletState } = walletSlice.actions;
export default walletSlice.reducer;
