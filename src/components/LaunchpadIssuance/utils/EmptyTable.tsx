import React from 'react-dom'
import styled from 'styled-components'
import { ReactComponent as NoIssuancesIcon } from 'assets/launchpad/svg/no-issuances.svg'
import { Column } from 'components/LaunchpadMisc/styled'

interface Props {
  title: string;
  containerMaxWidth?: string;
}

export const EmptyTable = ({ title, containerMaxWidth }: Props) => {
  return (
    <Container maxWidth={containerMaxWidth}>
      <NoIssuancesIcon />
      <Column>
        <NoItemsTitle>{title}</NoItemsTitle>
      </Column>
    </Container>
  )
}

const Container = styled.div<{ maxWidth?: string }>`
  display: flex;

  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  width: ${(props) => props.maxWidth || "1180px"};
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
