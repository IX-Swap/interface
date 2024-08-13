import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useActiveWeb3React } from 'hooks/web3'
import { MEDIA_WIDTHS } from 'theme'
import { useUserState } from 'state/user/hooks'
import { BorderSimple, ToggleOption } from 'components/Tabs'
import { ROLES } from 'constants/roles'
import { TmMyTokens } from 'components/TmMyTokens'
import { PinnedContentButton } from 'components/Button'
import { TmPayoutEvents } from 'components/TmPayoutEvents'
import { TmPayoutHistory } from 'components/TmPayoutHistory'
import { routes } from 'utils/routes'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { ReactComponent as CreateIcon } from 'assets/images/add.svg'
import { Line } from 'components/Line'

export type TokenManagerTab =
  | 'my-tokens'
  | 'payout-events'
  | 'payout-history'
  | 'all-payout-events'
  | 'no-upcoming-event'

interface Tab {
  label: string
  value: TokenManagerTab
}

export interface TokenManagerParams {
  tab: TokenManagerTab
  id?: string
}

const tabs: Tab[] = [
  { label: 'My Managed Tokens', value: 'my-tokens' },
  { label: 'Payout Events', value: 'payout-events' },
  { label: 'Payout History', value: 'payout-history' },
]

const renderTab = (selectedTab: TokenManagerTab | string) => {
  switch (selectedTab) {
    case 'my-tokens':
      return (
        <StyledBodyWrapper style={{ marginTop: '20px' }}>
          <TmMyTokens />
        </StyledBodyWrapper>
      )

    case 'payout-events':
      return (
        <StyledTableWrapper style={{ marginTop: '2px' }}>
          <TmPayoutEvents />
        </StyledTableWrapper>
      )

    case 'payout-history':
      return (
        <StyledTableWrapper style={{ marginTop: '2px' }}>
          <TmPayoutHistory />
        </StyledTableWrapper>
      )

    default:
      return null
  }
}

const TokenManager = () => {
  const [selectedTab, setSelectedTab] = useState<TokenManagerTab>('my-tokens')
  const { account } = useActiveWeb3React()
  const { me } = useUserState()
  const isLogged = account && me?.role
  const history = useHistory()
  const params = useParams<TokenManagerParams>()
  const { pathname } = useLocation()
  const changeTab = useCallback(
    (tab: TokenManagerTab) => {
      history.push(`/token-manager/${tab}`)
    },
    [history]
  )

  useEffect(() => {
    const tab = params.tab

    setSelectedTab(tab)
  }, [params])

  useEffect(() => {
    if (me && me.role !== ROLES.TOKEN_MANAGER) {
      history.push('/kyc')
    }
  }, [me, history])

  const goToCreate = () => {
    history.push(routes.createPayoutEvent)
  }

  if (!isLogged) {
    return <NotAvailablePage />
  }
  return (
    <>
      <Line />
      <StyledHeaderWrapper>
        <TabsContainer>
          {tabs.map(({ value, label }, index) => {
            const active = selectedTab === value
            return (
              <>
                <ToggleOption key={`tabs-${index}`} onClick={() => changeTab(value)} active={active}>
                  <TabLabel>
                    <Trans>{label}</Trans>
                  </TabLabel>
                  <BorderSimple active={selectedTab === value} />
                </ToggleOption>
              </>
            )
          })}
          <ButtonContainer>
            <CreateButton onClick={goToCreate}>
              <CreateIcon />
              <Trans>Create Payout Event</Trans>
            </CreateButton>
          </ButtonContainer>
        </TabsContainer>
      </StyledHeaderWrapper>
      <Line />
      {renderTab(selectedTab)}
    </>
  )
}

export const StyledHeaderWrapper = styled.div`
  padding: 0 200px;
  background-color: #ffffff;
  margin: 0 auto;
  width: 100%;
`

export const StyledTableWrapper = styled.div`
  padding: 0 150px;
  background-color: #ffffff;
  margin: 0 auto;
  width: 100%;
`

export const StyledBodyWrapper = styled.div`
  padding: 0 200px;
  margin: 0 auto;
  width: 100%;
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    flex-direction: column;
    row-gap: 4px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`

const CreateButton = styled(PinnedContentButton)`
  min-height: 40px;
  height: 50px;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  width: 200px;
  gap: 8px;
`

const TabLabel = styled.div`
  cursor: pointer;
  padding: 12px 20px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  height: 80px;
  display: flex;
  align-items: center;
`

export default TokenManager
