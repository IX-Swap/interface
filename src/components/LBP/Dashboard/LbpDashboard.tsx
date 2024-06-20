import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { LbpStatus } from '../types'
import { LbpsFull } from './LbpsFull'

import { Footer } from 'pages/Launchpad/Footer'
import { text8 } from 'components/LaunchpadMisc/typography'
import { LbpCreateButton } from '../LbpCreateButton'

const tabs = [
  { title: 'Drafts', value: LbpStatus.draft },
  { title: 'Coming Soon', value: LbpStatus.pending },
  { title: 'Live', value: LbpStatus.live },
  { title: 'Ended', value: LbpStatus.ended },
]

interface TabsProps {
  current: LbpStatus
  options: { title: string; value: LbpStatus }[]

  onSelect: (value: LbpStatus) => void
}

const LblTabs: React.FC<TabsProps> = (props) => {
  return (
    <Tabs>
      {props.options.map((tab) => (
        <Tab
          key={`lbp-tab-${tab.value}`}
          active={props.current === tab.value}
          onClick={() => props.onSelect(tab.value)}
        >
          {tab.title}
        </Tab>
      ))}
    </Tabs>
  )
}

export const LbpDashboard = () => {
  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)

  const [activeTab, setActiveTab] = React.useState<LbpStatus>(() => {
    const tabQuery = searchParams.get('tab')
    if (tabQuery) {
      return tabQuery as LbpStatus
    }

    return LbpStatus.draft
  })

  const handleTabChange = (tab: LbpStatus) => {
    setActiveTab(tab)
    searchParams.set('tab', tab)

    // Push the updated location to the history stack
    history.push({
      pathname: location.pathname, // Keep the current path
      search: `?${searchParams.toString()}`, // Update the search query
    })
  }

  return (
    <Container>
      <Header>
        <TabRow>
          <LblTabs current={activeTab} options={tabs} onSelect={handleTabChange} />
          <LbpCreateButton showPin />
        </TabRow>
      </Header>

      <Body>
        {activeTab === LbpStatus.draft && <LbpsFull type={LbpStatus.draft} />}

        {activeTab === LbpStatus.pending && <LbpsFull type={LbpStatus.pending} />}

        {activeTab === LbpStatus.live && <LbpsFull type={LbpStatus.live} />}

        {activeTab === LbpStatus.ended && <LbpsFull type={LbpStatus.ended} />}
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
