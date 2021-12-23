import { createReducer } from '@reduxjs/toolkit'
import { saveImage, saveImages } from './actions'
import { NFTImage, NFTState } from './types'

const initialState: NFTState = {
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
)
