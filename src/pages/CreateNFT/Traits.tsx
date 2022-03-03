import React from 'react'

import Column from 'components/Column'
import { TraitType, Trait, NumericTrait } from 'state/nft/types'

import { TraitsPanel } from './TraitsPanel'
import { TraitsShow } from './TraitsShow'
import { HrLine } from './styleds'

export const Traits = ({ type, traitList }: { type: TraitType; traitList: Array<Trait> | Array<NumericTrait> }) => {
  return (
    <Column style={{ width: '100%' }}>
      <TraitsPanel type={type} />
      {Boolean(traitList.length) && <TraitsShow type={type} traitList={traitList} />}
      <HrLine />
    </Column>
  )
}
