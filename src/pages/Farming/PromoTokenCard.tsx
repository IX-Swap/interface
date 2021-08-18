import { IconWrapper } from 'components/AccountDetails/styleds'
import React from 'react'
import { StakingPromoCard } from './styleds'
import { ReactComponent as IXSToken } from 'assets/images/IXS-token.svg'
import { TYPE } from 'theme'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'

export const PromoTokenCard = () => {
  return (
    <StakingPromoCard>
      <IconWrapper size={75}>
        <IXSToken />
      </IconWrapper>
      <Box marginTop={18}>
        <TYPE.body5>
          <Trans>IXS Token</Trans>
        </TYPE.body5>
      </Box>
      <Box marginTop={10}>
        <TYPE.body3>
          <Trans>Annual Return</Trans>
        </TYPE.body3>
      </Box>
      <Box marginTop={13}>
        <TYPE.main0>10%</TYPE.main0>
      </Box>
    </StakingPromoCard>
  )
}
