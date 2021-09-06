import React from 'react'
import { Trans } from '@lingui/macro'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import { Box } from 'rebass'
import { TYPE, ExternalLink } from 'theme'
import useTheme from 'hooks/useTheme'
import { NoIXSTokensWrapper, ButtonRow } from './style'
import { Link } from 'react-router-dom'
import { routes } from 'utils/routes'
import { IXS_ADDRESS } from 'constants/addresses'

export const NoIXSTokens = () => {
  const theme = useTheme()
  const { chainId } = useActiveWeb3React()
  return (
    <NoIXSTokensWrapper>
      <TYPE.title5 color={theme.text1}>
        <Trans>No available IXS tokens to Stake</Trans>
      </TYPE.title5>
      <Box marginTop={10}>
        <TYPE.body3>
          <Trans>Find out how to buy or get IXS airdropped in our Telegram or Use our swap to get IXS.</Trans>
        </TYPE.body3>
      </Box>
      <ButtonRow>
        <ButtonGradientBorder
          as={ExternalLink}
          href="https://t.me/ixswapofficial"
          data-testid="staking-redirect-to-telegram"
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
