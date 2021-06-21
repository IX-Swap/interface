import React from 'react'
import { Currency, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { TokenList } from '@uniswap/token-lists/dist/types'
import { ButtonIXSWide } from 'components/Button'
import Card, { VioletCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import ListLogo from 'components/ListLogo'
import { RowBetween, RowFixed } from 'components/Row'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import { transparentize } from 'polished'
import { AlertCircle, ArrowLeft } from 'react-feather'
import { Text } from 'rebass'
import { useAddUserToken } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { CloseIcon, TYPE } from 'theme'
import { ExternalLink } from '../../theme/components'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { PaddedColumn } from './styleds'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`

const WarningWrapper = styled(Card)<{ highWarning: boolean }>`
  background-color: ${({ theme, highWarning }) =>
    highWarning ? transparentize(0.8, theme.red1) : transparentize(0.8, theme.yellow2)};
  width: fit-content;
`

const AddressText = styled(Text)`
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 10px;
`}
`

interface ImportProps {
  tokens: Token[]
  list?: TokenList
  onBack?: () => void
  onDismiss?: () => void
  handleCurrencySelect?: (currency: Currency) => void
}

export function ImportToken({ tokens, list, onBack, onDismiss, handleCurrencySelect }: ImportProps) {
  const theme = useTheme()

  const { chainId } = useActiveWeb3React()

  const addToken = useAddUserToken()

  return (
    <Wrapper>
      <PaddedColumn gap="14px" style={{ width: '100%', flex: '1 1' }}>
        <RowBetween>
          {onBack ? <ArrowLeft style={{ cursor: 'pointer' }} onClick={onBack} /> : <div />}
          <TYPE.mediumHeader>Import {tokens.length > 1 ? 'Tokens' : 'Token'}</TYPE.mediumHeader>
          {onDismiss ? <CloseIcon onClick={onDismiss} /> : <div />}
        </RowBetween>
      </PaddedColumn>
      <AutoColumn gap="md" style={{ marginBottom: '32px', padding: '1rem' }}>
        <AutoColumn justify="center" style={{ textAlign: 'center', gap: '16px', padding: '1rem' }}>
          <AlertCircle size={48} stroke={theme.text2} strokeWidth={1} />
          <Text color={theme.text2}>
            <Trans>
              This token doesn&apos;t appear on the active token list(s). Make sure this is the token that you want to
              trade.
            </Trans>
          </Text>
        </AutoColumn>
        {tokens.map((token) => {
          return (
            <VioletCard
              backgroundColor={theme.bg2}
              key={'import' + token.address}
              className=".token-warning-container"
              padding="2rem"
            >
              <AutoColumn gap="10px" justify="center">
                <CurrencyLogo currency={token} size={'32px'} />

                <AutoColumn gap="4px" justify="center">
                  <TYPE.body ml="8px" mr="8px" fontWeight={500} fontSize={20}>
                    {token.symbol}
                  </TYPE.body>
                  <Text color={theme.text1} fontWeight={400} fontSize={14}>
                    {token.name}
                  </Text>
                </AutoColumn>
                {chainId && (
                  <ExternalLink href={getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS)}>
                    <AddressText fontSize={12}>{token.address}</AddressText>
                  </ExternalLink>
                )}
                {list !== undefined ? (
                  <RowFixed>
                    {list.logoURI && <ListLogo logoURI={list.logoURI} size="16px" />}
                    <TYPE.small ml="6px" fontSize={14} color={theme.text3}>
                      via {list.name} token list
                    </TYPE.small>
                  </RowFixed>
                ) : (
                  <WarningWrapper borderRadius="4px" padding="4px" highWarning={true}>
                    <RowFixed>
                      <AlertCircle stroke={theme.red1} size="10px" />
                      <TYPE.body color={theme.red1} ml="4px" fontSize="10px" fontWeight={500}>
                        Unknown Source
                      </TYPE.body>
                    </RowFixed>
                  </WarningWrapper>
                )}
              </AutoColumn>
            </VioletCard>
          )
        })}

        <ButtonIXSWide
          altDisabledStyle={true}
          onClick={() => {
            tokens.map((token) => addToken(token))
            handleCurrencySelect && handleCurrencySelect(tokens[0])
          }}
          className=".token-dismiss-button"
        >
          Import
        </ButtonIXSWide>
      </AutoColumn>
    </Wrapper>
  )
}
