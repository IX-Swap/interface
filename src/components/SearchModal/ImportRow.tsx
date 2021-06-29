import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonGradient } from 'components/Button'
import { AutoColumn } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import ListLogo from 'components/ListLogo'
import { AutoRow, RowFixed } from 'components/Row'
import { useIsTokenActive, useIsUserAddedToken } from 'hooks/Tokens'
import useTheme from 'hooks/useTheme'
import React, { CSSProperties } from 'react'
import { CheckCircle } from 'react-feather'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'

const TokenSection = styled.div<{ dim?: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 0.9fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

const CheckIcon = styled(CheckCircle)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.green1};
`

const NameOverflow = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`

export default function ImportRow({
  token,
  style,
  dim,
  showImportView,
  setImportToken,
}: {
  token: Token
  style?: CSSProperties
  dim?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}) {
  const theme = useTheme()

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)

  const list = token instanceof WrappedTokenInfo ? token.list : undefined

  return (
    <TokenSection style={style}>
      <CurrencyLogo currency={token} size={'24px'} style={{ opacity: dim ? '0.6' : '1' }} />
      <AutoColumn gap="4px" style={{ opacity: dim ? '0.6' : '1' }}>
        <AutoRow>
          <TYPE.body fontWeight={500}>{token.symbol}</TYPE.body>
          <TYPE.darkGray ml="8px" fontWeight={300}>
            <NameOverflow title={token.name}>{token.name}</NameOverflow>
          </TYPE.darkGray>
        </AutoRow>
        {list && list.logoURI && (
          <RowFixed>
            <TYPE.small mr="4px" color={theme.text3}>
              <Trans>via {list.name} </Trans>
            </TYPE.small>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </RowFixed>
        )}
      </AutoColumn>
      <AutoColumn>
        {!isActive && !isAdded ? (
          <ButtonGradient
            width={'100%'}
            fontSize={'13px'}
            onClick={() => {
              setImportToken && setImportToken(token)
              showImportView()
            }}
          >
            <Trans>Import</Trans>
          </ButtonGradient>
        ) : (
          <RowFixed style={{ minWidth: 'fit-content' }}>
            <CheckIcon />
            <TYPE.main color={theme.green1}>
              <Trans>Active</Trans>
            </TYPE.main>
          </RowFixed>
        )}
      </AutoColumn>
    </TokenSection>
  )
}
