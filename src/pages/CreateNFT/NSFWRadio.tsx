import React from 'react'
import { Trans } from '@lingui/macro'

import Column from 'components/Column'
import { RowBetween, RowStart } from 'components/Row'
import Toggle from 'components/Toggle'
import { TYPE } from 'theme'

import { StyledTriangle, StyledToggle, HrLine } from './styleds'

export const NSFWRadio = ({ active, setActive }: { active: boolean; setActive: (param: boolean) => void }) => {
  return (
    <Column style={{ width: '100%' }}>
      <RowBetween>
        <RowStart>
          <StyledTriangle />
          <Column>
            <TYPE.body fontWeight={600}>
              <Trans>Explicit & Sensitive Content</Trans>
            </TYPE.body>
            <TYPE.descriptionThin fontSize={12} color="rgba(237, 206, 255, 0.5)">
              <Trans>Set this item as explicit and sensitive content</Trans>
            </TYPE.descriptionThin>
          </Column>
        </RowStart>
        <StyledToggle>
          <Toggle id="toggle-nsfw" isActive={active} toggle={() => setActive(!active)} showLabel={false} />
        </StyledToggle>
      </RowBetween>
      <HrLine />
    </Column>
  )
}
