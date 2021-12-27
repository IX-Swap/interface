import { createAction } from '@reduxjs/toolkit'

export const importNftCollection = createAction<{ id: string }>('nft/import')
