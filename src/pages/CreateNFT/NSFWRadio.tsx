import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { Line } from 'components/Line'
import { RowBetween, RowStart } from 'components/Row'
import Toggle from 'components/Toggle'
import React from 'react'
import { TYPE } from 'theme'
import { StyledTriangle } from './styleds'

export const NSFWRadio = ({ active, setActive }: { active: boolean; setActive: (param: boolean) => void }) => {
  return (
    <Column style={{ width: '100%', gap: '10px' }}>
      <Column style={{ width: '100%' }}>
        <RowBetween>
          <RowStart>
            <StyledTriangle />
            <Column>
              <TYPE.body>
                <Trans>Explicit & Sensitive Content</Trans>
              </TYPE.body>
              <TYPE.descriptionThin>
                <Trans>Set this item as explicit and sensitive content</Trans>
              </TYPE.descriptionThin>
            </Column>
          </RowStart>
          <Toggle id="toggle-nsfw" isActive={active} toggle={() => setActive(!active)} />
        </RowBetween>
      </Column>
      <Line />
    </Column>
  )
}
