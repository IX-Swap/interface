import { createReducer } from '@reduxjs/toolkit'
import {
  importNftCollection,
  saveImage,
  saveImages,
  setCollections,
  setCollectionsLoading,
  setCreateNftLoading,
} from './actions'
import { NFTCollection, NFTImage } from './types'

export interface NftState {
  collectionId?: string
  images: any
  createLoading: boolean
  myCollections: Array<NFTCollection>
  collectionsLoading: boolean
}

const initialState: NftState = {
  collectionId: undefined,
  images: {},
  createLoading: false,
  myCollections: [],
  collectionsLoading: false,
}

export default createReducer<NftState>(initialState, (builder) =>
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
    .addCase(setCreateNftLoading, (state, { payload: { loading } }) => {
      return {
        ...state,
        createLoading: loading,
      }
    })
    .addCase(setCollections, (state, { payload: { collections } }) => {
      return {
        ...state,
        myCollections: collections,
      }
    })
    .addCase(setCollectionsLoading, (state, { payload: { loading } }) => {
      return {
        ...state,
        collectionsLoading: loading,
      }
    })
)
