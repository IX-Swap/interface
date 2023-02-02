import React from 'react'
import styled from 'styled-components'

import { ReactComponent as NoIssuancesIcon } from 'assets/launchpad/svg/no-issuances.svg'

import { Column } from 'components/LaunchpadMisc/styled'

export const EmptyTable = () => {
  return (
    <Container>
      <NoIssuancesIcon />
      <Column>
        <NoItemsTitle>No Whitelisted Wallets yet</NoItemsTitle>
      </Column>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: fit-content;
  margin: auto;
  padding: 1rem 0;
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
