import React from 'react'
import { Trans } from '@lingui/macro'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import useTheme from 'hooks/useTheme'
import { useWalletModalToggle } from 'state/application/hooks'
import { ButtonEmpty } from '../../components/Button'
import Card from '../../components/Card'
import { Dots } from '../../components/swap/styleds'
import { SemiTransparent, TYPE } from '../../theme'

interface Props {
  account?: string | null
  v2IsLoading: boolean
  showEmptyLiquidity: boolean
}
export const EmptyState = ({ account, v2IsLoading, showEmptyLiquidity }: Props) => {
  const toggleWalletModal = useWalletModalToggle()
  const theme = useTheme()
  return (
    <>
      <TopStraightBackgroundWrapper>
        <SemiTransparent>
          {!account && (
            <ButtonEmpty padding="40px" onClick={toggleWalletModal}>
              <TYPE.body color={theme.text2} textAlign="center">
                <Trans>Connect a wallet to view your Securities.</Trans>
              </TYPE.body>
            </ButtonEmpty>
          )}
          {account && v2IsLoading && (
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
      </TopStraightBackgroundWrapper>
    </>
  )
}
