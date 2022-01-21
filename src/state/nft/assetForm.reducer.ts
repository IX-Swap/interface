import { createReducer } from '@reduxjs/toolkit'
import {
  setActiveTraitType,
  setCollection,
  setDescription,
  setFile,
  setFreeze,
  setLevels,
  setLink,
  setMaxSupply,
  setName,
  setNewCollectionName,
  setNSFW,
  setPreview,
  setProperties,
  setSelectedContractAddress,
  setStats,
} from './assetForm.actions'
import { AssetForm, TraitType } from './types'

const initialState: AssetForm = {
  file: null,
  preview: null,
  name: '',
  link: '',
  freeze: false,
  collection: null,
  description: '',
  activeTraitType: TraitType.RECTANGLE,
  properties: [],
  levels: [],
  stats: [],
  isNSFW: false,
  newCollectionName: '',
  selectedContractAddress: '',
  maxSupply: 1000,
}

export default createReducer<AssetForm>(initialState, (builder) =>
  builder
    .addCase(setFile, (state, { payload: { file } }) => {
      state.file = file
    })
    .addCase(setPreview, (state, { payload: { file } }) => {
      state.preview = file
    })
    .addCase(setName, (state, { payload: { name } }) => {
      state.name = name
    })
    .addCase(setCollection, (state, { payload: { collection } }) => {
      state.collection = collection
    })
    .addCase(setDescription, (state, { payload: { description } }) => {
      state.description = description
    })
    .addCase(setLink, (state, { payload: { link } }) => {
      state.link = link
    })
    .addCase(setFreeze, (state, { payload: { freeze } }) => {
      state.freeze = freeze
    })
    .addCase(setActiveTraitType, (state, { payload: { trait } }) => {
      state.activeTraitType = trait
    })
    .addCase(setProperties, (state, { payload: { properties } }) => {
      state.properties = properties
    })
    .addCase(setLevels, (state, { payload: { levels } }) => {
      state.levels = levels
    })
    .addCase(setStats, (state, { payload: { stats } }) => {
      state.stats = stats
    })
    .addCase(setNSFW, (state, { payload: { isNSFW } }) => {
      state.isNSFW = isNSFW
    })
    .addCase(setNewCollectionName, (state, { payload: { name } }) => {
      state.newCollectionName = name
    })
    .addCase(setSelectedContractAddress, (state, { payload: { address } }) => {
      state.selectedContractAddress = address
    })
    .addCase(setMaxSupply, (state, { payload: { supply } }) => {
      state.maxSupply = supply
    })
)
