import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
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
import { ReactComponent as CreateIcon } from 'assets/images/add.svg'
import { Line } from 'components/Line'
import { CreatePayoutModal } from 'pages/PayoutItem/CreatePayoutModal/CreatePayoutModal'
import { Container } from '@mui/material'
import ConnectWalletCard from 'components/NotAvailablePage/ConnectWalletCard'

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
        <Container style={{ marginTop: '20px' }}>
          <TmMyTokens />
        </Container>
      )

    case 'payout-events':
      return (
        <Container style={{ marginTop: '2px' }}>
          <TmPayoutEvents />
        </Container>
      )

    case 'payout-history':
      return (
        <Container style={{ marginTop: '2px' }}>
          <TmPayoutHistory />
        </Container>
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
  const [isModalOpen, handleIsModalOpen] = useState(false)
  const openModal = () => handleIsModalOpen(true)
  const closeModal = () => handleIsModalOpen(false)
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

  const isValidRole = me.role === ROLES.TOKEN_MANAGER || me.role === ROLES.ADMIN
  useEffect(() => {
    if (me && isValidRole) {
      return
    }
    history.push('/kyc')
  }, [me, history, isValidRole])

  if (!isLogged) {
    return <ConnectWalletCard />
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
            <CreatePayoutModal isModalOpen={isModalOpen} closeModal={closeModal} />

            <CreateButton onClick={openModal}>
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

export const StyledHeaderWrapper = styled(Container)`
  background-color: #ffffff;
  margin: 0 auto;
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
