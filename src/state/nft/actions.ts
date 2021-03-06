import { createAction } from '@reduxjs/toolkit'
import { NFTCollection, NFTImage } from './types'

export const importNftCollection = createAction<{ id: string }>('nft/import')
export const setCreateNftLoading = createAction<{ loading: boolean }>('nft/setCreateNftLoading')
export const saveImage = createAction<{ image: NFTImage; id: number }>('nft/saveImage')
export const saveImages = createAction<{ images: NFTImage[]; ids: number[] }>('nft/saveImages')
export const setCollections = createAction<{ collections: Array<NFTCollection> }>('nft/setCollections')
export const setCollectionsLoading = createAction<{ loading: boolean }>('nft/setCollectionsLoading')
