import { Trans } from '@lingui/macro'
import { BackgroundWrapper } from 'components/BottomHalfWrapper'
import useTheme from 'hooks/useTheme'
import React from 'react'
import Card from '../../components/Card'
import { Dots } from '../../components/swap/styleds'
import { SemiTransparent, TYPE } from '../../theme'
import { EmptyLiquidity } from './EmptyLiquidity'
import { ImportPool } from './ImportPool'
import { LiquidityInnerTitle, MarginerCard } from './styleds'

interface Props {
  account?: string | null
  v2IsLoading: boolean
  showEmptyLiquidity: boolean
}
export const NoPairs = ({ v2IsLoading, showEmptyLiquidity }: Props) => {
  const theme = useTheme()
  return (
    <>
      <MarginerCard>
        <LiquidityInnerTitle>
          <Trans>My Liquidity</Trans>
        </LiquidityInnerTitle>
        <BackgroundWrapper>
          <SemiTransparent>
            {v2IsLoading && (
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
