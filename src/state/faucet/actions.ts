import { createAction } from '@reduxjs/toolkit'

export const setFaucetLoading = createAction<{ loading: boolean }>('faucet/setFaucetLoading')
