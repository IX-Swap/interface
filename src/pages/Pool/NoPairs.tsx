import React from 'react'
import { SemiTransparent, TYPE } from '../../theme'
import Card from '../../components/Card'
import { ButtonEmpty } from '../../components/Button'
import { Dots } from '../../components/swap/styleds'
import { Trans } from '@lingui/macro'
import { EmptyLiquidity } from './EmptyLiquidity'
import { MarginerCard, LiquidityInnerTitle } from './styleds'
import useTheme from 'hooks/useTheme'
import { ImportPool } from './ImportPool'
import { useWalletModalToggle } from 'state/application/hooks'
import { BackgroundWrapper } from 'components/BottomHalfWrapper'

interface Props {
  account?: string | null
  v2IsLoading: boolean
  showEmptyLiquidity: boolean
}
export const NoPairs = ({ account, v2IsLoading, showEmptyLiquidity }: Props) => {
  const toggleWalletModal = useWalletModalToggle()
  const theme = useTheme()
  return (
    <>
      <MarginerCard>
        <BackgroundWrapper>
          <LiquidityInnerTitle>
            <Trans>My Liquidity</Trans>
          </LiquidityInnerTitle>
          <SemiTransparent>
            {!account && (
              <ButtonEmpty padding="40px" onClick={toggleWalletModal} data-testid="connect-wallet-pool">
                <TYPE.body color={theme.text2} textAlign="center">
                  <Trans>Connect a wallet to view your Liquidity.</Trans>
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
            {showEmptyLiquidity && <EmptyLiquidity />}
          </SemiTransparent>
        </BackgroundWrapper>
      </MarginerCard>
      <ImportPool />
    </>
  )
}
