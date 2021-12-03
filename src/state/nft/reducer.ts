import { createReducer } from '@reduxjs/toolkit'
import { saveImage, saveImageIds } from './actions'
import { NFTState } from './types'

const initialState: NFTState = {
  images: {},
  imageIds: {},
}

export default createReducer<NFTState>(initialState, (builder) =>
  builder
    .addCase(saveImage, (state, { payload: { image, id } }) => {
      state.images[id] = image
    })
    .addCase(saveImageIds, (state, { payload: { ids } }) => {
      state.imageIds = ids.reduce((a, v) => ({ ...a, [v]: '' }), {})
    })
)
