import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { TableTitle } from 'components/LaunchpadMisc/tables'
import { ArrowLeft } from 'react-feather'
import { useBackLink } from 'state/issuance/hooks'
import styled, { useTheme } from 'styled-components'
import { IssuanceDropdown } from './IssuanceDropdown'
import { DataExtractTable } from './Table/DataExtractTable'
import { Tabs } from './Tabs'
import React from 'react'
import { useParams } from 'react-router-dom'

export const IssuanceReport = () => {
  const { issuanceId } = useParams<{ issuanceId: string }>()
  const goBack = useBackLink(issuanceId)
  const theme = useTheme()
  return (
    <Body>
      <TableTitle>
        <PageTitleRow>
          <BackButton background={theme.launchpad.colors.background} onClick={goBack}>
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </BackButton>
          Data Extraction
        </PageTitleRow>
      </TableTitle>
      <TableTitle>
        <IssuanceDropdown />
      </TableTitle>
      <TableTitle>
        <Tabs />
      </TableTitle>
      <DataExtractTable />
    </Body>
  )
}

const Body = styled.main`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  margin: 2rem;
`
const BackButton = styled(FilledButton)`
  padding: 0;
  width: 48px;
  height: 48px;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary + '14'};
  border-radius: 6px;
`

const PageTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 19px;
`
