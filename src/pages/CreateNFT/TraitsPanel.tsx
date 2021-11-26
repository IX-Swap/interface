import Column from 'components/Column'
import React, { useMemo, useCallback } from 'react'
import { traitsSubtitle, traitsTitle, TraitType } from './types'
import { List, Type } from 'react-feather'
import { StyledBarChart, StyledListIcon, StyledStarIcon } from './styleds'
import { RowBetween, RowStart } from 'components/Row'
import { TYPE } from 'theme'

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
      </RowBetween>
    </Column>
  )
}
