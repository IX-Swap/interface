import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { BorderSimple, ToggleOption } from 'components/Tabs'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

import CustodianV2 from 'pages/CustodianV2'
import { UserPayoutEvents } from 'components/UserPayoutEvents'
import AppBody, { BodyWrapper } from 'pages/AppBody'
import { useWeb3React } from '@web3-react/core'
import { useCookies } from 'react-cookie'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { useAuthState } from 'state/auth/hooks'
import { routes } from 'utils/routes'
import { MEDIA_WIDTHS } from 'theme'

type SecurityTab = 'tokens' | 'payout-events' | ':tab'

interface Tab {
  label: string
  value: SecurityTab
}

export interface AdminParams {
  tab: SecurityTab
  id?: string
}

const tabs: Tab[] = [
  { label: 'RWAs', value: 'tokens' },
  { label: 'Payout Events', value: 'payout-events' },
]

const renderTab = (selectedTab: SecurityTab | string) => {
  switch (selectedTab) {
  case 'tokens':
    return <CustodianV2 />
  case 'payout-events':
    return <UserPayoutEvents />
  default:
    return <CustodianV2 />
  }
}

const SecurityTokens = () => {
  const { chainId, account } = useWeb3React()
  const [selectedTab, setSelectedTab] = useState<SecurityTab>('tokens')
  const [cookies] = useCookies(['annoucementsSeen'])
  const { token } = useAuthState()

  const history = useHistory()
  const params = useParams<AdminParams>()

  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)
  const isLoggedIn = !!token && !!account

  const changeTab = useCallback(
    (tab: SecurityTab) => {
      history.push(routes.securityTokens(tab))
    },
    [history]
  )

  useEffect(() => {
    const tab = params.tab
    setSelectedTab(tab === ':tab' ? 'tokens' : tab)
  }, [params])

  if (!isLoggedIn) return <NotAvailablePage />

  return blurred ? (
    <AppBody blurred>
      <Trans>RWAs</Trans>
    </AppBody>
  ) : (
    <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
      <TabsContainer>
        {tabs.map(({ value, label }, index) => {
          const active = selectedTab === value
          return (
            <>
              <ToggleOption key={`tabs-${index}`} onClick={() => changeTab(value)} active={active}>
                <TabLabel><Trans>{label}</Trans></TabLabel>
                <BorderSimple active={selectedTab === value} />
              </ToggleOption>
            </>
          )
        })}
      </TabsContainer>
      {renderTab(selectedTab)}
    </StyledBodyWrapper>
  )
}

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.bg24};
  margin: 0 -40px 0 -40px;
  padding: 0 40px 0 40px;
`

const TabLabel = styled.div`
  cursor: pointer;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  height: 80px;
  display: flex;
  align-items: center;
`

export const StyledBodyWrapper = styled(BodyWrapper)`
  box-shadow: none;
  width: 100%;
  max-width: 1358px;
  padding-top: 0px;
  padding-bottom: 0px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0px;
  }
`

export default SecurityTokens
