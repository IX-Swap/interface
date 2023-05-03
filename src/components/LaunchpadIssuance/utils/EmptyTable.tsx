import React from 'react-dom'
import styled from 'styled-components'
import { ReactComponent as NoIssuancesIcon } from 'assets/launchpad/svg/no-issuances.svg'
import { Column } from 'components/LaunchpadMisc/styled'
import { text50 } from 'components/LaunchpadMisc/typography'

interface Props {
  title: string
  containerMaxWidth?: string
  hideBorder?: boolean
}

export const EmptyTable = ({ title, containerMaxWidth, hideBorder }: Props) => {
  return (
    <Container maxWidth={containerMaxWidth} hideBorder={hideBorder}>
      <NoIssuancesIcon />
      <Column>
        <NoItemsTitle>{title}</NoItemsTitle>
      </Column>
    </Container>
  )
}

const Container = styled.div<{ maxWidth?: string; hideBorder?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  width: ${(props) => props.maxWidth || '1180px'};
  height: 360px;
  margin: auto;

  border: ${(props) => (props.hideBorder ? 'none' : `1px solid ${props.theme.launchpad.colors.border.default}`)};
  border-radius: 8px;
`

const NoItemsTitle = styled.div`
  ${text50}

  text-align: center;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
