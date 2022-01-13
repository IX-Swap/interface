import { t } from '@lingui/macro'
import { SupportedChainId } from 'constants/chains'
import { FileWithPath } from 'react-dropzone'

export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface NFTAttributeDisplay extends NFTAttribute {
  max_value: number
  display_type: string
}

export interface NFTImage {
  name: string
  description: string
  image: string
  date?: number
  attributes: (NFTAttribute | NFTAttributeDisplay)[]
}

export interface NFTImageShow {
  name: string
  description: string
  image: string
  date?: number
  attributes: (NFTAttribute | NFTAttributeDisplay)[]
  isNSFW: string
}

export interface NFTCollection {
  id?: number
  name: string
  address: string
  description?: string
  // featured: string
  logo?: string
  banner?: string
}

export enum TraitType {
  RECTANGLE = 'RECTANGLE',
  PROGRESS = 'PROGRESS',
  NUMBER = 'NUMBER',
}

export const traitsTitle = {
  [TraitType.RECTANGLE]: t`Properties`,
  [TraitType.PROGRESS]: t`Levels`,
  [TraitType.NUMBER]: t`Stats`,
}
export const displayType = {
  [TraitType.RECTANGLE]: t`rectangle`,
  [TraitType.PROGRESS]: t`level`,
  [TraitType.NUMBER]: t`stat`,
}
export const traitsSubtitle = {
  [TraitType.RECTANGLE]: t`Textual traits that show up as rectangles`,
  [TraitType.PROGRESS]: t`Numerical traits that show as a progress bar`,
  [TraitType.NUMBER]: t`Numerical traits that just show as numbers`,
}

export interface Trait {
  trait_type: string
  value: string
}

export interface NumericTrait {
  trait_type: string
  value: number
  max_value: number
}

export interface KeyValues {
  description?: string
  link?: string
  attributes?: Array<any>
  isNSFW?: any
  // selectedChain?: SupportedChainId
}
export interface GroupKeyValuesInput {
  description?: string
  link?: string
  stats: Array<NumericTrait>
  levels: Array<NumericTrait>
  properties: Array<Trait>
  isNSFW?: boolean
}
export interface NftCreateProps {
  file: FileWithPath
  name: string
  keyValues: KeyValues
  freeze?: boolean
}

export interface CollectionCreateProps {
  name: string
  address: string
}

export interface CollectionUpdateProps {
  name: string
  description: string
  logo: FileWithPath
  cover: FileWithPath
}

export interface AssetForm {
  file: FileWithPath | null
  preview: FileWithPath | null
  name: string
  link: string
  freeze: boolean
  collection: NFTCollection | null
  description: string
  activeTraitType: TraitType
  properties: Array<Trait>
  levels: Array<NumericTrait>
  stats: Array<NumericTrait>
  isNSFW: boolean
  newCollectionName: string
  selectedContractAddress: string
  maxSupply: number
}
