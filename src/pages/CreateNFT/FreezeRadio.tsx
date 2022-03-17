import React from 'react'
import { Trans } from '@lingui/macro'

import Column from 'components/Column'
import { RowBetween, RowStart } from 'components/Row'
import Toggle from 'components/Toggle'
import { TYPE } from 'theme'

import { StyledTriangle, StyledToggle, HrLine } from './styleds'

export const FreezeRadio = ({ active, setActive }: { active: boolean; setActive: (param: boolean) => void }) => {
  return (
    <Column style={{ width: '100%' }}>
      <RowBetween>
        <RowStart>
          <StyledTriangle />
          <Column>
            <TYPE.body fontWeight={600}>
              <Trans>Freeze metadata</Trans>
            </TYPE.body>
          </Column>
        </RowStart>
        <StyledToggle>
          <Toggle id="toggle-freeze" isActive={active} toggle={() => setActive(!active)} showLabel={false} />
        </StyledToggle>
      </RowBetween>
      <HrLine />
    </Column>
  )
}
