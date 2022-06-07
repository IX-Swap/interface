import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { MEDIA_WIDTHS } from 'theme'
import { useUserState } from 'state/user/hooks'
import { Border, ToggleOption } from 'components/Tabs'
import { ROLES } from 'constants/roles'
import { TmMyTokens } from 'components/TmMyTokens'
import { ButtonIXSGradient } from 'components/Button'

type AdminTab = 'my-tokens' | 'payout-events' | 'payout-history'

interface Tab {
  label: string
  value: AdminTab
}

export interface AdminParams {
  tab: AdminTab
  id?: string
}

const tabs: Tab[] = [
  { label: 'My Payout Tokens', value: 'my-tokens' },
  { label: 'Payout Events', value: 'payout-events' },
  { label: 'Payout History', value: 'payout-history' },
]

const renderTab = (selectedTab: AdminTab | string) => {
  switch (selectedTab) {
    case 'my-tokens':
      return <TmMyTokens />
    case 'payout-events':
      return <div>Payout events</div>
    case 'payout-history':
      return <div>Payout history</div>

    default:
      return null
  }
}

const TokenManager = () => {
  const [selectedTab, setSelectedTab] = useState<AdminTab>('my-tokens')

  const history = useHistory()
  const params = useParams<AdminParams>()

  const { me } = useUserState()

  const changeTab = useCallback(
    (tab: AdminTab) => {
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

  return (
    <Container>
      <Body>
        <TabsContainer>
          {tabs.map(({ value, label }, index) => (
            <>
              <ToggleOption key={`tabs-${index}`} onClick={() => changeTab(value)} active={selectedTab === value}>
                <Trans>{label}</Trans>
                <Border active={selectedTab === value} />
              </ToggleOption>
            </>
          ))}
          <ButtonContainer>
            <CreateButton>
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
