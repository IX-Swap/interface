import { createAction } from '@reduxjs/toolkit'
import { NFTImage } from './types'

export const saveImage = createAction<{ image: NFTImage; id: number }>('nft/saveImage')
export const saveImageIds = createAction<{ ids: number[] }>('nft/saveImageIds')
