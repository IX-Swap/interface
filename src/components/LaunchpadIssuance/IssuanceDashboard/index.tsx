import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import Portal from '@reach/portal'

import { Plus, Eye } from 'react-feather'

import { IssuanceStatusBadge } from './IssuanceStatusBadge'

import { IssuanceFilter, issuers, IssuanceStatus, Issuance } from '../types'
import { Row } from 'components/LaunchpadMisc/styled'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useHistory } from 'react-router-dom'
import { IssuanceTextField } from '../utils/TextField'
import { IssuanceDialog } from '../utils/Dialog'


const useGetIssuances = () => {
  return React.useCallback(async (filter: IssuanceFilter) => {
    return Array(10).fill(null).map(() => ({
      startDate: new Date(),
      issuer: issuers[Math.floor(Math.random() * issuers.length)],
      status: Math.floor(Math.random() * 5) as IssuanceStatus
    } as Issuance))
  }, [])
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
  const history = useHistory()
  const getIssuances = useGetIssuances()

  const [activeTab, setActiveTab] = React.useState(IssuanceFilter.pending)
  const [issuances, setIssuances] = React.useState<Issuance[]>([])

  const [showIssuanceDialog, setShowIssuanceDialog] = React.useState(false)

  React.useEffect(() => {
    getIssuances(activeTab).then(setIssuances)
  }, [activeTab])
  
  const tabs = React.useMemo(() => [
    { title: 'Live', value: IssuanceFilter.live },
    { title: 'Issuances', value: IssuanceFilter.pending },
    { title: 'Old', value: IssuanceFilter.old },
  ], [])

  const toggleNewIssuanceDialog = React.useCallback(() => {
    setShowIssuanceDialog(state => !state)
  }, [])

  const openIssuanceForm = React.useCallback(() => {
    history.push('/issuance/create')
  }, [])
  

  return (
    <Container>

      <IssuanceDialog title="New Issuance" show={showIssuanceDialog} onClose={toggleNewIssuanceDialog}>
        <IssuanceTextField label="Name" placeholder="Name of Asset" />
        
        <Row gap="1rem" justifyContent='spaced-evenly' width='100%'>
          <OutlineButton grow={1} onClick={toggleNewIssuanceDialog}>Cancel</OutlineButton>
          <FilledButton grow={1} onClick={openIssuanceForm}>Submit</FilledButton>
        </Row>
      </IssuanceDialog>

      <Header>
        <TabRow>
          <IssuanceTabs current={activeTab} options={tabs} onSelect={setActiveTab} />
          
          <OutlineButton onClick={toggleNewIssuanceDialog}>
            <Plus size="15" color={theme.launchpad.colors.primary} /> New Issuance
          </OutlineButton>
        </TabRow>
      </Header>

      <Body>
        {activeTab === IssuanceFilter.pending && (
          <IssuanceTable>
            <TableHeader tab={IssuanceFilter.pending}>
              <div>Issuances</div>
              <div>Start Date</div>
              <div>Status</div>
              <div>Action</div>
            </TableHeader>

            {issuances.map((issuance, idx) => (
              <IssuanceRow key={idx} tab={IssuanceFilter.pending}>
                <div>{issuance.issuer}</div>

                <div>{moment(issuance.startDate).format('DD/MM/YYYY')}</div>

                <IssuanceStatusBadge status={issuance.status} />

                <OutlineButton color={theme.launchpad.colors.primary + '80'} height="34px">
                  View Application <Eye size="15" color={theme.launchpad.colors.primary} />
                </OutlineButton>
              </IssuanceRow>
            ))}
          </IssuanceTable>
        )}
        
        {activeTab === IssuanceFilter.live && (
          <IssuanceTable>

          </IssuanceTable>
        )}
        
        {activeTab === IssuanceFilter.old && (
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

const ViewApplicationButton = styled(NewIssuanceButton)`
  height: 34px;
  color: ${props => props.theme.launchpad.colors.primary + '80'};
`

const IssuanceTable = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;

  width: 100%;
  max-width: 1180px;

  margin: auto;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  > :nth-child(even) {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`

const TableHeader = styled.div<{ tab: IssuanceFilter }>`
  display: grid;

  grid-template-rows: 60px;

  ${props => props.tab === IssuanceFilter.pending && `
    grid-template-columns: 4fr repeat(3, 2fr);
  `}
  
  ${props => props.tab !== IssuanceFilter.pending && `
    grid-template-columns: 1.5fr repeat(6, 1fr)  1fr;
  `}

  place-content: center start ;
  align-items: center;

  gap: 2rem;

  height: 60px;
  width: 100%;

  padding: 0.25rem 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 48px;
  letter-spacing: -0.01em;
  
  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const IssuanceRow = styled(TableHeader)<{ tab: IssuanceFilter }>`

  color: ${props => props.theme.launchpad.colors.text.title};

  opacity: 0.8;
`
