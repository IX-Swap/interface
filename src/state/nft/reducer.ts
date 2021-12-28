import { createReducer } from '@reduxjs/toolkit'
import { saveImage, saveImages, importNftCollection } from './actions'
import { NFTImage, NFTState } from './types'

export interface NftState {
  collectionId?: string
  images: any
}

const initialState: NftState = {
  collectionId: undefined,
  images: {},
}

export default createReducer<NFTState>(initialState, (builder) =>
  builder
    .addCase(saveImage, (state, { payload: { image, id } }) => {
      state.images[id] = image
    })
    .addCase(saveImages, (state, { payload: { images, ids } }) => {
      const initial: { [id: string]: NFTImage } = {}
      const newImageMap = ids.reduce((accum, current: number, id) => {
        return { ...accum, [String(current)]: images[id] }
      }, initial)
      state.images = newImageMap
    })
    .addCase(importNftCollection, (state, { payload: { id } }) => {
      return {
        ...state,
        collectionId: id,
      }
    })
)
