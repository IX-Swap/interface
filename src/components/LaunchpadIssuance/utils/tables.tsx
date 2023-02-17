import { text47 } from 'components/LaunchpadMisc/typography'
import styled, { css } from 'styled-components'
export const tableHeaderStyles = css`
  height: 60px;
  width: 100%;
  padding: 0.25rem 1rem;
  font-family: 'Inter';
  ${text47}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`
export const TableHeader = styled.div`
  ${tableHeaderStyles}
  display: grid;
  grid-template-rows: 60px;
  grid-template-columns: minmax(0, 0.2fr) minmax(0, 1fr) minmax(0, 0.1fr);
  place-content: center start;
  align-items: center;
  gap: 1rem;
`

export const TableRow = styled(TableHeader)`
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
