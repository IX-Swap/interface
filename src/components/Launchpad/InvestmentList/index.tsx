import React from 'react'
import styled from 'styled-components'

import { InvestmentCard } from '../InvestmentCard'
import { FilterConfig, InvestmentListFilter } from './Filter'
import { PaginationTrigger } from './PaginationTrigger'
import { Offer } from 'state/launchpad/types'
import { text53, text8 } from 'components/LaunchpadMisc/typography'
import { LbpList } from 'components/LBP/InvestmentList/LbpList'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { MEDIA_WIDTHS } from 'theme'
import { useLocalization } from 'i18n'

enum InvesmentTabs {
  issuance = 'issuance',
  lbp = 'lbp',
}

interface TabsProps {
  current: InvesmentTabs
  options: { title: string; value: InvesmentTabs }[]

  onSelect: (value: InvesmentTabs) => void
}

const LblTabs: React.FC<TabsProps> = (props) => {
  return (
    <Tabs>
      {props.options.map((tab) => (
        <Tab
          key={`investment-tab-${tab.value}`}
          active={props.current === tab.value}
          onClick={() => props.onSelect(tab.value)}
        >
          {tab.title}
        </Tab>
      ))}
    </Tabs>
  )
}

interface Props {
  offers: Offer[]

  hasMore: boolean
  isLoading?: boolean

  fetchMore: () => void
  filter: FilterConfig
  onFilter: (updateFunction: (filter: FilterConfig) => FilterConfig) => void
}

export const InvestmentList: React.FC<Props> = (props) => {
  const { config } = useWhitelabelState()
  const { t } = useLocalization()
  const enableLbp = config?.enableLbp ?? false
  const [activeTab, setActiveTab] = React.useState<InvesmentTabs>(() => {
    if (!enableLbp) {
      return InvesmentTabs.issuance
    }

    const investmentTab = localStorage.getItem('investmentTab')

    return (investmentTab as InvesmentTabs) ?? InvesmentTabs.issuance
  })

  const tabs = [
    { title: t('launchpad.investments.tabs.issuance'), value: InvesmentTabs.issuance },
    { title: t('launchpad.investments.tabs.lbp'), value: InvesmentTabs.lbp },
  ]

  const handleTabChange = (tab: InvesmentTabs) => {
    setActiveTab(tab)
    localStorage.setItem('investmentTab', tab)
  }

  return (
    <InvestmentListContainer>
      <InvestmentTitle>{t('launchpad.investments.heading')}</InvestmentTitle>
      {enableLbp ? <LblTabs current={activeTab} options={tabs} onSelect={handleTabChange} /> : null}
      {activeTab === InvesmentTabs.issuance && (
        <div>
          <InvestmentListFilter filter={props.filter} onFilter={props.onFilter} />
          <InvestmentListGrid>
            {props.offers.map((offer) => (
              <InvestmentCard key={offer.id} offer={offer} />
            ))}
          </InvestmentListGrid>
          {props.hasMore && <PaginationTrigger isLoading={props.isLoading} onTriggered={props.fetchMore} />}
        </div>
      )}
      {activeTab === InvesmentTabs.lbp && <LbpList />}
    </InvestmentListContainer>
  )
}

const InvestmentListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  max-width: ${(props) => props.theme.launchpad.content.maxWidth};
  margin: auto;
  @media (max-width: 1180px) {
    // margin: 0 1rem;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-height: calc(100vh - 64px);
    width: 100%;
  `}
`

const InvestmentTitle = styled.div`
  ${text53}
  font-family: ${(props) => props.theme.launchpad.font};

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const InvestmentListGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  place-content: start;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: repeat(auto-fit, 100%);
  }
`

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding: 0.5rem 0rem;
`

const Tab = styled.div<{ active: boolean }>`
  display: grid;
  place-content: center;
  padding: 1.5rem 1rem;
  height: 100%;
  cursor: pointer;

  ${(props) =>
    props.active &&
    `
    border-bottom: 1px solid ${props.theme.launchpad.colors.primary};
  `}

  font-family:  ${(props) => props.theme.launchpad.font};

  ${text8}

  color: ${(props) =>
    props.active ? props.theme.launchpad.colors.text.title : props.theme.launchpad.colors.text.bodyAlt};
`
