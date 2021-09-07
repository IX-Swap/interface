import { Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { useWalletModalToggle } from 'state/application/hooks'
import { ButtonEmpty } from '../../components/Button'
import Card from '../../components/Card'
import { Dots } from '../../components/swap/styleds'
import { SemiTransparent, TYPE } from '../../theme'

interface Props {
  hasAccount?: boolean
  loading: boolean
  showEmptyLiquidity: boolean
}
export const EmptyState = ({ hasAccount, loading, showEmptyLiquidity }: Props) => {
  const toggleWalletModal = useWalletModalToggle()
  const theme = useTheme()
  return (
    <>
      <SemiTransparent>
        {!hasAccount && (
          <ButtonEmpty padding="40px" onClick={toggleWalletModal} data-testid="connect-wallet-custodian">
            <TYPE.body color={theme.text2} textAlign="center">
              <Trans>Connect a wallet to view your Securities.</Trans>
            </TYPE.body>
          </ButtonEmpty>
        )}
        {hasAccount && loading && (
          <Card padding="40px">
            <TYPE.body color={theme.text2} textAlign="center">
              <Dots>
                <Trans>Loading</Trans>
              </Dots>
            </TYPE.body>
          </Card>
        )}
        {showEmptyLiquidity && (
          <TYPE.body color={theme.text2} textAlign="center">
            <Trans>No securities found.</Trans>
          </TYPE.body>
        )}
      </SemiTransparent>
    </>
  )
}
