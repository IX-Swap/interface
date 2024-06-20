import { text1 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'

interface Props {
  label: string
  color: string
}

export const LbpStatusBadge: React.FC<Props> = (props) => {
  return <Container color={props.color}>{props.label}</Container>
}

const Container = styled.div<{ color: string }>`
  padding: 0.75rem 1rem;

  color: ${(props) =>
    props.color === '#FFFFFF' ? props.theme.launchpad.colors.text.title : props.theme.launchpad.colors.text.light};

  background-color: ${(props) => props.color};
  font-family: ${(props) => props.theme.launchpad.font};

  ${text1}

  backdrop-filter: blur(20px);
  border-radius: 6px;
`
