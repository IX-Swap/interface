import { useQueryParams, useSetQueryParams } from 'hooks/useParams'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { tabs } from './constants'
import { IssuanceReportTab } from './Table/types'

export const Tabs = () => {
  const {
    objectParams: { tab: activeTab, page: activePage },
  } = useQueryParams<{ tab: IssuanceReportTab; page: number }>(['tab', 'page'])
  const setQueryParams = useSetQueryParams<{ tab: IssuanceReportTab; page: string }>(['tab', 'page'])

  useEffect(() => {
    if (activeTab && (activePage === null || isNaN(activePage))) {
      setQueryParams({ tab: activeTab, page: '1' })
    }
  }, [activePage, activeTab])

  useEffect(() => {
    if (!activeTab || !tabs.find((tab) => tab.type === activeTab)) {
      setQueryParams({ tab: IssuanceReportTab.REGISTRATIONS, page: activePage ? activePage.toString() : '1' })
    }
  }, [activeTab, activePage])

  function handleClick(tab: IssuanceReportTab) {
    setQueryParams({ tab, page: '1' })
  }
  return (
    <StyledTabs>
      <Wrapper>
        {tabs.map((tab) => (
          <Tab
            key={`issuance-report-tab-${tab.name}`}
            active={activeTab === tab.type}
            onClick={() => handleClick(tab.type)}
          >
            {tab.name}
          </Tab>
        ))}
      </Wrapper>
    </StyledTabs>
  )
}

export const StyledTabs = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(12, 1fr);
`

export const Tab = styled.div<{ active: boolean }>`
  display: grid;
  place-content: center;
  padding: 0.25rem 1rem 1.5rem 1rem;
  height: 100%;

  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    border-bottom: 1px solid ${props.theme.launchpad.colors.primary};
  `
      : `
    border-bottom: 1px solid ${props.theme.launchpad.colors.border.default};
  `}
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  width: 50%;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: ${(props) =>
    props.active ? props.theme.launchpad.colors.text.title : props.theme.launchpad.colors.text.bodyAlt};
`
const Wrapper = styled.div`
  grid-column: span 3;
  display: flex;
`
