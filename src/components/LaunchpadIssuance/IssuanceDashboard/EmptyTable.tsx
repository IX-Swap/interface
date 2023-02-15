import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ReactComponent as NoIssuancesIcon } from 'assets/launchpad/svg/no-issuances.svg'

import { Column } from 'components/LaunchpadMisc/styled'
import { IssuanceCreateButton } from '../IssuanceCreateButton'
import { text3 } from 'components/LaunchpadMisc/typography'

export const EmptyTable = () => {
  const theme = useTheme()

  return (
    <Container>
      <NoIssuancesIcon />

      <Column>
        <NoItemsTitle>No Issuances yet</NoItemsTitle>
        <NoItemsSubtitle>Please add new issuences.</NoItemsSubtitle>
      </Column>

      <IssuanceCreateButton background={theme.launchpad.colors.primary} color={theme.launchpad.colors.text.light} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 1180px;
  height: 460px;
  margin: auto;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
`

const NoItemsTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  letter-spacing: -0.03em;

  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const NoItemsSubtitle = styled.div`
  ${text3}

  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.body};
`
