import React, { FC } from 'react'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import Column from 'components/Column'
import { RowCenter } from 'components/Row'
import { ConnectWalletButton } from 'pages/Farming/Staking/ConnectWalletButton'
import { PromoTokenCardWrapper } from 'pages/Farming/Staking/style'
import { TYPE } from 'theme'

const CardWrapper = styled(PromoTokenCardWrapper)`
  width: 500px;
`

export const NFTConnectWallet: FC = () => {
  return (
    <CardWrapper style={{ marginTop: 100 }} data-testid="connect-wallet-card">
      <RowCenter id="promo-staking-wrapper">
        <Column>
          <Box>
            <TYPE.body3>
              <Trans>You have to connect wallet to use this page</Trans>
            </TYPE.body3>
          </Box>
          <Box marginTop={33}>
            <ConnectWalletButton />
          </Box>
        </Column>
      </RowCenter>
    </CardWrapper>
  )
}
