import { t } from '@lingui/macro'

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
