import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import useTheme from 'hooks/useTheme'
import { Text } from 'rebass'
import { ButtonGradient } from '../../components/Button'
import { EmptyStateInfoCard } from '../../components/Card'
import { TYPE } from '../../theme'
import { ImportPool } from './ImportPool'
import Modal from 'components/Modal'
import ConnectionDialog from 'components/Launchpad/Wallet/ConnectionDialog'

export const ConnectWallet = ({ message }: { message: React.ReactElement }) => {
  const theme = useTheme()

  const [isOpenConnectWallet, setOpenConnectWallet] = useState(false)

  return (
    <>
      <Column style={{ padding: '0 36px', alignItems: 'center', gap: '20px' }}>
        <EmptyStateInfoCard>
          <TYPE.title7 color={theme.text2} textAlign="center" fontWeight={400}>
            {message}
          </TYPE.title7>
          <ButtonGradient
            onClick={() => setOpenConnectWallet(true)}
            data-testid="connect-wallet-pool-2"
            style={{ width: '214px' }}
          >
            <Text fontWeight={500} style={{ textTransform: 'none' }}>
              <Trans>Connect Wallet</Trans>
            </Text>
          </ButtonGradient>
        </EmptyStateInfoCard>
        <ImportPool />
      </Column>
      <Modal
        isOpen={isOpenConnectWallet}
        onDismiss={() => setOpenConnectWallet(false)}
        maxWidth="430px"
        maxHeight="310px"
      >
        <ConnectionDialog
          onConnect={() => {
            console.log('Connected')
          }}
          onClose={() => setOpenConnectWallet(false)}
        />
      </Modal>
    </>
  )
}
