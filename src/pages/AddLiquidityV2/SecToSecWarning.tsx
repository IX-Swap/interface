import { DarkCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { RowCenter } from 'components/Row'
import React from 'react'
import Attention from 'assets/images/attention.svg'
import { SvgIconWrapper, TYPE } from 'theme'
import { Trans } from '@lingui/macro'

export const SecToSecWarning = () => {
  return (
    <DarkCard>
      <AutoColumn gap="8px">
        <RowCenter style={{ gap: '12px' }}>
          <SvgIconWrapper size={24}>
            <img src={Attention} alt={'Error'} />
          </SvgIconWrapper>
          <TYPE.body1>
            <Trans>
              Due to increased risk and no reliable mechanism to mitigate IL risks we temporarily disabled the SEC to
              SEC pools
            </Trans>
          </TYPE.body1>
        </RowCenter>
      </AutoColumn>
    </DarkCard>
  )
}
