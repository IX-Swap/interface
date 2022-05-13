import React, { useCallback } from 'react'

import Column from 'components/Column'
import { RowBetween, RowStart } from 'components/Row'
import { traitsTitle, TraitType } from 'state/nft/types'
import { TYPE } from 'theme'
import { ReactComponent as AddIcon } from 'assets/images/add.svg'

import { StyledBarChart, StyledListIcon, StyledStarIcon, PlusButton } from './styleds'

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
            <TYPE.body fontWeight={600}>{traitsTitle[type]}</TYPE.body>
          </Column>
        </RowStart>
        <PlusButton>
          <AddIcon />
        </PlusButton>
      </RowBetween>
    </Column>
  )
}
