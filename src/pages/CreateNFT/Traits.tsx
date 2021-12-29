import Column from 'components/Column'
import { Line } from 'components/Line'
import React from 'react'
import { TraitsPanel } from './TraitsPanel'
import { TraitsShow } from './TraitsShow'
import { NumericTrait, Trait, TraitType } from './types'

export const Traits = ({ type, traitList }: { type: TraitType; traitList: Array<Trait> | Array<NumericTrait> }) => {
  return (
    <Column style={{ width: '100%', gap: '10px' }}>
      <TraitsPanel type={type} />
      <TraitsShow type={type} traitList={traitList} />
      <Line />
    </Column>
  )
}
