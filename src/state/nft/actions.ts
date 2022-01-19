import { createAction } from '@reduxjs/toolkit'
import { FileWithPath } from 'react-dropzone'
import { NFTCollection, NFTImage, NumericTrait, Trait, TraitType } from './types'

export const importNftCollection = createAction<{ id: string }>('nft/import')
export const setCreateNftLoading = createAction<{ loading: boolean }>('nft/setCreateNftLoading')
export const saveImage = createAction<{ image: NFTImage; id: number }>('nft/saveImage')
export const saveImages = createAction<{ images: NFTImage[]; ids: number[] }>('nft/saveImages')
export const setCollections = createAction<{ collections: Array<NFTCollection> }>('nft/setCollections')
export const setCollectionsLoading = createAction<{ loading: boolean }>('nft/setCollectionsLoading')

// form actions
export const setFile = createAction<{ file: FileWithPath | null }>('nft/setFile')
export const setPreview = createAction<{ file: FileWithPath | null }>('nft/setPreview')
export const setName = createAction<{ name: string }>('nft/setName')
export const setLink = createAction<{ link: string }>('nft/setLink')
export const setFreeze = createAction<{ freeze: boolean }>('nft/setFreeze')
export const setCollection = createAction<{ collection: NFTCollection | null }>('nft/setCollection')
export const setDescription = createAction<{ description: string }>('nft/setDescription')
export const setActiveTraitType = createAction<{ trait: TraitType }>('nft/setActiveTraitType')
export const setProperties = createAction<{ properties: Array<Trait> }>('nft/setProperties')
export const setLevels = createAction<{ levels: Array<NumericTrait> }>('nft/setLevels')
export const setStats = createAction<{ stats: Array<NumericTrait> }>('nft/setStats')
export const setNSFW = createAction<{ isNSFW: boolean }>('nft/setNSFW')
export const setNewCollectionName = createAction<{ name: string }>('nft/setNewCollectionName')
export const setSelectedContractAddress = createAction<{ address: string }>('nft/setSelectedContractAddress')
export const setMaxSupply = createAction<{ supply: number }>('nft/setMaxSupply')
// end form actions
