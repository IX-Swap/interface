import { createAction } from '@reduxjs/toolkit'
import { NFTImage } from './types'

export const saveImage = createAction<{ image: NFTImage; id: number }>('nft/saveImage')
export const saveImages = createAction<{ images: NFTImage[]; ids: number[] }>('nft/saveImages')
