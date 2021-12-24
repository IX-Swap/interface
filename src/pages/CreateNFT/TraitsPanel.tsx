import { ButtonPlus } from 'components/Button'
import Column from 'components/Column'
import { RowBetween, RowStart } from 'components/Row'
import React, { useCallback } from 'react'
import { TYPE } from 'theme'
import { StyledBarChart, StyledListIcon, StyledStarIcon } from './styleds'
import { traitsSubtitle, traitsTitle, TraitType } from './types'

export const TraitsPanel = ({ type }: { type: TraitType }) => {
  const getIcon = useCallback(() => {
    switch (type) {
      case TraitType.RECTANGLE:
        return <StyledListIcon />
      case TraitType.PROGRESS:
        return <StyledStarIcon />
      case TraitType.NUMBER:
      default:
        return <StyledBarChart />
    }
  }, [type])
  return (
    <Column style={{ width: '100%' }}>
      <RowBetween>
        <RowStart>
          {getIcon()}
          <Column>
            <TYPE.body>{traitsTitle[type]}</TYPE.body>
            <TYPE.descriptionThin>{traitsSubtitle[type]}</TYPE.descriptionThin>
          </Column>
        </RowStart>
        <ButtonPlus
          width="60px"
          onClick={() => {
            console.log('test')
          }}
        />
      </RowBetween>
    </Column>
  )
}
