import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useActiveWeb3React } from 'hooks/web3'

import { MEDIA_WIDTHS } from 'theme'
import { useUserState } from 'state/user/hooks'
import { Border, ToggleOption } from 'components/Tabs'
import { ROLES } from 'constants/roles'
import { TmMyTokens } from 'components/TmMyTokens'
import { ButtonIXSGradient } from 'components/Button'
import { TmPayoutEvents } from 'components/TmPayoutEvents'
import { TmPayoutHistory } from 'components/TmPayoutHistory'
import { routes } from 'utils/routes'
import { NotAvailablePage } from 'components/NotAvailablePage'

export type TokenManagerTab = 'my-tokens' | 'payout-events' | 'payout-history'

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
      return <TmMyTokens />
    case 'payout-events':
      return <TmPayoutEvents />
    case 'payout-history':
      return <TmPayoutHistory />
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
    <Container>
      <Body>
        <TabsContainer>
          {tabs.map(({ value, label }) => (
            <ToggleOption key={`tabs-${value}`} onClick={() => changeTab(value)} active={selectedTab === value}>
              <Trans>{label}</Trans>
              <Border active={selectedTab === value} />
            </ToggleOption>
          ))}
          <ButtonContainer>
            <CreateButton onClick={goToCreate}>
              <Trans>Create Payout Event</Trans>
            </CreateButton>
          </ButtonContainer>
        </TabsContainer>

        {renderTab(selectedTab)}
      </Body>
    </Container>
  )
}

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  padding: 0 30px;
  max-width: 1330px;
  margin: 0 auto;
  width: 100%;
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
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

const CreateButton = styled(ButtonIXSGradient)`
  min-height: 40px;
  height: 40px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
`

export default TokenManager
