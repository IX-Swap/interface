import { createReducer } from '@reduxjs/toolkit'
import { importNftCollection } from './actions'

export interface NftState {
  collectionId?: string
}

const initialState: NftState = {
  collectionId: undefined,
}

export default createReducer<NftState>(initialState, (builder) =>
  builder.addCase(importNftCollection, (state, { payload: { id } }) => {
    return { collectionId: id }
  })
)
