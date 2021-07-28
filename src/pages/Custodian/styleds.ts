import Row, { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { hexToRGBA } from 'utils/themeHelper'

export const MenuItem = styled(RowBetween)`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: minmax(auto, 1fr) minmax(auto, 72px);
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background: ${({ theme, disabled }) => !disabled && `${hexToRGBA(theme.bg10, 0.1)}`};
    backdrop-filter: blur(4px);
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`
export const MenuRow = styled(Row)`
  padding-right: 10px;
`
