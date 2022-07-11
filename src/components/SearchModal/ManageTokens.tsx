import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import Row, { RowBetween, RowFixed } from 'components/Row'
import { useToken } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React, { RefObject, useCallback, useMemo, useRef, useState } from 'react'
import { Box } from 'rebass'
import { useRemoveUserAddedToken, useUserAddedTokens } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { ButtonText, ExternalLink, SemiTransparent, TYPE } from 'theme'
import { isAddress } from 'utils'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { ReactComponent as ExternalIcon } from '../../assets/images/external.svg'
import useTheme from '../../hooks/useTheme'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { CurrencyModalView } from './CurrencySearchModal'
import ImportRow from './ImportRow'
import { PaddedColumn40, PaddedColumnList, SearchInput } from './styleds'

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 80px;
`

export default function ManageTokens({
  setModalView,
  setImportToken,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
}) {
  const { chainId } = useActiveWeb3React()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const theme = useTheme()

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event: { target: { value: string } }) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery)
  const searchToken = useToken(searchQuery)

  // all tokens for local lisr
  const userAddedTokens: Token[] = useUserAddedTokens()
  const removeToken = useRemoveUserAddedToken()

  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.map((token) => {
        return removeToken(chainId, token.address)
      })
    }
  }, [removeToken, userAddedTokens, chainId])

  const tokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token, index) => (
        <RowBetween key={`${token.address}-${index}`}>
          <RowFixed style={{ gap: '8px' }}>
            <CurrencyLogo currency={token} size={'20px'} />
            <ExternalLink href={getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS)}>
              <TYPE.main1>{token.symbol}</TYPE.main1>
            </ExternalLink>
          </RowFixed>
          <RowFixed style={{ gap: '8px', paddingRight: '1rem', justifyContent: 'center', cursor: 'pointer' }}>
            <DeleteIcon onClick={() => removeToken(chainId, token.address)} />
            <ExternalLink
              href={getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS)}
              style={{ display: 'flex' }}
            >
              <ExternalIcon />
            </ExternalLink>
          </RowFixed>
        </RowBetween>
      ))
    )
  }, [userAddedTokens, chainId, removeToken])

  return (
    <Wrapper>
      <Column style={{ width: '100%', height: '100%', flex: '1 1' }}>
        <PaddedColumn40 gap="14px">
          <Row>
            <SearchInput
              type="text"
              id="token-search-input"
              placeholder={'0x0000'}
              value={searchQuery}
              autoComplete="off"
              ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
            />
          </Row>
          {searchQuery !== '' && !isAddressSearch && (
            <TYPE.error error={true}>
              <Trans>Enter valid token address</Trans>
            </TYPE.error>
          )}
          {searchToken && (
            <ImportRow
              token={searchToken}
              showImportView={() => setModalView(CurrencyModalView.importToken)}
              setImportToken={setImportToken}
              style={{ height: 'fit-content' }}
            />
          )}
        </PaddedColumn40>

        <PaddedColumnList gap="lg" style={{ overflow: 'auto', marginBottom: '10px', marginRight: '1rem' }}>
          <RowBetween style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <TYPE.subHeader1 color={theme.text2}>
              <Trans>{userAddedTokens?.length} Custom Tokens</Trans>
            </TYPE.subHeader1>
            {userAddedTokens.length > 0 && (
              <Box style={{ paddingRight: '0.5rem' }}>
                <SemiTransparent>
                  <ButtonText onClick={handleRemoveAll} data-testid="clear-user-added-tokens">
                    <TYPE.buttonMuted color={theme.text2}>
                      <Trans>Clear all</Trans>
                    </TYPE.buttonMuted>
                  </ButtonText>
                </SemiTransparent>
              </Box>
            )}
          </RowBetween>
          <Box style={{ paddingLeft: '1rem', paddingRight: '0.5rem' }}>{tokenList}</Box>
        </PaddedColumnList>
      </Column>
    </Wrapper>
  )
}
