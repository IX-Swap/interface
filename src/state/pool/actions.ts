import { createAction } from '@reduxjs/toolkit'

export const setPoolTransctionHash = createAction<{ transactionHash: null | string }>('pool/loading')
