import { Trans } from '@lingui/macro'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { Box } from 'rebass'
import { ExternalLink, TYPE } from 'theme'
import { ButtonRow, NoIXSTokensWrapper } from './style'

export const NoIXSTokens = () => {
  const theme = useTheme()
  const { chainId } = useActiveWeb3React()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  return (
    <NoIXSTokensWrapper>
      <TYPE.title5 color={theme.text1}>
        <Trans>You don&apos;t have any {currency?.symbol} tokens available!</Trans>
      </TYPE.title5>
      <Box marginTop={10}>
        <TYPE.body3>
          <Trans>To buy {currency?.symbol} click on swap below or find us on our Telegram channel to learn more.</Trans>
        </TYPE.body3>
      </Box>
      <ButtonRow>
        <ButtonGradientBorder
          as={ExternalLink}
          href="https://t.me/ixswapofficial"
          data-testid="staking-redirect-to-telegram"
          style={{ textTransform: 'none', textDecoration: 'none' }}
        >
          <Trans>Go to Telegram</Trans>
        </ButtonGradientBorder>
        {chainId && (
          <ButtonIXSGradient
            as={ExternalLink}
            style={{ textTransform: 'unset', width: '172px', textDecoration: 'none' }}
            href={`https://app.uniswap.org/#/swap?outputCurrency=${IXS_ADDRESS[chainId]}`}
            data-testid="staking-redirect-swap"
          >
            <Trans>Swap</Trans>
          </ButtonIXSGradient>
        )}
      </ButtonRow>
    </NoIXSTokensWrapper>
  )
}
