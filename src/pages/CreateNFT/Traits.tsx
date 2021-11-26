import Column from 'components/Column'
import { Line } from 'components/Line'
import React from 'react'
import { Flex } from 'rebass'
import { TraitsPanel } from './TraitsPanel'
import { TraitType } from './types'

export const Traits = ({ type }: { type: TraitType }) => {
  return (
    <Column style={{ width: '100%', gap: '10px' }}>
      <TraitsPanel type={type} />
      <Line />
    </Column>
  )
}
