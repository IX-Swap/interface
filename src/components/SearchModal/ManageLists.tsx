import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { TokenList } from '@uniswap/token-lists'
import { CheckCircle } from 'react-feather'
import ReactGA from 'react-ga'
import { Box } from 'rebass'
import styled from 'styled-components/macro'

import { Line } from 'components/Line'
import Popover from 'components/Popover'
import Toggle from 'components/Toggle'
import { UNSUPPORTED_LIST_URLS } from 'constants/lists'
import { useActiveWeb3React } from 'hooks/web3'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { ReactComponent as Settings } from '../../assets/images/settings-full.svg'
import { useFetchListCallback } from '../../hooks/useFetchListCallback'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useTheme from '../../hooks/useTheme'
import useToggle from '../../hooks/useToggle'
import { acceptListUpdate, disableList, enableList, removeList } from '../../state/lists/actions'
import { useActiveListUrls, useAllLists, useIsListActive } from '../../state/lists/hooks'
import { ExternalLink, IconWrapper, LinkStyledButton, SemiTransparent, TYPE } from '../../theme'
import { parseENSAddress } from '../../utils/parseENSAddress'
import uriToHttp from '../../utils/uriToHttp'
import { ButtonEmpty, ButtonIXSGradient } from '../Button'
import Column from '../Column'
import ListLogo from '../ListLogo'
import Row, { RowFixed } from '../Row'
import { CurrencyModalView } from './CurrencySearchModal'
import { PaddedColumn40, PaddedColumnList, SearchInput } from './styleds'

const Wrapper = styled(Column)`
  width: 100%;
  max-height: 100%;
  overflow: auto;
  /* :after {
    position: absolute;
    content: '';
    width: 100%;
    height: 30px;
    top: 95%;
    background: ${({ theme }) => theme.bgG9};
  } */
`

const UnpaddedLinkStyledButton = styled(LinkStyledButton)`
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`

const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`
const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`

const StyledTitleText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      font-size: 1rem;
  `};
`

const StyledListUrlText = styled(TYPE.main)`
  font-size: 12px;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.text2};
`

const RowWrapper = styled(Row)<{ bgColor: string; active: boolean; hasActiveTokens: boolean }>`
  background-color: ${({ bgColor, active, theme }) => (active ? bgColor ?? 'transparent' : theme.bg2)};
  opacity: ${({ hasActiveTokens }) => (hasActiveTokens ? 1 : 0.4)};
  transition: 200ms;
  align-items: center;
  padding: 1rem;
  padding-bottom: 16px;
  border-radius: 20px;
`
const ListContainer = styled.div`
  padding: 0.5rem 1rem;
  max-height: 537px;
  height: auto;
  width: 100%;
  overflow: auto;
  will-change: transform;
  direction: ltr;
  min-height: 100px;
  position: relative;
  align-self: stretch;
  ${({ theme }) => theme.mediaWidth.upToLarge`
   
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0 6px 0 0;
  `};
`

function listUrlRowHTMLId(listUrl: string) {
  return `list-row-${listUrl.replace(/\./g, '-')}`
}
export interface RowListLayoutProps {
  list: TokenList | null
  pending: TokenList | null
  listUrl: string | undefined
  handleRemoveList?: () => void
  isDisabled: boolean
  isActive: boolean
  handleAcceptListUpdate?: () => void
  handleDisableList?: () => void
  handleEnableList?: () => void
  isImported?: boolean
  handleImport?: () => void
}
const ListRowLayout = ({
  list,
  listUrl,
  handleRemoveList,
  isActive,
  isDisabled,
  handleAcceptListUpdate,
  pending,
  handleEnableList,
  handleDisableList,
  handleImport,
  isImported,
}: RowListLayoutProps) => {
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()
  const theme = useTheme()
  const { chainId } = useActiveWeb3React()

  useOnClickOutside(node, open ? toggle : undefined)

  const activeTokensOnThisChain = useMemo(() => {
    if (!list || !chainId) {
      return 0
    }
    return list.tokens.reduce((acc, cur) => (cur.chainId === chainId ? acc + 1 : acc), 0)
  }, [chainId, list])

  const popOverContent = () => (
    <PopOverContent>
      <ExternalLink href={`https://tokenlists.org/token-list?url=${listUrl}`}>
        <TYPE.popOver>
          <Trans>View list</Trans>
        </TYPE.popOver>
      </ExternalLink>
      {handleRemoveList && (
        <UnpaddedLinkStyledButton onClick={handleRemoveList} disabled={isDisabled}>
          <TYPE.popOver>
            <Trans>Remove list</Trans>
          </TYPE.popOver>
        </UnpaddedLinkStyledButton>
      )}
      {pending && (
        <UnpaddedLinkStyledButton onClick={handleAcceptListUpdate}>
          <Trans>Update list</Trans>
        </UnpaddedLinkStyledButton>
      )}
    </PopOverContent>
  )
  return (
    <RowWrapper
      bgColor={theme.bg12}
      key={listUrl}
      id={listUrlRowHTMLId(listUrl ?? '')}
      active={isActive}
      hasActiveTokens={activeTokensOnThisChain > 0}
    >
      {list?.logoURI ? (
        <ListLogo size="40px" style={{ marginRight: '1rem' }} logoURI={list.logoURI} alt={`${list.name} list logo`} />
      ) : (
        <div style={{ width: '24px', height: '24px', marginRight: '1rem' }} />
      )}
      <Column style={{ flex: '1' }}>
        <Row>
          <StyledTitleText>{list?.name}</StyledTitleText>
        </Row>
        <RowFixed style={{ lineHeight: '17px' }}>
          <StyledListUrlText mr="6px">
            <Trans>{activeTokensOnThisChain} tokens</Trans>
          </StyledListUrlText>
          <StyledMenu ref={node as any}>
            <Popover show={open} content={popOverContent()} placement={'right'}>
              <ButtonEmpty onClick={toggle} padding="0" data-testid="token-list-settings">
                <SemiTransparent>
                  <Settings style={{ height: '10px', width: '10px ' }} />
                </SemiTransparent>
              </ButtonEmpty>
            </Popover>
          </StyledMenu>
        </RowFixed>
      </Column>
      {!handleImport && handleDisableList && handleEnableList && (
        <Toggle
          disabled={!activeTokensOnThisChain}
          isActive={isActive}
          toggle={() => {
            isActive ? handleDisableList() : handleEnableList()
          }}
          showLabel={false}
        />
      )}
      {handleImport && (
        <>
          {isImported ? (
            <RowFixed>
              <IconWrapper stroke={theme.text2} size="16px" marginRight={'10px'}>
                <CheckCircle />
              </IconWrapper>
              <TYPE.body color={theme.text2}>
                <Trans>Loaded</Trans>
              </TYPE.body>
            </RowFixed>
          ) : (
            <ButtonIXSGradient
              style={{ fontSize: '14px', padding: '1px 21px' }}
              width="fit-content"
              onClick={handleImport}
              data-testid="import-list"
            >
              <Trans>Import</Trans>
            </ButtonIXSGradient>
          )}
        </>
      )}
    </RowWrapper>
  )
}
const ListRow = memo(function ListRow({ listUrl }: { listUrl: string }) {
  const listsByUrl = useAppSelector((state) => state.lists.byUrl)
  const dispatch = useAppDispatch()
  const { current: list, pendingUpdate: pending } = listsByUrl[listUrl]
  const isActive = useIsListActive(listUrl)

  const handleAcceptListUpdate = useCallback(() => {
    if (!pending) return
    ReactGA.event({
      category: 'Lists',
      action: 'Update List from List Select',
      label: listUrl,
    })
    dispatch(acceptListUpdate(listUrl))
  }, [dispatch, listUrl, pending])

  const handleRemoveList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Start Remove List',
      label: listUrl,
    })
    if (window.prompt(`Please confirm you would like to remove this list by typing REMOVE`) === `REMOVE`) {
      ReactGA.event({
        category: 'Lists',
        action: 'Confirm Remove List',
        label: listUrl,
      })
      dispatch(removeList(listUrl))
    }
  }, [dispatch, listUrl])

  const handleEnableList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Enable List',
      label: listUrl,
    })
    dispatch(enableList(listUrl))
  }, [dispatch, listUrl])

  const handleDisableList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Disable List',
      label: listUrl,
    })
    dispatch(disableList(listUrl))
  }, [dispatch, listUrl])

  if (!list) return null
  const isDisabled = Object.keys(listsByUrl).length === 1

  return (
    <ListRowLayout
      {...{
        list,
        listUrl,
        handleRemoveList,
        isActive,
        isDisabled,
        handleAcceptListUpdate,
        pending,
        handleEnableList,
        handleDisableList,
      }}
    />
  )
})

export function ManageLists({
  setModalView,
  setImportList,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const [listUrlInput, setListUrlInput] = useState<string>('')

  const lists = useAllLists()

  // sort by active but only if not visible
  const activeListUrls = useActiveListUrls()
  const [activeCopy, setActiveCopy] = useState<string[] | undefined>()
  useEffect(() => {
    if (!activeCopy && activeListUrls) {
      setActiveCopy(activeListUrls)
    }
  }, [activeCopy, activeListUrls])

  const handleInput = useCallback((e: { target: { value: string } }) => {
    setListUrlInput(e.target.value)
  }, [])

  const fetchList = useFetchListCallback()

  const validUrl: boolean = useMemo(() => {
    return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput))
  }, [listUrlInput])

  const sortedLists = useMemo(() => {
    const listUrls = Object.keys(lists)
    return listUrls
      .filter((listUrl) => {
        // only show loaded lists, hide unsupported lists
        return Boolean(lists[listUrl].current) && !Boolean(UNSUPPORTED_LIST_URLS.includes(listUrl))
      })
      .sort((u1, u2) => {
        const { current: l1 } = lists[u1]
        const { current: l2 } = lists[u2]

        // first filter on active lists
        if (activeCopy?.includes(u1) && !activeCopy?.includes(u2)) {
          return -1
        }
        if (!activeCopy?.includes(u1) && activeCopy?.includes(u2)) {
          return 1
        }

        if (l1 && l2) {
          return l1.name.toLowerCase() < l2.name.toLowerCase()
            ? -1
            : l1.name.toLowerCase() === l2.name.toLowerCase()
            ? 0
            : 1
        }
        if (l1) return -1
        if (l2) return 1
        return 0
      })
  }, [lists, activeCopy])

  // temporary fetched list for import flow
  const [tempList, setTempList] = useState<TokenList>()
  const [addError, setAddError] = useState<string | undefined>()

  useEffect(() => {
    async function fetchTempList() {
      fetchList(listUrlInput, false)
        .then((list) => setTempList(list))
        .catch(() => setAddError(t`Error importing list`))
    }
    // if valid url, fetch details for card
    if (validUrl) {
      fetchTempList()
      setAddError('')
    } else {
      setTempList(undefined)
      listUrlInput !== '' && setAddError(t`Enter valid list location`)
    }

    // reset error
    if (listUrlInput === '') {
      setAddError(undefined)
    }
  }, [fetchList, listUrlInput, validUrl])

  // check if list is already imported
  const isImported = Object.keys(lists).includes(listUrlInput)

  // set list values and have parent modal switch to import list view
  const handleImport = useCallback(() => {
    if (!tempList) return
    setImportList(tempList)
    setModalView(CurrencyModalView.importList)
    setListUrl(listUrlInput)
  }, [listUrlInput, setImportList, setListUrl, setModalView, tempList])

  return (
    <Wrapper>
      <PaddedColumn40 gap="14px">
        <Row>
          <SearchInput
            type="text"
            id="list-add-input"
            placeholder={t`https:// or ipfs:// or ENS name`}
            value={listUrlInput}
            onChange={handleInput}
          />
        </Row>
        {addError ? (
          <TYPE.error title={addError} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} error>
            {addError}
          </TYPE.error>
        ) : null}
      </PaddedColumn40>
      {tempList && (
        <ListContainer>
          <PaddedColumnList gap="20px">
            <ListRowLayout
              {...{
                list: tempList,
                listUrl: tempList.logoURI,
                isActive: false,
                isDisabled: true,
                pending: null,
                isImported,
                handleImport,
              }}
            />
            <SemiTransparent>
              <Box paddingX="5px">
                <Line />
              </Box>
            </SemiTransparent>
          </PaddedColumnList>
        </ListContainer>
      )}
      <ListContainer>
        <PaddedColumnList gap="md">
          {sortedLists.map((listUrl, index) => (
            <ListRow key={`${listUrl}-${index}`} listUrl={listUrl} />
          ))}
        </PaddedColumnList>
      </ListContainer>
    </Wrapper>
  )
}
