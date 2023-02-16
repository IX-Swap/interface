import { text59 } from 'components/LaunchpadMisc/typography'
import styled from 'styled-components'

export const Title = styled.div`
  ${text59}

  text-align: center;
  margin: 0 20%;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

export const InvestFormContainer = styled.div<{ padding?: string; gap?: string }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  ${(props) => props.padding && `padding: ${props.padding};`}

  gap: ${(props) => props.gap ?? '1rem'};

  height: 100%;
`
