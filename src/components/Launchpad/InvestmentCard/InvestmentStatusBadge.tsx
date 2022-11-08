import React from 'react'
import styled from 'styled-components'

interface Props {
  status?: string
}

function getBadgeColor(status?: string) {
  switch (status) {
    case 'Closes soon':
      return '#FF6060'

    case 'Fully Funded':
      return '#1FBA66'

    case 'Register to Invest':
      return '#FFFFFF'

    default:
      return 'rgba(41, 41, 51, 0.2)'
  }
}

export const InvestmentStatusBadge: React.FC<Props> = (props) => {
  const color = React.useMemo(() => getBadgeColor(props.status), [])

  return (
    <Container color={color}>{props.status}</Container>
  )
}

const Container = styled.div<{ color: string }>`
  padding: 0.75rem 1rem;

  color: ${props => props.color === '#FFFFFF' 
    ? props.theme.launchpad.colors.text.title
    : props.theme.launchpad.colors.text.light};

  background-color: ${props => props.color};

  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  backdrop-filter: blur(20px);
  border-radius: 6px;
`
