import React from 'react'
import styled from 'styled-components'

import { IssuanceFilter } from '../types'
import { IssuancesFull } from './IssuancesFull'
import { OffersFull } from './OffersFull'
import { IssuanceCreateButton } from '../IssuanceCreateButton'

import { Footer } from 'pages/Launchpad/Footer'
import { text8 } from 'components/LaunchpadMisc/typography'

const tabs = [
  { title: 'Live', value: IssuanceFilter.live },
  { title: 'Issuances', value: IssuanceFilter.pending },
  { title: 'Old', value: IssuanceFilter.old },
]

interface TabsProps {
  current: IssuanceFilter
  options: { title: string; value: IssuanceFilter }[]

  onSelect: (value: IssuanceFilter) => void
}

const IssuanceTabs: React.FC<TabsProps> = (props) => {
  return (
    <Tabs>
      {props.options.map((tab) => (
        <Tab
          key={`issuance-tab-${tab.value}`}
          active={props.current === tab.value}
          onClick={() => props.onSelect(tab.value)}
        >
          {tab.title}
        </Tab>
      ))}
    </Tabs>
  )
}

export const IssuanceDashboard = () => {
  const [activeTab, setActiveTab] = React.useState<IssuanceFilter>(() => {
    const issuanceTab = localStorage.getItem('issuanceTab')
    return (issuanceTab as IssuanceFilter) ?? IssuanceFilter.pending
  })

  const handleTabChange = (tab: IssuanceFilter) => {
    setActiveTab(tab)
    localStorage.setItem('issuanceTab', tab)
  }

  return (
    <Container>
      <Header>
        <TabRow>
          <IssuanceTabs  current={activeTab} options={tabs} onSelect={handleTabChange} />
          <IssuanceCreateButton showPin />
        </TabRow>
      </Header>

      <Body>
        {activeTab === IssuanceFilter.pending && <IssuancesFull />}

        {activeTab === IssuanceFilter.live && <OffersFull type={'Live'} />}

        {activeTab === IssuanceFilter.old && <OffersFull type={'Old'} />}
      </Body>

      <Footer />
    </Container>
  )
}

const Container = styled.article`
  min-height: 100vh;
  font-family: ${(props) => props.theme.launchpad.font};
`

const Header = styled.header`
  height: 80px;

  border-radius: 6px;
  margin-top: 40px;
`

const TabRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1320px;
  margin: auto;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
`

const Body = styled.main`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  margin: 2rem 0rem;
`

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  height: 100%;
`

const Tab = styled.div<{ active: boolean }>`
  display: grid;
  place-content: center;
  padding: 0.25rem 1rem;
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
