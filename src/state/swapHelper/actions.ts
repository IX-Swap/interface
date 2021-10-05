import { createAction } from '@reduxjs/toolkit'

export const saveAuthorization = createAction<{ authorization: any | null }>('swapHelper/saveAuthorization')
