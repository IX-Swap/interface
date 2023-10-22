import { Currency, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { TokenList } from '@uniswap/token-lists/dist/types'
import { ButtonIXSWide } from 'components/Button'
import { AutoColumn } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import ListLogo from 'components/ListLogo'
import { RowBetween, RowCenter, RowFixed, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useAddUserToken } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { CloseIcon, TYPE } from 'theme'
import { shortenAddress } from 'utils'
import { ExternalLink, SemiTransparent } from '../../theme/components'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'

const Wrapper = styled.div`
  width: 100%;
  border-radius: 20px;
  background: ${({ theme }) => theme.bg1};
`
const Section = styled(AutoColumn)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 37px 44px 37px 40px;
`

const BottomSection = styled(AutoColumn)`
  // background: ${({ theme }) => theme.bg11};
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 36px 40px 51px 40px;
`
const SourceWrapper = styled.span`
  width: fit-content;
  border-radius: 40px;
  margin-top: 33px;
  margin-bottom: 41px;
  padding: 4px 16px;
  background: ${({ theme }) => theme.bg15};
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
      <Section>
        <RowBetween>
          <RowStart style={{ gap: '5px' }}>
            {onBack ? <ArrowLeft style={{ cursor: 'pointer' }} onClick={onBack} /> : <div />}
            <TYPE.title5>Import {tokens.length > 1 ? 'Tokens' : 'Token'}</TYPE.title5>
          </RowStart>
          {onDismiss ? <CloseIcon onClick={onDismiss} /> : <div />}
        </RowBetween>
        <AutoColumn justify="center" style={{ textAlign: 'left', marginTop: '30px' }}>
          <TYPE.description4>
            <Trans>
              This token doesn&apos;t appear on the active list(s). Make sure this is the token that you want to trade
            </Trans>
          </TYPE.description4>
        </AutoColumn>
      </Section>
      <BottomSection>
        {tokens.map((token) => {
          return (
            <>
              <AutoColumn gap="10px" justify="center">
                <RowCenter style={{ gap: '11px', flexWrap: 'wrap' }}>
                  <CurrencyLogo currency={token} size={'33px'} />
                  <TYPE.title5>{token.symbol}</TYPE.title5>
                  <SemiTransparent>
                    <TYPE.description5>{token.name}</TYPE.description5>
                  </SemiTransparent>
                </RowCenter>

                <AutoColumn gap="4px" justify="center"></AutoColumn>
                {chainId && (
                  <ExternalLink href={getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS)}>
                    <TYPE.main1 fontWeight={'400'}>{shortenAddress(token.address)}</TYPE.main1>
                  </ExternalLink>
                )}
                <SourceWrapper>
                  {list !== undefined ? (
                    <RowFixed>
                      {list.logoURI && <ListLogo logoURI={list.logoURI} size="16px" />}
                      <TYPE.small ml="6px" fontSize={14} color={theme.text2}>
                        via {list.name} token list
                      </TYPE.small>
                    </RowFixed>
                  ) : (
                    <TYPE.buttonMuted color={theme.text2}>Unknown Source</TYPE.buttonMuted>
                  )}
                </SourceWrapper>
              </AutoColumn>
            </>
          )
        })}

        <ButtonIXSWide
          altDisabledStyle={true}
          onClick={() => {
            tokens.map((token) => addToken(token))
            handleCurrencySelect && handleCurrencySelect(tokens[0])
          }}
          data-testid="token-dismiss-button"
          className=".token-dismiss-button"
        >
          Import
        </ButtonIXSWide>
      </BottomSection>
    </Wrapper>
  )
}
