import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

import { LightCard } from 'components/Card'
import Column from 'components/Column'
import IXSProgressBar from 'components/IXSProgressBar'
import Row, { RowBetween } from 'components/Row'
import { NumericTrait, Trait, TraitType } from 'state/nft/types'
import { ellipsisText, TYPE } from 'theme'

import { PropertyCard, LevelCard, StatCard } from './styleds'

export const TraitsShow = ({ type, traitList }: { type: TraitType; traitList: Array<Trait> | Array<NumericTrait> }) => {
  const getMax = (trait: any) => {
    return trait?.max_value
  }
  return (
    <Flex
      flexDirection={type !== TraitType.PROGRESS ? 'row' : 'column'}
      style={{ columnGap: '8px', rowGap: '12px', marginTop: '12px' }}
      flexWrap="wrap"
    >
      {traitList.map((trait: any, index: number) => {
        if (type === TraitType.RECTANGLE) {
          return (
            <PropertyCard key={index}>
              <div>{trait?.trait_type}</div>
              <div>{trait?.value}</div>
            </PropertyCard>
          )
        } else if (type === TraitType.NUMBER) {
          return (
            <StatCard key={index}>
              <div>
                {trait?.value} of {getMax(trait)}
              </div>
              <div>{trait?.trait_type}</div>
            </StatCard>
          )
        } else {
          return (
            <LevelCard key={index} style={{ width: '100%' }}>
              <div>
                <div style={{ width: 'max-content' }}>{trait?.trait_type}</div>
                <div style={{ width: 'max-content' }}>
                  {trait?.value} of {getMax(trait)}
                </div>
              </div>
              <Row>
                <IXSProgressBar completed={(Number(trait.value) / Number(getMax(trait))) * 100} />
              </Row>
            </LevelCard>
          )
        }
      })}
    </Flex>
  )
}
