import { Trans } from '@lingui/macro'
import { TokenList } from '@uniswap/token-lists'
import { ButtonIXSWide } from 'components/Button'
import Card, { TipCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ListLogo from 'components/ListLogo'
import { ImportListTabs } from 'components/NavigationTabs'
import { AutoRow, RowBetween, RowFixed } from 'components/Row'
import { useFetchListCallback } from 'hooks/useFetchListCallback'
import useTheme from 'hooks/useTheme'
import React, { useCallback, useState } from 'react'
import ReactGA from 'react-ga'
import { useAppDispatch } from 'state/hooks'
import { enableList, removeList } from 'state/lists/actions'
import { useAllLists } from 'state/lists/hooks'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import { Checkbox, ExternalLink, SemiTransparent, ModalContentWrapper } from '../../theme/components'
import { CurrencyModalView } from './CurrencySearchModal'
import { PaddedColumn } from './styleds'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`

interface ImportProps {
  listURL: string
  list: TokenList
  onDismiss: () => void
  setModalView: (view: CurrencyModalView) => void
}

export function ImportList({ listURL, list, setModalView, onDismiss }: ImportProps) {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  // user must accept
  const [confirmed, setConfirmed] = useState(false)

  const lists = useAllLists()
  const fetchList = useFetchListCallback()
  const shortenedUrl = listURL.split('//').slice(-1)[0]
  // monitor is list is loading
  const adding = Boolean(lists[listURL]?.loadingRequestId)
  const [addError, setAddError] = useState<string | null>(null)

  const handleAddList = useCallback(() => {
    if (adding) return
    setAddError(null)
    fetchList(listURL)
      .then(() => {
        ReactGA.event({
          category: 'Lists',
          action: 'Add List',
          label: listURL,
        })

        // turn list on
        dispatch(enableList(listURL))
        // go back to lists
        setModalView(CurrencyModalView.manage)
      })
      .catch((error) => {
        ReactGA.event({
          category: 'Lists',
          action: 'Add List Failed',
          label: listURL,
        })
        setAddError(error.message)
        dispatch(removeList(listURL))
      })
  }, [adding, dispatch, fetchList, listURL, setModalView])

  return (
    <ModalContentWrapper style={{ borderRadius: '20px', overflowY: 'scroll' }}>
      <Wrapper>
        <ImportListTabs onClick={() => setModalView(CurrencyModalView.manage)} onDismiss={onDismiss} />
        <PaddedColumn gap="md">
          <AutoColumn gap="md">
            <Card backgroundColor={theme.bg12} padding="20px">
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <RowFixed>
                  {list.logoURI && <ListLogo logoURI={list.logoURI} size="45px" />}
                  <AutoColumn gap="0" style={{ marginLeft: '12px' }}>
                    <RowFixed>
                      <TYPE.main1>{list.name}</TYPE.main1>
                    </RowFixed>
                    <ExternalLink href={`https://tokenlists.org/token-list?url=${listURL}`}>
                      <TYPE.popOver style={{ wordBreak: 'break-all' }}>{shortenedUrl}</TYPE.popOver>
                    </ExternalLink>
                  </AutoColumn>
                </RowFixed>
                <SemiTransparent>
                  <TYPE.description5 fontSize={'20px'} ml="6px">
                    <Trans>{list.tokens.length} tokens</Trans>
                  </TYPE.description5>
                </SemiTransparent>
              </RowBetween>
            </Card>
            <TipCard>
              <AutoColumn
                justify="center"
                style={{ textAlign: 'center', gap: '16px', marginBottom: '12px', textTransform: 'uppercase' }}
              >
                <TYPE.body1 fontWeight={600}>
                  <Trans>Import at your own risk</Trans>
                </TYPE.body1>
              </AutoColumn>
              <SemiTransparent>
                <AutoColumn style={{ textAlign: 'center', gap: '16px', marginBottom: '12px' }}>
                  <TYPE.body1>
                    <Trans>
                      By adding this list you are implicitly trusting that the data is correct. Anyone can create a
                      list, including creating fake versions of existing lists and lists that claim to represent
                      projects that do not have one.
                    </Trans>
                  </TYPE.body1>
                  <TYPE.body1>
                    <Trans>If you purchase a token from this list, you may not be able to sell it back.</Trans>
                  </TYPE.body1>
                </AutoColumn>
              </SemiTransparent>

              <AutoRow
                justify="center"
                style={{ cursor: 'pointer', marginTop: '20px' }}
                onClick={() => setConfirmed(!confirmed)}
              >
                <Checkbox checked={confirmed} />

                <TYPE.body3 ml="10px" fontWeight={500}>
                  <Trans>I understand</Trans>
                </TYPE.body3>
              </AutoRow>
            </TipCard>

            <ButtonIXSWide
              disabled={!confirmed}
              altDisabledStyle={true}
              data-testid="import-tokens"
              onClick={handleAddList}
            >
              <Trans>Import</Trans>
            </ButtonIXSWide>
            {addError ? (
              <TYPE.error title={addError} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} error>
                {addError}
              </TYPE.error>
            ) : null}
          </AutoColumn>
        </PaddedColumn>
      </Wrapper>
    </ModalContentWrapper>
  )
}
