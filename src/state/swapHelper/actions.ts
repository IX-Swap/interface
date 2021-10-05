import { createAction } from '@reduxjs/toolkit'
import { SwapAuthorization } from './typings'

export const saveAuthorization =
  createAction<{ authorization: SwapAuthorization | null; chainId: number; address: string }>(
    'swapHelper/saveAuthorization'
  )
