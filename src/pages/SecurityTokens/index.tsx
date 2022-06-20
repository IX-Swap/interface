import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { Border, ToggleOption } from 'components/Tabs'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

import CustodianV2 from 'pages/CustodianV2'
import { UserPayoutEvents } from 'components/UserPayoutEvents'
import AppBody, { BodyWrapper } from 'pages/AppBody'
import { useWeb3React } from '@web3-react/core'
import { useCookies } from 'react-cookie'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { useAuthState } from 'state/auth/hooks'

type SecurityTab = 'tokens' | 'payout-events'

interface Tab {
  label: string
  value: SecurityTab
}

export interface AdminParams {
  tab: SecurityTab
  id?: string
}

const tabs: Tab[] = [
  { label: 'Security Tokens', value: 'tokens' },
  { label: 'Payout Events', value: 'payout-events' },
]

const renderTab = (selectedTab: SecurityTab | string) => {
  switch (selectedTab) {
    case 'tokens':
      return <CustodianV2 />
    case 'payout-events':
      return <UserPayoutEvents />

    default:
      return null
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
      history.push(`/security-tokens/${tab}`)
    },
    [history]
  )

  useEffect(() => {
    const tab = params.tab

    setSelectedTab(tab)
  }, [params])

  if (!isLoggedIn) return <NotAvailablePage />

  return blurred ? (
    <AppBody blurred>
      <Trans>Security Tokens</Trans>
    </AppBody>
  ) : (
    <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
      <TabsContainer>
        {tabs.map(({ value, label }, index) => (
          <>
            <ToggleOption key={`tabs-${index}`} onClick={() => changeTab(value)} active={selectedTab === value}>
              <Trans>{label}</Trans>
              <Border active={selectedTab === value} />
            </ToggleOption>
          </>
        ))}
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
  column-gap: 32px;
`

export const StyledBodyWrapper = styled(BodyWrapper)`
  background: transparent;
  width: 100%;
  max-width: 1358px;
  padding-top: 0px;
`

export default SecurityTokens
