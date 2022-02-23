import { createReducer } from '@reduxjs/toolkit'
import {
  setBanner,
  setCover,
  setDescription,
  setLogo,
  setName,
  setMaxSupply,
  setClearCollectionState,
} from './collectionForm.actions'
import { CollectionForm } from './types'

const initialState: CollectionForm = {
  logo: null,
  cover: null,
  banner: null,
  name: '',
  description: '',
  maxSupply: 1000,
}

export default createReducer<CollectionForm>(initialState, (builder) =>
  builder
    .addCase(setLogo, (state, { payload: { file } }) => {
      state.logo = file
    })
    .addCase(setBanner, (state, { payload: { file } }) => {
      state.banner = file
    })
    .addCase(setCover, (state, { payload: { file } }) => {
      state.cover = file
    })
    .addCase(setDescription, (state, { payload: { description } }) => {
      state.description = description
    })
    .addCase(setName, (state, { payload: { name } }) => {
      state.name = name
    })
    .addCase(setMaxSupply, (state, { payload: { maxSupply } }) => {
      state.maxSupply = maxSupply
    })
    .addCase(setClearCollectionState, (state) => {
      state.logo = null
      state.banner = null
      state.cover = null
      state.name = ''
      state.description = ''
      state.maxSupply = 1000
    })
)
