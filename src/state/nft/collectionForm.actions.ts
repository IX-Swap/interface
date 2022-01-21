import { createAction } from '@reduxjs/toolkit'
import { FileWithPath } from 'react-dropzone'

export const setLogo = createAction<{ file: FileWithPath | null }>('nft-collection/setLogo')
export const setCover = createAction<{ file: FileWithPath | null }>('nft-collection/setCover')
export const setBanner = createAction<{ file: FileWithPath | null }>('nft-collection/setBanner')
export const setName = createAction<{ name: string }>('nft-collection/setName')
export const setDescription = createAction<{ description: string }>('nft-collection/setDescription')
