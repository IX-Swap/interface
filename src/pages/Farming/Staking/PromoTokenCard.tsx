import { Trans } from '@lingui/macro'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import React from 'react'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { StakingStatus } from 'state/stake/reducer'
import { PromoTokenCardWrapper } from './style'
import useTheme from 'hooks/useTheme'
import Column from 'components/Column'
import { ConnectWalletButton } from './ConnectWalletButton'
import { NoIXSTokens } from './NoIXSTokens'
import { RowCenter } from 'components/Row'

export const PromoTokenCard = ({ stakingStatus: stakingStatus }: { stakingStatus: StakingStatus }) => {
  const theme = useTheme()
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
                Staking is a great way to maximize the value of your holdings that would otherwise be sitting idle in
                your IXS account.
                <br /> Once you have staked your assets you can earn rewards on your holdings which allows token holders
                to grow their token holdings over time.
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
