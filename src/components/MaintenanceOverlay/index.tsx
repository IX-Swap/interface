import React, { FC } from 'react'
import Lottie from 'react-lottie-player'
import { isMobile } from 'react-device-detect'

import maintenanceImage from 'assets/images/lottie/maintenance.json'
import { StyledGradientText, Wrapper } from './styleds'
import { TYPE } from 'theme'
import { Trans } from '@lingui/macro'

export const MaintenanceOverlay: FC = () => {
  return (
    <Wrapper>
      <div>
        <StyledGradientText>
          <TYPE.maintenance>
            <Trans>Update in Progress</Trans>
          </TYPE.maintenance>
        </StyledGradientText>

        <Lottie
          loop
          animationData={maintenanceImage}
          play
          style={{ width: isMobile ? 200 : 300, height: isMobile ? 200 : 300 }}
        />

        <TYPE.body3 width={272} opacity={0.5}>
          <Trans>{`We’re currently updating our website and will be back online shortly.`}</Trans>
        </TYPE.body3>
      </div>
    </Wrapper>
  )
}
