import React, { useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Trans } from '@lingui/macro'
import { Text } from 'rebass'

import Column from 'components/Column'
import useTheme from 'hooks/useTheme'
import { ButtonGradient } from '../../components/Button'
import { EmptyStateInfoCard } from '../../components/Card'
import { TYPE } from '../../theme'
import { ImportPool } from './ImportPool'

export const ConnectWallet = ({ message }: { message: React.ReactElement }) => {
  const { openConnectModal } = useConnectModal()
  const theme = useTheme()

  return (
    <>
      <Column style={{ padding: '0 36px', alignItems: 'center', gap: '20px' }}>
        <EmptyStateInfoCard>
          <TYPE.title7 color={theme.text2} textAlign="center" fontWeight={400}>
            {message}
          </TYPE.title7>
          <ButtonGradient onClick={openConnectModal} data-testid="connect-wallet-pool-2" style={{ width: '214px' }}>
            <Text fontWeight={500} style={{ textTransform: 'none' }}>
              <Trans>Connect Wallet</Trans>
            </Text>
          </ButtonGradient>
        </EmptyStateInfoCard>
        <ImportPool />
      </Column>
    </>
  )
}
