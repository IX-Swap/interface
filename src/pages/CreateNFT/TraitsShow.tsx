import { LightCard } from 'components/Card'
import Column from 'components/Column'
import IXSProgressBar from 'components/IXSProgressBar'
import Row, { RowBetween } from 'components/Row'
import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { ellipsisText, TYPE } from 'theme'
import { TraitType } from './types'

const EllipsisBody2 = styled(TYPE.body2)`
  ${ellipsisText}
`
const EllipsisBody3 = styled(TYPE.body3)`
  ${ellipsisText}
`
export const TraitsShow = ({
  type,
  traitList,
}: {
  type: TraitType
  traitList: Array<{ name: string; value: string }> | Array<{ name: string; value: number; max: number }>
}) => {
  const getMax = (trait: any) => {
    return trait?.max
  }
  return (
    <Flex flexDirection={type === TraitType.RECTANGLE ? 'row' : 'column'} style={{ gap: '10px' }} flexWrap="wrap">
      {traitList.map((trait: any, index: number) => {
        if (type === TraitType.RECTANGLE) {
          return (
            <LightCard key={index} style={{ width: '150px' }}>
              <Column>
                <EllipsisBody2>{trait?.name}</EllipsisBody2>
                <EllipsisBody3>{trait?.value}</EllipsisBody3>
              </Column>
            </LightCard>
          )
        } else if (type === TraitType.NUMBER) {
          return (
            <LightCard key={index} style={{ width: '100%' }}>
              <RowBetween>
                <EllipsisBody2 style={{ width: 'max-content' }}>{trait?.name}</EllipsisBody2>
                <EllipsisBody3 style={{ width: 'max-content' }}>
                  {trait?.value} of {getMax(trait)}
                </EllipsisBody3>
              </RowBetween>
            </LightCard>
          )
        } else {
          return (
            <LightCard key={index} style={{ width: '100%' }}>
              <Column>
                <RowBetween>
                  <EllipsisBody2 style={{ width: 'max-content' }}>{trait?.name}</EllipsisBody2>
                  <EllipsisBody3 style={{ width: 'max-content' }}>
                    {trait?.value} of {getMax(trait)}
                  </EllipsisBody3>
                </RowBetween>
                <Row>
                  <IXSProgressBar completed={(Number(trait.value) / Number(getMax(trait))) * 100} />
                </Row>
              </Column>
            </LightCard>
          )
        }
      })}
    </Flex>
  )
}
