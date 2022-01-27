import { createReducer } from '@reduxjs/toolkit'
import {
  setBanner,
  setCover,
  setDescription,
  setLogo,
  setName,
  setClearCollectionState,
} from './collectionForm.actions'
import { CollectionForm } from './types'

const initialState: CollectionForm = {
  logo: null,
  cover: null,
  banner: null,
  name: '',
  description: '',
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
    .addCase(setClearCollectionState, (state) => {
      state.logo = null
      state.banner = null
      state.cover = null
      state.name = ''
      state.description = ''
    })
)
