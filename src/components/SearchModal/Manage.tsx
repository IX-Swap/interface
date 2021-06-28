import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { TokenList } from '@uniswap/token-lists'
import { AutoColumn } from 'components/Column'
import { ManageTabs } from 'components/NavigationTabs'
import { RowCenter } from 'components/Row'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { CurrencyModalView } from './CurrencySearchModal'
import { ManageLists } from './ManageLists'
import ManageTokens from './ManageTokens'
import { ModalContentWrapper } from './styleds'

const Wrapper = styled(ModalContentWrapper)`
  max-height: 100%;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  `};
`

const ToggleWrapper = styled(RowCenter)`
  background-color: transparent;
  border-radius: 12px;
  padding: 0px 6px;
  grid-gap: 6px;
`

const ToggleOption = styled.div<{ active?: boolean }>`
  width: 120px;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  background-color: transparent;
  color: ${({ theme }) => theme.text2};
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
const Border = styled.div<{ active?: boolean }>`
  height: 2px;
  width: 100%;
  position: absolute;
  top: 100%;
  background: ${({ theme, active }) => (active ? theme.bgG3 : 'transparent')};
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
        <ToggleWrapper>
          <ToggleOption onClick={() => setShowLists(!showLists)} active={showLists}>
            <Trans>Lists</Trans>
            <Border active={showLists} />
          </ToggleOption>
          <ToggleOption onClick={() => setShowLists(!showLists)} active={!showLists}>
            <Trans>Tokens</Trans>
            <Border active={!showLists} />
          </ToggleOption>
        </ToggleWrapper>
      </AutoColumn>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </Wrapper>
  )
}
