import React, { useState } from 'react'
import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { TokenList } from '@uniswap/token-lists'
import { AutoColumn } from 'components/Column'
import { ManageTabs } from 'components/NavigationTabs'
import { Border, ToggleOption } from 'components/Tabs'
import styled from 'styled-components/macro'
import { CurrencyModalView } from './CurrencySearchModal'
import { ManageLists } from './ManageLists'
import ManageTokens from './ManageTokens'
import { ModalContentWrapper } from 'theme'
import { StyledToggleWrapper } from './styleds'

const Wrapper = styled(ModalContentWrapper)`
  max-height: 100%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  `};
`

export default function Manage({
  onDismiss,
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  onDismiss: () => void
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  // toggle between tokens and lists
  const [showLists, setShowLists] = useState(true)

  return (
    <Wrapper>
      <ManageTabs onClick={() => setModalView(CurrencyModalView.search)} onDismiss={onDismiss} />
      <AutoColumn style={{ paddingBottom: 0 }}>
        <StyledToggleWrapper>
          <ToggleOption onClick={() => setShowLists(!showLists)} active={showLists}>
            <Trans>Lists</Trans>
            <Border active={showLists} />
          </ToggleOption>
          <ToggleOption onClick={() => setShowLists(!showLists)} active={!showLists}>
            <Trans>Tokens</Trans>
            <Border active={!showLists} />
          </ToggleOption>
        </StyledToggleWrapper>
      </AutoColumn>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </Wrapper>
  )
}
