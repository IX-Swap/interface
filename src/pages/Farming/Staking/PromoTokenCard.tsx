import { Trans } from '@lingui/macro'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { RowCenter } from 'components/Row'
import useIXSCurrency from 'hooks/useIXSCurrency'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { Box } from 'rebass'
import { useStakingStatus } from 'state/stake/hooks'
import { StakingStatus } from 'state/stake/reducer'
import { TYPE } from 'theme'
import { ConnectWalletButton } from './ConnectWalletButton'
import { NoIXSTokens } from './NoIXSTokens'
import { PromoTokenCardWrapper } from './style'

export const PromoTokenCard = () => {
  const theme = useTheme()
  const stakingStatus = useStakingStatus()
  const currency = useIXSCurrency()
  return (
    <PromoTokenCardWrapper data-testid="connect-wallet-card">
      <RowCenter id="promo-staking-wrapper">
        <Column id="ixs-token-icon-col">
          <IconWrapper size={92}>
            <img src={IXSToken} />
          </IconWrapper>
        </Column>
        <Column id="main-info-col">
          <Box>
            <TYPE.body3>
              <Trans>
                Staking is a great way to maximize the value of your holdings, instead of letting them sit idle in your{' '}
                {currency?.symbol} account!
                <br /> Once you have staked your assets, you can earn rewards on your holdings. This allows you to grow
                your token holdings over time.
              </Trans>
            </TYPE.body3>
          </Box>
          <Box marginTop={18}>
            <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
              Annual percentage yield
            </TYPE.titleSmall>
          </Box>
          <Box style={{ display: 'flex' }}>
            <TYPE.description6>
              Up to <span style={{ fontWeight: 600 }}>88%</span>
            </TYPE.description6>
          </Box>
          {stakingStatus === StakingStatus.CONNECT_WALLET && (
            <Box marginTop={33}>
              <ConnectWalletButton />
            </Box>
          )}
        </Column>
      </RowCenter>
      {stakingStatus === StakingStatus.NO_IXS && <NoIXSTokens />}
    </PromoTokenCardWrapper>
  )
}
