import Column from 'components/Column'
import { Line } from 'components/Line'
import React from 'react'
import { TraitsPanel } from './TraitsPanel'
import { TraitsShow } from './TraitsShow'
import { TraitType } from './types'

export const Traits = ({
  type,
  traitList,
}: {
  type: TraitType
  traitList: Array<{ name: string; value: string }> | Array<{ name: string; value: number; max: number }>
}) => {
  return (
    <Column style={{ width: '100%', gap: '10px' }}>
      <TraitsPanel type={type} />
      <TraitsShow type={type} traitList={traitList} />
      <Line />
    </Column>
  )
}
