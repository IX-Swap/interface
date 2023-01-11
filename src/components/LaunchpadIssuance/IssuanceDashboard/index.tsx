import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { Eye } from 'react-feather'

import { IssuancesFull } from './IssuancesFull'
import { IssuanceStatusBadge } from './IssuanceStatusBadge'

import { ReactComponent as NoIssuancesIcon } from 'assets/launchpad/svg/no-issuances.svg'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableHeader, IssuanceRow } from 'components/LaunchpadMisc/tables'
import { Centered, Column } from 'components/LaunchpadMisc/styled'

import { IssuanceFilter, issuers, IssuanceStatus, Issuance, statuses } from '../types'
import { IssuanceCreateButton } from '../IssuanceCreateButton'


const useIssuances = () => {
  const [loading, setLoading] = React.useState(true)
  const [items, setIssuances] = React.useState<Issuance[]>([])


  const load = React.useCallback(async (filter: IssuanceFilter) => {
    if (filter !== IssuanceFilter.pending) {
      return []
    }

    return Array(10).fill(null).map(() => ({
      startDate: new Date(),
      issuer: issuers[Math.floor(Math.random() * issuers.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)] as IssuanceStatus
    } as Issuance))
  }, [])
  
  const fetch = React.useCallback(async (filter: IssuanceFilter) => {
    try {
      setLoading(true)
      setIssuances(await load(filter))
    } finally {
      setLoading(false)
    }
  }, [load])

  React.useEffect(() => {
    fetch(IssuanceFilter.pending)
  }, [])

  return { items, loading, fetch }
}

interface TabsProps {
  current: IssuanceFilter
  options: { title: string, value: IssuanceFilter }[]

  onSelect: (value: IssuanceFilter) => void
}

const IssuanceTabs: React.FC<TabsProps> = (props) => {
  return (
    <Tabs>
      {props.options.map(tab => (
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
  const theme = useTheme()
  const issuances = useIssuances()

  const [activeTab, setActiveTab] = React.useState(IssuanceFilter.pending)


  React.useEffect(() => {
    issuances.fetch(activeTab)
  }, [activeTab])
  
  const tabs = React.useMemo(() => [
    { title: 'Live', value: IssuanceFilter.live },
    { title: 'Issuances', value: IssuanceFilter.pending },
    { title: 'Old', value: IssuanceFilter.old },
  ], [])

  const issuancesFetched = React.useMemo(() => !issuances.loading && issuances.items.length > 0, [issuances])

  return (
    <Container>

      <Header>
        <TabRow>
          <IssuanceTabs current={activeTab} options={tabs} onSelect={setActiveTab} />
          <IssuanceCreateButton />
        </TabRow>
      </Header>

      <Body>
        {issuances.loading && (
          <Centered>
            <Loader />
          </Centered>
        )}

        {!issuancesFetched && (
          <NoItemsContainer>
            <NoIssuancesIcon />

            <Column>
              <NoItemsTitle>No Issuances yet</NoItemsTitle>
              <NoItemsSubtitle>Please add new issuences.</NoItemsSubtitle>
            </Column>

            <IssuanceCreateButton 
              background={theme.launchpad.colors.primary}
              color={theme.launchpad.colors.text.light}
            />
          </NoItemsContainer>
        )}

        {activeTab === IssuanceFilter.pending && (
          <IssuancesFull />
        )}
        
        {issuancesFetched && activeTab === IssuanceFilter.live && (
          <IssuanceTable>

          </IssuanceTable>
        )}
        
        {issuancesFetched && activeTab === IssuanceFilter.old && (
          <IssuanceTable>

          </IssuanceTable>
        )}

      </Body>
    </Container>
  )
}



const Container = styled.article`
  min-height: 100vh;

`

const Header = styled.header`
  height: 80px;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const TabRow = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  height: 100%;

  max-width: 1180px;
  margin: auto;
`

const Body = styled.main`
  display: flex;
  flex-flow: column nowrap;

  gap: 1rem;

  margin: 2rem;
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

  ${props => props.active && `
    border-bottom: 1px solid ${props.theme.launchpad.colors.primary};
  `}

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.active
    ? props.theme.launchpad.colors.text.title
    : props.theme.launchpad.colors.text.bodyAlt};
`

const NewIssuanceButton = styled.button`
  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  padding: 0 1rem; 

  height: 48px;

  color: ${props => props.theme.launchpad.colors.primary};
  border: 1px solid ${props => props.theme.launchpad.colors.primary + '1e'};
  border-radius: 6px;

  background: none;
`

const NoItemsContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  width: 1180px;
  height: 460px;

  margin: auto;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
`

const NoItemsTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  letter-spacing: -0.03em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const NoItemsSubtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 150%;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.body};
`